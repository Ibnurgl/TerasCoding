/**
 * RoadmapSection.tsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Single source of truth: ALL content (title, xp, lessons, duration, topics,
 * level number, lock status) is read dynamically from courseData.ts.
 * NOTHING is hardcoded here except UI chrome / visual language-theme mappings
 * (which are presentation metadata, not course content).
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Lock, Star, Zap } from "lucide-react";
import { courses, Course } from "@/lib/courseData";

// ─── Language → visual theme map ─────────────────────────────────────────────
// These are UI presentation constants (emoji, colour tokens) keyed on the
// `language` field that already lives in courseData. Not content, just chrome.

interface LangTheme {
  emoji: string;
  gradFrom: string;
  gradTo: string;
  glow: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  xpText: string;
  xpBg: string;
  xpBorder: string;
  chipText: string;
  chipBg: string;
  chipBorder: string;
  btnFrom: string;
  btnTo: string;
  btnGlow: string;
}

const LANG_THEME: Record<string, LangTheme> = {
  HTML: {
    emoji: "/htmlicon.svg",
    gradFrom: "#FF8A1F",
    gradTo: "#C8391A",
    glow: "rgba(255,138,31,0.55)",
    badgeBg: "rgba(200,57,26,0.15)",
    badgeText: "#FCA882",
    badgeBorder: "rgba(232,71,26,0.28)",
    xpText: "#FFB347",
    xpBg: "rgba(255,138,31,0.12)",
    xpBorder: "rgba(255,138,31,0.28)",
    chipText: "rgba(255,185,110,0.88)",
    chipBg: "rgba(255,138,31,0.09)",
    chipBorder: "rgba(255,138,31,0.20)",
    btnFrom: "#FF8A1F",
    btnTo: "#E07210",
    btnGlow: "rgba(255,138,31,0.52)",
  },
  CSS: {
    emoji: "/cssicon.svg",
    gradFrom: "#60a5fa",
    gradTo: "#3b82f6",
    glow: "rgba(96,165,250,0.55)",
    badgeBg: "rgba(41,101,241,0.15)",
    badgeText: "#93C5FD",
    badgeBorder: "rgba(59,130,246,0.28)",
    xpText: "#93C5FD",
    xpBg: "rgba(96,165,250,0.11)",
    xpBorder: "rgba(96,165,250,0.25)",
    chipText: "rgba(147,197,253,0.88)",
    chipBg: "rgba(96,165,250,0.09)",
    chipBorder: "rgba(96,165,250,0.20)",
    btnFrom: "#60a5fa",
    btnTo: "#3b82f6",
    btnGlow: "rgba(96,165,250,0.48)",
  },
  JavaScript: {
    emoji: "/jsicon.svg",
    gradFrom: "#fbbf24",
    gradTo: "#d97706",
    glow: "rgba(251,191,36,0.55)",
    badgeBg: "rgba(247,223,30,0.12)",
    badgeText: "#FDE68A",
    badgeBorder: "rgba(251,191,36,0.24)",
    xpText: "#FDE68A",
    xpBg: "rgba(251,191,36,0.10)",
    xpBorder: "rgba(251,191,36,0.22)",
    chipText: "rgba(253,230,138,0.88)",
    chipBg: "rgba(251,191,36,0.08)",
    chipBorder: "rgba(251,191,36,0.18)",
    btnFrom: "#fbbf24",
    btnTo: "#d97706",
    btnGlow: "rgba(251,191,36,0.48)",
  },
};

const FALLBACK_THEME = LANG_THEME.HTML;

function getTheme(language: string): LangTheme {
  return LANG_THEME[language] ?? FALLBACK_THEME;
}

// ─── Root section ─────────────────────────────────────────────────────────────

export default function RoadmapSection() {
  // Single source of truth: read + sort courses from courseData
  const roadmap = [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Total XP is always computed from courseData — never hardcoded
  const totalXP = roadmap.reduce((sum, c) => sum + c.xp, 0);
  const totalLessons = roadmap.reduce((sum, c) => sum + (c.lessons ?? 0), 0);

  return (
    <>
      {/* ── CSS keyframe animations (injected once, lightweight) ── */}
      <style>{`
        @keyframes rm-flow {
          0%   { transform:translateY(-8px); opacity:0; }
          12%  { opacity:0.9; }
          88%  { opacity:0.9; }
          100% { transform:translateY(140px); opacity:0; }
        }
        @keyframes rm-ping {
          0%,100% { transform:scale(1);   opacity:0.55; }
          60%      { transform:scale(2.1); opacity:0; }
        }
        @keyframes rm-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rm-float {
          0%,100% { transform:translateY(0px);  }
          50%      { transform:translateY(-7px); }
        }
        @keyframes rm-badge-glow {
          0%,100% { box-shadow:0 0 12px rgba(255,138,31,0.25); }
          50%      { box-shadow:0 0 28px rgba(255,138,31,0.55); }
        }
        .rm-dot-a { animation:rm-flow 3s ease-in-out infinite; }
        .rm-dot-b { animation:rm-flow 3s ease-in-out 1s   infinite; }
        .rm-dot-c { animation:rm-flow 3s ease-in-out 2s   infinite; }
        .rm-ping  { animation:rm-ping  2.4s ease-in-out infinite; }
        .rm-float { animation:rm-float 3.2s ease-in-out infinite; }
        .rm-shimmer {
          background-size:200% auto;
          animation:rm-shimmer 4.5s linear infinite;
        }
        .rm-badge-glow { animation:rm-badge-glow 2.6s ease-in-out infinite; }
      `}</style>

      {/* ── Section shell ── */}
      <section
        id="roadmap"
        className="relative py-24 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg,#09071A 0%,#0F0B22 30%,#130D28 65%,#09071A 100%)",
        }}
      >
        {/* Ambient glows */}
        <AmbientGlows />

        <div className="container mx-auto max-w-5xl relative">

          {/* ── Header ── */}
          <SectionHeader />

          {/* ── Game map ── */}
          <div className="relative mt-16">

            {/* Desktop center path */}
            <CenterPath />

            {/* Mobile left-edge path */}
            <MobilePath />

            {/* Level rows */}
            {roadmap.map((course, index) => {
              const isEven = index % 2 === 0;
              const isLocked = index > 0;
              const isLast = index === roadmap.length - 1;
              const theme = getTheme(course.language);

              return (
                <div key={course.id}>

                  {/* ── Desktop row ── */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_92px_1fr] items-center">

                    {/* Left col */}
                    <div className="pr-8 py-4">
                      {isEven
                        ? <LevelCard course={course} theme={theme} isLocked={isLocked} />
                        : <GhostSide course={course} theme={theme} isLocked={isLocked} side="right" />
                      }
                    </div>

                    {/* Center: node */}
                    <div className="flex justify-center relative z-10">
                      <NodeCircle course={course} theme={theme} isLocked={isLocked} />
                    </div>

                    {/* Right col */}
                    <div className="pl-8 py-4">
                      {!isEven
                        ? <LevelCard course={course} theme={theme} isLocked={isLocked} />
                        : <GhostSide course={course} theme={theme} isLocked={isLocked} side="left" />
                      }
                    </div>
                  </div>

                  {/* ── Mobile row ── */}
                  <div className="flex items-start gap-5 lg:hidden py-2">
                    <div className="flex-shrink-0 mt-3">
                      <NodeCircle course={course} theme={theme} isLocked={isLocked} size={52} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <LevelCard course={course} theme={theme} isLocked={isLocked} />
                    </div>
                  </div>

                  {/* ── Connector pill between levels ── */}
                  {!isLast && (
                    <ConnectorPill course={course} isLocked={isLocked} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Final reward section ── */}
          <RewardSection
            courses={roadmap}
            totalXP={totalXP}
            totalLessons={totalLessons}
          />
        </div>
      </section>
    </>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader() {
  return (
    <div className="text-center">
      <div
        className="rm-badge-glow inline-flex items-center gap-2.5 border border-orange/25 bg-orange/8 backdrop-blur-sm
                   text-orange text-[11px] font-bold px-5 py-2.5 rounded-full mb-7 uppercase tracking-widest"
      >
        <span className="rm-ping inline-block w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
        Jalur Belajar Frontend / Roadmap
      </div>

      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
        Mulai Belajar Coding
        <br />
        <span
          className="rm-shimmer bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg,#FF8A1F 0%,#fbbf24 40%,#FF8A1F 70%,#fbbf24 100%)",
          }}
        >
          dari Dasar, Langkah demi Langkah
        </span>
      </h2>

      <p className="text-white/42 text-base max-w-lg mx-auto leading-relaxed">
        Setiap level saling terhubung. Selesaikan satu untuk membuka yang
        berikutnya — kumpulkan XP dan jadilah Frontend Developer!
      </p>
    </div>
  );
}

// ─── Ambient background glows ─────────────────────────────────────────────────

function AmbientGlows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(75,46,131,0.13) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-24 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(255,138,31,0.08) 0%,transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse,rgba(75,46,131,0.07) 0%,transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(124,92,191,0.45),transparent)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(124,92,191,0.25),transparent)",
        }}
      />
    </div>
  );
}

