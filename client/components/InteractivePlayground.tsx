import { useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle, useMemo } from "react";
import { Play, Copy, RotateCcw, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";

type TabType = "html" | "css" | "js";

export interface PlaygroundRef {
  inject: (code: { html?: string; css?: string; js?: string; tab?: TabType }) => void;
}

const DEFAULT_HTML = `<div class="card">
  <div class="badge">✨ TerasCoding Playground</div>
  <h1>Halo, Pelajar! 👋</h1>
  <p>Ruang eksperimenmu sudah siap.<br>Ubah kode di kiri, lalu klik <b>Jalankan Kode</b>.</p>
  <button onclick="handleClick()">Coba Klik! 🎉</button>
  <p class="hint">💡 Ganti teks apapun dan lihat perubahannya!</p>
</div>`;

const DEFAULT_CSS = `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0e17, #1a1830, #4B2E83);
}

.card {
  text-align: center;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  padding: 40px 36px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  max-width: 360px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

.badge {
  display: inline-block;
  background: rgba(255, 138, 31, 0.2);
  color: #FF8A1F;
  border: 1px solid rgba(255, 138, 31, 0.35);
  padding: 5px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

h1 {
  color: white;
  font-size: 1.75rem;
  margin-bottom: 12px;
  line-height: 1.2;
}

p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 24px;
}

button {
  background: linear-gradient(135deg, #FF8A1F, #E07210);
  color: white;
  border: none;
  padding: 13px 30px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(255, 138, 31, 0.4);
  margin-bottom: 20px;
}

button:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 8px 30px rgba(255, 138, 31, 0.55);
}

.hint {
  color: rgba(255,255,255,0.35);
  font-size: 12px;
  margin-bottom: 0;
}`;

const DEFAULT_JS = `function handleClick() {
  const btn = document.querySelector('button');
  const card = document.querySelector('.card');

  btn.textContent = '🎊 Berhasil!';
  btn.style.background = 'linear-gradient(135deg, #4B2E83, #7C5CBF)';
  card.style.border = '1px solid rgba(255,138,31,0.5)';
  card.style.boxShadow = '0 0 40px rgba(255,138,31,0.15), 0 20px 60px rgba(0,0,0,0.4)';

  setTimeout(() => {
    btn.textContent = 'Coba Klik! 🎉';
    btn.style.background = 'linear-gradient(135deg, #FF8A1F, #E07210)';
    card.style.border = '1px solid rgba(255,255,255,0.12)';
    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
  }, 2000);
}`;

const tabs: { id: TabType; label: string; dot: string; activeClass: string }[] = [
  { id: "html", label: "HTML", dot: "bg-red-400", activeClass: "text-red-400 border-red-400 bg-[#1E1E2E]" },
  { id: "css", label: "CSS", dot: "bg-blue-400", activeClass: "text-blue-400 border-blue-400 bg-[#1E1E2E]" },
  { id: "js", label: "JS", dot: "bg-yellow-400", activeClass: "text-yellow-400 border-yellow-400 bg-[#1E1E2E]" },
];

function LineNumbers({ code, scrollRef }: { code: string; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const lines = code.split("\n");
  return (
    <div
      ref={scrollRef}
      className="select-none text-right pr-3 pt-4 pb-4 text-white/20 font-mono text-xs leading-6 overflow-hidden pointer-events-none border-r border-white/5"
      style={{ minWidth: "44px" }}
    >
      {lines.map((_, i) => (
        <div key={i} className="leading-6">{i + 1}</div>
      ))}
    </div>
  );
}

const FaviconIcon = ({ href, hasTag }: { href: string | null; hasTag: boolean }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [href, hasTag]);

  if (!hasTag) return null;

  if (href && href.trim() !== "" && !error) {
    return (
      <img
        src={href}
        alt=""
        className="w-3.5 h-3.5 object-contain rounded-sm"
        onError={() => setError(true)}
      />
    );
  }

  return <span className="text-xs select-none">🌐</span>;
};

export interface InteractivePlaygroundProps {
  minimal?: boolean;
  defaultCode?: { html?: string; css?: string; js?: string };
}

const InteractivePlayground = forwardRef<PlaygroundRef, InteractivePlaygroundProps>(({ minimal, defaultCode }, ref) => {
  const [activeTab, setActiveTab] = useState<TabType>("html");
  const [htmlCode, setHtmlCode] = useState(defaultCode?.html ?? DEFAULT_HTML);
  const [cssCode, setCssCode] = useState(defaultCode?.css ?? DEFAULT_CSS);
  const [jsCode, setJsCode] = useState(defaultCode?.js ?? DEFAULT_JS);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });
  const [isRunning, setIsRunning] = useState(false);

  // Parse title and favicon in real-time from htmlCode
  const { pageTitle, pageFavicon, hasFaviconTag } = useMemo(() => {
    if (typeof window === "undefined") {
      return { pageTitle: "Untitled Page", pageFavicon: null, hasFaviconTag: false };
    }
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, "text/html");
      
      const titleEl = doc.querySelector("title");
      const titleText = titleEl ? titleEl.textContent?.trim() : "";
      
      const iconEl = doc.querySelector("link[rel*='icon']");
      const hasFavicon = !!iconEl;
      const iconHref = iconEl ? iconEl.getAttribute("href")?.trim() : null;
      
      return {
        pageTitle: titleText || "Untitled Page",
        pageFavicon: iconHref || null,
        hasFaviconTag: hasFavicon,
      };
    } catch (e) {
      return { pageTitle: "Untitled Page", pageFavicon: null, hasFaviconTag: false };
    }
  }, [htmlCode]);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const currentCode = activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode;

  const setCurrentCode = (value: string) => {
    if (activeTab === "html") setHtmlCode(value);
    else if (activeTab === "css") setCssCode(value);
    else setJsCode(value);
  };

  const buildDocument = useCallback(
    (h = htmlCode, c = cssCode, j = jsCode) => `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>${c}</style>
</head>
<body>
${h}
<script>${j}<\/script>
</body>
</html>`,
    [htmlCode, cssCode, jsCode]
  );

  const runCode = useCallback(
    (h?: string, c?: string, j?: string) => {
      setIsRunning(true);
      try {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) {
          setStatus({ type: "error", message: "Preview tidak tersedia" });
          return;
        }
        doc.open();
        doc.write(buildDocument(h ?? htmlCode, c ?? cssCode, j ?? jsCode));
        doc.close();
        setStatus({ type: "success", message: "Kode berhasil dijalankan!" });
      } catch {
        setStatus({ type: "error", message: "Ada kesalahan dalam kode." });
      }
      setTimeout(() => {
        setStatus({ type: null, message: "" });
        setIsRunning(false);
      }, 2500);
    },
    [buildDocument, htmlCode, cssCode, jsCode]
  );

  const handleReset = () => {
    const resetH = defaultCode?.html ?? DEFAULT_HTML;
    const resetC = defaultCode?.css ?? DEFAULT_CSS;
    const resetJ = defaultCode?.js ?? DEFAULT_JS;
    setHtmlCode(resetH);
    setCssCode(resetC);
    setJsCode(resetJ);
    setStatus({ type: null, message: "" });
    setTimeout(() => runCode(resetH, resetC, resetJ), 50);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setStatus({ type: "success", message: `Kode ${activeTab.toUpperCase()} disalin!` });
    setTimeout(() => setStatus({ type: null, message: "" }), 2000);
  };

  const handleScroll = () => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => runCode(), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = currentCode.substring(0, start) + "  " + currentCode.substring(end);
      setCurrentCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Expose inject method via ref
  useImperativeHandle(ref, () => ({
    inject: ({ html, css, js, tab }) => {
      if (html !== undefined) setHtmlCode(html);
      if (css !== undefined) setCssCode(css);
      if (js !== undefined) setJsCode(js);
      if (tab) setActiveTab(tab);
      const newH = html ?? htmlCode;
      const newC = css ?? cssCode;
      const newJ = js ?? jsCode;
      setTimeout(() => runCode(newH, newC, newJ), 80);
    },
  }));

  const quickSnippets = [
    {
      label: "HTML Box",
      tab: "html" as TabType,
      code: '\n<div style="padding:16px;background:#F7F3FF;border-radius:12px;border:2px solid #4B2E83;color:#4B2E83;font-weight:bold;margin-top:12px;">Elemen Baru! 🎨</div>',
    },
    {
      label: "CSS Glow",
      tab: "css" as TabType,
      code: "\n.card {\n  box-shadow: 0 0 40px rgba(255,138,31,0.3);\n}",
    },
    {
      label: "JS Log",
      tab: "js" as TabType,
      code: "\nconsole.log('Halo dari JavaScript! 🚀');",
    },
  ];

  const editorBody = (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{
        border: "1px solid rgba(124, 92, 191, 0.35)",
        boxShadow: "0 0 0 1px rgba(124,92,191,0.15), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(75,46,131,0.12)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ═══ EDITOR PANEL ═══ */}
        <div className={`flex flex-col bg-[#1E1E2E] border-r border-white/5 ${minimal ? "min-h-[360px]" : "min-h-[500px]"}`}>

          {/* Top bar — VS Code style */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#16162A] border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-white/25 text-xs font-mono">index.html — TerasCoding Editor</span>
            </div>
            <button
              onClick={handleCopy}
              title="Salin kode"
              className="text-white/25 hover:text-white/70 transition-colors p-1 rounded hover:bg-white/5"
            >
              <Copy size={13} />
            </button>
          </div>

          {/* Language tabs */}
          <div className="flex items-end bg-[#16162A] border-b border-white/5 px-2 pt-1.5 gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold font-mono rounded-t-lg transition-all duration-200 border-t-2 border-x border-b-0 ${
                  activeTab === tab.id
                    ? `${tab.activeClass} border-x-white/5`
                    : "bg-transparent text-white/30 border-transparent hover:text-white/50 hover:bg-white/4"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tab.dot} ${activeTab === tab.id ? "opacity-100" : "opacity-40"}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Code area with line numbers */}
          <div className="flex flex-1 overflow-hidden">
            <LineNumbers code={currentCode} scrollRef={lineNumRef} />
            <textarea
              ref={textareaRef}
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              className="flex-1 p-4 font-mono text-xs leading-6 bg-[#1E1E2E] text-green-300 focus:outline-none resize-none code-scroll border-none caret-orange"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              placeholder="// Tulis kode kamu di sini..."
            />
          </div>

          {/* Bottom toolbar */}
          <div className="px-4 py-3 bg-[#16162A] border-t border-white/5 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => runCode()}
              disabled={isRunning}
              className="flex items-center gap-2 bg-orange hover:bg-orange-dark disabled:opacity-70 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-orange-glow"
            >
              <Play size={15} className={isRunning ? "animate-pulse" : ""} />
              Jalankan Kode
            </button>
            <button
              onClick={handleReset}
              title="Reset ke contoh awal"
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all border border-white/15 hover:border-white/30"
            >
              <RotateCcw size={13} />
              Reset
            </button>

            {status.type && (
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg animate-slide-up ml-auto ${
                  status.type === "success"
                    ? "bg-emerald-900/50 text-emerald-400"
                    : "bg-red-900/50 text-red-400"
                }`}
              >
                {status.type === "success" ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {status.message}
              </div>
            )}
          </div>
        </div>

        {/* ═══ PREVIEW PANEL ═══ */}
        <div className="flex flex-col bg-[#16162A]">

          {/* Browser Header */}
          <div className="flex items-center justify-between px-4 bg-[#0F0E17] border-b border-white/5 select-none h-11">
            <div className="flex items-center gap-3 h-full">
              {/* Window controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>

              {/* Tab */}
              <div className="flex items-center gap-2 bg-[#16162A] text-white/90 text-xs px-4 h-8 rounded-t-lg border-t border-x border-white/5 translate-y-[6px] flex-shrink-0">
                <FaviconIcon href={pageFavicon} hasTag={hasFaviconTag} />
                <span className="font-medium truncate max-w-[140px] sm:max-w-[200px]">
                  {pageTitle}
                </span>
              </div>
            </div>

            {/* Live status */}
            <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-semibold tracking-widest uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
              Live
            </div>
          </div>

          {/* iframe */}
          <div className="flex-1 bg-white overflow-hidden" style={{ minHeight: minimal ? "300px" : "420px" }}>
            <iframe
              ref={iframeRef}
              className="w-full h-full border-none bg-white"
              title="Code Preview"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div className="w-full">
        {editorBody}
      </div>
    );
  }

  return (
    <section id="playground-editor" className="py-16 bg-gradient-to-b from-[#0F0E17] to-[#1a1830]">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-white/40 text-xs font-semibold uppercase tracking-widest font-mono">Editor Langsung</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {editorBody}

        {/* Quick snippets */}
        <div className="mt-5 p-4 bg-white/4 rounded-xl border border-white/8 flex flex-wrap items-center gap-3">
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest font-mono flex-shrink-0 flex items-center">
            <img src="/jsicon.svg" alt="JS" className="w-4 h-4 mr-1 object-contain" />
            Snippet Cepat:
          </span>
          {quickSnippets.map((snippet) => (
            <button
              key={snippet.label}
              onClick={() => {
                setActiveTab(snippet.tab);
                if (snippet.tab === "html") setHtmlCode((p) => p + snippet.code);
                else if (snippet.tab === "css") setCssCode((p) => p + snippet.code);
                else setJsCode((p) => p + snippet.code);
              }}
              className="flex items-center gap-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/60 hover:text-white px-3.5 py-2 rounded-lg font-medium transition-all duration-200"
            >
              {snippet.label}
              <ChevronRight size={11} className="opacity-50" />
            </button>
          ))}
        </div>

        {/* Beginner hint */}
        <div className="mt-4 px-5 py-4 bg-purple/10 rounded-xl border-l-4 border-purple-light flex items-start gap-3">
          <span className="text-purple-light text-base flex-shrink-0 mt-0.5"><img src="/tipsicon.svg" alt="XP" className="inline w-7 h-7 object-contain" /></span>
          <p className="text-sm text-white/60 leading-relaxed">
            <strong className="text-purple-light">Cara pakai:</strong> Pilih tab{" "}
            <span className="font-mono text-red-400 bg-white/5 px-1.5 py-0.5 rounded text-xs">HTML</span>,{" "}
            <span className="font-mono text-blue-400 bg-white/5 px-1.5 py-0.5 rounded text-xs">CSS</span>, atau{" "}
            <span className="font-mono text-yellow-400 bg-white/5 px-1.5 py-0.5 rounded text-xs">JS</span>{" "}
            → tulis atau ubah kode → klik{" "}
            <span className="bg-orange/20 text-orange px-1.5 py-0.5 rounded font-semibold text-xs">Jalankan Kode</span>{" "}
            untuk melihat hasilnya. Tekan <kbd className="bg-white/8 text-white/50 px-1.5 py-0.5 rounded text-xs font-mono">Tab</kbd> untuk indentasi.
          </p>
        </div>
      </div>
    </section>
  );
});

InteractivePlayground.displayName = "InteractivePlayground";

export default InteractivePlayground;