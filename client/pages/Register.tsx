import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Rocket,
  BookOpen,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { registerUser } from "@/lib/auth";
import { saveUser } from "@/lib/firestore";

function getRegisterErrorMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";

  switch (code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Silakan masuk.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Password terlalu lemah. Gunakan minimal 6 karakter.";
    case "auth/network-request-failed":
      return "Koneksi bermasalah. Periksa jaringan internetmu.";
    default:
      return "Gagal membuat akun. Silakan coba lagi.";
  }
}

const passwordChecks = (password: string) => [
  { label: "Minimal 6 karakter", valid: password.length >= 6 },
  { label: "Mengandung huruf & angka", valid: /[a-zA-Z]/.test(password) && /[0-9]/.test(password) },
];

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<"creating" | "syncing" | null>(null);
  const [error, setError] = useState("");

  const checks = passwordChecks(password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    if (!checks.every((c) => c.valid)) {
      setError("Password belum memenuhi syarat minimal.");
      return;
    }

    setLoading(true);
    setLoadingStage("creating");
    try {
      // Langkah kritis: buat akun di Firebase Authentication.
      // Jika ini gagal, proses register dianggap gagal sepenuhnya.
      const user = await registerUser(name, email, password);

      // Langkah pelengkap: simpan profil ke Firestore.
      // Dibuat "best effort" dengan timeout supaya jika Firestore lambat,
      // diblokir jaringan, atau bermasalah, pengguna TIDAK terjebak loading
      // selamanya padahal akunnya sudah berhasil dibuat.
      setLoadingStage("syncing");
      try {
        await Promise.race([
          saveUser(user.uid, name, email),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("saveUser timeout")), 8000),
          ),
        ]);
      } catch (firestoreErr) {
        console.error("Gagal menyimpan profil ke Firestore:", firestoreErr);
        toast.warning(
          "Akun berhasil dibuat, tapi profil belum sepenuhnya tersinkron. Coba lengkapi lagi nanti di pengaturan.",
        );
      }

      toast.success("Akun berhasil dibuat. Selamat belajar!");
      navigate("/");
    } catch (err) {
      setError(getRegisterErrorMessage(err));
    } finally {
      setLoading(false);
      setLoadingStage(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-16">
      {/* ══════════════════ LEFT: Brand panel ══════════════════ */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-purple via-purple to-purple-dark px-12 py-14 text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-purple-light/30 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-12 w-20 h-20 rounded-2xl border border-white/10 -rotate-12 animate-float-slow" />
        <div className="absolute bottom-32 right-16 w-16 h-16 rounded-xl border border-white/10 rotate-12 animate-float" />

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
            <span className="text-sm font-medium">Gratis selamanya</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15]">
            Mulai jadi
            <br />
            <span className="bg-gradient-to-r from-orange to-orange-dark bg-clip-text text-transparent">
              frontend developer
            </span>
          </h1>

          <p className="text-white/70 leading-relaxed max-w-md">
            Buat akun gratis dan akses materi HTML, CSS, JavaScript, playground
            interaktif, serta pelacakan progres belajarmu.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center">
                <BookOpen size={18} className="text-orange" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">Materi Lengkap</p>
                <p className="text-xs text-white/60 mt-1">Dari dasar hingga mahir</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Rocket size={18} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-bold leading-none">Mulai Cepat</p>
                <p className="text-xs text-white/60 mt-1">Langsung praktik di browser</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} TerasCoding. Terasnya para calon programmer.
        </p>
      </div>

      {/* ══════════════════ RIGHT: Register card ══════════════════ */}
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
                Buat Akun Baru
              </h1>
              <p className="text-sm text-gray-500">
                Gratis, cepat, dan siap belajar dalam hitungan detik
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
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama kamu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-purple/15 bg-white pl-11 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Buat password"
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

                {password.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 animate-fade-in">
                    {checks.map((c) => (
                      <span
                        key={c.label}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-300 ${
                          c.valid ? "text-emerald-600" : "text-gray-400"
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Ulangi password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-purple/15 bg-white pl-11 pr-11 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    disabled={loading}
                    aria-label={
                      showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple transition-colors duration-300 disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    {loadingStage === "syncing" ? "Menyiapkan profil..." : "Membuat akun..."}
                  </>
                ) : (
                  <>
                    Daftar Sekarang
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple hover:text-purple-light transition-colors duration-300"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}