// ─── Center progression path (desktop) ───────────────────────────────────────

function CenterPath() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 hidden lg:block pointer-events-none z-0"
      style={{ width: 2 }}
    >
      {/* Outer wide glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          left: -9,
          right: -9,
          background:
            "linear-gradient(180deg,rgba(255,138,31,0.20) 0%,rgba(124,92,191,0.14) 55%,rgba(75,46,131,0.07) 100%)",
          filter: "blur(8px)",
        }}
      />
      {/* Medium inner glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          left: -4,
          right: -4,
          background:
            "linear-gradient(180deg,rgba(255,138,31,0.35) 0%,rgba(124,92,191,0.22) 55%,rgba(75,46,131,0.12) 100%)",
          filter: "blur(3px)",
        }}
      />
      {/* Crisp centre line */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(255,138,31,0.75) 0%,rgba(124,92,191,0.60) 55%,rgba(75,46,131,0.35) 100%)",
        }}
      />
      {/* Flowing energy dots */}
      <div className="rm-dot-a absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange opacity-0" />
      <div className="rm-dot-b absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-light opacity-0" />
      <div className="rm-dot-c absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange opacity-0" />
    </div>
  );
}

// ─── Mobile path ──────────────────────────────────────────────────────────────

function MobilePath() {
  return (
    <div
      className="absolute top-10 bottom-10 lg:hidden pointer-events-none z-0"
      style={{ left: 25, width: 2 }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          left: -5,
          right: -5,
          background:
            "linear-gradient(180deg,rgba(255,138,31,0.16) 0%,rgba(124,92,191,0.10) 100%)",
          filter: "blur(5px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(255,138,31,0.65) 0%,rgba(124,92,191,0.45) 100%)",
        }}
      />
    </div>
  );
}

