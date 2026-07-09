import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  ChevronDown,
  BookOpen,
  Play,
  UserX,
  Laptop,
  Wifi,
  Flame,
  Zap,
  Check,
  Lock,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/courseData";
import Footer from "@/components/Footer";

// ─── Static data (not course-specific) ───────────────────────────────────────

const levelColors = {
  Pemula: "bg-blue-100 text-blue-800",
  Menengah: "bg-purple-100 text-purple-800",
  Mahir: "bg-red-100 text-red-800",
};

const languageIcons: Record<string, string> = {
  HTML: "/htmlicon.svg",
  CSS: "/cssicon.svg",
  JavaScript: "/jsicon.svg",
};

const levelBadgeColor: Record<string, string> = {
  Pemula: "bg-green-500/20 text-green-300 border-green-400/30",
  Menengah: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Mahir: "bg-red-500/20 text-red-300 border-red-400/30",
};

const requirementCards = [
  {
    icon: UserX,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "Tidak Perlu Pengalaman",
    description: "Cocok untuk pemula total. Mulai dari nol, tanpa syarat apapun.",
  },
  {
    icon: Laptop,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Laptop / HP + Browser",
    description: "Belajar bisa dari perangkat apa saja. Tidak perlu software khusus.",
  },
  {
    icon: Wifi,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Internet Stabil",
    description: "Untuk mengakses materi dan latihan coding secara online.",
  },
  {
    icon: Flame,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    title: "Semangat Belajar 🚀",
    description: "Yang paling penting untuk mulai coding. Kamu pasti bisa!",
  },
];

