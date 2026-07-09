import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trophy, Star, Zap, RotateCcw, MousePointerClick } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: "HTML" | "CSS" | "JavaScript";
}

const questions: Question[] = [
  {
    id: 1,
    question: "Tag HTML apa yang digunakan untuk membuat judul terbesar?",
    options: ["<h6>", "<h1>", "<title>", "<header>"],
    correctAnswer: 1,
    explanation: "<h1> adalah heading terbesar di HTML. Semakin besar angkanya (h2, h3...), semakin kecil ukurannya!",
    topic: "HTML",
  },
  {
    id: 2,
    question: "Property CSS apa yang mengubah warna teks?",
    options: ["background-color", "font-color", "color", "text-color"],
    correctAnswer: 2,
    explanation: "Property 'color' digunakan untuk mengubah warna teks di CSS. Misalnya: color: red;",
    topic: "CSS",
  },
  {
    id: 3,
    question: "Apa singkatan dari HTML?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "High Tech Modern Language",
      "Hyperlink Text Making Language",
    ],
    correctAnswer: 0,
    explanation: "HTML = HyperText Markup Language. Ini adalah bahasa dasar untuk membuat halaman web!",
    topic: "HTML",
  },
  {
    id: 4,
    question: "CSS property apa yang membuat teks menjadi tebal (bold)?",
    options: ["text-weight: bold", "font-style: bold", "font-weight: bold", "text-bold: true"],
    correctAnswer: 2,
    explanation: "font-weight: bold; digunakan untuk menebalkan teks. Bisa juga menggunakan nilai 700.",
    topic: "CSS",
  },
  {
    id: 5,
    question: "Fungsi JavaScript apa yang menampilkan pesan di browser?",
    options: ["console.show()", "alert()", "print()", "display()"],
    correctAnswer: 1,
    explanation: "alert() menampilkan kotak pesan pop-up di browser. Ini salah satu fungsi JavaScript yang paling dasar!",
    topic: "JavaScript",
  },
];

const TIMER_SECONDS = 15;
const XP_PER_CORRECT = 10;

const topicColors: Record<string, string> = {
  HTML: "bg-red-100 text-red-600",
  CSS: "bg-blue-100 text-blue-600",
  JavaScript: "bg-yellow-100 text-yellow-700",
};

const topicEmoji: Record<string, string> = {
  HTML: "/htmlicon.svg",
  CSS: "/cssicon.svg",
  JavaScript: "/jsicon.svg",
};

// ── Circular SVG timer ──────────────────────────────────────────────────────
function CircularTimer({
  timeLeft,
  total,
  isIdle,
}: {
  timeLeft: number;
  total: number;
  isIdle: boolean;
}) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  // Idle → full ring (no shrinkage). Active → ring shrinks with time.
  const strokeDashoffset = isIdle ? 0 : circumference * (1 - timeLeft / total);

  const color = isIdle
    ? "#d1d5db"                         // gray-300 — waiting, no urgency
    : timeLeft > 10
    ? "#10b981"                         // emerald — safe
    : timeLeft > 5
    ? "#FF8A1F"                         // orange — caution
    : "#ef4444";                        // red — urgent

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="-rotate-90">
        {/* Track */}
        <circle cx="28" cy="28" r={radius} stroke="#e5e7eb" strokeWidth="3.5" fill="none" />
        {/* Progress arc */}
        <circle
          cx="28" cy="28" r={radius}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>
        {isIdle ? total : timeLeft}
      </span>
    </div>
  );
}

