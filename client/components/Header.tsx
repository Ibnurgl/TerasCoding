import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { logoutUser } from "@/lib/auth";
import { User } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  // Hide header completely on lesson pages
  if (location.pathname.includes("/materi/")) {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Playground", href: "/playground" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-xl -z-10" />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />

      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-300"
            onClick={closeMenu}
          >
            <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center overflow-hidden">
              <img
                src="/TECO.svg"
                alt="TerasCoding logo"
                className="w-full h-full max-w-none flex-shrink-0 object-cover scale-[2.5]"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-lg text-purple tracking-tight">TerasCoding</span>
              <span className="text-[10px] text-orange font-semibold uppercase tracking-widest">Frontend Academy</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative group ${isActive(item.href)
                    ? "text-purple bg-lavender font-semibold"
                    : "text-gray-600 hover:text-purple hover:bg-lavender"
                  }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Username pill with hover profile card */}
                <div className="relative group/profile" style={{ zIndex: 100 }}>
                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer select-none transition-all duration-300 ${
                      location.pathname === "/profile"
                        ? "text-purple bg-lavender border border-purple/30 font-bold"
                        : "text-purple bg-lavender/50 hover:bg-lavender hover:opacity-90 font-medium"
                    }`}
                  >
                    <User size={18} className="text-purple" />
                    <span className="text-sm">
                      {user.displayName || "User"}
                    </span>
                  </Link>
                  {/* Profile card — shown on hover except on the profile page itself */}
                  {location.pathname !== "/profile" && (
                    <div className="hidden group-hover/profile:block">
                      <ProfileCard user={user} />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-purple font-semibold text-sm hover:bg-lavender rounded-xl transition-all duration-300"
                >
                  Masuk
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 bg-orange hover:bg-orange-dark text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-orange-glow"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-lavender rounded-xl transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={22} className="text-purple" />
            ) : (
              <Menu size={22} className="text-purple" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-purple/10 animate-slide-down shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-300 ${isActive(item.href)
                      ? "text-purple bg-lavender font-semibold"
                      : "text-gray-700 hover:bg-lavender hover:text-purple"
                    }`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-purple/10 pt-4 mt-3 space-y-2">
                <button className="w-full px-4 py-3 text-purple font-semibold hover:bg-lavender rounded-xl transition-all duration-300">
                  Masuk
                </button>
                <button className="w-full px-4 py-3 bg-orange hover:bg-orange-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-orange-glow">
                  Daftar Gratis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
