import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Zap, Users, Trophy, Code2, Layers, Smartphone, BookOpen } from "lucide-react";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

export default function Index() {
  const [previewTab, setPreviewTab] = useState<"html" | "css" | "js">("html");

  return (
    <div className="min-h-screen bg-white pt-16">

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-lavender via-white to-orange/5">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT: Text content */}
            <div className="space-y-6 animate-fade-in">
              {/* Pre-headline badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-purple/20 rounded-full px-4 py-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                <span className="text-sm font-semibold text-purple">Terasnya Para Calon Programmer </span>
              </div>

              {/* Main headline */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-4">
                  <span className="text-purple">Belajar Coding</span>
                  <br />
                  <span className="relative">
                    <span className="bg-gradient-to-r from-orange to-orange-dark bg-clip-text text-transparent">
                      Jadi Lebih Seru!
                    </span>
                    {/* Underline accent */}
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                      <path d="M2 9C50 3 150 1 298 9" stroke="#FF8A1F" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed max-w-lg mt-6">
                  Pelajari HTML, CSS, dan JavaScript dari nol melalui latihan interaktif dan project sederhana yang mudah dipahami.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    document.getElementById("roadmap")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-orange hover:bg-orange-dark text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-orange-glow hover:shadow-lg text-base"
                >
                  Mulai Belajar Gratis
                  <ArrowRight size={20} />
                </button>
                
                <Link
                  to="/playground"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-purple text-purple font-bold px-8 py-4 rounded-xl hover:bg-purple hover:text-white transition-all duration-300 text-base"
                >
                  <Play size={18} />
                  Lihat Demo Playground
                </Link>
              </div>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-purple/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center">
                    <BookOpen size={18} className="text-orange" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple leading-none">20+</p>
                    <p className="text-xs text-gray-500">Latihan Soal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple/10 rounded-xl flex items-center justify-center">
                    <Trophy size={18} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple leading-none">3</p>
                    <p className="text-xs text-gray-500">Level Pembelajaran</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Zap size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-purple leading-none">Live</p>
                    <p className="text-xs text-gray-500">Interactive Playground</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Floating illustration */}
            <div className="relative flex items-center justify-center min-h-[420px] animate-fade-in">

              {/* Central browser mockup */}
              <div className="relative w-72 bg-white rounded-2xl shadow-2xl border border-purple/10 z-10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 rounded-t-2xl border-b border-gray-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="ml-2 flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-400 border border-gray-200">
                    localhost:3000
                  </div>
                </div>
                {/* Browser content */}
                <div className="p-4 font-mono text-xs space-y-1 bg-gray-950 rounded-b-2xl text-green-400 min-h-[140px]">
                  <p className="text-gray-500">{"<!-- My first website -->"}</p>
                  <p><span className="text-purple-300">{"<h1>"}</span><span className="text-white"> Halo, Dunia! 👋</span><span className="text-purple-300">{"</h1>"}</span></p>
                  <p><span className="text-blue-300">{"<style>"}</span></p>
                  <p className="pl-2"><span className="text-orange-300">color</span><span className="text-white">: #FF8A1F;</span></p>
                  <p><span className="text-blue-300">{"</style>"}</span></p>
                  <p><span className="text-yellow-300">{"<script>"}</span></p>
                  <p className="pl-2 text-green-300">{"alert('Berhasil! 🎉')"}</p>
                  <p><span className="text-yellow-300">{"</script>"}</span></p>
                  <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5 -mb-1" />
                </div>
              </div>

              {/* Floating HTML card */}
              <div
                className="absolute top-6 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-red-100 animate-float z-20"
                style={{ animationDelay: "0s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center"><img src="/htmlicon.svg" alt="HTML" className="w-6 h-6 object-contain" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">HTML</p>
                    <p className="text-xs text-gray-400">Level 1</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="h-1.5 w-8 bg-red-400 rounded-full" />
                  <div className="h-1.5 w-5 bg-red-200 rounded-full" />
                  <div className="h-1.5 w-3 bg-red-100 rounded-full" />
                </div>
              </div>

              {/* Floating CSS card */}
              <div
                className="absolute top-8 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-100 animate-float z-20"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><img src="/cssicon.svg" alt="CSS" className="w-6 h-6 object-contain" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">CSS</p>
                    <p className="text-xs text-gray-400">Level 2</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="h-1.5 w-6 bg-blue-400 rounded-full" />
                  <div className="h-1.5 w-8 bg-blue-200 rounded-full" />
                  <div className="h-1.5 w-4 bg-blue-100 rounded-full" />
                </div>
              </div>

              {/* Floating JS card */}
              <div
                className="absolute -bottom-2 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-yellow-100 animate-float z-20"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center"><img src="/jsicon.svg" alt="JavaScript" className="w-6 h-6 object-contain" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">JavaScript</p>
                    <p className="text-xs text-gray-400">Level 3</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="h-1.5 w-10 bg-yellow-400 rounded-full" />
                  <div className="h-1.5 w-6 bg-yellow-200 rounded-full" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          GAME MAP — JALUR BELAJAR
          Reads dynamically from courseData.ts via RoadmapSection component
      ═══════════════════════════════════════════ */}
      <RoadmapSection />

      {/* ═══════════════════════════════════════════
          PLAYGROUND CTA
      ═══════════════════════════════════════════ */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0F0C1E 0%, #140D26 100%)" }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/4 w-[520px] h-[520px] rounded-full -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(75,46,131,0.11) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-[360px] h-[360px] rounded-full -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(255,138,31,0.07) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,191,0.30), transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,191,0.20), transparent)" }}
          />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div
            className="grid grid-cols-1 lg:grid-cols-1 items-stretch rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 0 0 1px rgba(124,92,191,0.14), 0 40px 80px rgba(0,0,0,0.45), 0 0 60px rgba(75,46,131,0.10)",
            }}
          >

            {/* ══ RIGHT: CTA content ══ */}
            <div
              className="flex flex-col justify-center px-10 py-14 lg:px-14 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, #130D25 0%, #1C1238 100%)" }}
            >
              {/* Decorative glow blobs */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,138,31,0.08) 0%, transparent 70%)",
                  transform: "translate(35%,-35%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(124,92,191,0.10) 0%, transparent 70%)",
                  transform: "translate(-35%,35%)",
                }}
              />

              <div className="relative">

                {/* Tag badge */}
                <div className="inline-flex items-center gap-2 border border-orange/20 bg-orange/8 text-orange text-xs font-bold px-4 py-2 rounded-full mb-7 uppercase tracking-wider">
                  <Zap size={11} />
                  Interactive Playground
                </div>

                {/* Headline */}
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                  <img src="/codingicon.svg" alt="coding" className="inline w-10 h-10 mr-1 object-contain" /> Tulis Kode &amp; Lihat Hasilnya Seketika
                </h2>

                {/* Description */}
                <p className="text-white/45 text-base leading-relaxed mb-9 max-w-sm">
                  Belajar HTML, CSS, dan JavaScript langsung dari browser tanpa perlu instal aplikasi.
                </p>

                {/* CTA */}
                <Link
                  to="/playground"
                  className="inline-flex items-center gap-3 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-base mb-8 w-fit"
                  style={{
                    background: "linear-gradient(135deg, #FF8A1F, #E07210)",
                    boxShadow: "0 4px 24px rgba(255,138,31,0.38), 0 0 0 1px rgba(255,138,31,0.14)",
                  }}
                >
                  <Play size={18} />
                  Buka Playground
                </Link>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "✓ Tanpa Install",
                    "✓ Live Preview",
                    "✓ HTML + CSS + JS",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/8 text-white/35"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FEATURES / WHY US
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">

          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-purple/10 text-purple text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              Keunggulan Kami
            </span>
            <h2 className="text-4xl font-bold text-purple mb-4">
              Mengapa Belajar Bersama Kami?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Kami dirancang khusus untuk pelajar pemula yang ingin belajar coding dengan cara yang menyenangkan.
            </p>
          </div>

          {/* ── Bento grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* ╔══════════════════════════════╗
                ║  Card 1 — LARGE (2×2)        ║
                ║  Belajar Sambil Ngoding       ║
                ╚══════════════════════════════╝ */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 relative bg-gradient-to-br from-lavender via-white to-purple/[0.03] rounded-3xl p-8 border border-purple/10 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple/[0.04] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

              <div className="relative flex-1">
                {/* Icon */}
                <div className="w-14 h-14 bg-purple rounded-2xl flex items-center justify-center mb-6 shadow-purple-glow group-hover:scale-105 transition-transform duration-300">
                  <Code2 size={26} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple mb-3 leading-snug">
                  Belajar Sambil Ngoding
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-md">
                  Pelajari HTML, CSS, dan JavaScript lewat latihan dan mini project interaktif.
                </p>
              </div>

              {/* Code block decoration */}
              <div className="relative mt-8 bg-gray-950 rounded-2xl p-5 font-mono text-xs leading-relaxed overflow-hidden">
                {/* Decorative glow inside code block */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-purple/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-gray-600 text-[10px] font-sans">index.html</span>
                </div>
                <p className="text-gray-600">{"<!-- Halaman pertamaku -->"}</p>
                <p>
                  <span className="text-purple-300">{"<h1>"}</span>
                  <span className="text-white"> Halo, Dunia! </span>
                  <span className="text-purple-300">{"</h1>"}</span>
                </p>
                <p>
                  <span className="text-blue-300">{"<p "}</span>
                  <span className="text-yellow-200">style</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-300">"color:#FF8A1F"</span>
                  <span className="text-blue-300">{">"}</span>
                  <span className="text-white"> Aku suka coding!</span>
                  <span className="text-blue-300">{"</p>"}</span>
                </p>
                <span className="inline-block w-[7px] h-3.5 bg-green-400 animate-pulse ml-0.5 -mb-0.5 rounded-sm" />
              </div>
            </div>

            {/* ╔═════════════════════════╗
                ║  Card 2 — MEDIUM        ║
                ║  Playground Interaktif  ║
                ╚═════════════════════════╝ */}
            <div className="relative bg-gradient-to-br from-orange/[0.08] via-orange/[0.04] to-white rounded-3xl p-6 border border-orange/[0.15] hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-orange/[0.07] rounded-full pointer-events-none" />

              <div className="relative flex-1">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center mb-4 shadow-orange-glow group-hover:scale-105 transition-transform duration-300">
                  <Play size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple mb-2">Playground Interaktif</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Tulis kode langsung di browser dan lihat hasilnya secara real-time.
                </p>
              </div>

              {/* Live indicator */}
              <div className="relative mt-5 flex items-center gap-2 pt-4 border-t border-orange/[0.12]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-xs font-semibold text-emerald-600">Live Preview aktif</span>
              </div>
            </div>

            {/* ╔════════════════════════╗
                ║  Card 3 — SMALL        ║
                ║  Naik Level Codingmu   ║
                ╚════════════════════════╝ */}
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-purple/[0.15] hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-11 h-11 bg-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange/15 transition-colors duration-300">
                <Zap size={20} className="text-orange" />
              </div>
              <h3 className="text-base font-bold text-purple mb-1.5">Naik Level Codingmu</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Tingkatkan skill coding kamu dan buka level baru saat menyelesaikan setiap materi.
              </p>
              <div className="mt-4 flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-purple bg-purple/8 px-2.5 py-1 rounded-full">Level Up 🏆</span>
              </div>
            </div>

            {/* ╔══════════════════════════════╗
                ║  Card 4 — SMALL              ║
                ║  Jalur Belajar Terstruktur   ║
                ╚══════════════════════════════╝ */}
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-purple/[0.15] hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-11 h-11 bg-purple/[0.08] rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple/[0.12] transition-colors duration-300">
                <Layers size={20} className="text-purple" />
              </div>
              <h3 className="text-base font-bold text-purple mb-1.5">Jalur Belajar Terstruktur</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Ikuti perjalanan belajar dari HTML hingga JavaScript secara bertahap.
              </p>
              {/* Progress steps */}
              <div className="mt-4 flex items-center gap-1.5">
                {["HTML", "CSS", "JS"].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold bg-lavender text-purple px-2 py-0.5 rounded-full">{step}</span>
                    {i < 2 && <span className="text-gray-300 text-xs font-bold">›</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* ╔═══════════════════════╗
                ║  Card 5 — SMALL       ║
                ║  Belajar di Mana Saja ║
                ╚═══════════════════════╝ */}
            <div className="relative bg-white rounded-3xl p-6 border border-gray-100 hover:border-purple/[0.15] hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors duration-300">
                <Smartphone size={20} className="text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-purple mb-1.5">Belajar di Mana Saja</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Akses materi dari laptop, tablet, atau HP kapan saja.
              </p>
            </div>

            {/* ╔═════════════════════════╗
                ║  Card 6 — SMALL         ║
                ║  Belajar Tanpa Bingung   ║
                ╚═════════════════════════╝ */}
            <div className="relative bg-lavender rounded-3xl p-6 border border-purple/[0.08] hover:border-purple/20 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:shadow transition-shadow duration-300">
                <BookOpen size={20} className="text-purple" />
              </div>
              <h3 className="text-base font-bold text-purple mb-1.5">Belajar Tanpa Bingung</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Penjelasan sederhana dan ramah untuk pelajar yang baru mulai coding.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}