import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Zap,
  Copy,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  Info,
  Trophy,
  Target,
  Lock,
  Menu,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { courses } from "@/lib/courseData";
import type { LessonContent } from "@/lib/courseData";
import { useAuth } from "@/contexts/AuthContext";
import { saveProgress, getProgress } from "@/lib/firestore";
import { getLessonId, flattenContentLessons } from "@/lib/progress";
import InteractivePlayground, { type PlaygroundRef } from "@/components/InteractivePlayground";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Flatten all lessons across all sections for a given course, with their indices */
function flattenLessons(courseId: string) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];
  const flat: { sectionIdx: number; lessonIdx: number; name: string; content?: LessonContent }[] = [];
  course.curriculum.forEach((section, sIdx) => {
    section.lessons.forEach((lesson, lIdx) => {
      flat.push({ sectionIdx: sIdx, lessonIdx: lIdx, name: lesson.name, content: lesson.content });
    });
  });
  return flat;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LessonPage() {
  const { courseId, sectionIdx: sIdxParam, lessonIdx: lIdxParam } = useParams<{
    courseId: string;
    sectionIdx: string;
    lessonIdx: string;
  }>();

  const playgroundRef = useRef<PlaygroundRef>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const sectionIdx = Number(sIdxParam);
  const lessonIdx = Number(lIdxParam);

  const course = courses.find((c) => c.id === courseId);
  const section = course?.curriculum[sectionIdx];
  const lesson = section?.lessons[lessonIdx];
  const content = lesson?.content;
  
  // Get sections with automatic fallback to legacy explanation array
  const sections = useMemo(() => {
    if (!content) return [];
    return content.sections || (content.explanation ? [{ paragraphs: content.explanation }] : []);
  }, [content]);

  // Flatten for navigation & progress
  const allLessons = useMemo(() => flattenLessons(courseId ?? ""), [courseId]);
  const currentFlatIdx = allLessons.findIndex(
    (l) => l.sectionIdx === sectionIdx && l.lessonIdx === lessonIdx
  );
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round(((currentFlatIdx + 1) / totalLessons) * 100) : 0;
  const prevLesson = currentFlatIdx > 0 ? allLessons[currentFlatIdx - 1] : null;
  const nextLesson = currentFlatIdx < totalLessons - 1 ? allLessons[currentFlatIdx + 1] : null;

  // ── Unlock progress (mirrors the same logic used in CourseDetail) ──────────
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const contentLessons = useMemo(
    () => (course ? flattenContentLessons(course) : []),
    [course],
  );
  const currentContentIdx = contentLessons.findIndex(
    (cl) => cl.sectionIdx === sectionIdx && cl.lessonIdx === lessonIdx,
  );
  // Materi terakhir yang punya konten dalam course ini (mis. "Mini Project") —
  // menyelesaikan materi ini berarti seluruh level selesai.
  const isLastContentLesson =
    currentContentIdx !== -1 && currentContentIdx === contentLessons.length - 1;
  // Course berikutnya di roadmap (dipakai buat animasi unlock di halaman Roadmap)
  const sortedCourses = useMemo(
    () => [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [],
  );
  const nextCourse = useMemo(() => {
    if (!course) return null;
    const idx = sortedCourses.findIndex((c) => c.id === course.id);
    return idx >= 0 && idx < sortedCourses.length - 1 ? sortedCourses[idx + 1] : null;
  }, [course, sortedCourses]);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!user || !course) {
        if (!cancelled) {
          setCompletedMap({});
          setProgressLoaded(true);
        }
        return;
      }

      try {
        const entries = (await Promise.race([
          Promise.all(
            contentLessons.map(async ({ sectionIdx: sIdx, lessonIdx: lIdx }) => {
              const lessonId = getLessonId(course.id, sIdx, lIdx);
              const data = await getProgress(user.uid, lessonId);
              return [lessonId, !!data?.completed] as const;
            }),
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("getProgress timeout")), 8000),
          ),
        ])) as [string, boolean][];
        if (!cancelled) {
          setCompletedMap(Object.fromEntries(entries));
          setProgressLoaded(true);
        }
      } catch (err) {
        console.error("Gagal memuat progress belajar:", err);
        if (!cancelled) setProgressLoaded(true);
      }
    }

    loadProgress();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, course?.id]);

  /** A content lesson is unlocked if it's the first one, or the lesson right before it is completed. */
  function isPreviousCompleted(contentIdx: number) {
    if (contentIdx <= 0) return true;
    const prev = contentLessons[contentIdx - 1];
    if (!course) return true;
    const prevId = getLessonId(course.id, prev.sectionIdx, prev.lessonIdx);
    return !!completedMap[prevId];
  }

  // Kalau materi yang sedang dibuka ternyata masih terkunci (belum menyelesaikan
  // materi sebelumnya) — misal diakses langsung lewat drawer/URL — tendang balik
  // ke materi terakhir yang seharusnya diselesaikan dulu, supaya tidak bisa
  // "diselesaikan" walau masih terkunci.
  useEffect(() => {
    if (!course || !progressLoaded) return;
    if (currentContentIdx > 0 && !isPreviousCompleted(currentContentIdx)) {
      // Cari materi pertama yang belum selesai — itu yang seharusnya dikerjakan duluan.
      const target = contentLessons.find(({ sectionIdx: sIdx, lessonIdx: lIdx }) => {
        const id = getLessonId(course.id, sIdx, lIdx);
        return !completedMap[id];
      });

      toast.error("Selesaikan materi sebelumnya dulu sebelum lanjut ke sini.");

      if (target) {
        navigate(`/kursus/${course.id}/materi/${target.sectionIdx}/${target.lessonIdx}`, {
          replace: true,
        });
      } else {
        // Fallback (harusnya tidak pernah kejadian kalau currentContentIdx terkunci)
        navigate(`/kursus/${course.id}`, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, progressLoaded, completedMap, sectionIdx, lessonIdx]);

  // Drawer State (for accessing lesson lists easily in single-column layout)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Inject starter code into playground on mount / lesson change
  useEffect(() => {
    if (content?.starterCode) {
      const timer = setTimeout(() => {
        playgroundRef.current?.inject({
          html: content.starterCode.html,
          css: content.starterCode.css,
          js: content.starterCode.js,
          tab: "html",
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [courseId, sectionIdx, lessonIdx, content]);

  // Scroll to top on lesson change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [courseId, sectionIdx, lessonIdx]);

  // ─── 404 ────────────────────────────────────────────────────────────────────
  if (!course || !section || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-7xl mb-6">📭</div>
          <h1 className="text-4xl font-bold text-[#0f1a35] mb-4">Materi Tidak Ditemukan</h1>
          <p className="text-xl text-gray-600 mb-8">
            Maaf, materi yang kamu cari tidak ada.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // ─── Next lesson handler (auto-marks current lesson as completed) ──────────
  const handleNext = async () => {
    if (!nextLesson || isSavingProgress) return;

    if (user && courseId) {
      setIsSavingProgress(true);
      const lessonId = getLessonId(courseId, sectionIdx, lessonIdx);
      try {
        // Progress ke Firestore dibuat "best effort" dengan timeout, supaya
        // jika koneksi/permission Firestore bermasalah, tombol tidak
        // tersangkut loading selamanya — user tetap bisa lanjut ke materi berikutnya.
        await Promise.race([
          saveProgress(user.uid, lessonId, true),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("saveProgress timeout")), 8000),
          ),
        ]);
      } catch (err) {
        console.error("Gagal menyimpan progress belajar:", err);
        toast.error(
          "Gagal menyimpan progress ke server. Progresmu mungkin belum tersimpan, coba lagi nanti.",
        );
      } finally {
        setIsSavingProgress(false);
      }

      // Update state lokal secara optimistic. Ini WAJIB, karena navigasi antar
      // materi lewat tombol "Selanjutnya" TIDAK me-remount LessonPage (cuma
      // parameter URL-nya yang berubah) — jadi kalau completedMap tidak
      // di-update di sini, pengecekan unlock di materi berikutnya masih
      // pakai data lama (materi yang barusan diselesaikan dianggap belum
      // selesai) dan bikin user ke-redirect balik walau baru saja klik "Selanjutnya".
      setCompletedMap((prev) => ({ ...prev, [lessonId]: true }));
    }

    navigate(`/kursus/${courseId}/materi/${nextLesson.sectionIdx}/${nextLesson.lessonIdx}`);
  };

  // ─── Finish level handler (last content lesson / "Mini Project") ───────────
  const handleFinishLevel = async () => {
    if (isSavingProgress || !course) return;

    if (user && courseId) {
      setIsSavingProgress(true);
      const lessonId = getLessonId(courseId, sectionIdx, lessonIdx);
      try {
        await Promise.race([
          saveProgress(user.uid, lessonId, true),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("saveProgress timeout")), 8000),
          ),
        ]);
      } catch (err) {
        console.error("Gagal menyimpan progress belajar:", err);
        toast.error(
          "Gagal menyimpan progress ke server. Progresmu mungkin belum tersimpan, coba lagi nanti.",
        );
      } finally {
        setIsSavingProgress(false);
      }
      setCompletedMap((prev) => ({ ...prev, [lessonId]: true }));
    }

    // Redirect ke Roadmap (halaman utama) sambil bawa info level mana yang
    // baru saja diselesaikan — RoadmapSection yang menentukan sendiri level
    // berikutnya + XP-nya dari courseData (single source of truth), lalu
    // memutar animasi scroll + unlock + popup selamat.
    navigate("/", { state: { celebrateCourseId: course.id } });
  };

  // ─── Copy handler ───────────────────────────────────────────────────────────
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* fallback: noop for now */
    }
  };

  // ─── Inline renderer (backtick → highlight) ─────────────────────────────
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-[#0f1a35]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        const code = part.slice(1, -1);
        return (
          <code
            key={i}
            className="bg-grey text-red-600 border border-orange/20 px-1.5 py-0.5 rounded text-[0.85em] font-mono font-semibold"
          >
            {code}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-white pt-[72px] flex flex-col">

      {/* ── 1. Sticky Minimal Header ────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center select-none">
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
          
          {/* Left: Back to course detail */}
          <Link
            to={`/kursus/${courseId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-purple text-sm font-bold transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="max-w-[140px] sm:max-w-none truncate">
              {course.title}
            </span>
          </Link>

          {/* Middle: Progress info (Hidden on mobile) */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-gray-800 tracking-tight">{course.title}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Progress {currentFlatIdx + 1} / {totalLessons} Materi
              </span>
              <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange to-orange-dark rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-purple font-mono">{progressPercent}%</span>
            </div>
          </div>

          {/* Mobile middle text */}
          <div className="md:hidden text-center flex-1 mx-2">
            <span className="block text-[11px] text-gray-500 font-extrabold uppercase">
              {currentFlatIdx + 1} / {totalLessons} Materi
            </span>
          </div>

          {/* Right: Gamified info (Trophy & Level badge) */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-400/25 text-yellow-600 text-xs font-extrabold px-2.5 py-1 rounded-full">
              <Trophy size={12} className="text-yellow-500" />
              <span className="hidden sm:inline">XP: </span>
              {Math.round(course.xp)}
            </span>
            <span className="hidden sm:inline-block bg-purple/10 text-purple text-xs font-bold px-2.5 py-1 rounded-full">
              Level {course.order}
            </span>
          </div>

        </div>
      </header>

      {/* ── Main Content Area (Single Column, focused width) ────────────────── */}
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          
          {/* Drawer Trigger & Progress Bar (Compact & highly visible) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 mb-6">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-lavender hover:bg-purple/10 border border-purple/10 rounded-xl text-purple font-bold text-xs transition-all w-fit"
            >
              <Menu size={14} />
              Daftar Materi
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold font-mono">
              <span>Modul: {section.title}</span>
            </div>
          </div>

          {content ? (
            <div className="space-y-8">
              
              {/* Lesson Title & Level/XP Badges inside content area */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f1a35] tracking-tight mb-3">
                  {lesson.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    course.level === "Pemula"
                      ? "bg-green-500/10 border-green-400/20 text-green-600"
                      : course.level === "Menengah"
                      ? "bg-purple-500/10 border-purple-400/20 text-purple-600"
                      : "bg-red-500/10 border-red-400/20 text-red-600"
                  }`}>
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-400/20 text-yellow-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    <Trophy size={12} className="text-yellow-500" />
                    +{Math.round(course.xp / totalLessons)} XP
                  </span>
                </div>
              </div>

              {/* 2. Penjelasan / Materi */}
              <article className="prose max-w-none space-y-8">
                {sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    {section.heading && (
                      <h2 className="text-lg md:text-xl font-bold text-[#0f1a35] tracking-tight mb-3">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-gray-700 leading-relaxed text-base text-justify"
                        >
                          {paragraph.split("\n").map((line, lIdx, arr) => (
                            <span key={lIdx}>
                              {renderInline(line)}
                              {lIdx < arr.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </article>

              {/* 3. Tips / Catatan / Perhatian */}
              <div className="space-y-4">
                {content.tip && (
                  <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-orange/5 to-orange/10 border border-orange/15 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-orange/15 flex items-center justify-center flex-shrink-0">
                      <Lightbulb size={18} className="text-orange" />
                    </div>
                    <div>
                      <p className="font-bold text-orange text-sm mb-1">Tips</p>
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">{renderInline(content.tip)}</p>
                    </div>
                  </div>
                )}

                {content.note && (
                  <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-200/40 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Info size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-600 text-sm mb-1">Catatan</p>
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">{renderInline(content.note)}</p>
                    </div>
                  </div>
                )}

                {content.warning && (
                  <div className="flex items-start gap-3 p-5 bg-gradient-to-br from-red-50 to-red-50/50 border border-red-200/40 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={18} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-bold text-red-600 text-sm mb-1">Perhatian</p>
                      <p className="text-gray-600 text-sm leading-relaxed text-justify">{renderInline(content.warning)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Contoh Kode */}
              <div className="space-y-3">
                <h3 className="text-md font-bold text-[#0f1a35] flex items-center gap-2">
                  <Zap size={16} className="text-orange" />
                  Contoh Kode
                </h3>
                <div className="rounded-2xl overflow-hidden border border-gray-200/60 shadow-sm bg-gray-950">
                  {/* Code header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#16162A] border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-white/40 text-xs font-mono">index.html</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(content.exampleCode.html)}
                      className="flex items-center gap-1.5 text-white/30 hover:text-white/70 text-xs transition-colors px-2 py-1.5 rounded hover:bg-white/5"
                    >
                      <Copy size={12} />
                      Copy
                    </button>
                  </div>
                  {/* Code content */}
                  <pre className="text-green-300 px-5 py-4 overflow-x-auto text-xs font-mono leading-6 max-h-52 code-scroll">
                    {content.exampleCode.html}
                  </pre>
                </div>
              </div>

              {/* 5. Challenge Card (Placed BEFORE playground for clear goals) */}
              {content.challenge && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-purple/15 bg-gradient-to-br from-purple/3 to-orange/3">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange/10 to-transparent rounded-bl-[80px] pointer-events-none" />
                  
                  <div className="p-6 relative">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple/10 flex items-center justify-center">
                          <Target size={16} className="text-purple" />
                        </div>
                        <h3 className="font-extrabold text-purple text-lg">🎯 Challenge</h3>
                      </div>
                      
                      <span className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-400/25 text-yellow-600 text-xs font-extrabold px-3 py-1 rounded-full">
                        <Trophy size={11} />
                        +20 XP
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-5 leading-relaxed font-semibold">
                      {content.challenge.description}
                    </p>

                    {/* Checklist Targets */}
                    <div className="space-y-2 mb-6">
                      {content.challenge.checklist.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-white/40 p-2.5 rounded-xl border border-gray-100">
                          <div className="w-4 h-4 rounded-full border-2 border-purple/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={10} className="text-purple/30" />
                          </div>
                          <span className="text-xs text-gray-700 font-semibold">{item}</span>
                        </div>
                      ))}
                    </div>

                    <button className="flex items-center gap-2 bg-purple hover:bg-purple/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-purple/25">
                      <CheckCircle size={14} />
                      Cek Jawaban
                    </button>
                  </div>
                </div>
              )}

              {/* 6. Mini Playground (Compact 350px-450px) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-orange/15 flex items-center justify-center">
                      <Zap size={13} className="text-orange" />
                    </div>
                    <h3 className="text-md font-bold text-[#0f1a35]">Praktik Singkat</h3>
                  </div>
                  
                  {/* Link to full editor */}
                  <Link
                    to="/playground"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-purple hover:text-purple-dark font-bold transition-colors"
                  >
                    🚀 Buka Full Playground
                    <ExternalLink size={12} />
                  </Link>
                </div>
                
                <InteractivePlayground
                  ref={playgroundRef}
                  minimal
                  defaultCode={content.starterCode}
                />
              </div>

            </div>
          ) : (
            /* ── Coming Soon state for lessons without content ────────────── */
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center my-10">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-[#0f1a35] mb-3">Materi Akan Segera Hadir</h2>
              <p className="text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
                Materi <span className="font-semibold text-purple">"{lesson.name}"</span> sedang dirancang oleh tim kami. Pantau terus ya!
              </p>
              <Link
                to={`/kursus/${courseId}`}
                className="inline-flex items-center gap-2 bg-purple hover:bg-purple/90 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={18} />
                Kembali ke Course
              </Link>
            </div>
          )}

          {/* ── 9. Navigasi Lesson (Clear & Gamified) ─────────────────────────── */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  to={`/kursus/${courseId}/materi/${prevLesson.sectionIdx}/${prevLesson.lessonIdx}`}
                  className="inline-flex items-center gap-1.5 text-gray-500 hover:text-purple text-sm font-bold transition-all px-3 py-2 rounded-lg hover:bg-purple/5"
                >
                  <ArrowLeft size={15} />
                  Sebelumnya
                </Link>
              ) : (
                <div className="w-24" />
              )}

              {/* Centered user position */}
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3.5 py-1.5 rounded-full font-mono">
                {currentFlatIdx + 1} / {totalLessons}
              </span>

              {isLastContentLesson ? (
                <button
                  type="button"
                  onClick={handleFinishLevel}
                  disabled={isSavingProgress}
                  className="inline-flex items-center gap-1.5 text-white bg-gradient-to-r from-orange to-orange-dark hover:brightness-110 text-sm font-bold transition-all px-5 py-2.5 rounded-lg shadow-orange-glow hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSavingProgress ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      🎉 Selesaikan Level
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              ) : nextLesson ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSavingProgress}
                  className="inline-flex items-center gap-1.5 text-white bg-orange hover:bg-orange-dark text-sm font-bold transition-all px-4 py-2.5 rounded-lg shadow-orange-glow hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSavingProgress ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      Selanjutnya
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              ) : (
                <div className="w-24" />
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ── Slide out Drawer (Accessible from "Daftar Materi" button) ──────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          />
          
          {/* Drawer sheet container */}
          <div className="fixed inset-y-0 right-0 w-[300px] max-w-full bg-white shadow-2xl p-6 overflow-y-auto z-10 transition-transform duration-300 animate-slide-left">
            <div className="flex items-center justify-between mb-6">
              <span className="font-extrabold text-[#0f1a35] text-base tracking-tight">Daftar Materi</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-2xl border border-purple/10 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                  <span className="text-xs font-bold text-purple bg-purple/5 px-2.5 py-0.5 rounded-full">
                    {currentFlatIdx + 1} / {totalLessons}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-extrabold text-[#0f1a35] tracking-tight">{progressPercent}%</span>
                  <span className="text-xs font-semibold text-gray-400">Selesai</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange to-orange-dark rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Lesson List */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
                  {section.title}
                </p>
                {section.lessons.map((l, idx) => {
                  const isActive = idx === lessonIdx;
                  const hasContent = !!l.content;
                  const contentIdx = hasContent
                    ? contentLessons.findIndex(
                        (cl) => cl.sectionIdx === sectionIdx && cl.lessonIdx === idx,
                      )
                    : -1;
                  const isUnlocked = hasContent && isPreviousCompleted(contentIdx);
                  const lessonId = hasContent ? getLessonId(course.id, sectionIdx, idx) : null;
                  const isCompleted = hasContent && !!completedMap[lessonId!];

                  return isUnlocked ? (
                    <Link
                      key={idx}
                      to={`/kursus/${courseId}/materi/${sectionIdx}/${idx}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-purple/8 border border-purple/15"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        isActive
                          ? "bg-purple text-white"
                          : isCompleted
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`text-sm font-medium ${
                        isActive ? "text-purple" : "text-gray-700"
                      }`}>
                        {l.name}
                      </span>
                      {isCompleted && !isActive && (
                        <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Selesai
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-50 cursor-not-allowed"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold bg-gray-100 text-gray-400">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-gray-400">{l.name}</span>
                      <Lock size={11} className="ml-auto text-gray-300" />
                    </div>
                  );
                })}
              </div>

              {/* All Sections */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">
                  Semua Modul
                </p>
                {course.curriculum.map((sec, sIdx) => {
                  const isCurrent = sIdx === sectionIdx;
                  return (
                    <div
                      key={sIdx}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm ${
                        isCurrent
                          ? "bg-orange/8 text-orange font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="text-base leading-none flex-shrink-0">
                        {sec.icon.startsWith("/") ? (
                          <img src={sec.icon} alt="" className="w-4 h-4 object-contain" />
                        ) : (
                          sec.icon
                        )}
                      </span>
                      <span className="truncate">{sec.title}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {sec.lessons.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}