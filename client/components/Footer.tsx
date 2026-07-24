import { Link } from "react-router-dom";
import { Mail, Github, ArrowRight } from "lucide-react";

// Official Discord logo custom SVG to ensure full compatibility and styling control
function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
      width={props.width ?? 16}
      height={props.height ?? 16}
      {...props}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
  );
}

// Configuration arrays for maintainability and scalability
const navigationLinks = [
  { label: "Beranda", href: "/" },
  { label: "Playground", href: "/playground" },
];

const belajarLinks = [
  { label: "HTML", href: "/kursus/html-level-1" },
  { label: "CSS", href: "/kursus/css-level-2" },
  { label: "JavaScript", href: "/kursus/javascript-level-3" },
  { label: "Interactive Playground", href: "/playground" },
];

const kontakLinks = [
  {
    label: "ragilm2005@gmail.com",
    href: "mailto:ragilm2005@gmail.com",
    icon: Mail,
  },
  {
    label: "discord.gg/codelab",
    href: "https://discord.gg/codelab",
    icon: DiscordIcon,
  },
  {
    label: "github.com/codelab",
    href: "https://github.com/codelab",
    icon: Github,
  },
];

export interface FooterProps {
  simple?: boolean;
}

export default function Footer({ simple }: FooterProps) {
  return (
    <footer className="w-full px-4 pt-16 pb-8 mt-auto">
      {/* Footer Container Card */}
      <div className="container mx-auto max-w-6xl bg-lavender/30 dark:bg-purple-dark/10 border border-purple/10 rounded-xl p-8 md:p-12 shadow-sm transition-colors duration-200">
        
        {/* Simple CTA Banner */}
        {!simple && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 mb-8 border-b border-purple/10 dark:border-purple-light/10">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Siap memulai perjalanan coding-mu?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mulai belajar Frontend secara gratis, seru, dan interaktif.
            </p>
          </div>
          <Link
            to="/kursus/html-level-1"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 text-sm hover:scale-[1.03] active:scale-[0.97] shadow-orange-glow whitespace-nowrap"
          >
            Mulai Belajar Gratis
            <ArrowRight size={16} />
          </Link>
        </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* SECTION 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-95 transition-opacity duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center overflow-hidden">
                <img
                  src="/TECO.svg"
                  alt="TerasCoding logo"
                  className="w-full h-full max-w-none flex-shrink-0 object-cover scale-[2.5]"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg text-purple tracking-tight dark:text-purple-light">
                  TerasCoding
                </span>
                <span className="text-[10px] text-orange font-semibold uppercase tracking-widest">
                  Frontend Academy
                </span>
              </div>
            </Link>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Platform belajar Frontend interaktif untuk pemula hingga siap membuat project nyata.
            </p>
          </div>

          {/* SECTION 2: Navigasi */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-block text-gray-500 hover:text-purple dark:text-gray-400 dark:hover:text-purple-light text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 3: Belajar */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
              Belajar
            </h4>
            <ul className="space-y-2.5">
              {belajarLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-block text-gray-500 hover:text-purple dark:text-gray-400 dark:hover:text-purple-light text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4: Kontak */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
              Kontak
            </h4>
            <ul className="space-y-3">
              {kontakLinks.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 text-gray-500 hover:text-purple dark:text-gray-400 dark:hover:text-purple-light text-sm transition-colors duration-200 group"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-purple dark:group-hover:text-purple-light transition-colors duration-200" />
                      <span>{contact.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR Separator & Details */}
        <div className="border-t border-purple/10 dark:border-purple-light/10 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-gray-500">
            <p className="font-medium text-center sm:text-left">
              © 2026 TerasCoding - Frontend Academy
            </p>
            <p className="text-center sm:text-right">
              Built with <span className="text-purple dark:text-purple-light">React</span> + <span className="text-orange">Tailwind CSS</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
