import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Sparkles } from "lucide-react";
import MiniQuiz from "@/components/MiniQuiz";
import { courses } from "@/lib/courseData";
import Footer from "@/components/Footer";

export default function QuizPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const normalizedCourseId = courseId?.toLowerCase() ?? "";

  const course = courses.find(
    (c) =>
      c.id === courseId ||
      (normalizedCourseId === "js-level-3" && c.id === "javascript-level-3") ||
      (normalizedCourseId === "js" && c.id === "javascript-level-3") ||
      (normalizedCourseId === "javascript" && c.id === "javascript-level-3") ||
      (normalizedCourseId === "css" && c.id === "css-level-2") ||
      (normalizedCourseId === "html" && c.id === "html-level-1")
  );

  const topic: "HTML" | "CSS" | "JavaScript" = course?.language ?? (
    normalizedCourseId.includes("js") || normalizedCourseId.includes("javascript")
      ? "JavaScript"
      : normalizedCourseId.includes("css")
      ? "CSS"
      : "HTML"
  );

  const handleCompleteRoadmap = () => {
    if (course) {
      navigate("/", { state: { celebrateCourseId: course.id } });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender via-white to-purple/5 pt-20">
      {/* Top Bar Navigation */}
      <div className="container mx-auto px-4 max-w-4xl pt-4 pb-2">
        <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-purple/10 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-purple transition-colors px-3 py-1.5 rounded-xl hover:bg-purple/5"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-bold text-sm">
              🏆
            </span>
            <div>
              <h1 className="font-extrabold text-[#0f1a35] text-sm md:text-base leading-tight">
                Final Quiz Level {course?.order ?? 1}: {course?.title ?? "Level Evaluation"}
              </h1>
              <p className="text-[11px] text-gray-400 font-medium">
                Tahap Evaluasi Akhir Belajar {topic}
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="text-xs font-bold text-purple hover:text-purple-dark transition-colors px-3 py-1.5 rounded-xl bg-purple/10 hover:bg-purple/15"
          >
            Roadmap ↗
          </Link>
        </div>
      </div>

      {/* Final Quiz Main Component */}
      <div className="pb-16">
        <MiniQuiz
          topic={topic}
          courseTitle={course?.title}
          onCompleteRoadmap={handleCompleteRoadmap}
        />
      </div>

      <Footer />
    </div>
  );
}
