import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProgressList, ProgressDoc, getUser, saveUser } from "@/lib/firestore";
import { courses } from "@/lib/courseData";
import { getLessonId, flattenContentLessons } from "@/lib/progress";
import {
  Trophy,
  BookOpen,
  Zap,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Lock,
  ChevronRight,
  Target,
  Calendar,
  CheckCircle,
  Play,
  Star,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────

const TITLE_BY_LEVEL: Record<number, string> = {
  1: "Newbie Coder",
  2: "Junior Developer",
  3: "Frontend Developer",
};

function getTitleByLevel(level: number): string {
  return TITLE_BY_LEVEL[level] ?? "Frontend Developer";
}

// ─── Component ──────────────────────────────────────────────────────

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [progressList, setProgressList] = useState<ProgressDoc[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Auto-sync profile to Firestore if missing
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const checkAndSyncProfile = async () => {
      try {
        const dbUser = await getUser(user.uid);
        if (cancelled) return;

        if (!dbUser) {
          console.log("Profile document not found in Firestore. Syncing now...");
          const displayName = user.displayName || user.email?.split("@")[0] || "User";
          const email = user.email || "";
          await saveUser(user.uid, displayName, email);
          console.log("Profile successfully synced to Firestore.");
        }
      } catch (err) {
        console.error("Error auto-syncing profile to Firestore:", err);
      }
    };

    checkAndSyncProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Load progress
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    getUserProgressList(user.uid)
      .then((list) => {
        if (!cancelled) {
          setProgressList(list);
          setDataLoading(false);
        }
      })
      .catch((err) => {
        console.error("Gagal mengambil progress user:", err);
        if (!cancelled) setDataLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  // Map of completed lesson IDs for easy O(1) lookup
  const completedIds = useMemo(() => {
    return new Set(progressList.filter((p) => p.completed).map((p) => p.lessonId));
  }, [progressList]);

  // Calculations for total progress
  const {
    totalLessonsCount,
    completedLessonsCount,
    courseProgresses,
    completedCoursesCount,
  } = useMemo(() => {
    let totalLessonsCount = 0;
    let completedLessonsCount = 0;
    let completedCoursesCount = 0;

    const sortedCourses = [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const courseProgresses = sortedCourses.map((course) => {
      const contentLessons = flattenContentLessons(course);
      const total = contentLessons.length;
      const completed = contentLessons.filter(({ sectionIdx, lessonIdx }) =>
        completedIds.has(getLessonId(course.id, sectionIdx, lessonIdx))
      ).length;

      totalLessonsCount += total;
      completedLessonsCount += completed;

      const isCourseCompleted = total > 0 && completed === total;
      if (isCourseCompleted) {
        completedCoursesCount++;
      }

      return {
        id: course.id,
        title: course.title,
        language: course.language,
        total,
        completed,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    });

    return {
      totalLessonsCount,
      completedLessonsCount,
      courseProgresses,
      completedCoursesCount,
    };
  }, [completedIds]);

  const level = useMemo(() => {
    // Level is number of completed courses + 1
    const computed = completedCoursesCount + 1;
    return computed <= courses.length ? computed : courses.length;
  }, [completedCoursesCount]);

  const xp = useMemo(() => {
    // XP is sum of XP of completed courses
    const sortedCourses = [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return sortedCourses
      .filter((_, idx) => courseProgresses[idx]?.completed === courseProgresses[idx]?.total)
      .reduce((sum, c) => sum + c.xp, 0);
  }, [courseProgresses]);

  // Parse last studied lesson
  const lastStudiedInfo = useMemo(() => {
    if (progressList.length === 0) return null;

    // Find the most recently updated progress item
    const sortedByDate = [...progressList].filter((p) => p.updatedAt);
    sortedByDate.sort((a, b) => {
      const secA = a.updatedAt?.seconds || 0;
      const secB = b.updatedAt?.seconds || 0;
      return secB - secA;
    });

    // Fallback to the last element of the list if no timestamps
    const lastActive = sortedByDate[0] || progressList[progressList.length - 1] || null;
    if (!lastActive) return null;

    // Parse lessonId format: courseId_s{sectionIdx}_l{lessonIdx}
    const match = lastActive.lessonId.match(/^(.+)_s(\d+)_l(\d+)$/);
    if (!match) return null;

    const courseId = match[1];
    const sectionIdx = parseInt(match[2], 10);
    const lessonIdx = parseInt(match[3], 10);

    const course = courses.find((c) => c.id === courseId);
    const section = course?.curriculum[sectionIdx];
    const lesson = section?.lessons[lessonIdx];

    if (!course || !section || !lesson) return null;

    return {
      courseId,
      courseName: course.language,
      lessonName: lesson.name,
      sectionIdx,
      lessonIdx,
    };
  }, [progressList]);

  // Determine active target course and next lesson
  const targetCourseInfo = useMemo(() => {
    const activeProgress = courseProgresses.find((c) => c.percent < 100);
    if (!activeProgress) {
      return {
        allCompleted: true,
        language: "HTML, CSS, JS",
        nextLessonName: "Semua level selesai! 🎉",
        percent: 100,
        courseId: "",
        sectionIdx: 0,
        lessonIdx: 0,
      };
    }

    const courseObj = courses.find((c) => c.id === activeProgress.id);
    let nextLessonName = "Mulai belajar";
    let targetSectionIdx = 0;
    let targetLessonIdx = 0;

    if (courseObj) {
      const contentLessons = flattenContentLessons(courseObj);
      const firstUncompleted = contentLessons.find(({ sectionIdx, lessonIdx }) =>
        !completedIds.has(getLessonId(courseObj.id, sectionIdx, lessonIdx))
      );
      if (firstUncompleted) {
        targetSectionIdx = firstUncompleted.sectionIdx;
        targetLessonIdx = firstUncompleted.lessonIdx;
        nextLessonName = courseObj.curriculum[firstUncompleted.sectionIdx]?.lessons[firstUncompleted.lessonIdx]?.name || "Mulai belajar";
      }
    }

    return {
      allCompleted: false,
      language: activeProgress.language,
      nextLessonName,
      percent: activeProgress.percent,
      courseId: activeProgress.id,
      sectionIdx: targetSectionIdx,
      lessonIdx: targetLessonIdx,
    };
  }, [courseProgresses, completedIds]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#0B081B] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-white/60">Memuat profil belajar...</p>
        </div>
      </div>
    );
  }

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userInitial = displayName.charAt(0).toUpperCase();
  const overallProgressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
  const userTitle = getTitleByLevel(level);

  // Formatting creation date nicely
  const joinDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
      })
    : "Juli 2026";

  return (
    <div className="min-h-screen bg-[#0B081B] text-white pt-24 pb-16">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[350px] h-[350px] bg-purple/10 rounded-full blur-[100px]" />
        <div className="absolute top-[5%] right-[15%] w-[300px] h-[300px] bg-orange/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Title / Path indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-white/40 mb-6 uppercase tracking-wider">
          <Link to="/" className="hover:text-cyan transition-colors">Beranda</Link>
          <ChevronRight size={12} />
          <span className="text-cyan">Profil Saya</span>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. Header Profile Card */}
          <div className="md:col-span-2 bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            {/* Corner brackets decoration */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan/60" />

            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center font-black text-2xl shadow-lg border border-white/10 relative group flex-shrink-0">
              <span className="text-white drop-shadow-md">{userInitial}</span>
              <div className="absolute inset-0 rounded-2xl bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* User Info & Quick Stats */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white/95 leading-tight">
                  {displayName}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cyan/15 border border-cyan/20 text-cyan">
                    {userTitle}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-orange/15 border border-orange/20 text-orange-400">
                    Level {level}
                  </span>
                </div>
              </div>

              {/* Extra info row to reduce empty space */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 pt-2 border-t border-white/5 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-cyan/70" />
                  Bergabung {joinDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame size={13} className="text-orange" />
                  {completedLessonsCount} Materi Selesai
                </span>
              </div>
            </div>
          </div>

          {/* 5. Continue Learning Card */}
          <div className="bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-orange" />
                <span className="text-xs font-bold text-orange uppercase tracking-wider">Terakhir Dipelajari</span>
              </div>

              {lastStudiedInfo ? (
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white/90">
                    {lastStudiedInfo.courseName}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {lastStudiedInfo.lessonName}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white/90">Roadmap Belajar</h4>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Belum ada riwayat belajar. Mari mulai modul pertamamu!
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6">
              {lastStudiedInfo ? (
                <Link
                  to={`/kursus/${lastStudiedInfo.courseId}/materi/${lastStudiedInfo.sectionIdx}/${lastStudiedInfo.lessonIdx}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange hover:bg-orange-dark text-white text-xs font-bold tracking-wider transition-all shadow-md shadow-orange/10 hover:shadow-orange/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  LANJUTKAN BELAJAR
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan/20 border border-cyan/30 text-cyan hover:bg-cyan/30 text-xs font-bold tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  MULAI BELAJAR
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* 2. Progress Belajar Card */}
          <div className="bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-cyan" />
                <span className="text-xs font-bold text-cyan uppercase tracking-wider">Progress Belajar</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-black text-white/95 tracking-tight">{overallProgressPercent}%</span>
                  <span className="text-[11px] text-white/50">{completedLessonsCount} / {totalLessonsCount} Materi</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500"
                    style={{ width: `${overallProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-white/30 pt-4 leading-relaxed">
              Dihitung berdasarkan seluruh topik pelajaran yang diselesaikan.
            </p>
          </div>

          {/* 3. Statistik Card */}
          <div className="bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan" />
              <span className="text-xs font-bold text-cyan uppercase tracking-wider">Statistik Belajar</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                <Trophy size={16} className="text-yellow-400 mb-1" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Level</p>
                <p className="text-lg font-black text-cyan">{level}</p>
              </div>
              
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                <Star size={16} className="text-cyan mb-1" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">XP</p>
                <p className="text-lg font-black text-cyan">{xp}</p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                <BookOpen size={16} className="text-orange mb-1" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Materi</p>
                <p className="text-lg font-black text-cyan">{completedLessonsCount}</p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center text-center">
                <Award size={16} className="text-emerald-400 mb-1" />
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Level Selesai</p>
                <p className="text-lg font-black text-cyan">{completedCoursesCount}</p>
              </div>
            </div>
          </div>

          {/* New Card: Target Berikutnya */}
          <div className="bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-orange" />
                <span className="text-xs font-bold text-orange uppercase tracking-wider">Target Berikutnya</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/40 uppercase font-semibold">
                    {targetCourseInfo.allCompleted ? "Selesai" : `Selesaikan ${targetCourseInfo.language}`}
                  </span>
                  <span className="text-xs font-bold text-cyan">{targetCourseInfo.percent}%</span>
                </div>
                
                <h4 className="text-sm font-semibold text-white/90 line-clamp-1">
                  {targetCourseInfo.nextLessonName}
                </h4>

                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-orange to-orange-dark rounded-full transition-all duration-500"
                    style={{ width: `${targetCourseInfo.percent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              {targetCourseInfo.allCompleted ? (
                <div className="w-full py-2.5 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan text-center text-xs font-semibold select-none">
                  🎓 Jalur Frontend Selesai!
                </div>
              ) : (
                <Link
                  to={`/kursus/${targetCourseInfo.courseId}/materi/${targetCourseInfo.sectionIdx}/${targetCourseInfo.lessonIdx}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange/20 border border-orange/30 text-orange hover:bg-orange/30 text-xs font-bold tracking-wider transition-all hover:scale-[1.01]"
                >
                  MULAI MATERI
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          </div>

          {/* 4. Progress Kursus Card */}
          <div className="md:col-span-2 bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-cyan" />
              <span className="text-xs font-bold text-cyan uppercase tracking-wider">Progress Kursus</span>
            </div>

            <div className="space-y-5">
              {courseProgresses.map((course) => {
                const isCompleted = course.percent === 100;
                const isStarted = course.percent > 0;

                return (
                  <div key={course.id} className="space-y-2.5 bg-white/5 p-4 border border-white/5 rounded-xl transition-all hover:border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white/95">{course.language}</span>
                        <span className="text-xs text-white/40 font-medium">({course.completed} / {course.total} Materi)</span>
                      </div>

                      {/* Status Badges */}
                      <div>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle size={10} />
                            Completed
                          </span>
                        ) : isStarted ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                            <Play size={10} className="scale-75 translate-x-px" />
                            Sedang Dipelajari
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white/30 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                            <Lock size={10} />
                            Belum Dimulai
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted 
                              ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                              : "bg-gradient-to-r from-cyan to-blue-500"
                          }`}
                          style={{ width: `${course.percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-cyan/90 w-8 text-right">{course.percent}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. Achievement */}
          <div className="bg-[#120e26]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-orange/5" />
            <Award size={28} className="text-white/20 mb-2" />
            <h4 className="text-xs font-bold tracking-wider text-white/80 uppercase mb-1">Coming Soon</h4>
            <p className="text-[10px] text-white/40 leading-relaxed max-w-[180px] mx-auto">
              Achievement akan hadir pada update berikutnya.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
