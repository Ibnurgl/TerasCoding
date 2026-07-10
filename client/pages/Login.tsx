import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Code2,
  Trophy,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/lib/auth";

function getLoginErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";

  switch (code) {
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/user-disabled":
      return "Akun ini telah dinonaktifkan.";
    case "auth/user-not-found":
      return "Email belum terdaftar. Silakan daftar terlebih dahulu.";
    case "auth/wrong-password":
      return "Password yang kamu masukkan salah.";
    case "auth/invalid-credential":
      return "Email atau password salah. Silakan coba lagi.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat lagi.";
    case "auth/network-request-failed":
      return "Koneksi bermasalah. Periksa jaringan internetmu.";
    default:
      return "Gagal masuk. Periksa kembali email dan password kamu.";
  }
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Berhasil masuk. Selamat belajar!");
      navigate("/");
    } catch (err) {
      setError(getLoginErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-16">
      {/* ══════════════════ LEFT: Brand panel ══════════════════ */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-purple via-purple to-purple-dark px-12 py-14 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-orange/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-purple-light/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-24 h-24 rounded-2xl border border-white/10 rotate-12 animate-float-slow" />
        <div className="absolute bottom-24 left-16 w-16 h-16 rounded-xl border border-white/10 -rotate-12 animate-float" />

        <div className="relative z-10 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src="/TECO.svg"
                alt="TerasCoding logo"
                className="w-full h-full max-w-none flex-shrink-0 object-cover scale-[2.5]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight">TerasCoding</span>
              <span className="text-[10px] text-orange font-semibold uppercase tracking-widest">
                Frontend Academy
              </span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 backdrop-blur-sm">
            <Sparkles size={14} className="text-orange" />
            <span className="text-sm font-medium">Selamat datang kembali</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15]">
            Lanjutkan
            <br />
            perjalanan{" "}
            <span className="bg-gradient-to-r from-orange to-orange-dark bg-clip-text text-transparent">
              codingmu
            </span>
          </h1>

          <p className="text-white/70 leading-relaxed max-w-md">
            Masuk untuk mengakses progres belajar, playground interaktif, dan
            materi HTML, CSS, hingga JavaScript yang sudah menunggumu.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center">
                <Code2 size={18} className="text-orange" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">3 Level</p>
                <p className="text-xs text-white/60 mt-1">Pembelajaran Terstruktur</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Trophy size={18} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">1000+</p>
                <p className="text-xs text-white/60 mt-1">Pelajar Aktif</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} TerasCoding. Terasnya para calon programmer.
        </p>
      </div>

      {/* ══════════════════ RIGHT: Login card ══════════════════ */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-lavender via-white to-orange/5 px-4 py-12 sm:px-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center overflow-hidden">
              <img
                src="/TECO.svg"
                alt="TerasCoding logo"
                className="w-full h-full max-w-none flex-shrink-0 object-cover scale-[2.5]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-purple tracking-tight">TerasCoding</span>
              <span className="text-[10px] text-orange font-semibold uppercase tracking-widest">
                Frontend Academy
              </span>
            </div>
          </Link>

          <div className="rounded-2xl border border-purple/10 bg-white/80 backdrop-blur-xl shadow-card p-8 sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple mb-2">
                Masuk ke Akunmu
              </h1>
              <p className="text-sm text-gray-500">
                Yuk lanjutkan belajar frontend bareng TerasCoding
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 animate-slide-down"
              >
                <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-purple/15 bg-white pl-11 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-purple/15 bg-white pl-11 pr-11 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={loading}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple transition-colors duration-300 disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-6 py-3.5 text-sm font-bold text-white shadow-orange-glow transition-all duration-300 hover:bg-orange-dark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sedang masuk...
                  </>
                ) : (
                  <>
                    Masuk
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-purple hover:text-purple-light transition-colors duration-300"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}