// ─── Connector pill between levels ───────────────────────────────────────────

interface ConnectorPillProps {
  course: Course;
  isLocked: boolean;
}

function ConnectorPill({ course, isLocked }: ConnectorPillProps) {
  const nextLevel = (course.order ?? 1) + 1;

  return (
    <div className="flex justify-center items-center py-4 relative z-10">
      {/* Desktop pill */}
      <div
        className="hidden lg:inline-flex items-center gap-2 text-[11px] font-bold
                   px-4 py-2 rounded-full border backdrop-blur-sm transition-colors"
        style={{
          background: "rgba(9,7,26,0.88)",
          borderColor: isLocked
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,138,31,0.25)",
          color: isLocked
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,185,80,0.95)",
        }}
      >
        {isLocked ? (
          <>
            <Lock size={10} />
            Selesaikan level ini untuk membuka level berikutnya
          </>
        ) : (
          <>
            <img src="/expicon.svg" alt="XP" className="inline w-4 h-4 mr-1 object-contain" /> Selesaikan Level {course.order}  &nbsp;→ dapatkan{""}
            <strong>+{course.xp}&nbsp;XP</strong>dan buka Level {nextLevel}
          </>
        )}
      </div>

      {/* Mobile pill */}
      <div
        className="lg:hidden inline-flex items-center gap-1.5 text-[10px] font-bold
                   px-3 py-1.5 rounded-full border ml-16"
        style={{
          background: "rgba(9,7,26,0.88)",
          borderColor: isLocked
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,138,31,0.22)",
          color: isLocked
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,185,80,0.95)",
        }}
      >
        {isLocked ? (
          <><Lock size={9} /> Terkunci</>
        ) : (
          <><img src="/expicon.svg" alt="XP" className="inline w-3 h-3 mr-1 object-contain" />{course.xp} XP → Level {nextLevel}</>
        )}
      </div>
    </div>
  );
}

