/**
 * ProfileCard.tsx
 * ─────────────────────────────────────────────────────────────────
 * Sci-fi HUD hover card shown when hovering over the username in Header.
 * Design mirrors the toast notification style (dark navy, cyan neon glow,
 * scan-line texture, corner brackets).
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { courses } from "@/lib/courseData";
import { getCompletedLessonIds } from "@/lib/firestore";
import { getLessonId, flattenContentLessons } from "@/lib/progress";

// ─── Types ────────────────────────────────────────────────────────

interface CourseStatus {
  id: string;
  language: string;
  order: number;
  completed: boolean;     // all lessons done
  inProgress: boolean;    // at least one lesson done but not all
}

interface ProfileData {
  level: number;          // number of completed courses + 1 (current active)
  title: string;          // dynamic title based on level
  completedCount: number;
  totalCourses: number;
  courseStatuses: CourseStatus[];
}

// ─── Helpers ──────────────────────────────────────────────────────

const TITLE_BY_LEVEL: Record<number, string> = {
  1: "Newbie Coder",
  2: "Junior Developer",
  3: "Frontend Developer",
};

function getTitleByLevel(level: number): string {
  return TITLE_BY_LEVEL[level] ?? "Frontend Developer";
}

// ─── Styles (inline, matching sci-fi toast) ───────────────────────

const s = {
  card: {
    position: "absolute" as const,
    top: "calc(100% + 10px)",
    right: 0,
    width: 300,
    background: "linear-gradient(160deg,#020d1a 0%,#041525 60%,#030f1e 100%)",
    border: "1px solid rgba(0,220,255,0.55)",
    boxShadow:
      "0 0 0 1px rgba(0,180,255,0.08)," +
      "0 0 24px rgba(0,200,255,0.28)," +
      "0 0 60px rgba(0,150,255,0.14)," +
      "inset 0 0 40px rgba(0,100,200,0.06)",
    overflow: "hidden" as const,
    fontFamily: "'Orbitron','Share Tech Mono',monospace",
    zIndex: 999,
    animation: "hud-fadein 0.18s ease-out",
    cursor: "pointer",
  } satisfies CSSProperties,

  scanline: {
    position: "absolute" as const,
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,200,255,0.022) 3px,rgba(0,200,255,0.022) 4px)",
    pointerEvents: "none" as const,
    zIndex: 0,
  } satisfies CSSProperties,

  headerBar: {
    position: "relative" as const,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "9px 14px",
    background: "linear-gradient(90deg,rgba(0,180,255,0.18),rgba(0,120,200,0.08))",
    borderBottom: "1px solid rgba(0,200,255,0.35)",
  } satisfies CSSProperties,

  headerTitle: {
    letterSpacing: "0.22em",
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(0,220,255,1)",
    textShadow: "0 0 12px rgba(0,200,255,0.9)",
  } satisfies CSSProperties,

  body: {
    position: "relative" as const,
    zIndex: 1,
    padding: "14px 16px 16px",
  } satisfies CSSProperties,

  cyanText: {
    color: "rgba(0,220,255,1)",
    textShadow: "0 0 8px rgba(0,200,255,0.8)",
  } satisfies CSSProperties,

  dimText: {
    color: "rgba(160,230,255,0.7)",
    fontSize: 11,
  } satisfies CSSProperties,

  box: {
    border: "1px solid rgba(0,200,255,0.35)",
    background: "rgba(0,100,200,0.07)",
    padding: "10px 12px",
    marginBottom: 10,
  } satisfies CSSProperties,
};

// ─── Corner bracket helper ─────────────────────────────────────────

function CornerBrackets() {
  const b = "2px solid rgba(0,220,255,0.9)";
  return (
    <>
      <div style={{ position:"absolute",top:0,left:0,width:14,height:14,borderTop:b,borderLeft:b,zIndex:2 }} />
      <div style={{ position:"absolute",top:0,right:0,width:14,height:14,borderTop:b,borderRight:b,zIndex:2 }} />
      <div style={{ position:"absolute",bottom:0,left:0,width:14,height:14,borderBottom:b,borderLeft:b,zIndex:2 }} />
      <div style={{ position:"absolute",bottom:0,right:0,width:14,height:14,borderBottom:b,borderRight:b,zIndex:2 }} />
    </>
  );
}

// ─── Status icon per course ────────────────────────────────────────

function CourseStatusIcon({ completed, inProgress }: { completed: boolean; inProgress: boolean }) {
  if (completed) {
    return <span style={{ fontSize: 16 }}>✅</span>;
  }
  if (inProgress) {
    return <span style={{ fontSize: 16 }}>🔄</span>;
  }
  return <span style={{ fontSize: 16 }}>🔒</span>;
}

// ─── Main component ────────────────────────────────────────────────

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const sortedCourses = [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  useEffect(() => {
    let cancelled = false;

    getCompletedLessonIds(user.uid)
      .then((completedIds) => {
        if (cancelled) return;

        const courseStatuses: CourseStatus[] = sortedCourses.map((course) => {
          if (!course.curriculum) {
            return { id: course.id, language: course.language, order: course.order ?? 1, completed: false, inProgress: false };
          }
          const contentLessons = flattenContentLessons(course);
          if (contentLessons.length === 0) {
            return { id: course.id, language: course.language, order: course.order ?? 1, completed: false, inProgress: false };
          }
          const doneLessons = contentLessons.filter(({ sectionIdx, lessonIdx }) =>
            completedIds.has(getLessonId(course.id, sectionIdx, lessonIdx))
          ).length;
          const completed = doneLessons === contentLessons.length;
          const inProgress = doneLessons > 0 && !completed;
          return { id: course.id, language: course.language, order: course.order ?? 1, completed, inProgress };
        });

        const completedCount = courseStatuses.filter((c) => c.completed).length;
        const level = completedCount + 1 <= sortedCourses.length ? completedCount + 1 : sortedCourses.length;

        setData({ level, title: getTitleByLevel(level), completedCount, totalCourses: sortedCourses.length, courseStatuses });
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const progressPercent = data && data.totalCourses > 0 ? Math.min(100, Math.round((data.completedCount / data.totalCourses) * 100)) : 0;

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes hud-fadein {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <div style={s.card} onClick={() => navigate("/profile")}>
        {/* Scan-line overlay */}
        <div style={s.scanline} />
        {/* Corner brackets */}
        <CornerBrackets />

        {/* ── HEADER BAR ── */}
        <div style={s.headerBar}>
          <div style={{
            width:22,height:22,border:"2px solid rgba(0,220,255,0.9)",borderRadius:3,
            display:"flex",alignItems:"center",justifyContent:"center",
            color:"rgba(0,220,255,1)",fontSize:12,fontWeight:"bold",flexShrink:0,
            boxShadow:"0 0 8px rgba(0,200,255,0.6)",
          }}>!</div>
          <span style={s.headerTitle}>STATUS</span>
        </div>

        {/* ── BODY ── */}
        <div style={s.body}>

          {/* Level + Name row */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
            {/* Level number */}
            <div style={{ textAlign:"center", flexShrink:0 }}>
              <div style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(0,220,255,1)",
                textShadow: "0 0 20px rgba(0,200,255,0.8), 0 0 40px rgba(0,180,255,0.4)",
              }}>
                {loading ? "—" : data?.level ?? 1}
              </div>
              <div style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "rgba(0,200,255,0.7)",
                marginTop: 2,
              }}>LEVEL</div>
            </div>

            {/* Divider */}
            <div style={{ width:1, height:55, background:"rgba(0,200,255,0.25)", flexShrink:0 }} />

            {/* Name & Title */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12, color:"rgba(160,230,255,0.85)", marginBottom:3 }}>
                <span style={{ color:"rgba(0,200,255,0.6)", fontSize:10 }}>name: </span>
                <span style={{ color:"rgba(0,220,255,0.95)", fontWeight:700 }}>{displayName}</span>
              </div>
              <div style={{ fontSize:11, color:"rgba(160,230,255,0.75)" }}>
                <span style={{ color:"rgba(0,200,255,0.6)", fontSize:10 }}>title: </span>
                <span style={{ color:"rgba(0,200,255,0.85)" }}>{loading ? "..." : (data?.title ?? "Newbie Coder")}</span>
              </div>
            </div>
          </div>

          {/* ── Progress bar row ── */}
          <div style={{ ...s.box, display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ fontSize:10, fontWeight:700, color:"rgba(0,200,255,0.7)", letterSpacing:"0.1em", flexShrink:0 }}>
              progres
            </span>

            {/* Bar track */}
            <div style={{
              flex:1,
              height:10,
              background:"rgba(0,100,200,0.18)",
              border:"1px solid rgba(0,200,255,0.25)",
              position:"relative",
              overflow:"hidden",
            }}>
              {/* Fill */}
              <div style={{
                position:"absolute",
                inset:0,
                width: loading ? "0%" : `${progressPercent}%`,
                background:"linear-gradient(90deg,rgba(0,160,255,0.8),rgba(0,220,255,1))",
                boxShadow:"0 0 8px rgba(0,200,255,0.7)",
                transition:"width 0.6s ease",
              }} />
              {/* Shimmer */}
              <div style={{
                position:"absolute",
                inset:0,
                background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.15) 50%,transparent 100%)",
                animation:"hud-shimmer 2.5s linear infinite",
              }} />
            </div>

            <span style={{ fontSize:10, fontWeight:700, color:"rgba(0,220,255,0.9)", flexShrink:0, letterSpacing:"0.05em" }}>
              {loading ? "..." : `${data?.completedCount ?? 0}/${data?.totalCourses ?? 3}`}
            </span>
          </div>

          {/* ── Course status list ── */}
          <div style={{ ...s.box, marginBottom:0 }}>
            {sortedCourses.map((course, i) => {
              const status = data?.courseStatuses[i];
              const completed = status?.completed ?? false;
              const inProgress = status?.inProgress ?? false;
              return (
                <div
                  key={course.id}
                  style={{
                    display:"flex",
                    alignItems:"center",
                    gap:8,
                    padding:"4px 0",
                    borderBottom: i < sortedCourses.length - 1 ? "1px solid rgba(0,200,255,0.12)" : "none",
                  }}
                >
                  <span style={{
                    fontSize:12,
                    fontWeight:700,
                    color: completed
                      ? "rgba(0,220,255,1)"
                      : inProgress
                      ? "rgba(0,200,255,0.75)"
                      : "rgba(0,150,200,0.45)",
                    width:80,
                    flexShrink:0,
                  }}>
                    {course.language}
                  </span>
                  <span style={{ color:"rgba(0,200,255,0.4)", fontSize:12 }}>:</span>
                  {loading ? (
                    <span style={{ fontSize:11, color:"rgba(0,200,255,0.4)" }}>...</span>
                  ) : (
                    <CourseStatusIcon completed={completed} inProgress={inProgress} />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Shimmer keyframe */}
        <style>{`@keyframes hud-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }`}</style>
      </div>
    </>
  );
}
