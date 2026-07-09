import { Link } from "react-router-dom";
import { ReactNode, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Code2, Zap, Eye, Sparkles } from "lucide-react";
import InteractivePlayground, { type PlaygroundRef } from "@/components/InteractivePlayground";
import Footer from "@/components/Footer";

// ─── Data: How-to steps ───────────────────────────────────────────────────────
const howToSteps = [
  {
    number: "01",
    title: "Pilih Tab Bahasa",
    desc: "Klik tab HTML, CSS, atau JS di editor sesuai kode yang ingin kamu tulis.",
  },
  {
    number: "02",
    title: "Tulis atau Ubah Kode",
    desc: "Ketik langsung di area editor. Tidak ada yang bisa rusak — eksperimen bebas!",
  },
  {
    number: "03",
    title: "Klik Jalankan Kode",
    desc: "Tekan tombol oranye dan hasilnya langsung muncul di panel sebelah kanan.",
  },
  {
    number: "04",
    title: "Eksplorasi & Ulangi",
    desc: "Ganti nilai, tambah elemen, coba hal baru. Ini ruang amanmu untuk bereksperimen.",
  },
];

// ─── Data: Code examples ──────────────────────────────────────────────────────
type TabType = "html" | "css" | "js";

interface CodeExample {
  id: string;
  title: string;
  tag: ReactNode;
  tagColor: string;
  description: string;
  goal: string;
  primaryTab: TabType;
  code: {
    html: string;
    css: string;
    js: string;
  };
}

