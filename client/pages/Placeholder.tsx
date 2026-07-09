import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

export default function Placeholder() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const pageTitle = pathSegments[0]
    .charAt(0)
    .toUpperCase()
    .concat(pathSegments[0].slice(1));

  const pageDescriptions: Record<string, { title: string; description: string; emoji: string }> = {
    tantangan: {
      title: "Tantangan Coding",
      description:
        "Uji kemampuanmu dengan berbagai tantangan programming yang menarik dan menantang!",
      emoji: "🚀",
    },
    komunitas: {
      title: "Komunitas",
      description:
        "Bergabunglah dengan ribuan developer dan berbagi pengetahuan bersama-sama.",
      emoji: "👥",
    },
  };

  const page = pageDescriptions[pathSegments[0]] || {
    title: pageTitle,
    description: "Halaman ini sedang dalam pengembangan.",
    emoji: "🔨",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-7xl mb-6 animate-bounce-soft">{page.emoji}</div>
        <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-4">
          {page.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{page.description}</p>
        <p className="text-lg text-gray-600 mb-12">
          Halaman ini sedang dalam pengembangan. Silakan kembali ke beranda atau
          jelajahi kursus kami!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Lightbulb size={20} />
            Lihat Jalur Belajar
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl border-2 border-orange/20">
          <p className="text-gray-600">
            💡 <strong>Tips:</strong> Terus-terus pantau update kami untuk fitur
            baru yang exciting!
          </p>
        </div>
      </div>
    </div>
  );
}