export default function MiniQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer]             = useState<number | null>(null);
  const [isAnswered, setIsAnswered]                     = useState(false);
  const [score, setScore]                               = useState(0);
  const [xp, setXp]                                     = useState(0);
  const [timeLeft, setTimeLeft]                         = useState(TIMER_SECONDS);
  const [showCompletion, setShowCompletion]             = useState(false);
  const [streak, setStreak]                             = useState(0);
  const [showXpPop, setShowXpPop]                       = useState(false);

  // ── BUG FIX: timer stays idle until user clicks their first answer ──────
  const [hasStarted, setHasStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  // ── Countdown — only runs after first answer click ──────────────────────
  useEffect(() => {
    // Guard: do nothing until the user has made their first pick
    if (!hasStarted || isAnswered || showCompletion) return;
    if (timeLeft <= 0) {
      setIsAnswered(true);
      setStreak(0);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, showCompletion, hasStarted]);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentQuestionIndex]);

  const handleSelectAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    // First answer click ever → activate timer for subsequent questions
    if (!hasStarted) setHasStarted(true);
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + XP_PER_CORRECT);
      setStreak((prev) => prev + 1);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 1500);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      // hasStarted remains true — timer auto-runs from Q2 onwards
    } else {
      setShowCompletion(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setXp(0);
    setStreak(0);
    setShowCompletion(false);
    setTimeLeft(TIMER_SECONDS);
    setHasStarted(false); // Reset to idle — timer waits again
  };

  const optionLabels = ["A", "B", "C", "D"];

  const getScoreEmoji = () => {
    const pct = score / questions.length;
    if (pct === 1) return "🏆";
    if (pct >= 0.8) return "🥇";
    if (pct >= 0.6) return "🥈";
    return "💪";
  };

  const getScoreMessage = () => {
    const pct = score / questions.length;
    if (pct === 1) return "Sempurna! Kamu luar biasa!";
    if (pct >= 0.8) return "Hebat sekali! Terus belajar ya!";
    if (pct >= 0.6) return "Bagus! Kamu sudah paham banyak hal!";
    return "Jangan menyerah! Coba lagi dan kamu pasti bisa!";
  };

  return (
    <section className="py-20 bg-gradient-to-br from-lavender to-lavender-dark">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Section header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block bg-orange/10 text-orange text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <img src="/miniquiz.svg" alt="XP" className="inline w-5 h-5 object-contain" /> Mini Quiz
          </span>
          <h2 className="text-4xl font-bold text-purple mb-2">
            Uji Pengetahuanmu!
          </h2>
          <p className="text-gray-500">
            Jawab pertanyaan dan kumpulkan XP sebanyak mungkin!
          </p>
        </div>

        {/* Completion screen */}
        {showCompletion ? (
          <div className="bg-white rounded-3xl p-8 shadow-card-hover border border-purple/10 text-center animate-pop-in">
            <div className="text-7xl mb-4">{getScoreEmoji()}</div>
            <h3 className="text-3xl font-bold text-purple mb-2">Quiz Selesai!</h3>
            <p className="text-gray-500 mb-6">{getScoreMessage()}</p>

            {/* Score cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-lavender rounded-2xl p-4">
                <p className="text-3xl font-bold text-purple">{score}/{questions.length}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Jawaban Benar</p>
              </div>
              <div className="bg-orange/10 rounded-2xl p-4">
                <p className="text-3xl font-bold text-orange">{xp}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Total XP</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4">
                <p className="text-3xl font-bold text-emerald-600">{Math.round((score / questions.length) * 100)}%</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Akurasi</p>
              </div>
            </div>

            {/* Achievement badge */}
            {score === questions.length && (
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-dark text-white rounded-2xl py-3 px-6 mb-6 shadow-orange-glow">
                <Trophy size={20} />
                <span className="font-bold">Achievement Unlocked: Perfect Score! 🎯</span>
              </div>
            )}

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 bg-purple hover:bg-purple-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-purple-glow"
            >
              <RotateCcw size={18} />
              Main Lagi
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* ── Stats bar ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 mb-5 border border-purple/10 shadow-card">

              {/* XP */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange/10 rounded-xl flex items-center justify-center">
                  <Zap size={16} className="text-orange" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">XP</p>
                  <p className="text-lg font-bold text-orange leading-none">{xp}</p>
                </div>
              </div>

              {/* Timer — center */}
              <div className="flex flex-col items-center gap-1">
                <CircularTimer timeLeft={timeLeft} total={TIMER_SECONDS} isIdle={!hasStarted} />
                {/* Idle nudge sits below the ring */}
                {!hasStarted && (
                  <p className="text-[9px] font-semibold text-gray-400 text-center leading-tight max-w-[68px]">
                    klik untuk<br />mulai
                  </p>
                )}
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Streak</p>
                  <p className="text-lg font-bold text-yellow-500 leading-none">
                    {streak}{streak > 0 ? " 🔥" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Progress dots ───────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ease-out ${
                      i < currentQuestionIndex
                        ? "w-6 h-2 bg-purple"       // completed
                        : i === currentQuestionIndex
                        ? "w-8 h-2 bg-orange"        // active
                        : "w-2 h-2 bg-gray-200"      // upcoming
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400">
                {score} benar · {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl p-7 shadow-card-hover border border-purple/10 relative overflow-hidden">
              {/* XP popup */}
              {showXpPop && (
                <div className="absolute top-4 right-4 bg-orange text-white font-bold px-4 py-2 rounded-xl shadow-orange-glow animate-slide-up text-sm z-10">
                  +{XP_PER_CORRECT} XP ✨
                </div>
              )}

              {/* Topic badge + idle hint / active hint */}
              <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${topicColors[currentQuestion.topic]}`}>
                  <img src={topicEmoji[currentQuestion.topic]} alt={currentQuestion.topic} className="w-4 h-4 object-contain" />
                  {currentQuestion.topic}
                </span>

                {!hasStarted ? (
                  /* Shown before first click — main idle UX hint */
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                    <MousePointerClick size={11} />
                    Klik jawaban untuk memulai quiz
                  </span>
                ) : (
                  /* Shown after timer has started */
                  <span className="text-xs text-gray-400 font-medium">
                    Jawab dalam {TIMER_SECONDS} detik!
                  </span>
                )}
              </div>

              {/* Question text */}
              <h3 className="text-xl font-bold text-purple mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Answer options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQuestion.correctAnswer;

                  let classes =
                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium text-sm flex items-center gap-3 ";

                  if (!isAnswered) {
                    classes += "border-gray-100 bg-white hover:border-purple/30 hover:bg-lavender hover:shadow-sm hover:translate-x-0.5 cursor-pointer active:scale-[0.99]";
                  } else if (isCorrectOption) {
                    classes += "border-emerald-400 bg-emerald-50 text-emerald-800";
                  } else if (isSelected && !isCorrect) {
                    classes += "border-red-400 bg-red-50 text-red-700";
                  } else {
                    classes += "border-gray-200 opacity-50 cursor-default";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={isAnswered}
                      className={classes}
                    >
                      {/* Option label */}
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                          isAnswered && isCorrectOption
                            ? "bg-emerald-500 text-white"
                            : isAnswered && isSelected && !isCorrect
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isAnswered && isCorrectOption ? (
                          <CheckCircle size={14} />
                        ) : isAnswered && isSelected && !isCorrect ? (
                          <XCircle size={14} />
                        ) : (
                          optionLabels[index]
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-xl mb-5 border-l-4 animate-slide-up ${
                    isCorrect
                      ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                      : "bg-red-50 border-red-400 text-red-800"
                  }`}
                >
                  <p className="font-bold text-base mb-1">
                    {isCorrect ? (
                      <span>✅ Mantap! <span className="text-orange">+{XP_PER_CORRECT} XP</span></span>
                    ) : (
                      <span>❌ Belum tepat, coba lagi!</span>
                    )}
                  </p>
                  <p className="text-sm opacity-80">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next button */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-orange-glow animate-pop-in"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Soal Berikutnya →" : "Lihat Hasil 🏆"}
                </button>
              )}
            </div>

            {/* Tip */}
            <div className="mt-5 p-4 bg-purple/5 rounded-xl border border-purple/10 flex items-start gap-3">
              <span className="text-xl flex-shrink-0"><img src="/tipsicon.svg" alt="XP" className="inline w-7 h-7 object-contain" /></span>
              <p className="text-sm text-gray-600">
                <strong className="text-purple">Tips Belajar:</strong> Jawab dengan percaya diri! Kalau salah, baca penjelasannya — itu cara paling cepat untuk belajar.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}