const codeExamples: CodeExample[] = [
  {
    id: "card",
    title: "Kartu Profil Sederhana",
    tag: <img src="/htmlicon.svg" alt="html" className="inline w-5 h-5 object-contain" />,
    tagColor: "text-red-400 bg-red-400/10 border-red-400/20",
    description: "Buat kartu profil yang rapi dengan HTML dan CSS. Cocok untuk latihan pertama.",
    goal: "Hasilnya: kartu putih dengan nama, deskripsi, dan tombol.",
    primaryTab: "html",
    code: {
      html: `<div class="card">
  <div class="avatar">🧑‍💻</div>
  <h2>Nama Kamu</h2>
  <p class="role">Frontend Developer Pemula</p>
  <p class="bio">Sedang belajar HTML, CSS, dan JavaScript di TerasCoding!</p>
  <button onclick="this.textContent='Tersimpan! ✅'">Ikuti</button>
</div>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F7F3FF, #EDE8FA);
}

.card {
  background: white;
  border-radius: 24px;
  padding: 40px 32px;
  text-align: center;
  max-width: 300px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(75,46,131,0.12);
}

.avatar {
  font-size: 4rem;
  margin-bottom: 16px;
}

h2 {
  color: #4B2E83;
  font-size: 1.4rem;
  margin-bottom: 4px;
}

.role {
  color: #FF8A1F;
  font-size: 0.85rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.bio {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 24px;
}

button {
  background: #4B2E83;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #7C5CBF;
  transform: scale(1.04);
}`,
      js: "",
    },
  },
  {
    id: "button",
    title: "Tombol dengan Hover Effect",
    tag: <img src="/cssicon.svg" alt="css" className="inline w-5 h-5 object-contain" />,
    tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    description: "Pelajari CSS transition dan transform untuk membuat tombol yang terasa hidup saat di-hover.",
    goal: "Hasilnya: tombol yang bergerak halus saat kursor mendekat.",
    primaryTab: "css",
    code: {
      html: `<div class="container">
  <h2>Hover tombol ini!</h2>
  <button class="btn-glow">✨ Tombol Ajaib</button>
  <button class="btn-slide">Geser Saya →</button>
  <button class="btn-bounce">Klik! 🎉</button>
</div>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0e17;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

h2 {
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

/* Tombol 1: Glow effect */
.btn-glow {
  background: linear-gradient(135deg, #4B2E83, #7C5CBF);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(75,46,131,0.3);
}

.btn-glow:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(124,92,191,0.6);
}

/* Tombol 2: Slide fill */
.btn-slide {
  background: transparent;
  color: #FF8A1F;
  border: 2px solid #FF8A1F;
  padding: 13px 32px;
  border-radius: 14px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-slide:hover {
  background: #FF8A1F;
  color: white;
  transform: translateX(6px);
}

/* Tombol 3: Bounce */
.btn-bounce {
  background: white;
  color: #4B2E83;
  border: none;
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.btn-bounce:active {
  transform: scale(0.92);
}

.btn-bounce:hover {
  transform: scale(1.06);
}`,
      js: "",
    },
  },
  {
    id: "greeting",
    title: "Sapa Nama dengan JavaScript",
    tag: <img src="/jsicon.svg" alt="js" className="inline w-5 h-5 object-contain" />,
    tagColor: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    description: "Intro pertama ke JavaScript: ambil input dari pengguna dan tampilkan respon dinamis.",
    goal: "Hasilnya: form nama yang menyapa kamu secara personal.",
    primaryTab: "js",
    code: {
      html: `<div class="app">
  <h1>👋 Siapa Namamu?</h1>
  <div class="input-group">
    <input type="text" id="nameInput" placeholder="Tulis namamu di sini..." />
    <button onclick="greet()">Sapa Saya!</button>
  </div>
  <div id="result" class="result"></div>
</div>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1830, #0f0e17);
}

.app {
  text-align: center;
  padding: 48px 40px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  max-width: 400px;
  width: 90%;
}

h1 {
  color: white;
  font-size: 1.6rem;
  margin-bottom: 28px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  color: white;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: rgba(255,138,31,0.6);
}

input::placeholder { color: rgba(255,255,255,0.3); }

button {
  background: #FF8A1F;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

button:hover { background: #E07210; transform: scale(1.04); }

.result {
  font-size: 1.1rem;
  font-weight: bold;
  color: #7C5CBF;
  min-height: 30px;
  transition: all 0.3s;
}`,
      js: `function greet() {
  const input = document.getElementById('nameInput');
  const result = document.getElementById('result');
  const name = input.value.trim();

  if (!name) {
    result.textContent = '⚠️ Tulis namamu dulu ya!';
    result.style.color = '#ef4444';
    return;
  }

  const greetings = [
    '🎉 Halo, ' + name + '! Selamat datang!',
    '👋 Hai ' + name + '! Semangat belajar!',
    '🚀 ' + name + ' siap jadi developer handal!',
  ];

  const random = greetings[Math.floor(Math.random() * greetings.length)];
  result.textContent = random;
  result.style.color = '#FF8A1F';

  input.value = '';
  input.focus();
}

// Tekan Enter untuk submit
document.getElementById('nameInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') greet();
});`,
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Playground() {
  const playgroundRef = useRef<PlaygroundRef>(null);
  const [openExample, setOpenExample] = useState<string | null>(null);
  const editorSectionRef = useRef<HTMLDivElement>(null);

  const handleTryExample = (example: CodeExample) => {
    playgroundRef.current?.inject({
      html: example.code.html,
      css: example.code.css,
      js: example.code.js,
      tab: example.primaryTab,
    });
    editorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* ─── Hero Section ───────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0F0E17] via-[#1a1830] to-purple-dark overflow-hidden">

        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(124,92,191,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-300 mb-8 text-sm"
          >
            <ArrowLeft size={15} />
            Kembali ke Beranda
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange/15 border border-orange/25 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                <span className="text-orange text-xs font-bold tracking-wide uppercase">Live Code Editor</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Tulis Kode,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-dark">
                  Lihat Hasilnya Instan
                </span>
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-md">
                Eksperimen HTML, CSS, dan JavaScript langsung di browser — tanpa install apapun. Ruang aman untuk belajar dan mencoba.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "HTML", color: "text-red-400 border-red-400/30 bg-red-400/8" },
                  { label: "CSS", color: "text-blue-400 border-blue-400/30 bg-blue-400/8" },
                  { label: "JavaScript", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/8" },
                ].map((lang) => (
                  <span
                    key={lang.label}
                    className={`text-xs font-bold px-4 py-1.5 rounded-full border font-mono ${lang.color}`}
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: visual mini preview */}
            <div className="hidden lg:flex justify-end">
              <div
                className="w-full max-w-sm rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(124,92,191,0.3)",
                  boxShadow: "0 0 40px rgba(75,46,131,0.2), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                {/* Mini editor chrome */}
                <div className="bg-[#16162A] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-white/25 text-xs font-mono ml-2">index.html</span>
                </div>
                {/* Mini code preview */}
                <div className="bg-[#1E1E2E] px-5 py-4 font-mono text-xs leading-6">
                  <div><span className="text-purple-light">&lt;div</span> <span className="text-blue-400">class</span>=<span className="text-green-400">"card"</span><span className="text-purple-light">&gt;</span></div>
                  <div className="pl-4"><span className="text-purple-light">&lt;h1&gt;</span><span className="text-white/70">Halo Dunia! 👋</span><span className="text-purple-light">&lt;/h1&gt;</span></div>
                  <div className="pl-4"><span className="text-purple-light">&lt;button&gt;</span><span className="text-white/70">Klik Saya</span><span className="text-purple-light">&lt;/button&gt;</span></div>
                  <div><span className="text-purple-light">&lt;/div&gt;</span></div>
                  <div className="mt-2 text-white/20">// Ubah ini dan tekan ▶ Jalankan!</div>
                </div>
                <div className="bg-[#16162A] px-4 py-2.5 flex items-center gap-2 border-t border-white/5">
                  <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  <span className="text-orange text-xs font-bold">Live Preview Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Playground Editor ───────────────────────────────────────────── */}
      <div ref={editorSectionRef} style={{ scrollMarginTop: "64px" }}>
        <InteractivePlayground ref={playgroundRef} />
      </div>

      {/* ─── How To Use Section ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-lavender">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block bg-purple/10 text-purple text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Panduan
            </span>
            <h2 className="text-3xl font-bold text-purple mb-3">
              Cara Menggunakan Playground
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Empat langkah sederhana untuk mulai eksperimen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howToSteps.map((step, idx) => (
              <div key={step.number} className="relative">
                {/* Connector line on desktop */}
                {idx < howToSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-10px)] w-9 h-px bg-purple/20 z-10" />
                )}
                <div className="bg-white rounded-2xl p-6 border border-purple/8 hover:border-purple/20 hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl font-bold text-purple/20 font-mono leading-none">{step.number}</span>
                  </div>
                  <h3 className="font-bold text-purple mb-2 text-sm">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Code Examples Section ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <span className="inline-block bg-orange/10 text-orange text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Contoh Kode
            </span>
            <h2 className="text-3xl font-bold text-purple mb-3">
              Mulai dari Sini
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Pilih contoh, lihat kodenya, lalu langsung coba di playground — satu klik.
            </p>
          </div>

          <div className="space-y-4">
            {codeExamples.map((ex) => {
              const isOpen = openExample === ex.id;
              const displayCode = ex.primaryTab === "js" ? ex.code.js : ex.primaryTab === "css" ? ex.code.css : ex.code.html;
              return (
                <div
                  key={ex.id}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-purple/25 shadow-card-hover" : "border-purple/8 hover:border-purple/18 hover:shadow-card"
                  }`}
                >
                  {/* Header */}
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 bg-lavender hover:bg-lavender-dark transition-colors duration-200 text-left"
                    onClick={() => setOpenExample(isOpen ? null : ex.id)}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border font-mono ${ex.tagColor}`}>
                        {ex.tag}
                      </span>
                      <div>
                        <h3 className="font-bold text-purple text-base">{ex.title}</h3>
                        <p className="text-gray-500 text-sm mt-0.5">{ex.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-purple/40 flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expandable content */}
                  {isOpen && (
                    <div className="animate-slide-down">
                      {/* Goal */}
                      <div className="px-6 py-3 bg-orange/5 border-y border-orange/10 flex items-center gap-2">
                        <span className="text-orange text-sm">🎯</span>
                        <span className="text-sm text-gray-600">{ex.goal}</span>
                      </div>

                      {/* Code block */}
                      <div className="relative">
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-gray-950 border-b border-white/5">
                          <span className={`w-1.5 h-1.5 rounded-full ${ex.tag === "HTML" ? "bg-red-400" : ex.tag === "CSS" ? "bg-blue-400" : "bg-yellow-400"}`} />
                          <span className="text-white/30 text-xs font-mono">{ex.primaryTab === "js" ? "script.js" : ex.primaryTab === "css" ? "style.css" : "index.html"}</span>
                        </div>
                        <pre className="bg-gray-950 text-green-300 px-6 py-5 overflow-x-auto text-xs font-mono leading-6 code-scroll max-h-64">
                          {displayCode}
                        </pre>
                      </div>

                      {/* CTA */}
                      <div className="px-6 py-4 bg-lavender flex items-center justify-between flex-wrap gap-3">
                        <p className="text-sm text-gray-500">Kode sudah siap — coba sekarang!</p>
                        <button
                          onClick={() => handleTryExample(ex)}
                          className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-orange-glow"
                        >
                          Coba di Playground
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#0F0E17] via-purple-dark to-[#1a1830] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(124,92,191,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto max-w-2xl text-center relative">
          <div className="inline-flex items-center gap-2 bg-orange/15 border border-orange/25 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={13} className="text-orange" />
            <span className="text-orange text-xs font-bold uppercase tracking-wide">Langkah Berikutnya</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Sudah Seru Bereksperimen?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-dark">
              Sekarang Belajar Lebih Serius.
            </span>
          </h2>

          <p className="text-white/55 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Playground adalah awalnya. Pelajari HTML dari nol dengan materi terstruktur, latihan interaktif, dan panduan yang mudah diikuti.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 text-base shadow-orange-glow"
            >
              Mulai Belajar HTML
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/komunitas"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-base"
            >
              Bergabung Komunitas
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}