// ─── Indent map for code preview ─────────────────────────────────────────────
const indentClass: Record<0 | 1 | 2 | 3, string> = {
  0: "",
  1: "pl-4",
  2: "pl-8",
  3: "pl-12",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-7xl mb-6">❌</div>
          <h1 className="text-4xl font-bold text-navy mb-4">Kursus Tidak Ditemukan</h1>
          <p className="text-xl text-gray-600 mb-8">
            Maaf, kursus yang Anda cari tidak ada. Silakan kembali ke katalog kursus.
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

  const [openSection, setOpenSection] = useState<number | null>(0);

  const relatedCourses = courses
    .filter((c) => c.language === course.language && c.id !== course.id)
    .slice(0, 3);

  const totalLessons = course.curriculum.reduce(
    (acc, s) => acc + s.lessons.length,
    0
  );

  const levelLabel = `Level ${course.order} — ${course.level}`;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a35] via-navy to-[#1e1060]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.18)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.10)_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative container mx-auto px-4 max-w-6xl pt-5 pb-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
            {/* ── Roadmap Preview Navigator ─────────────────────────────── */}
          {(() => {
            const sorted = [...courses].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            return (
              <div className="absolute top-5 right-4 flex items-center gap-1.5">
                {sorted.map((c) => {
                  const isCurrent = c.id === course.id;
                  const isCompleted = (c.order ?? 0) < (course.order ?? 1);
                  const isLocked = (c.order ?? 0) > (course.order ?? 1);

                  // Derive preview info from statBadges
                  const xpBadge = c.statBadges.find((b) => b.label.includes("XP"));
                  const lessonsBadge = c.statBadges.find((b) => b.label.includes("Materi"));
                  const miniProject = c.statBadges.find(
                    (b) => b.label.toLowerCase().includes("project") || b.label.toLowerCase().includes("app")
                  );
                  const levelBadge = c.statBadges.find(
                    (b) =>
                      b.label.toLowerCase().includes("beginner") ||
                      b.label.toLowerCase().includes("intermediate") ||
                      b.label.toLowerCase().includes("pro")
                  );

                  const pill = (
                    <div
                      key={c.id}
                      className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-sm transition-all duration-200 select-none ${
                        isCurrent
                          ? "bg-orange/20 border-orange/50 text-orange shadow-sm"
                          : isCompleted
                          ? "bg-white/10 border-white/20 text-white/80 cursor-pointer hover:bg-white/15"
                          : "bg-white/5 border-white/10 text-white/35 cursor-not-allowed"
                      }`}
                    >
                      <img
                        src={languageIcons[c.language]}
                        alt={c.language}
                        className={`w-3.5 h-3.5 object-contain flex-shrink-0 ${
                          isLocked ? "opacity-30" : ""
                        }`}
                      />
                      <span>{c.title}</span>
                      {isCompleted && (
                        <Check size={11} className="text-green-400 flex-shrink-0" />
                      )}
                      {isLocked && (
                        <Lock size={10} className="flex-shrink-0" />
                      )}
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse flex-shrink-0" />
                      )}

                      {/* Locked tooltip */}
                      {isLocked && (
                        <div className="pointer-events-none absolute top-full right-0 mt-2 w-64 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-[#1a1830] border border-white/10 rounded-2xl p-4 shadow-2xl">
                            <div className="flex items-center gap-2 mb-2">
                              <img
                                src={languageIcons[c.language]}
                                alt={c.language}
                                className="w-5 h-5 object-contain opacity-60"
                              />
                              <p className="font-bold text-white/90 text-sm leading-snug">
                                {c.title}
                              </p>
                            </div>
                            <p className="text-white/50 text-xs leading-relaxed mb-3">
                              {c.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {lessonsBadge && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300">
                                  <BookOpen size={10} />
                                  {lessonsBadge.label}
                                </span>
                              )}
                              {xpBadge && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-400/20 text-yellow-300">
                                  <Trophy size={10} />
                                  {xpBadge.label}
                                </span>
                              )}
                              {miniProject && (
                                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-400/20 text-orange-300">
                                  {miniProject.label}
                                </span>
                              )}
                              {levelBadge && (
                                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${levelBadgeColor[c.level] ?? "bg-white/10 text-white/50 border-white/10"}`}>
                                  {levelBadge.label}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 pt-2 border-t border-white/8">
                              <Lock size={10} className="text-white/30 flex-shrink-0" />
                              <p className="text-white/40 text-xs">
                                Selesaikan level sebelumnya untuk membuka course ini.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );

                  // Completed: wrap with Link so they can revisit
                  if (isCompleted) {
                    return (
                      <Link key={c.id} to={`/kursus/${c.id}`}>
                        {pill}
                      </Link>
                    );
                  }
                  // Active: no link needed, already on this page
                  return pill;
                })}
              </div>
            );
          })()}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              {/* Level badge + language */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center gap-1.5 bg-white/10 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  {levelLabel}
                </span>
                <span className="bg-orange/20 border border-orange/30 text-orange text-xs font-bold px-3 py-1.5 rounded-full">
                  {course.language}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4 text-balance">
                {course.title}
              </h1>

              {/* Hero description — dynamic per course */}
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                {course.heroDescription}
              </p>

              {/* Stat badges — dynamic per course */}
              <div className="flex flex-wrap gap-3 mb-8">
                {course.statBadges.map(({ icon: Icon, label, color, bg }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-sm text-sm font-medium ${bg}`}
                  >
                    <Icon size={15} className={color} />
                    <span className="text-white/90">{label}</span>
                  </div>
                ))}
              </div>

              {/* Code preview — dynamic per course */}
              <div className="inline-flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-w-sm backdrop-blur-sm">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 text-xs text-white/30 font-mono">
                    {course.codePreviewFile}
                  </span>
                </div>
                {/* Code lines */}
                <div className="px-4 py-3 font-mono text-xs leading-6 space-y-0.5">
                  {course.codePreview.map((line, lineIdx) => (
                    <p key={lineIdx} className={indentClass[line.indent]}>
                      {line.tokens.map((token, tokenIdx) => (
                        <span key={tokenIdx} className={token.colorClass}>
                          {token.text}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: CTA Card — dynamic per course */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl h-fit">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={18} className="text-orange" />
                <p className="text-xs font-bold text-orange uppercase tracking-widest">
                  Mulai Level {course.order}
                </p>
              </div>
              <h3 className="text-xl font-bold text-navy mb-5 leading-snug">
                {course.ctaSubtitle}
              </h3>

              {/* Audience checklist */}
              <div className="space-y-2.5 mb-6">
                {course.ctaAudience.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={12} className="text-green-500" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <button className="w-full bg-orange hover:bg-orange/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-orange/30 text-sm mb-3">
                Mulai Belajar Gratis
              </button>

              <p className="text-center text-xs text-gray-400">
                Akses seumur hidup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Course Content ────────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* What You'll Learn — dynamic per course */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy mb-2">
                  Apa Yang Akan Kamu Pelajari?
                </h2>
                <p className="text-gray-500 mb-8 text-sm">
                  {course.learningTopics.length} topik utama yang akan kamu kuasai di kursus ini
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.learningTopics.map(({ icon: Icon, color, title, desc }, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm cursor-default"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-navy text-sm mb-1">{title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Curriculum — dynamic per course */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-purple">Kurikulum Kursus</h2>
                  <span className="text-sm text-gray-400 font-medium">
                    {totalLessons} Pelajaran
                  </span>
                </div>

                <div className="space-y-3">
                  {course.curriculum.map((section, index) => {
                    const isOpen = openSection === index;
                    return (
                      <div
                        key={index}
                        className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "border-purple shadow-purple-glow bg-white"
                            : "border-purple/10 bg-white hover:border-purple/30 hover:shadow-card"
                        }`}
                      >
                        {/* Accordion Header */}
                        <button
                          onClick={() => setOpenSection(isOpen ? null : index)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left group"
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                                isOpen
                                  ? "bg-purple text-white"
                                  : "bg-lavender text-purple group-hover:bg-purple/20"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex items-center gap-2.5">
                              {section.icon.startsWith("/") ? (
                                <img src={section.icon} alt="" className="w-5 h-5 object-contain" />
                              ) : (
                                <span className="text-xl leading-none">{section.icon}</span>
                              )}
                              <span
                                className={`font-bold text-base transition-colors duration-300 ${
                                  isOpen
                                    ? "text-purple"
                                    : "text-gray-800 group-hover:text-purple"
                                }`}
                              >
                                {section.title}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-300 ${
                                isOpen
                                  ? "bg-purple/10 text-purple"
                                  : "bg-lavender text-purple/70"
                              }`}
                            >
                              {section.lessons.length} Materi
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <ChevronDown
                                size={18}
                                className={`transition-colors duration-300 ${
                                  isOpen ? "text-purple" : "text-gray-400 group-hover:text-purple"
                                }`}
                              />
                            </motion.div>
                          </div>
                        </button>

                        {/* Accordion Body */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="px-5 pb-4 border-t border-purple/8">
                                <div className="pt-3 space-y-1.5">
                                  {section.lessons.map((lesson, lIndex) => {
                                    const hasContent = !!lesson.content;
                                    const inner = (
                                      <div className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-lg bg-white border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                          hasContent
                                            ? "border-purple/15 group-hover/lesson:border-orange group-hover/lesson:bg-orange/5"
                                            : "border-gray-200"
                                        }`}>
                                          <Play
                                            size={11}
                                            className={`transition-colors duration-200 translate-x-px ${
                                              hasContent
                                                ? "text-purple/40 group-hover/lesson:text-orange"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        </div>
                                        <span className={`text-sm font-medium transition-colors duration-200 ${
                                          hasContent
                                            ? "text-gray-700 group-hover/lesson:text-purple"
                                            : "text-gray-400"
                                        }`}>
                                          {lesson.name}
                                        </span>
                                      </div>
                                    );

                                    return hasContent ? (
                                      <Link
                                        key={lIndex}
                                        to={`/kursus/${course.id}/materi/${index}/${lIndex}`}
                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-lavender transition-colors duration-200 group/lesson cursor-pointer"
                                      >
                                        {inner}
                                      </Link>
                                    ) : (
                                      <div
                                        key={lIndex}
                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl opacity-60 cursor-default group/lesson"
                                      >
                                        {inner}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Total summary */}
                <div className="mt-4 flex items-center gap-2 px-1">
                  <BookOpen size={14} className="text-gray-400" />
                  <p className="text-sm text-gray-400">
                    Total{" "}
                    <span className="font-semibold text-purple">
                      {totalLessons} pelajaran
                    </span>{" "}
                    ·{" "}
                    <span className="font-semibold text-purple">
                      {course.curriculum.length} modul
                    </span>
                  </p>
                </div>
              </div>

              {/* Requirements — static, applies to all courses */}
              <div>
                <h2 className="text-3xl font-bold text-navy mb-2">Persyaratan</h2>
                <p className="text-gray-500 mb-6">
                  Tidak perlu khawatir — kursus ini dirancang untuk semua orang. 😊
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requirementCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}
                        >
                          <Icon size={22} className={card.iconColor} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 mb-1">{card.title}</p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  Kenapa Level Ini Cocok?
                </p>
                <p className="text-sm text-gray-500 mb-5">
                  Dirancang khusus untuk level {course.level.toLowerCase()}.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle,
                      color: "text-green-500",
                      bg: "bg-green-50",
                      label: "Materi mudah dipahami",
                      desc: "Dijelaskan langkah demi langkah, tanpa istilah teknis yang membingungkan.",
                    },
                    {
                      icon: Play,
                      color: "text-blue-500",
                      bg: "bg-blue-50",
                      label: "Belajar interaktif",
                      desc: "Latihan langsung di setiap modul agar belajar terasa nyata.",
                    },
                    {
                      icon: Users,
                      color: "text-purple-500",
                      bg: "bg-purple-50",
                      label: "Support komunitas",
                      desc: "Bergabung dengan ribuan pelajar dan tanya jawab kapan saja.",
                    },
                    {
                      icon: BookOpen,
                      color: "text-teal-500",
                      bg: "bg-teal-50",
                      label: "Bisa belajar di mana saja",
                      desc: "Akses materi dari HP atau laptop, kapan pun kamu siap belajar.",
                    },
                  ].map(({ icon: Icon, color, bg, label, desc }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}
                      >
                        <Icon size={16} className={color} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 leading-snug">
                          {label}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Courses ───────────────────────────────────────────────── */}
      {relatedCourses.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-navy mb-8">
              Kursus Terkait {course.language}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <Link
                  key={relatedCourse.id}
                  to={`/kursus/${relatedCourse.id}`}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-orange hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-navy/10 to-orange/10 flex items-center justify-center">
                    <img src={languageIcons[relatedCourse.language]} alt={relatedCourse.language} className="w-16 h-16 object-contain" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-2">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {relatedCourse.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          levelColors[relatedCourse.level]
                        }`}
                      >
                        {relatedCourse.level}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}