// ─── Node circle ──────────────────────────────────────────────────────────────

interface NodeCircleProps {
  course: Course;
  theme: LangTheme;
  isLocked: boolean;
  size?: number;
}

function NodeCircle({ course, theme, isLocked, size = 64 }: NodeCircleProps) {
  const level = course.order ?? 1;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size + 16, height: size + 16 }}
    >
      {/* Outer ping ring — active only */}
      {!isLocked && (
        <div
          className="rm-ping absolute rounded-full pointer-events-none"
          style={{
            width: size + 28,
            height: size + 28,
            background: `radial-gradient(circle,${theme.glow} 0%,transparent 70%)`,
          }}
        />
      )}

      {/* Ring bezel */}
      <div
        className="absolute rounded-full"
        style={{
          width: size + 8,
          height: size + 8,
          background: "#09071A",
          border: `2px solid ${isLocked ? "rgba(255,255,255,0.09)" : theme.gradFrom + "66"
            }`,
          boxShadow: isLocked ? "none" : `0 0 20px ${theme.glow}`,
        }}
      />

      {/* Main disc */}
      <div
        className="relative rounded-full flex items-center justify-center z-10"
        style={{
          width: size,
          height: size,
          background: isLocked
            ? "rgba(255,255,255,0.07)"
            : `linear-gradient(135deg,${theme.gradFrom},${theme.gradTo})`,
          boxShadow: isLocked
            ? "none"
            : `0 0 28px ${theme.glow},inset 0 1px 0 rgba(255,255,255,0.22)`,
        }}
      >
        {isLocked ? (
          <Lock
            size={size >= 60 ? 22 : 16}
            color="rgba(255,255,255,0.28)"
            strokeWidth={2}
          />
        ) : (
          <span
            className="text-white font-black leading-none select-none"
            style={{ fontSize: size >= 60 ? 22 : 17 }}
          >
            {level}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Level card ───────────────────────────────────────────────────────────────

interface LevelCardProps {
  course: Course;
  theme: LangTheme;
  isLocked: boolean;
}

function LevelCard({ course, theme, isLocked }: LevelCardProps) {
  const level = course.order ?? 1;


  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300 group"
      style={{
        background: isLocked ? "rgba(14,11,28,0.92)" : "rgba(17,13,32,0.97)",
        border: `1px solid ${isLocked ? "rgba(255,255,255,0.07)" : theme.badgeBorder
          }`,
        boxShadow: isLocked
          ? "none"
          : `0 0 0 1px ${theme.xpBorder},
             0 16px 48px ${theme.glow.replace("0.55", "0.12")},
             inset 0 1px 0 rgba(255,255,255,0.06)`,
        opacity: isLocked ? 0.75 : 1,
      }}
    >
      {/* Top accent stripe — full width gradient */}
      <div
        className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl"
        style={{
          background: isLocked
            ? "rgba(255,255,255,0.05)"
            : `linear-gradient(90deg,${theme.gradFrom},${theme.gradTo})`,
        }}
      />

      {/* Hover shimmer (active only) */}
      {!isLocked && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
                     group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 30% 0%,${theme.glow.replace(
              "0.55",
              "0.09"
            )} 0%,transparent 70%)`,
          }}
        />
      )}

      {/* Watermark level number */}
      <div
        className="absolute -top-1 right-4 text-[80px] font-black leading-none
                   pointer-events-none select-none"
        style={{
          color: isLocked
            ? "rgba(255,255,255,0.025)"
            : theme.glow.replace("0.55", "0.07"),
        }}
      >
        {String(level).padStart(2, "0")}
      </div>

      {/* Card content */}
      <div className="p-6 pt-7 relative">

        {/* ── Row 1: lang badge + XP reward ── */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold
                       uppercase tracking-wider px-3 py-1.5 rounded-full border"
            style={{
              background: isLocked ? "rgba(255,255,255,0.04)" : theme.badgeBg,
              color: isLocked ? "rgba(255,255,255,0.22)" : theme.badgeText,
              borderColor: isLocked
                ? "rgba(255,255,255,0.07)"
                : theme.badgeBorder,
            }}
          >
            {isLocked ? <span>🔒</span> : <img src={theme.emoji} alt="" className="w-4 h-4 object-contain inline" />}
            Level {level} · {course.language}
          </span>

          <span
            className="inline-flex items-center gap-1 text-[11px] font-bold
                       px-3 py-1.5 rounded-full border"
            style={{
              background: isLocked ? "transparent" : theme.xpBg,
              color: isLocked ? "rgba(255,255,255,0.16)" : theme.xpText,
              borderColor: isLocked
                ? "rgba(255,255,255,0.05)"
                : theme.xpBorder,
            }}
          >
            🏆 +{course.xp} XP
          </span>
        </div>

        {/* ── Title ── */}
        <h3
          className="text-[17px] font-bold mb-2 leading-snug"
          style={{
            color: isLocked
              ? "rgba(255,255,255,0.27)"
              : "rgba(255,255,255,0.95)",
          }}
        >
          {course.title}
        </h3>

        {/* ── Description ── */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{
            color: isLocked
              ? "rgba(255,255,255,0.17)"
              : "rgba(255,255,255,0.50)",
          }}
        >
          {course.description}
        </p>

        {/* ── Topic chips ── */}
        {course.topics && course.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[11px] px-2.5 py-1 rounded-lg font-medium border"
                style={{
                  background: isLocked
                    ? "rgba(255,255,255,0.03)"
                    : theme.chipBg,
                  color: isLocked ? "rgba(255,255,255,0.15)" : theme.chipText,
                  borderColor: isLocked
                    ? "rgba(255,255,255,0.05)"
                    : theme.chipBorder,
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* ── Stats row ── */}
        <div
          className="flex items-center gap-5 text-xs font-medium mb-5 pb-5"
          style={{
            color: isLocked
              ? "rgba(255,255,255,0.17)"
              : "rgba(255,255,255,0.38)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {course.lessons != null && (
            <span className="flex items-center gap-1.5">
              <BookOpen size={12} />
              {course.lessons} Materi
            </span>
          )}
        </div>

        {/* ── CTA button ── */}
        {isLocked ? (
          <div
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       text-sm font-semibold select-none cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Lock size={13} />
            Selesaikan Level {level - 1} dulu❗
          </div>
        ) : (
          <Link
            to={`/kursus/${course.id}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                       text-white text-sm font-bold transition-all duration-300
                       hover:scale-[1.025] active:scale-[0.975]"
            style={{
              background: `linear-gradient(135deg,${theme.btnFrom},${theme.btnTo})`,
              boxShadow: `0 4px 22px ${theme.btnGlow},
                          inset 0 1px 0 rgba(255,255,255,0.10)`,
            }}
          >
            Mulai Level {level}
            <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Ghost side (fills the empty column on desktop) ───────────────────────────

interface GhostSideProps {
  course: Course;
  theme: LangTheme;
  isLocked: boolean;
  side: "left" | "right";
}

function GhostSide({ course, theme, isLocked, side }: GhostSideProps) {
  const align = side === "left" ? "items-start pl-2" : "items-end pr-2";

  return (
    <div className={`flex flex-col gap-3 py-6 ${align}`}>
      {!isLocked ? (
        /* Active level: "Start here" indicator on the empty side */
        <div className="rm-float flex flex-col gap-3">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold
                       px-4 py-2 rounded-full border backdrop-blur-sm"
            style={{
              background: "rgba(255,138,31,0.10)",
              borderColor: "rgba(255,138,31,0.28)",
              color: "#FFB347",
            }}
          >
            <Star size={12} fill="#FFB347" strokeWidth={0} />
            Mulai dari sini!
          </div>

          <p
            className="text-xs font-medium px-1"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Level pertama terbuka untuk kamu
          </p>

          {/* Topic preview chips (from course data) */}
          <div className="flex flex-wrap gap-1.5 max-w-[165px]">
            {(course.topics ?? []).slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md font-medium border"
                style={{
                  background: theme.chipBg,
                  color: theme.chipText,
                  borderColor: theme.chipBorder,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Locked level: subtle teaser */
        <div className="flex flex-col gap-2.5" style={{ opacity: 0.45 }}>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-bold
                       px-3 py-1.5 rounded-full border w-fit"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.30)",
            }}
          >
            <Lock size={10} />
            {course.language} — Terkunci
          </div>

          <p
            className="text-[11px] px-0.5 max-w-[145px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            Selesaikan level sebelumnya untuk membuka{" "}
            {course.title.toLowerCase()}
          </p>

          {/* Dim topic chips as temptation */}
          <div className="flex flex-wrap gap-1.5 max-w-[155px]">
            {(course.topics ?? []).slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-md font-medium border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  color: "rgba(255,255,255,0.15)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reward section ───────────────────────────────────────────────────────────

interface RewardSectionProps {
  courses: Course[];
  totalXP: number;
  totalLessons: number;
}

function RewardSection({ courses, totalXP, totalLessons }: RewardSectionProps) {
  return (
    <div className="mt-20 relative">
      {/* Connector from path to reward */}
      <div className="flex justify-center mb-6">
        <div
          className="h-10 w-px"
          style={{
            background:
              "linear-gradient(180deg,rgba(75,46,131,0.5) 0%,rgba(255,138,31,0.3) 100%)",
          }}
        />
      </div>

      <div
        className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(75,46,131,0.22) 0%,rgba(16,12,30,0.97) 45%,rgba(75,46,131,0.14) 100%)",
          border: "1px solid rgba(124,92,191,0.28)",
          boxShadow:
            "0 0 70px rgba(75,46,131,0.18)," +
            "0 0 0 1px rgba(255,138,31,0.07) inset," +
            "inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Background glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-28 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(255,138,31,0.14) 0%,transparent 70%)",
            filter: "blur(18px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-28 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse,rgba(124,92,191,0.16) 0%,transparent 70%)",
            filter: "blur(14px)",
          }}
        />

        {/* Decorative corner trophy */}
        <div className="absolute top-5 right-6 text-5xl opacity-[0.06] select-none pointer-events-none">
          🏆
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-8">

          {/* ── Trophy visual ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div
              className="rm-float w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,138,31,0.18),rgba(75,46,131,0.25))",
                border: "1px solid rgba(255,138,31,0.28)",
                boxShadow:
                  "0 8px 36px rgba(255,138,31,0.18)," +
                  "inset 0 1px 0 rgba(255,255,255,0.09)",
              }}
            >
              🏆
            </div>
            <span
              className="text-center px-3 py-1.5 rounded-full border text-[10px]
                         font-black uppercase tracking-widest"
              style={{
                background: "rgba(255,138,31,0.10)",
                borderColor: "rgba(255,138,31,0.25)",
                color: "#FFB347",
              }}
            >
              Tujuan Akhir
            </span>
          </div>

          {/* ── Text content ── */}
          <div className="flex-1 text-center md:text-left">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Selesaikan semua {courses.length} level &amp; raih
            </p>

            <h3 className="text-2xl md:text-[28px] font-black text-white mb-1 leading-tight">
              {totalXP} XP Total +{" "}
              <span
                className="rm-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#FF8A1F 0%,#fbbf24 50%,#FF8A1F 100%)",
                }}
              >
                Frontend Developer Badge
              </span>
            </h3>

            <p
              className="text-sm mb-5 leading-relaxed max-w-sm md:max-w-none"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Badge ini membuktikan kamu siap membangun website nyata dari nol.
              Tunjukkan ke dunia bahwa kamu adalah Frontend Developer!
            </p>

            {/* Per-course XP breakdown — dynamic from courseData */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {courses.map((c) => {
                const t = getTheme(c.language);
                return (
                  <div
                    key={c.id}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold
                               px-3 py-1.5 rounded-full border"
                    style={{
                      background: t.xpBg,
                      color: t.xpText,
                      borderColor: t.xpBorder,
                    }}
                  >
                    <img src={t.emoji} alt="" className="w-4 h-4 object-contain inline" />
                    {c.language} · +{c.xp} XP
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <Link
              to="/learning-path/frontend"
              className="inline-flex items-center gap-2.5 text-white font-bold
                         py-4 px-7 rounded-2xl text-sm whitespace-nowrap
                         transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#FF8A1F,#E07210)",
                boxShadow:
                  "0 6px 30px rgba(255,138,31,0.48)," +
                  "inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <Zap size={15} fill="currentColor" strokeWidth={0} />
              Lihat Detail Jalur
              <ArrowRight size={15} />
            </Link>

            {/* Dynamic meta from courseData */}
            <p
              className="text-[11px] text-center"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {totalLessons} materi · {courses.length} level · 100% gratis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}