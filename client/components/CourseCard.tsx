import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "Pemula" | "Menengah" | "Mahir";
  language: "HTML" | "CSS" | "JavaScript";
  
  rating?: number;
  students?: number;
  order?: number;
  topics?: string[];
  color?: string;
}

const languageConfig: Record<string, { icon: string; bg: string; text: string; border: string }> = {
  HTML: {
    icon: "/htmlicon.svg",
    bg: "from-red-50 to-orange-50",
    text: "text-red-600",
    border: "border-red-200",
  },
  CSS: {
    icon: "/cssicon.svg",
    bg: "from-blue-50 to-indigo-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  JavaScript: {
    icon: "/jsicon.svg",
    bg: "from-yellow-50 to-amber-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
};

const levelConfig: Record<string, { label: string; badge: string; dot: string }> = {
  Pemula: {
    label: "Pemula",
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-400",
  },
  Menengah: {
    label: "Menengah",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-400",
  },
  Mahir: {
    label: "Mahir",
    badge: "bg-purple/10 text-purple",
    dot: "bg-purple",
  },
};

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  level,
  language,
  rating,
  students,
  order,
  topics,
}: CourseCardProps) {
  const lang = languageConfig[language] ?? languageConfig["HTML"];
  const lvl = levelConfig[level] ?? levelConfig["Pemula"];

  return (
    <div className="group relative bg-white rounded-2xl border border-purple/10 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col animate-fade-in">

      {/* Level ribbon */}
      {order && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-purple text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-purple-glow">
          <span>Level {order}</span>
        </div>
      )}

      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${lang.bg} overflow-hidden flex items-center justify-center`}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 ${lang.border} group-hover:scale-110 transition-transform duration-300`}>
              <img src={lang.icon} alt={language} className="w-12 h-12 object-contain" />
            </div>
            <span className={`text-sm font-bold ${lang.text}`}>{language}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${lvl.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${lvl.dot}`} />
            {lvl.label}
          </span>
          {rating && (
            <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              {rating}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-purple mb-2 leading-tight group-hover:text-orange transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Topics preview */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {topics.slice(0, 3).map((topic) => (
              <span key={topic} className="text-xs bg-lavender text-purple px-2.5 py-1 rounded-full font-medium">
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                +{topics.length - 3} lagi
              </span>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
          <span className="flex items-center gap-1">
            <Clock size={12} />
          </span>
          {students && (
            <span className="flex items-center gap-1">
              <Users size={12} />
              {students.toLocaleString()} pelajar
            </span>
          )}
        </div>

        {/* CTA button */}
        <Link
          to={`/kursus/${id}`}
          className="inline-flex items-center justify-center gap-2 w-full bg-orange hover:bg-orange-dark text-white font-bold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-orange-glow text-sm"
        >
          Mulai Belajar
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-purple via-purple-light to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
