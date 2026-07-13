import {
  LucideIcon,
  // HTML topic icons
  Code2,
  Type,
  Link2,
  List,
  FormInput,
  Layout,
  // CSS topic icons
  Palette,
  Layers,
  LayoutGrid,
  Smartphone,
  Zap,
  // JS topic icons
  Hash,
  Monitor,
  MousePointer,
  Globe,
  GitBranch,
  // Shared stat badge icons
  BookOpen,
  Trophy,
  Target,
  MonitorSmartphone,
} from "lucide-react";

// ─── Base types ───────────────────────────────────────────────────────────────

export interface LearningTopic {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}

export interface StatBadge {
  icon: LucideIcon;
  label: string;
  color: string;
  bg: string;
}

export interface CodeToken {
  text: string;
  colorClass: string;
}

export interface CodePreviewLine {
  indent: 0 | 1 | 2 | 3;
  tokens: CodeToken[];
}

export interface LessonSection {
  heading?: string;
  paragraphs: string[];
}

export interface LessonContent {
  explanation?: string[];
  sections?: LessonSection[];
  tip?: string;
  note?: string;
  warning?: string;
  exampleCode: {
    html: string;
    css: string;
    js: string;
  };
  starterCode: {
    html: string;
    css: string;
    js: string;
  };
  challenge?: {
    title: string;
    description: string;
    checklist: string[];
  };
}

export interface CurriculumLesson {
  name: string;
  content?: LessonContent;
}

export interface CurriculumSection {
  title: string;
  icon: string;
  lessons: CurriculumLesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "Pemula" | "Menengah" | "Mahir";
  language: "HTML" | "CSS" | "JavaScript";
  fullDescription?: string;
  lessons?: number;
  rating?: number;
  students?: number;
  order?: number;
  topics?: string[];
  color?: string;
  xp: number;
  heroDescription: string;
  statBadges: StatBadge[];
  codePreviewFile: string;
  codePreview: CodePreviewLine[];
  learningTopics: LearningTopic[];
  curriculum: CurriculumSection[];
  ctaSubtitle: string;
  ctaAudience: string[];
  /**
   * High-level topic list shown on the Frontend Learning Path page.
   * Kept here so courseData.ts stays the single source of truth.
   * Future lesson metadata (id, slug, duration, xp) can be added per item.
   */
  curriculumPreview?: string[];
}

// ─── Course data ──────────────────────────────────────────────────────────────

export const courses: Course[] = [
  // ── HTML ──────────────────────────────────────────────────────────────────
  {
    id: "html-level-1",
    title: "HTML Fundamentals",
    description:
      "Pelajari dasar membuat struktur website menggunakan HTML sederhana.",
    thumbnail: "",
    level: "Pemula",
    language: "HTML",
    fullDescription:
      "Mulai perjalanan coding-mu dari sini! Pelajari cara membangun struktur website dari nol menggunakan HTML. Kamu akan belajar membuat heading, paragraf, link, gambar, tabel, dan form dasar.",
    lessons: 8,
    rating: 4.9,
    students: 3200,
    order: 1,
    topics: ["Heading & Paragraph", "Link & Image", "List", "Table", "Basic Form"],
    color: "#E8471A",

    xp: 100,
    heroDescription:
      "Mulai perjalanan coding pertamamu dan pelajari cara membangun website dari nol menggunakan HTML.",

    statBadges: [
      {
        icon: BookOpen,
        label: "8 Materi",
        color: "text-blue-300",
        bg: "bg-blue-500/15 border-blue-400/20",
      },
      {
        icon: Trophy,
        label: "+100 XP",
        color: "text-yellow-300",
        bg: "bg-yellow-500/15 border-yellow-400/20",
      },
      {
        icon: Target,
        label: "Beginner Friendly",
        color: "text-green-300",
        bg: "bg-green-500/15 border-green-400/20",
      },
      {
        icon: MonitorSmartphone,
        label: "Mini Project",
        color: "text-orange-400",
        bg: "bg-orange-500/15 border-orange-400/20",
      },
    ],

    codePreviewFile: "index.html",
    codePreview: [
      { indent: 0, tokens: [{ text: "<html>", colorClass: "text-purple-300" }] },
      { indent: 1, tokens: [{ text: "<body>", colorClass: "text-blue-300" }] },
      {
        indent: 2,
        tokens: [
          { text: "<h1>", colorClass: "text-orange-400" },
          { text: "Hello, World!", colorClass: "text-white/70" },
          { text: "</h1>", colorClass: "text-orange-400" },
        ],
      },
      { indent: 1, tokens: [{ text: "</body>", colorClass: "text-blue-300" }] },
      { indent: 0, tokens: [{ text: "</html>", colorClass: "text-purple-300" }] },
    ],

    learningTopics: [
      {
        icon: Code2,
        color: "bg-blue-50 text-blue-600",
        title: "Struktur Dasar HTML",
        desc: "Pelajari struktur dasar halaman web dan tag HTML pertama.",
      },
      {
        icon: Type,
        color: "bg-orange-50 text-orange-500",
        title: "Heading & Paragraph",
        desc: "Belajar membuat judul, teks, dan format konten.",
      },
      {
        icon: Link2,
        color: "bg-purple-50 text-purple-600",
        title: "Link & Gambar",
        desc: "Tambahkan navigasi dan media ke website.",
      },
      {
        icon: List,
        color: "bg-green-50 text-green-600",
        title: "List & Table",
        desc: "Membuat daftar terurut dan tabel sederhana.",
      },
      {
        icon: FormInput,
        color: "bg-rose-50 text-rose-500",
        title: "Form HTML Dasar",
        desc: "Belajar input, tombol, dan formulir sederhana.",
      },
      {
        icon: Layout,
        color: "bg-teal-50 text-teal-600",
        title: "Semantic HTML",
        desc: "Memahami struktur website yang lebih rapi dan modern.",
      },
    ],

    curriculum: [
      {
        title: "Pengenalan HTML",
        icon: "/htmlicon.svg",
        lessons: [
          {
            name: "Apa itu HTML?",
            content: {
              sections: [
                {
              
                  paragraphs: [
                    "Materi ini adalah langkah pertamamu di TerasCoding untuk mulai membuat website. Kita akan berkenalan dengan HTML, bahasa standar yang digunakan untuk membangun kerangka dasar dari setiap halaman web di internet."
                  ]
                },
                {
                  heading: "Mengenal HTML",
                  paragraphs: [
                    "Bayangkan kamu sedang membangun sebuah rumah. \n \nSebelum kamu mengecat dinding atau menata furnitur, kamu pasti harus membangun pondasi dan kerangka rumahnya terlebih dahulu, bukan? \n \nNah, HTML (HyperText Markup Language) adalah pondasi dan kerangka dasar dari sebuah website."
                  ]
                },
                {
                  heading: "Fungsi Utama HTML",
                  paragraphs: [
                    "HTML bukanlah bahasa pemrograman, melainkan bahasa markup (penanda).\nTugas utamanya adalah memberi tahu browser (seperti Google Chrome, Safari, atau Firefox) tentang struktur halaman webmu.\n\nDengan HTML, kamu memberi tahu browser: \"Ini adalah judul utama\", \"Ini adalah paragraf teks\", atau \"Ini adalah gambar\".",
                    "Setiap halaman website yang kamu kunjungi — dari Google, YouTube, hingga Instagram — semuanya dibangun menggunakan HTML sebagai fondasinya."
                  ]
                },
                {
                  heading: "Cara Menulis HTML",
                  paragraphs: [
                    "HTML menggunakan 'tag' untuk menandai elemen. Tag ditulis di dalam tanda kurung sudut.\n\nTag biasanya berpasangan; ada tag pembuka yang ditulis seperti `<nama-tag>` dan tag penutup yang memiliki garis miring seperti `</nama-tag>`"
                  ]
                }
              ],
              tip: "Biasakan selalu menulis tag penutup </nama-tag> tepat setelah kamu mengetik tag pembukanya <nama-tag>, sebelum kamu mengisi konten di tengahnya. Kebiasaan ini akan sangat membantu mencegah error atau tampilan yang berantakan saat kodemu sudah mulai panjang!",
              note: "Pemula sering mengira HTML adalah bahasa pemrograman yang bisa membuat kalkulasi logika (seperti 1+1=2) atau membuat tombol berfungsi saat diklik. Faktanya, HTML hanya bertugas menyusun tata letak. Untuk memberikan logika dan interaksi, kita akan menggunakan JavaScript di modul selanjutnya.",
              exampleCode: {
                html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Website Pertamaku bersama TerasCoding</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n  <p>Ini adalah halaman web pertamaku.</p>\n</body>\n</html>`,
                css: `body {\n  font-family: Arial, sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  margin: 0;\n  background: linear-gradient(135deg, #F7F3FF, #EDE8FA);\n}\n\nh1 {\n  color: #4B2E83;\n  margin-bottom: 8px;\n}\n\np {\n  color: #64748b;\n  font-size: 1.1rem;\n}`,
                js: "",
              },
              starterCode: {
                html: `<!- Tulis kode HTML pertamamu di sini! ->`,
                css: `body {\n  font-family: Arial, sans-serif;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #F7F3FF;\n}\n\nh1 { color: #4B2E83; }\np { color: #64748b; }`,
                js: "",
              },
              challenge: {
                title: "Tantangan: Halaman Pertamamu",
                description: "Sekarang giliranmu! Buatlah sebuah file HTML sederhana yang berisi perkenalan dirimu.",
                checklist: [
                  "Gunakan tag <h1> untuk judul",
                  "Gunakan tag <p> untuk paragraf",
                  "Tulis minimal 2 paragraf",
                ],
              },
            },
          },
          {
            name: "Struktur dokumen HTML",
            content: {
              sections: [
                {paragraphs:[
                  "Ibarat manusia yang memiliki kerangka tulang penyangga, setiap halaman web juga membutuhkan kerangka utama agar bisa berdiri dan ditampilkan dengan benar. Pada materi ini, kita akan membongkar susunan baku yang wajib kamu tuliskan setiap kali membuat file HTML baru."]},
                {
                  heading: "Membangun Kerangka Dasar",
                  paragraphs: [
                    "Setiap kali kita membuat website, browser (seperti Chrome atau Firefox) membutuhkan panduan baku agar tahu cara membaca kode yang kita tulis. Panduan ini kita sebut sebagai struktur dokumen. Tanpa struktur yang benar, browser akan kebingungan dan tampilan website-mu bisa menjadi berantakan.",
                    "Struktur ini dibentuk dengan merangkai beberapa tag HTML yang saling membungkus satu sama lain, dari luar ke dalam."
                  ]
                },
                {
                  heading: "Tiket Masuk ke HTML5",
                  paragraphs: [
                    "Hal pertama yang harus selalu ditulis di baris paling atas (bahkan sebelum tag HTML apa pun) adalah deklarasi tipe dokumen. Kamu cukup menuliskan `<!DOCTYPE html>`. Anggap saja ini seperti memberikan tiket atau label ke browser yang menyatakan: \"Hei, halaman web ini menggunakan aturan HTML versi paling baru (HTML5) lho!\""
                  ]
                },
                { 
                  heading: "Dua Ruang Utama: Head dan Body",
                  paragraphs: ["Bayangkan struktur dalam tag `<html>` tadi seperti anatomi tubuh manusia. HTML membaginya menjadi dua area utama: \"Kepala\" `<head>` dan \"Badan\" `<body>`.",
                    "Bagian kepala `<head>` bertugas seperti otak; ia menyimpan informasi penting di balik layar yang mengatur halaman web, seperti judul yang muncul di tab browser. Sedangkan bagian badan `<body>` adalah fisik yang terlihat oleh orang lain. Semua hal yang ingin kamu perlihatkan kepada pengunjung web—mulai dari teks, gambar, hingga tombol—wajib diletakkan di dalam `<body>`.",
                  ]
                }
              ],
              tip: "Di code editor modern seperti Visual Studio Code, kamu tidak perlu mengetik kerangka panjang ini satu per satu. Cukup ketik tanda seru **!** lalu tekan tombol **Enter**, maka seluruh struktur dokumen HTML akan dibuatkan secara otomatis!",
              note: "Tag **<html>** memiliki atribut lang yang penting untuk aksesibilitas. Gunakan **lang=\"id\"** untuk konten berbahasa Indonesia.",
              warning: "Jangan lupa menutup tag! Setiap tag pembuka seperti **<body>** harus memiliki tag penutup **</body>**. Lupa menutup tag adalah kesalahan yang sangat umum bagi pemula.",
              exampleCode: {
                html: `<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Website Pertamaku</title>\n</head>\n<body>\n  <h1>Selamat Datang!</h1>\n  <p>Ini adalah halaman dengan struktur HTML yang benar.</p>\n  <p>Perhatikan bagaimana setiap bagian tersusun rapi.</p>\n</body>\n</html>`,
                css: `body {\n  font-family: Arial, sans-serif;\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 20px;\n  background: #fafafa;\n}\n\nh1 {\n  color: #4B2E83;\n  border-bottom: 3px solid #FF8A1F;\n  padding-bottom: 8px;\n}\n\np {\n  color: #475569;\n  line-height: 1.8;\n}`,
                js: "",
              },
              starterCode: {
                html: `<!-- Susun struktur HTML yang benar -->\n<!-- Hint: DOCTYPE, html, head, title, body -->\n\n<h1>Halaman Saya</h1>\n<p>Lengkapi struktur HTML ini!</p>`,
                css: `body {\n  font-family: Arial, sans-serif;\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 20px;\n}\n\nh1 { color: #4B2E83; }\np { color: #475569; }`,
                js: "",
              },
              challenge: {
                title: "Tantangan: Struktur Lengkap",
                description: "Buat dokumen HTML dengan struktur lengkap yang benar.",
                checklist: [
                  "Tambahkan <!DOCTYPE html>",
                  "Gunakan tag <html> dengan atribut lang",
                  "Buat bagian <head> dengan <title>",
                  "Buat bagian <body> dengan minimal 1 heading dan 1 paragraf",
                ],
              },
            },
          },
          { name: "Tag Dasar HTML", 
            content: {
              sections: [
                {paragraphs:[
                  "Di materi sebelumnya kita sudah berkenalan dengan **tag** sebagai penanda struktur utama. Sekarang, kita akan menyelami lebih dalam anatomi sebuah tag, bagaimana ia bekerja berpasangan, dan elemen apa saja yang dihasilkan darinya."]
                },
                { heading: "Anatomi Sebuah Elemen", 
                paragraphs: ["Dalam menyusun kerangka website, kita membuat blok-blok yang disebut sebagai Elemen. Sebuah elemen HTML yang utuh biasanya terdiri dari tiga bagian utama: *Opening tag* (tag pembuka), isi konten, dan *Closing tag* (tag penutup).",
                  "Tag selalu ditulis menggunakan tanda kurung bersudut `< >`. Jika kita ingin membuat sebuah paragraf, kita menggunakan huruf **p**. Maka, *opening tag*-nya ditulis dengan `<p>`. Tag pembuka ini memberi tahu browser titik awal di mana paragraf tersebut dimulai.",] 
                },
                { heading: "Pentingnya Tag Penutup", 
                paragraphs: ["Setelah menulis teks, kita wajib memberi tahu browser di mana paragraf tersebut berakhir agar tidak bocor ke teks selanjutnya. Di sinilah *closing tag* berperan.",
                  "Bentuk tag penutup sama persis dengan tag pembuka, hanya saja kamu wajib menambahkan garis miring ` / ` atau slash tepat sebelum nama tag-nya, sehingga menjadi `</p>`.",
                    "Bayangkan elemen ini seperti penjepit roti lapis (*sandwich*). Roti bawah adalah tag pembuka, roti atas adalah tag penutup, dan isian daging di tengahnya adalah teks web milikmu. Jika satu roti hilang, isinya akan berantakan ke mana-mana.",] 
                },
                {heading: "Tag Mandiri (Self-Closing Tag)",
                paragraphs: ["Meskipun sebagian besar tag HTML memiliki pasangan setia pembuka dan penutup, ada beberapa tag spesial yang hidup mandiri. Tag seperti ini disebut sebagai *self-closing tag* atau *empty element* (elemen kosong).",
                "Mengapa mereka tidak butuh penutup? Karena mereka berfungsi memberi perintah langsung ke browser dan tidak mengapit teks apa pun. Ia ditulis cukup dengan tag pembuka dan diakhiri dengan kurung tutup seperti `<br>`, `<hr>`, dan `<img>`.",
                "Contoh paling umum adalah tag `<br>`, yang berfungsi untuk menghasilkan baris baru atau *line break* tanpa perlu membuat elemen paragraf baru. Selain `<br>`, terdapat juga tag `<hr>` *horizontal rule* untuk membuat garis horizontal pemisah, serta tag `<img>` untuk menyisipkan gambar, yang akan kita bahas tuntas di bab selanjutnya.",]
              },
              ],
              tip: "Saat kamu mengetik awalan tag pembuka di code editor (seperti Visual Studio Code) dan menekan tombol panah kanan `>`, aplikasi biasanya akan otomatis mengetikkan tag penutupnya untukmu. Manfaatkan fitur ini agar kodemu lebih cepat selesai!",
              note: "Pemula sering kali keliru menempatkan garis miring pada tag penutup. Selalu ingat, garis miring diletakkan sebelum nama tag (contoh yang benar:`</p>`), bukan sesudahnya (contoh salah: `<p/>` atau `<p\>`).",
              warning: "Jangan pernah melewatkan penulisan tag penutup! Jika tag penutup tidak ditulis atau salah, browser akan mencoba menebak maksudmu dengan menggabungkan elemen yang berantakan, sehingga tampilan website menjadi rusak total.",
              exampleCode: { 
                html: `<!DOCTYPE html>\n<html>\n <head>\n  <title>Belajar Tag Dasar</title>\n </head>\n <body>\n  <h1>Musik Favorit Saya</h1>\n  <p>Saya menyukai musik britpop.</p>\n  <br>\n  <p>Setiap malam, saya selalu mendengarkan lagu-lagu dari band Oasis.</p>\n</body>\n</html>`, 
                css: `...`, 
                js: "" },
              starterCode: { 
                html: `<!-- Strukturnya nanti akan terlihat bertumpuk sejajar --!>\nMulai dari tag <p> pertama (lengkap dengan isinya),\ndiikuti tag <br> sendirian di baris bawahnya, \nlalu disambung dengan tag <p> kedua.`,
                css: `...`, 
                js: "" 
              },
              challenge: { 
                title: "Tantangan: Membuat Jeda Paragraf", 
                description: "Mari berlatih membuat elemen teks menggunakan pasangan tag pembuka dan penutup, serta menyisipkan tag mandiri untuk mengatur jarak antar elemen." ,
                checklist: [
                  "Buka kembali file latihanmu sebelumnya", 
                  "Tulis sebuah judul menggunakan tag <h1> yang berisi nama makanan favoritmu.",
                  "Di bawah judul tersebut, buat dua buah paragraf bebas menggunakan dua pasang tag <p>",
                  "Selipkan tag <br> tepat di antara paragraf pertama dan paragraf kedua agar jarak antara keduanya menjadi sedikit renggang ke bawah."
                ] 
              }
            }
          }
          

        ],
      },
      {
        title: "Text & Formatting",
        icon: "✍️",
        lessons: [
          {
            name: "Mengatur Struktur dengan Heading",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Halaman web berisi banyak teks, namun tidak semua teks memiliki tingkat kepentingan yang sama. Pada materi ini, kita akan belajar membuat hierarki judul agar informasi di website kamu rapi dan mudah dibaca.",
                  ]
                },
                {
                  heading: "Apa itu Heading?",
                  paragraphs: [
                    "Dalam HTML, heading digunakan untuk membuat judul dan subjudul pada halaman web. HTML menyediakan enam tingkat heading, yang dimulai dari tag `<h1>` hingga `<h6>`",
                    "Tag `<h1>` memiliki ukuran teks paling besar dan memiliki tingkat kepentingan paling tinggi. Semakin besar angkanya hingga `<h6>`, maka ukuran teksnya akan semakin kecil dan tingkat kepentingannya semakin menurun."
                  ]
                },
                {
                  heading: "Analogi Hierarki",
                  paragraphs: [
                    "Bayangkan struktur heading seperti daftar isi pada sebuah buku atau halaman depan koran.",
                    "Judul utama buku tersebut adalah `<h1>`. Kemudian, setiap nama bab di dalam buku itu menggunakan `<h2>`. Jika di dalam bab tersebut terdapat sub-bab lagi, kita menggunakan `<h3>`, dan begitu seterusnya ke bawah. Kita tidak mungkin membuat sub-bab `<h3>` jika belum ada bab utamanya `<h2>`, bukan? Begitu juga dengan aturan penulisan heading di HTML."
                  ]
                },
                {
                  heading: "Kapan Digunakan?",
                  paragraphs: [
                    "Heading bukan hanya berguna untuk membuat tulisan terlihat besar di layar, tapi juga sangat penting untuk mesin pencari seperti Google. Robot mesin pencari akan membaca tag `<h1>` dan `<h2>` untuk memahami topik utama dari halaman website milikmu.",
                    "Selain itu, pengguna tunanetra yang memakai aplikasi pembaca layar (*screen reader*) sangat bergantung pada struktur heading untuk berpindah dari satu topik ke topik lainnya dengan cepat."
                  ]
                }
              ],
              tip: "Jadikan kebiasaan untuk hanya menggunakan satu tag `<h1>` dalam satu halaman HTML. `<h1>` adalah identitas utama halamanmu. Sisa topik di bawahnya bisa kamu susun menggunakan `<h2>`, `<h3>`, dan seterusnya.",
              note: "Kesalahan paling sering dilakukan pemula adalah menggunakan tag heading seperti `<h2>` atau `<h3>` hanya untuk membuat teks menjadi tebal atau besar, padahal teks tersebut bukanlah sebuah judul. Untuk sekadar menebalkan teks biasa, kita akan belajar menggunakan tag lain nanti.",
              warning: "Jangan pernah gunakan tag heading seperti `<h2>` atau `<h3>` hanya untuk membuat teks menjadi tebal atau besar, padahal teks tersebut bukanlah sebuah judul. Untuk sekadar menebalkan teks biasa, kita akan belajar menggunakan tag lain nanti.",
              exampleCode: {
                html: `<h1>Belajar HTML di TerasCoding</h1>\n\n<h2>Bab 1: Dasar HTML</h2>\n<p>Di bab ini kamu akan belajar tag-tag dasar HTML.</p>\n\n<h3>1.1 Apa itu Tag?</h3>\n<p>Tag adalah penanda yang digunakan untuk memberi struktur pada konten.</p>\n\n<h3>1.2 Tag Heading</h3>\n<p>Heading digunakan untuk membuat judul dan subjudul.</p>\n\n<h2>Bab 2: Text Formatting</h2>\n<p>Pelajari cara memformat teks di HTML.</p>\n\n<h4>Catatan Kecil</h4>\n<p>Ini adalah contoh heading level 4.</p>`,
                css: `body {\n  font-family: Arial, sans-serif;\n  max-width: 650px;\n  margin: 30px auto;\n  padding: 24px;\n  background: white;\n}\n\nh1 {\n  color: #4B2E83;\n  border-bottom: 3px solid #FF8A1F;\n  padding-bottom: 12px;\n  margin-bottom: 24px;\n}\n\nh2 {\n  color: #4B2E83;\n  margin-top: 28px;\n  margin-bottom: 8px;\n}\n\nh3 {\n  color: #7C5CBF;\n  margin-top: 16px;\n  margin-bottom: 4px;\n}\n\nh4 {\n  color: #FF8A1F;\n  margin-top: 16px;\n}\n\np {\n  color: #475569;\n  line-height: 1.7;\n  margin-bottom: 12px;\n}`,
                js: "",
              },
              starterCode: {
                html: `<!-- Buat hierarki heading yang benar -->\n\n<h1>Judul Utama Halaman</h1>\n\n<!-- Tambahkan h2, h3, dan paragraf di bawah ini -->`,
                css: `body {\n  font-family: Arial, sans-serif;\n  max-width: 650px;\n  margin: 30px auto;\n  padding: 24px;\n}\n\nh1 { color: #4B2E83; }\nh2 { color: #4B2E83; }\nh3 { color: #7C5CBF; }\np { color: #475569; line-height: 1.7; }`,
                js: "",
              },
              challenge: {
                title: "Tantangan: Menyusun Kerangka Berita",
                description: "Kamu ditugaskan menjadi seorang editor di portal berita sekolah. Sebuah artikel masih berantakan dan belum memiliki struktur judul yang jelas. Tugasmu adalah menyusun kerangka beritanya menggunakan heading.",
                checklist: [
                  "Buka code editor dan buat struktur dasar HTML.",
                  "Buat tag <h1> yang berisi judul berita utama: \"Tim Basket Sekolah Juara Provinsi\".",
                  "Buat tag <h2> yang berisi subjudul: \"Jalannya Pertandingan\".",
                  "Buat dua tag <h3> di bawah \"Jalannya Pertandingan\", masing-masing berisi \"Babak Pertama\" dan \"Babak Kedua\".",
                ],
              },
            },
          },
          
          { name: "Paragraph & line break" },
          { name: "Text formatting | Bold, Italic, Underline",
            content: { 
              sections: [
                {paragraphs:["Pada materi ini, kita akan belajar cara memberikan format atau penekanan khusus pada teks, seperti menebalkan (bold), memiringkan (italic), atau memberikan garis bawah (underline) menggunakan tag HTML."],
                },
                {paragraphs: ["Saat menulis teks panjang, terkadang ada kata-kata penting yang ingin kita tonjolkan agar lebih diperhatikan oleh pembaca. HTML menyediakan beberapa tag untuk melakukan format teks atau Text Formatting.",
                "Tag-tag ini dapat diletakkan di dalam tag paragraf (<p>) atau heading. Kita menyebutnya inline element (elemen sebaris), karena tag ini tidak akan membuat baris baru."] },
              {paragraphs:["Berikut adalah tiga gaya formatting dasar:"]},
              {heading: "Tebal (Bold)",
                paragraphs: ["• Bold: `<b>` : Digunakan sekadar untuk menebalkan teks secara visual.",
                  "• Strong Importance `<strong>`: Digunakan untuk menebalkan teks sekaligus memberi tahu mesin pencari (atau aplikasi pembaca layar untuk tunanetra) bahwa kata tersebut memiliki makna yang sangat penting."] },
                {heading: "Miring (Italic)",
                paragraphs: [
                  "• Italic `<i>` : Digunakan sekadar untuk memiringkan teks secara visual.", 
                  "• Emphasis `<em>` : Digunakan untuk memiringkan teks untuk memberikan penekanan/intonasi saat dibaca."] },
                  {heading: "Garis Bawah (Underline)",
                paragraphs: [
                  "• Underline `<u>`: Digunakan untuk memberikan garis bawah pada teks, misalnya saat menulis nama buku yang ejaannya salah.", 
            ] },
              ],
              tip: "Sebagai standar pembuatan website yang baik, lebih disarankan untuk menggunakan tag <strong> dan <em> dibandingkan <b> dan <i>. Meskipun secara visual tampilannya sama, <strong> dan <em> memberikan informasi yang lebih kaya bagi sistem pembaca layar (screen reader) bagi teman-teman kita yang memiliki gangguan penglihatan.",
              note: "Hati-hati saat menggunakan tag <u> (garis bawah). Di internet, teks yang memiliki garis bawah biasanya diidentikkan dengan sebuah Link (tautan yang bisa diklik). Jika kamu menggunakan <u> terlalu sering untuk teks biasa, pengunjung web bisa kebingungan dan mengira teks tersebut bisa diklik",
              warning: " ",
              exampleCode: { html: `<!DOCTYPE html>
<html>
  <head>
    <title>Text Formatting</title>
  </head>
  <body>
    <h2>Pengumuman Penting</h2>
    
    <!-- Contoh penggunaan tag formatting di dalam paragraf -->
    <p>
      Harap diperhatikan bahwa ujian akan dilaksanakan pada hari <strong>Senin, 14 Agustus</strong>. 
      Mohon datang <em>15 menit</em> lebih awal dari jadwal yang ditentukan.
    </p>

    <h2>Kata Serapan</h2>
    <p>
      Dalam pemrograman web, kita sering menggunakan istilah bahasa Inggris seperti <i>browser</i>, <i>tag</i>, dan <i>coding</i>.
    </p>

    <h2>Koreksi Kata</h2>
    <p>
      Ejaan kata yang benar adalah apotek, bukan <u>apotik</u>.
    </p>
  </body>
</html>`, 
                css: `...`, 
                js: "" },
              starterCode: { html: `...`, css: `...`, js: "" },
              challenge: { 
                title: "...",
                description: "...",
                checklist: ["..."] 
              }
            }
          },
          {
            name: "Membuat Daftar | Lists",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini akan mengajarkan cara menyajikan informasi yang terstruktur menggunakan poin-poin daftar. Kamu akan memahami cara membuat daftar yang berurutan menggunakan angka, maupun daftar tidak berurutan yang menggunakan titik (*bullet points*)."
                  ]
                },
                {
                  heading: "Merapikan Alur dan Rincian",
                  paragraphs: [
                    "Dalam penulisan dokumen formal, seperti saat menyusun draf dokumentasi informasi sistem untuk sebuah laporan akhir, menjabarkan diagram alur kerja ke dalam satu paragraf panjang sering kali membuat pembaca kebingungan. Cara terbaik untuk menjelaskan tahapan proses atau rincian komponen adalah dengan memecahnya menjadi daftar poin (*List*).",
                    "HTML menyediakan dua jenis struktur daftar utama, yaitu daftar yang memiliki urutan (angka/huruf) dan daftar yang tidak mempedulikan urutan."
                  ]
                },
                {
                  heading: "Daftar Berurutan (*Ordered List*)",
                  paragraphs: [
                    "Untuk menjelaskan sebuah tahapan operasional sistem yang langkah-langkahnya tidak boleh dibolak-balik (misalnya alur pengguna melakukan login), kita menggunakan tag `<ol>`. Tag ini merupakan singkatan dari *Ordered List*. Secara otomatis, browser akan memberikan nomor urut (1, 2, 3, dst.) pada setiap poin di dalamnya."
                  ]
                },
                {
                  heading: "Daftar Tidak Berurutan (*Unordered List*)",
                  paragraphs: [
                    "Sebaliknya, jika kamu hanya ingin merinci fitur-fitur aplikasi atau daftar peranti keras pendukung yang urutannya bebas, kita menggunakan tag `<ul>`. Singkatan dari *Unordered List* ini akan menampilkan poin-poinmu dengan tanda titik atau *bullet*."
                  ]
                },
                {
                  heading: "Mengisi Daftar dengan Item (*List Item*)",
                  paragraphs: [
                    "Tag `<ol>` maupun `<ul>` hanyalah sebuah \"keranjang besar\" penanda jenis daftarnya. Untuk memasukkan teks ke dalam daftar tersebut, kamu wajib membungkus setiap kalimat dengan tag `<li>` (singkatan dari *List Item*). Tag `<li>` inilah yang nantinya akan diletakkan di dalam keranjang `<ol>` atau `<ul>`."
                  ]
                }
              ],

              tip: "Gunakan tombol `Tab` di keyboard untuk menggeser tag `<li>` sedikit ke kanan (indentasi) agar posisinya terlihat jelas berada di dalam tag `<ol>` atau `<ul>`. Ini akan sangat membantu matamu mendeteksi letak struktur *list* jika sewaktu-waktu ada *error* pada kode dokumentasimu.",

              note: "Konsep daftar di HTML menggunakan prinsip *Parent* (Induk) dan *Child* (Anak). Tag `<ol>` atau `<ul>` bertindak sebagai Induk, sedangkan `<li>` adalah Anaknya. Anak (`<li>`) tidak bisa berdiri sendiri di luar dan harus selalu berada di dalam pelukan Induknya.",

              warning: "Jangan pernah membuat daftar secara manual dengan mengetikkan teks biasa seperti `<p>1. Masukkan *password*</p>` atau `<p>- Klik tombol simpan</p>`. Praktik ini tidak bermakna bagi sistem. Selalu gunakan struktur `<ol>`, `<ul>`, dan `<li>` agar mesin pencari dan alat pembaca layar paham bahwa itu adalah rincian berurutan.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Dokumentasi Alur Sistem</title>
            </head>
            <body>
              <h1>Panduan Penggunaan Aplikasi</h1>

              <h2>Modul Sistem Pendukung</h2>
              <ul>
                <li>Database Server</li>
                <li>Jaringan Internet Stabil</li>
                <li>Browser Versi Terbaru</li>
              </ul>

              <h2>Alur Autentikasi Login</h2>
              <ol>
                <li>Pengguna membuka halaman utama sistem.</li>
                <li>Pengguna memasukkan <em>username</em> dan <em>password</em>.</li>
                <li>Sistem memvalidasi data ke dalam basis data.</li>
                <li>Jika berhasil, pengguna diarahkan ke dasbor utama.</li>
              </ol>
            </body>
          </html>`
              ,css:"...",js:"..."},

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Dokumentasi Sistem Pendaftaran</title>
            </head>
            <body>

              <!-- Buat judul utama -->

              <!-- Tambahkan syarat pendaftaran menggunakan <ul> -->

              <!-- Tambahkan alur pendaftaran menggunakan <ol> -->

            </body>
          </html>`,
              css:"...",js:"..."},

              challenge: {
                title: "Merancang Dokumentasi Sistem Pendaftaran",
                description: "Buatlah sebuah dokumen HTML sederhana yang menjabarkan dokumentasi untuk sistem pendaftaran anggota baru. Kamu perlu menggabungkan penggunaan *heading*, daftar titik, dan daftar angka secara logis.",
                checklist: [
                  "Menggunakan tag `<h1>` sebagai judul utama dokumen.",
                  "Membuat sebuah `<ul>` yang berisi minimal 3 syarat pendaftaran (menggunakan `<li>`).",
                  "Membuat sebuah `<ol>` yang berisi minimal 4 langkah alur pendaftaran dari awal hingga selesai (menggunakan `<li>`)."
                ],
              },
            },
          },
          {
            name: "Membuat Tautan | Hyperlink",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini akan membahas cara menghubungkan satu halaman web dengan halaman atau *website* lainnya menggunakan *Hyperlink*. Kamu akan belajar menggunakan tag *Anchor* untuk membuat teks yang bisa diklik, sehingga pengunjung dapat bernavigasi dari satu dokumen ke dokumen lain dengan mudah."
                  ]
                },
                {
                  heading: "Menghubungkan Antar Dokumen",
                  paragraphs: [
                    "Saat kamu sedang membangun dokumentasi sistem yang sangat masif, mustahil untuk meletakkan seluruh penjelasan diagram alur dari hulu ke hilir ke dalam satu halaman saja. Kamu membutuhkan cara agar pembaca bisa melompat dari halaman \"Daftar Isi\" ke halaman \"Alur Basis Data\", lalu kembali lagi. Di sinilah *Hyperlink* atau Tautan berperan sebagai jembatan penghubungnya.",
                    "Internet pada dasarnya adalah kumpulan miliaran dokumen yang saling terhubung. Tanpa tautan, sebuah halaman web akan terisolasi sendirian."
                  ]
                },
                {
                  heading: "Tag Anchor dan Atribut `href`",
                  paragraphs: [
                    "Untuk membuat teks yang bisa diklik, HTML menggunakan tag `<a>`, yang merupakan singkatan dari *Anchor* (Jangkar).",
                    "Berbeda dengan tag yang sudah kita pelajari sebelumnya, tag `<a>` tidak bisa bekerja sendirian. Jika kamu hanya menulis `<a>Klik saya</a>`, teks tersebut belum akan mengarahkan pengunjung ke mana pun. Tag ini membutuhkan sebuah mesin penggerak berupa atribut.",
                    "Atribut adalah informasi tambahan yang disematkan langsung di dalam tag pembuka. Untuk *Hyperlink*, atribut wajibnya bernama `href` (singkatan dari *Hypertext Reference*). Atribut `href` inilah yang bertugas menyimpan alamat tujuan ke mana teks tersebut akan berlabuh saat diklik."
                  ]
                }
              ],

              tip: "Saat membuat teks yang bisa diklik, hindari menggunakan kata-kata generik seperti \"Klik di sini\" atau \"Baca selengkapnya\". Biasakan menggunakan teks deskriptif yang menjelaskan tujuannya, seperti \"Lihat dokumentasi alur sistem\". Hal ini jauh lebih profesional dan sangat membantu pengunjung mengenali tujuan tautan tersebut tanpa harus menebak-nebak.",

              note: "Dalam pengembangan web, terdapat dua kelompok besar arah tautan:\n\n1. Tautan Internal: Menghubungkan halaman HTML yang berada di dalam satu folder proyekmu sendiri (misalnya, dari file `index.html` menuju ke `kontak.html`).\n2. Tautan Eksternal: Mengarahkan pengunjung ke *website* lain di luar proyekmu (misalnya menuju ke *Google* atau *Wikipedia*).",

              warning: "Kamu harus sangat teliti saat mengetik isi di dalam atribut `href=\"\"`. Kesalahan satu huruf saja (termasuk *typo* pada bagian `https://` untuk tautan eksternal) akan menghasilkan kerusakan yang biasa disebut *Broken Link*. Pengunjung yang mengklik tautan rusak tersebut akan tersesat di halaman *error* karena browser gagal menemukan alamat tujuannya.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Belajar Hyperlink</title>
            </head>
            <body>
              <h1>Dokumentasi Sistem Gudang</h1>

              <p>Ini adalah halaman utama sistem. Untuk melihat rancangan diagram alur barang masuk, silakan buka halaman <a href="alur-masuk.html">Alur Penerimaan Barang</a>.</p>

              <p>Sistem ini dirancang menggunakan standar keamanan data dari <a href="https://www.w3.org/">World Wide Web Consortium (W3C)</a>.</p>
            </body>
          </html>`, css: "...", js: "..." },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Navigasi Sistem</title>
            </head>
            <body>

              <h1></h1>

              <ul>

              </ul>

            </body>
          </html>`, css: "...", js: "..." },

              challenge: {
                title: "Membuat Navigasi Sistem Sederhana",
                description: "Buatlah sebuah dokumen HTML yang mensimulasikan kerangka halaman utama untuk prototipe sebuah aplikasi web. Di dalam halaman tersebut, gabungkan materi pembuatan Daftar (*List*) dengan materi *Hyperlink* untuk membuat deretan menu navigasi yang bisa diklik.",
                checklist: [
                  "Membuat kerangka HTML standar dengan tag `<h1>` sebagai nama aplikasimu.",
                  "Membuat daftar tidak berurutan menggunakan tag `<ul>` dan `<li>` untuk area menu.",
                  "Menyematkan tag `<a>` di dalam `<li>` pertama untuk membuat tautan internal menuju halaman `profil.html`.",
                  "Menyematkan tag `<a>` di dalam `<li>` kedua untuk membuat tautan eksternal menuju `https://www.google.com`."
                ],
              },
            },
          },
        ],
      },
      
      {
        title: "Menyisipkan Multimedia",
        icon: "🔗",
        lessons: [
          {
            name: "Menampilkan Gambar | Tag Image",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini akan membahas cara menghidupkan halaman web dengan menyisipkan gambar. Kamu akan mempelajari anatomi tag `<img>` yang unik karena tidak memiliki penutup, serta memahami atribut wajib yang harus selalu disertakan agar gambar tampil sempurna dan ramah aksesibilitas."
                  ]
                },
                {
                  heading: "Menghidupkan Halaman Web",
                  paragraphs: [
                    "Halaman web yang hanya berisi teks tentu akan terasa membosankan dan kurang informatif. Apalagi jika kamu sedang merancang sebuah halaman dokumentasi; kehadiran gambar seperti bagan, grafik, atau diagram alur sangatlah krusial untuk membantu pembaca memahami rincian sistem yang rumit.",
                    "Di HTML, kita menggunakan tag `<img>` (singkatan dari *Image*) untuk memanggil dan menampilkan sebuah gambar ke dalam kanvas browser."
                  ]
                },
                {
                  heading: "Tag Mandiri Tanpa Penutup",
                  paragraphs: [
                    "Pernahkah kamu ingat dengan tag `<br>` pada materi sebelumnya yang tidak memiliki pasangan penutup? Tag `<img>` beroperasi dengan aturan yang sama. Ia disebut sebagai *Empty Element* atau Elemen Kosong.",
                    "Kamu tidak membungkus teks apa pun di dalam tag ini, sehingga tidak akan pernah ada tag penutup `</img>`. Fungsi tag ini murni hanya sebagai \"lubang intip\" yang memproyeksikan file gambar dari tempat lain ke halaman webmu."
                  ]
                },
                {
                  heading: "Dua Atribut Wajib: `src` dan `alt`",
                  paragraphs: [
                    "Karena tag `<img>` berdiri sendiri, ia membutuhkan mesin penggerak dari dalam agar tahu gambar apa yang harus ditampilkan. Ada dua atribut wajib yang mutlak harus kamu sertakan:",
                    "1. `src` (*Source*)",
                    "Sama seperti `href` pada tautan, atribut `src` bertugas menyimpan alamat lokasi atau jalur (*path*) di mana file gambar tersebut disimpan. Lokasinya bisa berupa nama file di dalam komputermu sendiri (misal: `diagram.png`) atau tautan dari internet.",
                    "2. `alt` (*Alternative Text*)",
                    "Ini adalah teks cadangan. Jika koneksi internet pengunjung sangat lambat atau file gambarmu tidak sengaja terhapus, browser akan menampilkan teks di dalam atribut `alt` ini sebagai gantinya."
                  ]
                }
              ],

              tip: "Agar file proyekmu tidak berantakan, biasakan membuat sebuah folder khusus (misalnya diberi nama `images` atau `assets`) yang diletakkan berdampingan dengan file HTML-mu. Simpan semua file gambar di dalam folder tersebut agar lebih mudah dikelola.",

              note: "Atribut `alt` bukan sekadar teks cadangan. Mesin pencari seperti *Google* menggunakan teks `alt` untuk memahami konteks gambarmu. Selain itu, alat pembaca layar (*screen reader*) bagi penyandang disabilitas netra akan membacakan teks `alt` ini dengan suara. Jadi, selalu berikan deskripsi yang jelas dan relevan pada atribut `alt`!",

              warning: "Perhatikan ukuran resolusi file gambarmu sebelum dimasukkan ke dalam HTML. Jangan menggunakan gambar berukuran raksasa (misalnya 10 *Megabyte*) hanya untuk menampilkan sebuah logo kecil di sudut layar. Ini akan membuat proses *loading* halaman webmu menjadi sangat lambat.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Menampilkan Gambar</title>
            </head>
            <body>
              <h1>Dokumentasi Arsitektur</h1>

              <p>Berikut adalah gambar rancangan alur basis data yang akan diimplementasikan ke dalam sistem:</p>

              <img src="skema-database.png" alt="Diagram alur rancangan basis data sistem">

              <img src="https://www.w3.org/Icons/w3c_home" alt="Logo resmi World Wide Web Consortium">
            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Panduan Visual</title>
            </head>
            <body>

              <h1></h1>

              <p></p>

              <img src="" alt="">

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Menambahkan Ilustrasi Sistem",
                description: "Buatlah sebuah dokumen HTML yang bertindak sebagai halaman panduan visual. Tambahkan sebuah judul, satu paragraf pengantar singkat, dan sebuah gambar yang relevan. Jangan lupa lengkapi komponen wajib pada gambar tersebut.",
                checklist: [
                  "Menggunakan kerangka HTML standar dengan satu `<h1>`.",
                  "Menambahkan satu paragraf penjelasan menggunakan tag `<p>`.",
                  "Menggunakan tag `<img>` untuk menampilkan sebuah gambar.",
                  "Mengisi atribut `src` dengan nama file gambar secara tepat.",
                  "Mengisi atribut `alt` dengan kalimat deskripsi singkat mengenai gambar tersebut."
                ]
              },
            },
          },
          {
            name: "Menyematkan Audio dan Video",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Pada materi ini, kita akan melangkah lebih jauh dari sekadar gambar statis. Kamu akan mempelajari cara memasukkan elemen suara dan video bergerak ke dalam halaman web menggunakan tag `<audio>` dan `<video>`, lengkap dengan tombol pengendalinya agar pengunjung bisa memutar atau menjeda media tersebut."
                  ]
                },
                {
                  heading: "Melengkapi Penjelasan dengan Media Bergerak",
                  paragraphs: [
                    "Ketika kamu sedang menyusun laporan akhir atau dokumentasi alur kerja sebuah informasi sistem yang cukup kompleks, terkadang teks dan gambar diagram saja belum cukup untuk memberikan gambaran yang utuh. Akan sangat informatif jika kamu bisa langsung menyematkan rekaman layar (*screen record*) bagaimana sistem tersebut dioperasikan, bukan?",
                    "HTML5 telah menyediakan tag bawaan bernama `<video>` dan `<audio>`. Kehadiran tag ini memungkinkan kita untuk memutar media langsung di dalam browser tanpa perlu memasang aplikasi tambahan dari pihak ketiga."
                  ]
                },
                {
                  heading: "Atribut Kendali Pemutar Media",
                  paragraphs: [
                    "Berbeda dengan tag `<img>` yang merupakan elemen kosong tanpa penutup, tag `<video>` dan `<audio>` wajib memiliki tag penutup. Alasannya, di antara tag pembuka dan penutup tersebut, kita perlu menyisipkan sumber file medianya.",
                    "Selain itu, jika kita hanya menuliskan tag pembukanya secara telanjang, pengunjung hanya akan melihat gambar diam atau ruang kosong karena tidak ada tombol *Play* untuk memulai medianya. Di sinilah kita membutuhkan atribut sakti bernama `controls`.",
                    "Atribut `controls` bertindak sebagai perintah kepada browser untuk memunculkan antarmuka pemutar media standar, seperti tombol putar/jeda (*play/pause*), garis waktu (*timeline*), pengatur volume, hingga tombol layar penuh (*fullscreen*)."
                  ]
                },
                {
                  heading: "Menentukan Sumber File dengan Tag `<source>`",
                  paragraphs: [
                    "Untuk memberitahu browser di mana lokasi file video atau audio tersebut disimpan, kita meletakkan tag `<source>` tepat di dalam pelukan tag `<video>` atau `<audio>`. Sama seperti gambar, tag `<source>` menggunakan atribut `src` untuk menunjukkan alamat file, dan kita juga dianjurkan menambahkan atribut `type` agar browser mengenali format medianya."
                  ]
                }
              ],

              tip: "Selalu sediakan file dengan format yang paling universal. Untuk video, format `.mp4` adalah pilihan paling aman karena bisa diputar di hampir seluruh jenis browser. Sedangkan untuk audio, format `.mp3` adalah standar emasnya.",

              note: "Di dalam tag `<video>` dan `<audio>`, kamu bisa meletakkan sebuah teks biasa tepat sebelum tag penutup. Teks ini disebut sebagai *Fallback Content* (Pesan Cadangan). Pesan ini tidak akan terlihat oleh pengunjung biasa, dan hanya akan muncul jika kebetulan browser jadul yang dipakai pengunjung tidak mendukung fitur pemutaran HTML5.",

              warning: "Berhati-hatilah dengan ukuran file video. Video berdurasi 1 menit saja bisa memakan puluhan *Megabyte* dan membuat halaman webmu sangat berat saat diakses. Jika videomu terlalu besar, sangat disarankan untuk mengunggahnya ke platform seperti *YouTube* terlebih dahulu, lalu menyematkan tautannya (*embed*) ke dalam webmu.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Menyematkan Multimedia</title>
            </head>
            <body>
              <h1>Dokumentasi Penggunaan Sistem</h1>

              <h2>1. Video Demonstrasi Alur Login</h2>
              <p>Silakan tonton rekaman layar berikut untuk memahami cara kerja sistem validasi pengguna.</p>

              <video controls width="500">
                <source src="demo-login-sistem.mp4" type="video/mp4">
                Maaf, browser Anda tidak mendukung pemutaran video ini.
              </video>

              <h2>2. Rekaman Suara Rapat Kebutuhan Sistem</h2>
              <p>Dengarkan panduan suara berikut untuk penjelasan lebih rinci mengenai struktur basis data.</p>

              <audio controls>
                <source src="penjelasan-database.mp3" type="audio/mpeg">
                Maaf, browser Anda tidak mendukung pemutaran audio ini.
              </audio>
            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Bukti Pengujian</title>
            </head>
            <body>

              <h1></h1>

              <video controls>
                <source src="" type="video/mp4">
              </video>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Menampilkan Bukti Pengujian",
                description: "Buatlah sebuah dokumen HTML yang menampilkan video bukti pengujian aplikasimu. Halaman ini harus memiliki judul penjelas, video yang bisa diputar lengkap dengan panel kendalinya, serta teks peringatan jika browser tidak mendukung.",
                checklist: [
                  "Membuat kerangka dasar HTML.",
                  "Menambahkan tag judul `<h1>`.",
                  "Membuka tag `<video>` yang dilengkapi atribut `controls`.",
                  "Menyisipkan tag `<source>` ke dalam video beserta lokasi file fiktif (misal: `pengujian.mp4`).",
                  "Menyertakan teks cadangan (*fallback*) sebelum menutup tag `</video>`."
                ]
              },
            },
          },
        ],
      },
      {
        title: "Tabel dan Formulir",
        icon: "📋",
        lessons: [
          {
            name: "Membuat Struktur Tabel Dasar",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini akan membawa kita memasuki bab baru yang sangat krusial, yaitu Tabel. Kamu akan mempelajari anatomi tag pembentuk tabel untuk menyajikan data secara terstruktur ke dalam baris dan kolom. Penguasaan tabel sangat esensial ketika kamu harus merancang antarmuka sistem yang menampilkan laporan data atau rekapitulasi informasi."
                  ]
                },
                {
                  heading: "Menyajikan Data Terstruktur",
                  paragraphs: [
                    "Dalam penyusunan dokumentasi sistem atau laporan akhir, sering kali kamu perlu melampirkan daftar entitas basis data, rekapitulasi data pengguna, atau daftar inventaris barang. Menuliskan data-data tersebut dalam bentuk paragraf biasa tentu akan membuatnya sulit dibaca. Solusi terbaiknya adalah menggunakan Tabel (*Table*).",
                    "Tabel membantu kita mengorganisasi informasi kompleks ke dalam kisi-kisi kotak yang rapi. Di dalam HTML, pembuatan tabel membutuhkan kombinasi dari beberapa tag khusus yang bekerja sama secara hierarkis."
                  ]
                },
                {
                  heading: "Anatomi Tabel HTML",
                  paragraphs: [
                    "Berbeda dengan tag paragraf atau *heading* yang cukup berdiri sendiri, sebuah tabel setidaknya membutuhkan empat buah tag dasar untuk bisa terbentuk:",
                    "1. `<table>` (Pembungkus Utama)\nIni adalah keranjang raksasa yang menandakan bahwa semua elemen di dalamnya merupakan bagian dari sebuah tabel.",
                    "2. `<tr>` (*Table Row* / Baris Tabel)\nHTML membaca tabel secara horizontal (baris demi baris dari kiri ke kanan), bukan vertikal dari atas ke bawah. Tag `<tr>` digunakan untuk membuat satu baris mendatar.",
                    "3. `<th>` (*Table Heading* / Kepala Tabel)\nTag ini diletakkan di dalam baris pertama `<tr>` untuk membuat judul kolom. Secara otomatis, browser akan membuat teks di dalam `<th>` menjadi tebal dan berada di posisi tengah (*center*).",
                    "4. `<td>` (*Table Data* / Sel Data)\nTag ini diletakkan di dalam `<tr>` pada baris-baris berikutnya untuk mengisi data reguler. Setiap satu tag `<td>` mewakili satu kotak sel data."
                  ]
                }
              ],

              tip: "Selalu sejajarkan (gunakan indentasi / tombol `Tab`) kodemu dengan rapi saat membuat tabel. Visualisasi kodemu harus mencerminkan struktur tabelnya: `<table>` di paling luar, `<tr>` masuk ke dalam, dan `<th>` atau `<td>` masuk lebih dalam lagi. Ini akan sangat menghemat waktu saat kamu harus mencari data mana yang salah ketik.",

              note: "Untuk sementara waktu selama proses belajar HTML murni, kita bisa menambahkan atribut `border=\"1\"` di dalam tag `<table>` (seperti ini: `<table border=\"1\">`) agar garis-garis tabelnya terlihat di layar. Tanpa atribut ini, browser akan menampilkan tabelmu dengan wujud transparan tanpa garis kotak. (Di dunia nyata, pemberian garis tabel akan sepenuhnya dilakukan menggunakan CSS).",

              warning: "Jangan pernah menggunakan tabel untuk mengatur tata letak (*layout*) keseluruhan halaman *website*! Di era awal internet, programmer sering memakai tabel tak kasat mata untuk menata posisi gambar dan teks di layar. Praktik ini sudah lama ditinggalkan dan dianggap sangat buruk untuk aksesibilitas serta responsivitas layar. Tabel murni diciptakan hanya untuk menampung data *tabular*.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Laporan Data Pengguna</title>
            </head>
            <body>
              <h1>Laporan Data Pengguna Sistem</h1>

              <table border="1">
                <tr>
                  <th>No. ID</th>
                  <th>Nama Lengkap</th>
                  <th>Hak Akses</th>
                </tr>

                <tr>
                  <td>USR-001</td>
                  <td>Budi Santoso</td>
                  <td>Administrator</td>
                </tr>

                <tr>
                  <td>USR-002</td>
                  <td>Siti Aminah</td>
                  <td>Operator</td>
                </tr>
              </table>
            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Daftar Inventaris Gudang</title>
            </head>
            <body>

              <h1></h1>

              <table border="1">

              </table>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Merancang Tabel Inventaris Barang",
                description: "Buatlah sebuah dokumen HTML yang memuat tabel laporan inventaris barang untuk suatu sistem gudang. Tabel ini harus memiliki judul halaman dan menampilkan tiga kolom informasi penting terkait barang.",
                checklist: [
                  "Membuat kerangka dokumen HTML dasar.",
                  "Menambahkan judul halaman menggunakan tag `<h1>` (misal: \"Daftar Inventaris Gudang\").",
                  "Membuat tag `<table>` dengan atribut `border=\"1\"`.",
                  "Membuat baris pertama yang berisi tiga judul kolom (`<th>`): \"Kode Barang\", \"Nama Barang\", dan \"Jumlah Stok\".",
                  "Menambahkan minimal dua baris data (`<tr>` berisi `<td>`) yang relevan dengan judul kolom tersebut."
                ]
              },
            },
          },
          {
            name: "Menggabungkan Baris dan Kolom | Rowspan & Colspan",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini akan membahas teknik lanjutan dalam pembuatan tabel. Kamu akan belajar cara menggabungkan beberapa kotak sel menjadi satu area yang lebih besar, baik secara horizontal maupun vertikal, mirip dengan fitur *Merge Cells* yang biasa kamu gunakan di aplikasi *spreadsheet* seperti *Microsoft Excel*."
                  ],
                },
                {
                  heading: "Merge Cells Versi HTML",
                  paragraphs: [
                    "Saat merancang prototipe antarmuka sistem laporan akhir, kamu mungkin dihadapkan pada format tabel yang kompleks. Misalnya, sebuah laporan rekapitulasi data sering kali memiliki satu judul kategori utama yang menaungi beberapa kolom sekaligus di bawahnya.",
                    "Jika di *Excel* kita bisa mengeblok beberapa sel lalu menekan tombol *Merge & Center*, di HTML kita melakukan hal tersebut menggunakan dua atribut khusus: `colspan` dan `rowspan`."
                  ],
                },
                {
                  heading: "Atribut `colspan` (Penggabungan Horizontal)",
                  paragraphs: [
                    "Kata `colspan` adalah singkatan dari *Column Span* (rentang kolom). Atribut ini digunakan jika kamu ingin menggabungkan sel ke arah samping kanan (horizontal).",
                    "Kamu cukup menyematkan atribut ini ke dalam tag `<th>` atau `<td>` yang ingin diperlebar. Misalnya, `<td colspan=\"2\">` akan membuat sel tersebut melebar sejauh dua kolom, menelan sel yang seharusnya ada di sebelah kanannya.",
                    "Karena satu sel kini mengambil jatah dua ruang, kamu **wajib menghapus** satu tag `<td>` lain di baris yang sama agar total jumlah sel dalam baris tersebut tidak melebihi batas dan membuat tabelmu berantakan."
                  ],
                },
                {
                  heading: "Atribut `rowspan` (Penggabungan Vertikal)",
                  paragraphs: [
                    "Sebaliknya, `rowspan` adalah singkatan dari *Row Span* (rentang baris). Atribut ini digunakan untuk menggabungkan sel ke arah bawah (vertikal).",
                    "Jika kamu menulis `<td rowspan=\"2\">`, sel tersebut akan memanjang ke bawah dan mengambil jatah ruang milik baris tepat di bawahnya. Implikasinya, pada saat kamu menulis kode untuk baris *selanjutnya* (`<tr>` berikutnya), kamu harus mengurangi jumlah tag `<td>` di baris tersebut karena satu ruang kolomnya sudah direbut oleh sel `rowspan` dari baris atas."
                  ],
                }
              ],

              tip: "Bagi pemula, membuat tabel gabungan langsung di kode HTML sering kali membingungkan. Sangat disarankan untuk menggambar bentuk tabel yang kamu inginkan di atas secarik kertas terlebih dahulu. Coret sel mana yang dilebur, lalu bayangkan baris mana saja yang jumlah tag `<td>`-nya harus dikurangi.",

              note: "Nilai angka di dalam atribut (seperti `\"2\"`, `\"3\"`, dan seterusnya) menentukan berapa jumlah sel asli yang akan dilebur menjadi satu kesatuan. Kamu bebas menentukan angkanya sesuai dengan lebar atau tinggi tabel yang kamu rancang.",

              warning: "Kesalahan paling umum yang membuat bentuk tabel \"meledak\" dan menjorok keluar batas adalah lupa menghapus sisa tag `<td>` setelah menggunakan `colspan` atau `rowspan`. Ingat prinsip keseimbangan: jika satu sel mengambil porsi lebih dari satu, maka harus ada tag sel di posisi lain yang dikorbankan (dihapus).",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Laporan Rekapitulasi</title>
            </head>
            <body>
              <h1>Laporan Pengujian Modul</h1>

              <table border="1">
                <tr>
                  <th colspan="3">Detail Pengujian Sistem Pengguna</th>
                </tr>

                <tr>
                  <th>Modul</th>
                  <th>Status</th>
                  <th>Catatan</th>
                </tr>

                <tr>
                  <td rowspan="2">Autentikasi (Login)</td>
                  <td>Admin</td>
                  <td>Lulus Uji</td>
                </tr>

                <tr>
                  <td>Operator</td>
                  <td>Perlu Perbaikan</td>
                </tr>
              </table>
            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Jadwal Implementasi</title>
            </head>
            <body>

              <table border="1">

              </table>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Merancang Tabel Jadwal Implementasi",
                description: "Buatlah sebuah dokumen HTML yang menampilkan rancangan jadwal implementasi perangkat lunak. Kamu perlu membuat tabel yang memadukan penggunaan `colspan` untuk judul hari, dan `rowspan` untuk jadwal aktivitas yang memakan waktu lama.",
                checklist: [
                  "Menggunakan kerangka HTML standar dengan tabel beratribut `border=\"1\"`.",
                  "Membuat judul tabel (`<th>`) bertuliskan `Jadwal Implementasi` yang melebar sebanyak 2 kolom menggunakan `colspan`.",
                  "Membuat satu sel data (`<td>`) berisi `Fase Pengujian` yang memanjang ke bawah sebanyak 2 baris menggunakan `rowspan`.",
                  "Menyesuaikan jumlah `<td>` pada baris yang terdampak agar bentuk tabel tetap simetris."
                ]
              },
            },
          },
                    {
            name: "Tombol Aksi, Checkbox, dan Radio Button",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Setelah membuat kolom input teks dasar, kini saatnya kita memperkaya formulir dengan elemen interaktif lainnya. Materi ini akan membahas cara membuat pilihan ganda (*radio button*), pilihan centang (*checkbox*), serta memahami lebih dalam mengenai tombol aksi untuk memberikan pengalaman pengguna yang lebih baik pada sistemmu."
                  ],
                },
                {
                  heading: "Memperluas Interaksi Pengguna",
                  paragraphs: [
                    "Formulir yang baik tidak hanya meminta pengguna mengetik informasi, tetapi juga memandu mereka dalam memberikan data melalui pilihan yang sudah ditentukan. Ini mencegah kesalahan input dan mempermudah proses pemrosesan data di sisi sistem."
                  ],
                },
                {
                  heading: "1. *Radio Button* (Pilih Satu)",
                  paragraphs: [
                    "Gunakan `type=\"radio\"` ketika kamu ingin pengguna hanya boleh memilih satu opsi dari beberapa pilihan yang tersedia. Agar *browser* tahu bahwa kelompok *radio button* tersebut saling berkaitan, kamu **wajib** memberikan atribut `name` yang sama pada setiap opsi."
                  ],
                },
                {
                  heading: "2. *Checkbox* (Pilih Banyak)",
                  paragraphs: [
                    "Gunakan `type=\"checkbox\"` jika kamu ingin pengguna boleh memilih lebih dari satu opsi. Misalnya, untuk memilih \"Keahlian\" atau \"Bahasa yang dikuasai\"."
                  ],
                },
                {
                  heading: "3. Tombol Aksi (*Button*)",
                  paragraphs: [
                    "Selain `submit`, kamu bisa menggunakan tag `<button type=\"button\">`. Tombol ini lebih fleksibel karena bisa kamu beri konten di dalamnya, seperti gambar atau ikon, dan tidak secara otomatis mengirimkan data formulir kecuali diprogram menggunakan JavaScript."
                  ],
                }
              ],

              tip: "Selalu kelompokkan elemen terkait menggunakan atribut `name`. Untuk *radio button*, jika kamu ingin membuat pilihan \"Jenis Kelamin\" (Laki-laki/Perempuan), pastikan keduanya memiliki `name=\"gender\"`. Ini adalah kunci agar pilihanmu berfungsi logis di mata *browser*.",

              note: "Atribut `value` pada *radio button* dan *checkbox* sangat krusial. Nilai inilah yang akan \"terbawa\" ke server saat formulir dikirimkan. Contoh: Jika kamu membuat *radio button* dengan `value=\"L\"`, maka sistem akan menerima data `L` jika pilihan tersebut dicentang oleh pengguna.",

              warning: "Jangan gunakan `type=\"radio\"` untuk pilihan yang sifatnya *multi-select* (bisa memilih banyak). Pengguna akan bingung karena ketika mereka memilih satu opsi, opsi sebelumnya akan otomatis terbatalkan. Gunakan `type=\"checkbox\"` untuk pilihan yang memungkinkan jawaban lebih dari satu.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Formulir Pilihan</title>
            </head>
            <body>
              <h2>Registrasi Anggota Baru</h2>

              <form>
                <p>Jenis Kelamin:</p>
                <input type="radio" name="gender" value="pria"> Pria<br>
                <input type="radio" name="gender" value="wanita"> Wanita<br>

                <p>Minat (Boleh pilih lebih dari satu):</p>
                <input type="checkbox" name="minat" value="coding"> Coding<br>
                <input type="checkbox" name="minat" value="design"> Design<br>
                <input type="checkbox" name="minat" value="marketing"> Marketing<br><br>

                <button type="submit">Daftarkan Sekarang</button>
                <button type="reset">Ulangi Form</button>
              </form>
            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Preferensi Sistem</title>
            </head>
            <body>

              <form>

              </form>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Merancang Preferensi Sistem",
                description: "Buatlah sebuah formulir sederhana yang meminta pengguna memilih preferensi sistem. Gunakan komponen *radio button* dan *checkbox* untuk mengumpulkan data tersebut.",
                checklist: [
                  "Menggunakan tag `<form>`.",
                  "Membuat minimal dua *radio button* untuk pilihan \"Tema Website\" (Terang / Gelap).",
                  "Membuat minimal tiga *checkbox* untuk pilihan \"Notifikasi yang Diinginkan\" (Email, SMS, *Push Notification*).",
                  "Menggunakan satu tombol `submit` untuk mengirimkan data."
                ],
              },
            },
          },


        ],
      },
      {
        title: "Mini Project",
        icon: "🚀",
        lessons: [
          { name: "Struktur Semantic & Best Practice: Komentar dan Kerapian Kode",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Materi ini adalah penutup dari rangkaian perjalanan belajar HTML kita. Kamu akan mempelajari cara menulis \"catatan rahasia\" di dalam kodemu yang tidak akan terlihat di layar *browser*, serta pentingnya menjaga kerapian kode agar mudah dipelihara di masa depan."
                  ],
                },
                {
                  heading: "Seni Berkomentar di HTML",
                  paragraphs: [
                    "Dalam dunia pengembangan *web*, kode yang kamu tulis hari ini mungkin akan kamu buka lagi enam bulan kemudian. Saat itu, mungkin kamu sudah lupa untuk apa fungsi dari potongan kode tertentu. Di sinilah **komentar** berperan.",
                    "Komentar adalah teks di dalam kode HTML yang diabaikan sepenuhnya oleh *browser*. *Browser* tidak akan menampilkan, memproses, atau melakukan apa pun terhadap teks tersebut. Komentar hanya ditujukan untuk dibaca oleh manusia (dirimu sendiri atau rekan timmu).",
                    "Cara menulis komentar di HTML adalah dengan membungkus teks menggunakan `<!--` dan `-->`."
                  ],
                },
                {
                  heading: "Mengapa Kerapian Kode Penting?",
                  paragraphs: [
                    "Kerapian kode, atau sering disebut dengan *Indentation* (indentasi), adalah praktik memberikan jarak (menggunakan tombol `Tab` atau spasi) pada kode yang berada di dalam elemen lain.",
                    "Manfaat utama dari kerapian kode antara lain:",
                    "1. **Kemudahan *Debugging***: Jika kamu lupa menutup tag (misalnya lupa `</div>`), kode yang rapi akan membantumu menemukan letak kesalahannya dengan jauh lebih cepat.",
                    "2. **Kerja Sama Tim**: Jika kamu bekerja dalam tim, rekanmu akan lebih mudah memahami alur logika yang kamu buat.",
                    "3. **Profesionalisme**: Kode yang rapi adalah tanda pengembang yang disiplin dan mengutamakan kualitas."
                  ],
                }
              ],

              tip: "Biasakan menekan tombol `Tab` di *keyboard* setiap kali kamu masuk ke dalam elemen baru. Misalnya, jika kamu punya `<ul>`, maka setiap `<li>` yang ada di dalamnya harus diindentasi satu tingkat. Jika di dalam `<li>` terdapat tag `<a>`, maka tag tersebut harus diindentasi satu tingkat lagi.",

              note: "Gunakan komentar untuk menjelaskan **alasan** di balik sebuah keputusan teknis, bukan menjelaskan **apa** yang dilakukan oleh kode. Komentar yang baik memberikan konteks yang bermanfaat bagi dirimu maupun anggota tim lainnya.",

              warning: "Jangan pernah menyimpan informasi sensitif di dalam komentar, seperti *password*, *API Key*, atau data pribadi. Meskipun komentar tidak muncul di tampilan *browser*, siapa pun dapat melihatnya melalui fitur *View Page Source*.",

              exampleCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Sistem Akhir</title>
            </head>
            <body>

              <!-- Header Website -->
              <header>
                <nav>
                  <a href="index.html">Home</a>
                </nav>
              </header>

              <!-- Konten Utama -->
              <main>
                <section>
                  <h2>Daftar Tugas</h2>
                  <ul>
                    <li>Mengerjakan laporan akhir</li>
                    <li>Revisi desain UI</li>
                  </ul>
                </section>
              </main>

              <!-- Footer Website -->
              <footer>
                <p>&copy; 2026</p>
              </footer>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              starterCode: {
                html: `<!DOCTYPE html>
          <html>
            <head>
              <title>Proyek HTML</title>
            </head>
            <body>

            </body>
          </html>`,
                css: ``,
                js: ``
              },

              challenge: {
                title: "Merapikan Proyek Akhir",
                description: "Pilihlah salah satu file HTML yang pernah kamu buat sebelumnya. Berikan komentar pada setiap bagian utama (*Header*, *Main*, dan *Footer*), lalu pastikan seluruh kodemu memiliki indentasi yang rapi.",
                checklist: [
                  "Menambahkan minimal 3 komentar di bagian-bagian strategis kode.",
                  "Memastikan setiap elemen yang berada di dalam elemen lain memiliki indentasi satu tingkat lebih dalam.",
                  "Memastikan tidak ada *typo* pada tag penutup."
                ]
              },
            },
          },
        ],
      },
    ],

    ctaSubtitle: "Cocok untuk kamu yang baru mulai",
    ctaAudience: ["Pemula total", "Pelajar sekolah", "Belum pernah coding"],

    // ── Frontend Learning Path preview ──────────────────────────────────────
    curriculumPreview: [
      "Apa itu HTML",
      "Struktur Dokumen HTML",
      "Heading & Paragraph",
      "Image",
      "Link",
      "List",
      "Table",
      "Form",
      "Semantic HTML",
    ],
  },

  // ── CSS ───────────────────────────────────────────────────────────────────
  {
    id: "css-level-2",
    title: "CSS Styling & Layout",
    description:
      "Pelajari cara membuat website lebih menarik dengan warna, layout, dan responsive design.",
    thumbnail: "",
    level: "Menengah",
    language: "CSS",
    fullDescription:
      "Ubah website HTML-mu menjadi lebih cantik dan profesional! Di level ini kamu akan belajar cara menambahkan warna, mengatur layout dengan Flexbox dan Grid, membuat hover effect, dan memastikan website-mu tampil bagus di semua ukuran layar.",
    lessons: 10,
    rating: 4.8,
    students: 2750,
    order: 2,
    topics: ["Color Styling", "Flexbox", "Grid", "Hover Effect", "Responsive Design"],
    color: "#2965F1",

    xp: 150,
    heroDescription:
      "Ubah website HTML-mu menjadi lebih cantik dan profesional dengan CSS modern.",

    statBadges: [
      {
        icon: BookOpen,
        label: "10 Materi",
        color: "text-blue-300",
        bg: "bg-blue-500/15 border-blue-400/20",
      },
      {
        icon: Trophy,
        label: "+150 XP",
        color: "text-yellow-300",
        bg: "bg-yellow-500/15 border-yellow-400/20",
      },
      {
        icon: Target,
        label: "Intermediate",
        color: "text-purple-300",
        bg: "bg-purple-500/15 border-purple-400/20",
      },
      {
        icon: MonitorSmartphone,
        label: "Layout Project",
        color: "text-orange-400",
        bg: "bg-orange-500/15 border-orange-400/20",
      },
    ],

    codePreviewFile: "styles.css",
    codePreview: [
      {
        indent: 0,
        tokens: [{ text: ".container {", colorClass: "text-blue-300" }],
      },
      {
        indent: 1,
        tokens: [
          { text: "display:", colorClass: "text-purple-300" },
          { text: " flex;", colorClass: "text-orange-400" },
        ],
      },
      {
        indent: 1,
        tokens: [
          { text: "background:", colorClass: "text-purple-300" },
          { text: " #2965F1;", colorClass: "text-green-300" },
        ],
      },
      {
        indent: 1,
        tokens: [
          { text: "border-radius:", colorClass: "text-purple-300" },
          { text: " 8px;", colorClass: "text-orange-400" },
        ],
      },
      {
        indent: 0,
        tokens: [{ text: "}", colorClass: "text-blue-300" }],
      },
    ],

    learningTopics: [
      {
        icon: Layers,
        color: "bg-blue-50 text-blue-600",
        title: "Selector CSS",
        desc: "Pahami cara memilih elemen HTML untuk diberi gaya dengan tepat.",
      },
      {
        icon: Palette,
        color: "bg-pink-50 text-pink-500",
        title: "Color & Background",
        desc: "Tambahkan warna, gradasi, dan background gambar ke website.",
      },
      {
        icon: LayoutGrid,
        color: "bg-purple-50 text-purple-600",
        title: "Flexbox",
        desc: "Susun elemen secara horizontal & vertikal dengan mudah.",
      },
      {
        icon: LayoutGrid,
        color: "bg-teal-50 text-teal-600",
        title: "Grid CSS",
        desc: "Buat layout dua dimensi yang rapi dan profesional.",
      },
      {
        icon: Smartphone,
        color: "bg-green-50 text-green-600",
        title: "Responsive Design",
        desc: "Buat website yang tampil sempurna di HP, tablet, dan laptop.",
      },
      {
        icon: Zap,
        color: "bg-orange-50 text-orange-500",
        title: "Animasi Dasar",
        desc: "Hidupkan website dengan transisi dan keyframe animation.",
      },
    ],

    curriculum: [
      {
        title: "Dasar CSS",
        icon: "/cssicon.svg",
        lessons: [
          
          { name: "Apa itu CSS?",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "CSS adalah singkatan dari *Cascading Style Sheets*. Jika HTML diibaratkan sebagai kerangka atau struktur beton sebuah bangunan, maka CSS adalah cat, perabotan, dan desain interior yang membuat bangunan tersebut menjadi indah, rapi, dan nyaman untuk dilihat oleh pengunjung."
                    ],
                  },
                  {
                    heading: "Mengapa Kita Membutuhkan CSS?",
                    paragraphs: [
                      "Pada masa-masa awal internet, website hanya terdiri dari teks polos berlatar belakang putih dengan tautan berwarna biru. Seiring berjalannya waktu, kebutuhan untuk membuat tampilan informasi menjadi lebih terstruktur dan estetik meningkat.",
                      "CSS hadir untuk memecahkan masalah besar: memisahkan konten (HTML) dari desain visual (CSS). Dengan pemisahan ini, kodemu akan menjadi jauh lebih bersih, dan kamu bisa mengubah seluruh tema visual sebuah sistem web besar hanya dengan mengubah satu file CSS saja."
                    ],
                  },
                  {
                    heading: "Memahami Kata *Cascading*",
                    paragraphs: [
                      "Kata *Cascading* diterjemahkan sebagai \"mengalir\" atau bertingkat. Ini adalah prinsip dasar cara kerja CSS. Gaya desain akan diturunkan (mengalir) dari elemen terluar, seperti halaman utama, ke elemen terdalam, seperti teks di dalam tombol.",
                      "Jika ada dua instruksi desain yang saling bertentangan untuk satu elemen yang sama, *browser* akan memutuskan mana yang harus digunakan berdasarkan aturan tingkat prioritas *specificity*."
                    ],
                  },
                  {
                    heading: "Fungsi Utama CSS",
                    paragraphs: [
                      "**Estetika:** Mengatur kombinasi warna latar belakang, warna teks, dan bayangan (`box-shadow` atau `text-shadow`).",
                      "**Tipografi:** Mengubah jenis huruf (`font-family`), ukuran, spasi antar baris, dan ketebalan teks agar dokumen mudah dibaca.",
                      "**Tata Letak (*Layout*):** Menggeser posisi elemen, membuat kolom, mengatur jarak (`margin` dan `padding`), hingga membuat tampilan responsif untuk layar ponsel.",
                      "**Animasi Dasar:** Memberikan efek pergerakan yang halus, seperti tombol yang berubah saat terkena efek `:hover`."
                    ],
                  }
                ],

                tip: "Biasakan menyelesaikan dan merapikan seluruh struktur HTML terlebih dahulu sebelum mulai menulis CSS. Memisahkan fokus antara membangun struktur dan mendesain tampilan akan membuat proses pengembangan lebih cepat dan minim kesalahan.",

                note: "CSS bukan bahasa pemrograman seperti Python, JavaScript, atau C++. CSS tidak memiliki logika seperti `if`, `else`, atau *looping*. CSS adalah *Style Sheet Language* yang bertugas mengatur tampilan visual halaman web.",

                exampleCode: {
                  html: `<!DOCTYPE html>
            <html>
            <head>
              <title>Belajar CSS</title>
              <link rel="stylesheet" href="style.css">
            </head>
            <body>

              <h1>TerasCoding</h1>

            </body>
            </html>`,
                  css: `h1 {
              color: #2980b9;
              font-family: "Segoe UI", Tahoma, sans-serif;
              text-align: center;
              text-transform: uppercase;
            }`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>
            <html>
            <head>
              <title>Latihan CSS</title>
              <link rel="stylesheet" href="style.css">
            </head>
            <body>

              <h1>Tulis Judulmu Di Sini</h1>

            </body>
            </html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Analisis Visual Website Harian",
                  description: "Mari latih kepekaan visualmu sebagai calon *Frontend Developer*. Kunjungi satu website portal berita atau aplikasi berbasis web yang sering kamu gunakan sehari-hari.",
                  checklist: [
                    "Buka website pilihanmu di *browser* desktop atau laptop.",
                    "Temukan satu tombol aksi utama, misalnya tombol *Login* atau *Cari*. Identifikasi warna tombol tersebut dan perubahan yang terjadi saat kursor berada di atasnya.",
                    "Klik kanan pada tombol tersebut, pilih `Inspect`, lalu temukan properti `background-color` atau `color` pada panel *Styles*."
                  ]
                },
              },
            },
        
          { name: "Cara Menyisipkan CSS ke HTML",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah memahami teori dasar tentang apa itu CSS, langkah praktis pertama yang harus dikuasai adalah bagaimana cara menggabungkan kode desain tersebut dengan kerangka HTML. Materi ini akan membahas tiga metode penyisipan CSS, mulai dari yang paling direkomendasikan hingga yang hanya digunakan pada kondisi tertentu."
                    ],
                  },
                  {
                    heading: "Tiga Metode Penyisipan CSS",
                    paragraphs: [
                      "Browser mengenali tiga cara untuk membaca instruksi CSS di dalam sebuah halaman web, yaitu *External CSS*, *Internal CSS*, dan *Inline CSS*. Masing-masing memiliki fungsi, kelebihan, dan penggunaan yang berbeda."
                    ],
                  },
                  {
                    heading: "1. *External CSS* (Standar Profesional)",
                    paragraphs: [
                      "*External CSS* menyimpan seluruh kode CSS pada file terpisah, biasanya bernama `style.css`, kemudian dihubungkan ke dokumen HTML menggunakan tag `<link>`.",
                      "**Kelebihan:** Satu file CSS dapat digunakan oleh banyak halaman HTML sekaligus sehingga kode lebih rapi, mudah dirawat, dan perubahan desain cukup dilakukan pada satu tempat.",
                      "**File:** `index.html`",
                      `<!DOCTYPE html>\n<html>\n<head>\n  <title>External CSS</title>\n\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Sistem Informasi Terpadu</h1>\n</body>\n</html>`,
                      "**File:** `style.css`",
                      `body {\n  background-color: #f4f4f4;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #2c3e50;\n  text-align: center;\n}`
                    ],
                  },
                  {
                    heading: "2. *Internal CSS*",
                    paragraphs: [
                      "*Internal CSS* ditulis langsung di dalam dokumen HTML menggunakan tag `<style>` yang ditempatkan di dalam bagian `<head>`.",
                      "**Kelebihan:** Cocok digunakan untuk halaman tunggal atau saat bereksperimen tanpa perlu membuat file CSS terpisah.",
                      `<!DOCTYPE html>\n<html>\n<head>\n  <title>Internal CSS</title>\n\n  <style>\n    h1 {\n      color: #16a085;\n      text-decoration: underline;\n    }\n  </style>\n</head>\n<body>\n  <h1>Promo Khusus Hari Ini!</h1>\n</body>\n</html>`
                    ],
                  },
                  {
                    heading: "3. *Inline CSS*",
                    paragraphs: [
                      "*Inline CSS* ditulis langsung pada atribut `style` di dalam tag HTML.",
                      "**Kelebihan:** Memiliki prioritas paling tinggi sehingga dapat menimpa aturan dari *External CSS* maupun *Internal CSS*. Biasanya digunakan untuk perubahan tampilan yang sangat spesifik pada satu elemen.",
                      `<!DOCTYPE html>\n<html>\n<head>\n  <title>Inline CSS</title>\n</head>\n<body>\n  <h1 style="color: blue; text-align: left;">Judul Ini Berwarna Biru</h1>\n</body>\n</html>`
                    ],
                  }
                ],

                tip: "Jika file CSS mulai berisi banyak aturan, biasakan menggunakan *External CSS*. Cara ini membuat struktur proyek tetap rapi, mudah dipelihara, dan lebih sesuai dengan standar pengembangan website modern.",

                note: "Saat menggunakan *External CSS*, tag `<link>` harus ditempatkan di dalam `<head>` dan wajib menggunakan atribut `rel=\"stylesheet\"` agar browser mengenali file tersebut sebagai stylesheet.",

                exampleCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Cara Menyisipkan CSS</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1>Belajar CSS di TerasCoding</h1>\n  <p>Selamat datang di materi CSS.</p>\n\n</body>\n</html>`,
                  css: `body {\n  background-color: #f4f4f4;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #2c3e50;\n  text-align: center;\n}\n\np {\n  text-align: center;\n  color: #555;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Latihan CSS</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1>Tulis Judulmu Di Sini</h1>\n\n</body>\n</html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Membangun Jembatan Desain",
                  description: "Mari berlatih membuat alur kerja (*workflow*) yang profesional dengan menghubungkan file HTML dan CSS secara eksternal.",
                  checklist: [
                    "Buat sebuah folder baru bernama **Latihan_CSS**.",
                    "Di dalam folder tersebut, buat file `index.html` dan tambahkan satu elemen `<h1>`.",
                    "Buat file `style.css` pada folder yang sama.",
                    "Hubungkan `style.css` ke `index.html` menggunakan tag `<link>`.",
                    "Ubah warna teks `<h1>` melalui `style.css` dan pastikan perubahannya muncul di browser."
                  ]
                },
              },
            },
          
          { name: "Selektor Dasar",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah berhasil menghubungkan CSS dengan HTML, pertanyaan berikutnya adalah bagaimana CSS mengetahui elemen mana yang harus diberi gaya. Jawabannya adalah menggunakan **selektor**. Selektor merupakan cara CSS memilih elemen HTML sebelum memberikan instruksi desain."
                    ],
                  },

                  {
                    heading: "Mengenal Selektor Dasar CSS",
                    paragraphs: [
                      "Selektor adalah kata kunci atau simbol yang digunakan untuk menunjuk elemen HTML tertentu. Tanpa selektor, CSS tidak akan mengetahui elemen mana yang harus diberi warna, ukuran, ataupun tata letak.",
                      "Dalam pengembangan website, terdapat tiga jenis selektor dasar yang paling sering digunakan, yaitu **Tag Selector**, **Class Selector**, dan **ID Selector**."
                    ],
                  },

                  {
                    heading: "1. Selektor Tag (*Element Selector*)",
                    paragraphs: [
                      "Selektor ini memilih elemen berdasarkan nama tag HTML, seperti **h1**, **p**, **div**, atau **li**.",
                      "**Karakteristik:** Berlaku untuk seluruh elemen dengan tag yang sama di halaman.",
                      "**Kapan digunakan:** Cocok untuk memberikan gaya dasar secara global, misalnya mengatur ukuran seluruh paragraf."
                    ],
                  },

                  {
                    heading: "2. Selektor Class",
                    paragraphs: [
                      "Selektor Class digunakan melalui atribut **class** pada HTML dan ditulis menggunakan tanda titik (`.`) pada CSS.",
                      "**Karakteristik:** Dapat digunakan berkali-kali pada banyak elemen sehingga sangat fleksibel.",
                      "**Kapan digunakan:** Sangat cocok untuk komponen yang digunakan berulang seperti tombol, kartu produk, ataupun kotak informasi."
                    ],
                  },

                  {
                    heading: "3. Selektor ID",
                    paragraphs: [
                      "Selektor ID menggunakan atribut **id** pada HTML dan ditulis menggunakan tanda pagar (`#`) pada CSS.",
                      "**Karakteristik:** Bersifat unik sehingga satu nama ID hanya boleh digunakan satu kali dalam satu halaman HTML.",
                      "**Kapan digunakan:** Digunakan untuk elemen penting yang hanya ada satu, seperti header utama atau footer."
                    ],
                  },

                  {
                    heading: "Contoh Struktur HTML",
                    paragraphs: [
                      "**File:** `index.html`\n\n```html\n<body>\n  <h1 id=\"judul-utama\">Laporan Analisis Sistem</h1>\n\n  <p>Laporan ini berisi rincian analisis aliran data.</p>\n\n  <p class=\"teks-penting\">Perhatian: Modul A butuh perbaikan segera.</p>\n\n  <div class=\"teks-penting\">Rekomendasi: Lakukan migrasi database.</div>\n</body>\n```"
                    ],
                  }
                ],

                tip: "Jika masih bingung memilih antara **class** dan **id**, biasakan menggunakan **class** terlebih dahulu. Pendekatan modern dalam pengembangan web lebih banyak menggunakan class karena lebih mudah digunakan kembali.",

                note: "Penamaan **class** dan **id** bersifat *case-sensitive*. Selain itu, nama tidak boleh diawali angka. Misalnya `.Tombol` berbeda dengan `.tombol`.",

                exampleCode: {
                  html: ``,
                  css: `/* Selektor Tag */\np {\n  color: #333333;\n  font-family: Arial, sans-serif;\n}\n\n/* Selektor ID */\n#judul-utama {\n  color: navy;\n  text-align: center;\n}\n\n/* Selektor Class */\n.teks-penting {\n  color: red;\n  font-weight: bold;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Selektor Dasar CSS</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1 id="judul-utama">Tulis Judul Di Sini</h1>\n\n  <p>Paragraf pertama.</p>\n\n  <p class="teks-penting">Paragraf penting.</p>\n\n  <div class="teks-penting">Informasi penting lainnya.</div>\n\n</body>\n</html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Mengatur Hierarki Laporan",
                  description: "Mari aplikasikan ketiga selektor dasar ini ke dalam satu halaman laporan sederhana agar setiap elemen memiliki identitas masing-masing.",
                  checklist: [
                    "Buat file HTML dan CSS baru, lalu hubungkan menggunakan External CSS.",
                    "Buat tiga tag **<p>**, lalu berikan `class=\"catatan\"` pada dua paragraf terakhir.",
                    "Buat satu tag **<h2>** dengan `id=\"kesimpulan\"`.",
                    "Gunakan Selektor Tag untuk mengatur ukuran seluruh paragraf menjadi `16px`.",
                    "Gunakan Selektor Class untuk mengubah warna teks `.catatan` menjadi abu-abu.",
                    "Gunakan Selektor ID untuk memberi warna latar kuning pada `#kesimpulan`."
                  ]
                },
              },
            },
        ],
      },
      {
        title: "Color & Typography",
        icon: "🖌️",
        lessons: [
          { name: "Warna Teks dan Background",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah berhasil menghubungkan file CSS dengan HTML, langkah berikutnya adalah memberikan warna pada halaman web. CSS menyediakan berbagai cara untuk mengubah warna teks maupun latar belakang sehingga tampilan website menjadi lebih menarik, nyaman dibaca, dan terlihat profesional."
                    ],
                  },

                  {
                    heading: "Properti Warna Dasar di CSS",
                    paragraphs: [
                      "Ada dua properti utama yang digunakan untuk memberikan warna pada elemen HTML.",
                      "**`color`** digunakan untuk mengubah warna teks di dalam suatu elemen.",
                      "**`background-color`** digunakan untuk mengubah warna latar belakang suatu elemen, baik itu paragraf, kotak, maupun seluruh halaman web."
                    ],
                  },

                  {
                    heading: "Format Nilai Warna di CSS",
                    paragraphs: [
                      "CSS mendukung beberapa format penulisan warna yang umum digunakan.",
                      "**Keyword:** Menggunakan nama warna langsung seperti `red`, `blue`, atau `transparent`.",
                      "**Hexadecimal (Hex):** Menggunakan enam digit kombinasi angka dan huruf yang diawali tanda `#`, misalnya `#2c3e50`. Format ini paling sering digunakan dalam pengembangan website.",
                      "**RGB (Red, Green, Blue):** Menggunakan nilai intensitas warna merah, hijau, dan biru dengan rentang `0` hingga `255`, misalnya `rgb(0, 0, 255)`.",
                      "**RGBA:** Sama seperti RGB, tetapi memiliki tambahan nilai Alpha untuk mengatur transparansi. Nilai alpha berada pada rentang `0` hingga `1`."
                    ],
                  }
                ],

                tip: "Jika kesulitan memilih kombinasi warna yang serasi, gunakan pembuat palet warna seperti Coolors atau Color Hunt agar tampilan website lebih konsisten.",

                note: "Properti **`color`** akan diwariskan ke elemen anak secara otomatis. Misalnya, jika `body` memiliki `color: #333333`, maka sebagian besar teks di dalam halaman akan menggunakan warna tersebut kecuali ditimpa oleh aturan lain.",

                exampleCode: {
                  html: ``,
                  css: `body {\n  background-color: #f8f9fa;\n  color: #333333;\n}\n\nh1 {\n  color: #2980b9;\n}\n\n.sorotan-kesimpulan {\n  background-color: rgba(241, 196, 15, 0.3);\n  color: #000000;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Warna Teks dan Background</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1>TerasCoding</h1>\n\n  <p>Selamat datang di materi CSS.</p>\n\n  <p class="sorotan-kesimpulan">\n    Ini adalah contoh teks yang diberi latar belakang transparan.\n  </p>\n\n</body>\n</html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Mewarnai Laporan Akhir Sistem",
                  description: "Terapkan properti pewarnaan pada halaman HTML agar tampil lebih menarik dan mudah dibaca.",
                  checklist: [
                    "Berikan warna latar belakang pada `body` menggunakan warna abu-abu muda, misalnya `#f4f4f4`.",
                    "Ubah warna seluruh teks paragraf (`p`) menjadi abu-abu gelap kebiruan, misalnya `#2c3e50`.",
                    "Buat sebuah class bernama `.catatan-penting` menggunakan `background-color: rgba(...)`, lalu terapkan pada salah satu paragraf."
                  ]
                },
              },
            },
          { name: "Font Family, Ukuran, dan Spasi",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah menguasai pewarnaan, langkah berikutnya adalah mempelajari tipografi. Tipografi berperan penting dalam membuat halaman web menjadi nyaman dibaca, terlihat profesional, dan memiliki hierarki informasi yang jelas."
                    ],
                  },

                  {
                    heading: "Mengendalikan Tipografi di Web",
                    paragraphs: [
                      "CSS menyediakan beberapa properti utama yang digunakan untuk mengatur tampilan teks pada halaman web."
                    ],
                  },

                  {
                    heading: "1. Jenis Huruf (`font-family`)",
                    paragraphs: [
                      "Properti **`font-family`** digunakan untuk menentukan jenis huruf yang digunakan oleh suatu elemen.",
                      "Sebaiknya tuliskan lebih dari satu jenis huruf sebagai *fallback*. Jika font utama tidak tersedia di komputer pengguna, *browser* akan menggunakan font berikutnya secara otomatis."
                    ],
                  },

                  {
                    heading: "2. Ukuran Huruf (`font-size`)",
                    paragraphs: [
                      "Properti **`font-size`** digunakan untuk mengatur besar kecilnya teks.",
                      "Satuan yang paling sering digunakan adalah `px`. Untuk pengembangan yang lebih lanjut, satuan seperti `rem` atau `em` lebih disarankan karena lebih fleksibel terhadap berbagai ukuran layar."
                    ],
                  },

                  {
                    heading: "3. Ketebalan Huruf (`font-weight`)",
                    paragraphs: [
                      "Properti **`font-weight`** digunakan untuk mengatur ketebalan teks.",
                      "Nilainya dapat berupa kata seperti `normal` dan `bold`, atau angka mulai dari `100` hingga `900`."
                    ],
                  },

                  {
                    heading: "4. Spasi Antar Baris dan Perataan Teks",
                    paragraphs: [
                      "**`line-height`** mengatur jarak antar baris sehingga paragraf menjadi lebih nyaman dibaca.",
                      "**`text-align`** digunakan untuk mengatur perataan teks, seperti `left`, `center`, `right`, atau `justify`."
                    ],
                  }
                ],

                tip: "Gunakan maksimal dua jenis font dalam satu halaman, misalnya satu untuk judul dan satu lagi untuk isi. Cara ini membuat tampilan website tetap konsisten dan mudah dibaca.",

                note: "Jika nama font memiliki spasi, seperti `'Times New Roman'`, gunakan tanda kutip. Untuk nama font satu kata seperti `Arial`, tanda kutip tidak wajib.",

                exampleCode: {
                  html: ``,
                  css: `body {\n  font-family: 'Roboto', Arial, sans-serif;\n  line-height: 1.6;\n  color: #333333;\n}\n\nh1,\nh2 {\n  font-family: 'Georgia', serif;\n  font-weight: 700;\n  text-align: center;\n}\n\np {\n  font-size: 16px;\n  text-align: justify;\n}\n\n.penting {\n  font-weight: bold;\n  font-size: 18px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Font Family, Ukuran, dan Spasi</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1>Belajar CSS</h1>\n\n  <h2>Tipografi Website</h2>\n\n  <p>\n    Ini adalah contoh paragraf untuk melihat perubahan jenis huruf, ukuran teks, spasi antar baris, dan perataan teks.\n  </p>\n\n  <p class="penting">\n    Paragraf ini menggunakan class penting sehingga tampil lebih besar dan tebal.\n  </p>\n\n</body>\n</html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Merapikan Tipografi Dokumen",
                  description: "Terapkan properti tipografi pada halaman HTML agar tampil seperti dokumen yang rapi dan mudah dibaca.",
                  checklist: [
                    "Atur `font-family` pada `body` menggunakan kelompok font `sans-serif`, seperti `Arial`, `Helvetica`, atau `Segoe UI`.",
                    "Ubah perataan seluruh paragraf (`p`) menjadi `justify`.",
                    "Tambahkan `line-height: 1.5;` pada paragraf agar lebih nyaman dibaca.",
                    "Buat class baru, misalnya `.judul-bab`, yang membuat teks lebih besar dan tebal, lalu terapkan pada salah satu heading."
                  ]
                },
              },
            },
          { name: "CSS Box Model (Model Kotak)",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setiap elemen HTML di mata CSS dianggap sebagai sebuah kotak (*box*). Baik itu judul, paragraf, gambar, maupun tombol, semuanya memiliki struktur kotak yang sama. Memahami **CSS Box Model** adalah langkah penting untuk mengatur tata letak (*layout*) halaman web dengan rapi."
                    ],
                  },

                  {
                    heading: "Anatomi CSS Box Model",
                    paragraphs: [
                      "Setiap kotak terdiri dari empat bagian utama yang tersusun dari dalam ke luar."
                    ],
                  },

                  {
                    heading: "1. Content",
                    paragraphs: [
                      "Bagian paling dalam yang berisi isi sebenarnya dari elemen, seperti teks, gambar, atau video."
                    ],
                  },

                  {
                    heading: "2. Padding",
                    paragraphs: [
                      "**`padding`** adalah ruang kosong di dalam kotak, berada di antara konten dan garis tepi (*border*). Properti ini membuat isi elemen tidak menempel langsung pada batas kotaknya."
                    ],
                  },

                  {
                    heading: "3. Border",
                    paragraphs: [
                      "**`border`** merupakan garis tepi yang mengelilingi konten beserta padding. Kamu dapat mengatur ketebalan, warna, dan jenis garisnya."
                    ],
                  },

                  {
                    heading: "4. Margin",
                    paragraphs: [
                      "**`margin`** adalah ruang kosong di luar kotak. Properti ini digunakan untuk memberikan jarak antar elemen sehingga tata letak menjadi lebih rapi."
                    ],
                  }
                ],

                tip: "Biasakan menambahkan aturan `* { box-sizing: border-box; }` di awal file CSS. Dengan begitu, ukuran elemen akan tetap konsisten meskipun diberi `padding` atau `border`.",

                note: "Jangan tertukar antara **padding** dan **margin**. `padding` menambah ruang di dalam elemen, sedangkan `margin` menambah jarak di luar elemen.",

                exampleCode: {
                  html: ``,
                  css: `* {\n  box-sizing: border-box;\n}\n\n.wadah-diagram {\n  background-color: #ffffff;\n  width: 100%;\n  padding: 20px;\n  border: 2px solid #bdc3c7;\n  margin-bottom: 30px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Box Model</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="wadah-diagram">\n    <h2>Diagram Sistem</h2>\n    <p>\n      Ini adalah contoh kotak yang menerapkan konsep CSS Box Model.\n      Perhatikan jarak di dalam kotak, garis tepi, dan ruang di luar kotak.\n    </p>\n  </div>\n\n  <p>Paragraf ini berada di bawah kotak sehingga efek margin dapat terlihat.</p>\n\n</body>\n</html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Menata Ruang Elemen Laporan",
                  description: "Terapkan konsep CSS Box Model untuk membuat sebuah kotak informasi yang rapi pada halaman HTML.",
                  checklist: [
                    "Buat sebuah elemen `<div>` dengan `class=\"kotak-info\"`.",
                    "Tambahkan satu elemen `<h3>` dan satu elemen `<p>` di dalamnya.",
                    "Berikan `background-color` berwarna cerah pada `.kotak-info`.",
                    "Tambahkan `border` setebal `1px` dengan warna biru gelap.",
                    "Tambahkan `padding: 15px;` agar isi kotak tidak menempel pada garis tepi.",
                    "Tambahkan `margin: 20px;` agar kotak memiliki jarak dengan elemen lain."
                  ]
                },
              },
            },
        ],
      },
      {
        title: "Layout dengan Flexbox",
        icon: "📐",
        lessons: [
          { name: "Memahami Properti Display",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah kamu bisa membuat kotak elemen dengan *Box Model*, pertanyaan berikutnya adalah: mengapa beberapa elemen tersusun ke bawah secara otomatis, sementara yang lain berjejer ke samping? Jawabannya ada pada properti `display`. Memahami konsep ini adalah kunci untuk merancang tata letak dokumen laporan sistem yang rapi dan terstruktur."
                    ],
                  },
                  {
                    heading: "Tipe Display Bawaan HTML",
                    paragraphs: [
                      "Secara *default*, *browser* memberikan perilaku `display` tertentu pada setiap tag HTML. Ada tiga nilai `display` yang paling penting untuk dikuasai pada tahap dasar ini:"
                    ],
                  },
                  {
                    heading: "1. Block (`display: block;`)",
                    paragraphs: [
                      "Elemen *block* sangat egois. Ia akan mengambil ruang selebar-lebarnya (100% dari kiri ke kanan layar) dan selalu memaksa elemen berikutnya untuk turun ke baris baru.",
                      "**Contoh tag bawaan:** `<div>`, `<p>`, `<h1>` hingga `<h6>`, `<ul>`, `<li>`.",
                      "**Penggunaan:** Sangat cocok digunakan sebagai wadah utama (*container*), misalnya untuk membungkus gambar diagram alir data (*data flow diagram*) beserta narasi penjelasannya agar tidak bercampur dengan teks lain di sebelahnya."
                    ],
                  },
                  {
                    heading: "2. Inline (`display: inline;`)",
                    paragraphs: [
                      "Elemen *inline* sangat toleran. Ia hanya mengambil ruang sebesar konten teks di dalamnya dan mengizinkan elemen lain berjejer di sampingnya pada baris yang sama.",
                      "**Contoh tag bawaan:** `<span>`, `<a>` (tautan), `<strong>`, `<em>`.",
                      "**Penggunaan:** Cocok digunakan untuk memberikan gaya pada potongan kata di tengah kalimat narasi analisis, seperti menebalkan teks atau memberi warna sorotan, tanpa merusak alur paragraf."
                    ],
                  },
                  {
                    heading: "3. Inline-Block (`display: inline-block;`)",
                    paragraphs: [
                      "Ini adalah mutasi dari keduanya. Elemen ini tetap berjejer ke samping secara rukun (seperti *inline*), namun kamu diizinkan untuk mengatur lebar (`width`), tinggi (`height`), serta `margin` dan `padding` atas-bawahnya (seperti *block*)."
                    ],
                  }
                ],

                tip: "Jika kamu ingin membuat barisan menu navigasi horizontal atau deretan tombol untuk mengunduh dokumen laporan, mengubah elemen tautan (`<a>`) menjadi `display: inline-block;` adalah teknik paling dasar dan ampuh yang sering digunakan desainer web profesional.",

                note: "Elemen yang berstatus *inline* murni (seperti `<span>`) akan mengabaikan perintah `width`, `height`, `margin-top`, dan `margin-bottom`. Jika kamu mencoba memberi tinggi pada tag `<span>` dan tidak terjadi apa-apa di layarmu, itu bukan *bug*, melainkan sifat alaminya. Ubah dulu `display`-nya menjadi `inline-block` agar perintahmu didengarkan.",

                exampleCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Properti Display</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="wadah-bab">\n    <h2>Bab 1</h2>\n    <p>Ini adalah contoh elemen block.</p>\n  </div>\n\n  <p>CSS adalah <span class="sorot-istilah">Style Sheet Language</span> untuk mengatur tampilan website.</p>\n\n  <a href="#" class="tombol-aksi">Beranda</a>\n  <a href="#" class="tombol-aksi">Materi</a>\n\n</body>\n</html>`,
                  css: `/* 1. Elemen Block */\n.wadah-bab {\n  display: block;\n  background-color: #ffffff;\n  padding: 20px;\n  margin-bottom: 30px;\n}\n\n/* 2. Elemen Inline */\n.sorot-istilah {\n  display: inline;\n  background-color: yellow;\n  font-weight: bold;\n}\n\n/* 3. Elemen Inline-Block */\n.tombol-aksi {\n  display: inline-block;\n  background-color: #3498db;\n  color: white;\n  padding: 10px 20px;\n  text-decoration: none;\n  border-radius: 5px;\n  margin-right: 10px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Latihan Display</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="menu-navigasi">\n    <a href="#" class="tombol-menu">Beranda</a>\n    <a href="#" class="tombol-menu">Diagram Sistem</a>\n    <a href="#" class="tombol-menu">Kesimpulan</a>\n  </div>\n\n</body>\n</html>`,
                  css: `.tombol-menu {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Mendesain Tombol Navigasi Laporan",
                  description: "Mari aplikasikan properti `inline-block` untuk menyulap teks tautan biasa menjadi deretan tombol navigasi yang estetik untuk diletakkan di bagian atas halaman dokumenmu.",
                  checklist: [
                    "Di file HTML, buat sebuah `<div>` dengan class `menu-navigasi`.",
                    "Di dalam `<div>` tersebut, buat tiga buah tag tautan (`<a>`), misalnya: \"Beranda\", \"Diagram Sistem\", dan \"Kesimpulan\". Berikan class `tombol-menu` pada ketiganya.",
                    "Di file CSS, panggil `.tombol-menu` lalu setel `display: inline-block;`.",
                    "Berikan `background-color`, `color` teks, dan `padding` (misal: `10px 15px`) agar terlihat seperti kotak.",
                    "Tambahkan `margin-right: 15px;` agar antar tombol memiliki jarak dan tidak saling menempel."
                  ]
                },
              },
            },
          { name: "Pengenalan Flexbox (Konsep Parent & Child)",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "**Flexbox** (singkatan dari *Flexible Box*) adalah sistem tata letak satu dimensi yang didesain untuk membantu kita mengatur jarak dan keselarasan antar elemen di dalam halaman web. Sebelum ada Flexbox, desainer web harus berdarah-darah pakai properti jadul seperti `float` yang sering bikin *layout* rusak. Flexbox hadir sebagai penyelamat karena sifatnya yang otomatis fleksibel menyesuaikan ruang yang ada."
                    ],
                  },
                  {
                    heading: "Konsep Keramat Flexbox: Parent dan Child",
                    paragraphs: [
                      "Untuk menguasai Flexbox, lu cuma perlu paham satu aturan emas ini: **Flexbox baru akan bekerja kalau ada hubungan \"Induk dan Anak\"**."
                    ],
                  },
                  {
                    heading: "1. Flex Container (Sang Induk / Parent)",
                    paragraphs: [
                      "Ini adalah elemen luar yang bertugas sebagai pembungkus kotak-kotak di dalamnya. Untuk mengaktifkan mode Flexbox, lu wajib memberikan perintah `display: flex;` pada elemen induk ini. Begitu kode ini ditulis, sang induk resmi punya kekuatan magis untuk mengatur susunan anak-anaknya."
                    ],
                  },
                  {
                    heading: "2. Flex Items (Sang Anak / Child)",
                    paragraphs: [
                      "Semua elemen (bisa berupa `div`, `p`, `img`, dll) yang berada **langsung di dalam** (*direct children*) dari Flex Container otomatis berubah status menjadi Flex Items. Mereka adalah kotak-kotak yang posisinya bakal diatur oleh sang induk."
                    ],
                  }
                ],

                tip: "Ingat baik-baik: Properti `display: flex;` itu **tidak menular sampai ke cucu**. Sifat Flexbox hanya berlaku dari *Parent* langsung ke *Child* langsungnya saja. Jika di dalam elemen anak ada elemen lain lagi (elemen cucu), elemen cucu tersebut tidak akan ikut terpengaruh mode Flexbox kecuali elemen anaknya lu kasih `display: flex;` juga.",

                note: "Secara bawaan (*default*), begitu lu menuliskan `display: flex;` pada sebuah *Parent*, semua elemen *Child* di dalamnya yang tadinya bersifat *block* (berbaris ke bawah) akan **langsung otomatis berjejer ke samping (horizontal)**. Ini terjadi karena Flexbox memiliki setelan awal berupa baris (*row*).",

                exampleCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Belajar Flexbox</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="kontainer-menu">\n    <div class="item-menu">Menu 1</div>\n    <div class="item-menu">Menu 2</div>\n    <div class="item-menu">Menu 3</div>\n  </div>\n\n</body>\n</html>`,
                  css: `/* 1. Mengaktifkan Flexbox pada elemen Induk */\n.kontainer-menu {\n  display: flex;\n  background-color: #2c3e50;\n  padding: 10px;\n}\n\n/* 2. Menghias elemen Anak (biar kelihatan bentuk kotaknya) */\n.item-menu {\n  background-color: #3498db;\n  color: white;\n  padding: 15px 25px;\n  margin: 5px;\n  font-weight: bold;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<!DOCTYPE html>\n<html>\n<head>\n  <title>Latihan Flexbox</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="parent-box">\n    <div class="child-box">Kotak 1</div>\n    <div class="child-box">Kotak 2</div>\n    <div class="child-box">Kotak 3</div>\n  </div>\n\n</body>\n</html>`,
                  css: `.parent-box {\n\n}\n\n.child-box {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Mengaktifkan Kekuatan Flexbox",
                  description: "Mari buat fondasi Flexbox pertama lu untuk melihat bagaimana elemen anak otomatis langsung berjejer patuh ke samping.",
                  checklist: [
                    "Di file HTML, buat satu `div` dengan `class=\"parent-box\"`.",
                    "Di dalam `div` tersebut, isi dengan tiga buah elemen `<div>` baru yang masing-masing diberi `class=\"child-box\"` dan diisi teks bebas.",
                    "Di file CSS, berikan warna latar belakang yang berbeda antara `.parent-box` dan `.child-box` agar batas kotaknya terlihat jelas.",
                    "Tambahkan properti `display: flex;` pada `.parent-box`.",
                    "Buka di *browser* dan pastikan ketiga kotak anak tersebut sekarang sudah berjejer rapi secara horizontal!"
                  ]
                },
              },
            },
          { name: "Flex Direction dan Flex Wrap",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah memahami bahwa *Flexbox* bekerja berdasarkan hubungan *Parent* (Induk) dan *Child* (Anak), sekarang saatnya kita belajar cara mengendalikan alur barisan anak-anak tersebut. Properti **`flex-direction`** dan **`flex-wrap`** adalah dua kendali utama untuk menentukan ke arah mana elemen anak berbaris dan apa yang harus dilakukan jika ruang induknya sudah kesempitan."
                    ],
                  },
                  {
                    heading: "Properti Pengatur Alur Flexbox",
                    paragraphs: [
                      "**`flex-direction` (Arah Barisan)** digunakan untuk menentukan arah susunan elemen *Child* di dalam *Flex Container*.",
                      "**`row` (Default):** Elemen berbaris secara horizontal dari kiri ke kanan.",
                      "**`row-reverse`:** Elemen berbaris secara horizontal, tetapi urutannya dibalik dari kanan ke kiri.",
                      "**`column`:** Elemen berbaris secara vertikal dari atas ke bawah.",
                      "**`column-reverse`:** Elemen berbaris secara vertikal dengan urutan dari bawah ke atas.",
                      "",
                      "**`flex-wrap` (Bungkus Baris)** digunakan untuk mengatur apakah elemen *Child* boleh turun ke baris baru ketika ruang sudah penuh.",
                      "**`nowrap` (Default):** Semua elemen dipaksa berada dalam satu baris meskipun ruang tidak mencukupi.",
                      "**`wrap`:** Elemen yang tidak muat akan otomatis pindah ke baris berikutnya.",
                      "**`wrap-reverse`:** Sama seperti `wrap`, tetapi baris baru akan muncul di atas baris sebelumnya."
                    ],
                  }
                ],

                tip: "Kombinasikan `flex-direction: row;` untuk tampilan desktop dan `flex-direction: column;` saat tampilan mobile menggunakan *Media Query*. Teknik ini menjadi dasar pembuatan *Responsive Web Design*.",

                note: "Kedua properti ini dapat ditulis lebih singkat menggunakan properti **`flex-flow`**, misalnya `flex-flow: row wrap;` yang berarti arah elemen horizontal dan diizinkan turun ke baris baru.",

                warning: "Saat mengubah `flex-direction` menjadi `column`, arah **Main Axis** dan **Cross Axis** ikut berubah. Hal ini akan memengaruhi cara kerja properti seperti `justify-content` dan `align-items` pada materi berikutnya.",

                exampleCode: {
                  html: `<div class="pembungkus-kartu">\n  <div class="kartu">Kartu Analisis 1</div>\n  <div class="kartu">Kartu Analisis 2</div>\n  <div class="kartu">Kartu Analisis 3</div>\n  <div class="kartu">Kartu Analisis 4</div>\n</div>`,
                  css: `.pembungkus-kartu {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n\n  background-color: #ecf0f1;\n  padding: 20px;\n}\n\n.kartu {\n  background-color: #2ecc71;\n  color: white;\n  width: 250px;\n  height: 150px;\n  margin: 10px;\n  padding: 15px;\n  font-weight: bold;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<div class="pembungkus-kartu">\n  <div class="kartu">Kartu 1</div>\n  <div class="kartu">Kartu 2</div>\n  <div class="kartu">Kartu 3</div>\n  <div class="kartu">Kartu 4</div>\n</div>`,
                  css: `.pembungkus-kartu {\n\n}\n\n.kartu {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Membuat Layout Galeri yang Dinamis",
                  description: "Mari latih logika penataan arah dan pembungkusan elemen agar halaman dokumentasimu siap menampung banyak komponen visual sekaligus.",
                  checklist: [
                    "Gunakan struktur HTML dari kode contoh di atas dengan empat buah elemen anak di dalam satu elemen induk.",
                    "Aktifkan Flexbox pada elemen induk menggunakan `display: flex;`.",
                    "Ubah `flex-direction` menjadi `row-reverse`, lalu amati perubahan urutan elemen di browser.",
                    "Kembalikan ke `row`, kemudian ubah `flex-wrap` menjadi `nowrap` dan persempit ukuran browser untuk melihat hasilnya.",
                    "Terakhir, ubah kembali menjadi `flex-wrap: wrap;` agar elemen dapat turun ke baris berikutnya secara otomatis."
                  ]
                },
              },
            },
          { name: "Justify Content dan Align Items",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Setelah bisa mengatur arah barisan (*direction*) dan membuat elemen anak membungkus dengan rapi (*wrap*), sekarang kita akan mempelajari salah satu kemampuan paling penting dari *Flexbox*, yaitu mengatur posisi elemen secara otomatis menggunakan **`justify-content`** dan **`align-items`**. Kedua properti ini digunakan untuk mengatur posisi, jarak, dan perataan elemen tanpa perlu menghitung `margin` secara manual."
                    ],
                  },
                  {
                    heading: "Sumbu Koordinat Flexbox",
                    paragraphs: [
                      "Sebelum menggunakan kedua properti tersebut, kamu perlu memahami bahwa Flexbox bekerja menggunakan dua sumbu utama.",
                      "**Main Axis (Sumbu Utama):** Mengikuti arah yang ditentukan oleh `flex-direction`. Jika menggunakan `row`, maka sumbunya horizontal (kiri ke kanan).",
                      "**Cross Axis (Sumbu Silang):** Sumbu yang tegak lurus terhadap Main Axis. Jika `flex-direction` adalah `row`, maka Cross Axis bergerak secara vertikal (atas ke bawah)."
                    ],
                  },
                  {
                    heading: "Properti Perataan Flexbox",
                    paragraphs: [
                      "**`justify-content`** digunakan untuk mengatur posisi elemen pada **Main Axis**.",
                      "**`flex-start` (Default):** Semua elemen berada di awal sumbu.",
                      "**`flex-end`:** Semua elemen berada di akhir sumbu.",
                      "**`center`:** Semua elemen berada tepat di tengah.",
                      "**`space-between`:** Elemen pertama dan terakhir berada di kedua ujung, sedangkan ruang kosong dibagi di antara elemen lainnya.",
                      "**`space-around`:** Setiap elemen memiliki ruang kosong di sekelilingnya.",
                      "**`space-evenly`:** Semua jarak antar elemen maupun ke tepi kontainer dibagi sama rata.",
                      "",
                      "**`align-items`** digunakan untuk mengatur posisi elemen pada **Cross Axis**.",
                      "**`stretch` (Default):** Elemen memenuhi tinggi kontainer jika tidak memiliki tinggi tetap.",
                      "**`flex-start`:** Elemen berada di bagian atas.",
                      "**`flex-end`:** Elemen berada di bagian bawah.",
                      "**`center`:** Elemen berada di tengah secara vertikal."
                    ],
                  }
                ],

                tip: "Untuk membuat sebuah elemen tepat berada di tengah halaman secara horizontal dan vertikal, cukup gunakan kombinasi `display: flex;`, `justify-content: center;`, dan `align-items: center;` pada elemen induknya.",

                note: "Jika `flex-direction` diubah menjadi `column`, maka arah Main Axis dan Cross Axis ikut berubah. Akibatnya, `justify-content` akan mengatur posisi vertikal, sedangkan `align-items` akan mengatur posisi horizontal.",

                warning: "Properti `justify-content` dan `align-items` harus ditulis pada elemen **Parent (Flex Container)**, bukan pada elemen Child. Jika diletakkan pada elemen anak, properti tersebut tidak akan memberikan efek perataan.",

                exampleCode: {
                  html: `<header class="navbar-utama">\n  <div class="logo">SistemInformasi_v2</div>\n  <nav class="menu-nav">\n    <a href="#">Dashboard</a>\n    <a href="#">Laporan</a>\n    <a href="#">Pengaturan</a>\n  </nav>\n</header>`,
                  css: `.navbar-utama {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n\n  background-color: #2c3e50;\n  padding: 15px 30px;\n  height: 70px;\n}\n\n.logo {\n  color: #fff;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.menu-nav a {\n  color: #bdc3c7;\n  text-decoration: none;\n  margin-left: 20px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<div class="container-metrik">\n  <div class="kartu-metrik">Metrik 1</div>\n  <div class="kartu-metrik">Metrik 2</div>\n  <div class="kartu-metrik">Metrik 3</div>\n</div>`,
                  css: `.container-metrik {\n\n}\n\n.kartu-metrik {\n  width: 200px;\n  height: 100px;\n}`,
                  js: ``
                },

                challenge: {
                  title: "Menyelaraskan Kotak Diagram Laporan",
                  description: "Mari latih kemampuan mengatur posisi elemen menggunakan `justify-content` dan `align-items` agar susunan kartu terlihat rapi dan seimbang.",
                  checklist: [
                    "Buat sebuah `div` dengan class `container-metrik`.",
                    "Tambahkan tiga `div` dengan class `kartu-metrik` di dalamnya.",
                    "Berikan tinggi kontainer sebesar `400px` dan aktifkan `display: flex;`.",
                    "Gunakan `justify-content: space-evenly;` agar jarak antar kartu sama rata.",
                    "Gunakan `align-items: center;` agar seluruh kartu berada tepat di tengah tinggi kontainer."
                  ]
                },
              },
            },
        ],
      },
      {
        title: "Layout dengan Grid",
        icon: "🔲",
        lessons: [
          { name: "Pengenalan CSS Grid",
            content: {
              sections: [
                {
                  paragraphs: [
                    "Jika *Flexbox* adalah solusi terbaik untuk mengatur tata letak satu dimensi (baris *atau* kolom), maka **CSS Grid** adalah sistem tata letak dua dimensi yang mampu mengatur baris (*rows*) dan kolom (*columns*) secara bersamaan. CSS Grid sangat cocok digunakan untuk membangun struktur halaman web yang besar dan kompleks."
                  ],
                },
                {
                  heading: "Perbedaan Flexbox dan CSS Grid",
                  paragraphs: [
                    "**Flexbox (1-Dimension):** Digunakan untuk mengatur elemen yang hanya bergerak dalam satu arah, misalnya deretan menu navigasi, tombol, atau kartu produk.",
                    "**CSS Grid (2-Dimension):** Digunakan untuk membangun struktur utama halaman web, seperti membagi area menjadi *header*, *sidebar*, konten utama, dan *footer* sekaligus."
                  ],
                },
                {
                  heading: "Anatomi CSS Grid",
                  paragraphs: [
                    "**Grid Container:** Elemen induk yang diaktifkan menggunakan `display: grid;`.",
                    "**Grid Items:** Semua elemen anak yang berada langsung di dalam *Grid Container*.",
                    "**Grid Lines:** Garis pembatas tak terlihat yang memisahkan setiap kolom dan baris.",
                    "**Grid Track:** Satu kolom atau satu baris di dalam Grid.",
                    "**Grid Cell:** Satu kotak terkecil hasil perpotongan satu baris dan satu kolom.",
                    "**Grid Area:** Gabungan beberapa *Grid Cell* menjadi satu area yang lebih besar."
                  ],
                }
              ],

              tip: "Gunakan CSS Grid untuk menyusun struktur utama halaman, kemudian gunakan Flexbox di dalam setiap bagian Grid untuk mengatur isi komponennya. Kombinasi ini merupakan praktik yang umum digunakan dalam pengembangan web modern.",

              note: "Setelah menambahkan `display: grid;`, tampilan halaman mungkin belum berubah. Hal ini terjadi karena jumlah kolom atau baris belum ditentukan menggunakan properti Grid lainnya.",

              warning: "Jangan menggunakan properti khusus Flexbox seperti `flex-direction` atau `flex-wrap` pada elemen yang sudah menggunakan `display: grid;`, karena properti tersebut akan diabaikan oleh browser.",

              exampleCode: {
                html: `<div class="kontainer-grid">\n  <div class="kotak-anak">Kolom 1</div>\n  <div class="kotak-anak">Kolom 2</div>\n  <div class="kotak-anak">Kolom 3</div>\n</div>`,
                css: `.kontainer-grid {\n  display: grid;\n  grid-template-columns: 200px 200px 200px;\n  gap: 15px;\n\n  background-color: #2c3e50;\n  padding: 15px;\n}\n\n.kotak-anak {\n  background-color: #e67e22;\n  color: white;\n  padding: 30px;\n  font-weight: bold;\n  text-align: center;\n}`,
                js: ``
              },

              starterCode: {
                html: `<div class="grid-laporan">\n  <div>Data 1</div>\n  <div>Data 2</div>\n  <div>Data 3</div>\n  <div>Data 4</div>\n</div>`,
                css: `.grid-laporan {\n\n}`,
                js: ``
              },

              challenge: {
                title: "Membuat Grid Tiga Kolom",
                description: "Mari buat fondasi CSS Grid pertamamu untuk membagi elemen menjadi beberapa kolom secara otomatis.",
                checklist: [
                  "Buat sebuah `div` dengan class `grid-laporan`.",
                  "Tambahkan empat elemen `div` di dalamnya dan isi dengan teks bebas.",
                  "Aktifkan CSS Grid menggunakan `display: grid;`.",
                  "Gunakan `grid-template-columns: 300px 300px;` untuk membuat dua kolom.",
                  "Tambahkan `gap: 20px;` agar setiap kotak memiliki jarak.",
                  "Jalankan di browser dan perhatikan bagaimana empat kotak otomatis tersusun menjadi dua baris dan dua kolom."
                ]
              },
            },
            },
          { name: "Grid Column dan Rows",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Pada materi sebelumnya, kita sudah memotong kolom menggunakan nilai statis seperti **200px**. Namun, kekuatan sejati dari CSS Grid akan muncul ketika kita mulai menggunakan unit dinamis seperti **`fr` (Fraction)** dan fungsi efisiensi seperti **`repeat()`**. Di materi ini, kita akan mempelajari cara mengontrol ukuran serta jumlah kolom dan baris secara fleksibel agar *layout* web kita adaptif di berbagai ukuran layar."
                    ],
                  },
                  {
                    heading: "Senjata Utama Pengaturan Grid Track",
                    paragraphs: [
                      "**1. Unit `fr` (Fractional Unit)**",
                      "Unit **`fr`** adalah unit khusus dalam CSS Grid yang mewakili satu bagian dari ruang kosong yang tersisa. Unit ini sangat sakti karena ia akan menghitung sisa ruang kontainer secara otomatis setelah dikurangi oleh **`gap`** atau elemen berukuran statis (**`px`**).",
                      "Jika kamu menulis **`grid-template-columns: 1fr 1fr 1fr;`**, artinya kontainer akan dibagi menjadi 3 kolom yang memiliki luas sama besar.",
                      "Jika kamu menulis **`grid-template-columns: 1fr 2fr 1fr;`**, maka kolom kedua akan berukuran dua kali lebih besar dibandingkan kolom pertama dan ketiga.",
                      "**2. Fungsi `repeat()`**",
                      "Capek mengetik **`1fr`** berulang kali jika ingin membuat 12 kolom? CSS Grid punya solusi cerdas bernama **`repeat()`**. Fungsi ini menerima dua argumen: jumlah pengulangan dan ukuran *track*-nya.",
                      "**`grid-template-columns: repeat(3, 1fr);`** sama persis hasilnya dengan menulis **`1fr 1fr 1fr`**.",
                      "**`grid-template-columns: repeat(4, 250px);`** akan membuat 4 kolom yang masing-masing berukuran tetap **250px**.",
                      "**3. `grid-template-rows`**",
                      "Sama seperti kolom, properti ini digunakan untuk menentukan tinggi dari baris-baris grid secara spesifik. Namun, jika kamu tidak mengaturnya, *browser* secara otomatis akan memberikan nilai **`auto`**, yang artinya tinggi baris akan menyesuaikan dengan tinggi konten tertinggi di dalam baris tersebut."
                    ],
                  }
                ],

                tip: "Kamu bisa menggabungkan unit statis (**`px`**) dan unit dinamis (**`fr`**) dalam satu perintah. Teknik ini sangat berguna saat membuat struktur admin *dashboard* laporan sistemmu.\n\n**Contoh:** **`grid-template-columns: 250px 1fr;`**\n\nArtinya, kolom pertama (*sidebar* kiri) akan dikunci mati di ukuran **250px**, sedangkan kolom kedua (konten utama) akan melar menghabiskan sisa seluruh ruang layar yang ada.",

                note: "Jika jumlah elemen anak melebihi jumlah slot grid yang sudah kamu definisikan di **`grid-template-columns`**, elemen-elemen anak sisanya otomatis akan turun ke bawah membentuk baris baru. Baris baru yang tercipta secara otomatis ini disebut sebagai **Implicit Grid**.",

                warning: "Hati-hati saat memberikan nilai **`height`** statis (seperti **`height: 100px;`**) pada **`grid-template-rows`** jika konten di dalamnya berupa teks dinamis yang panjang. Jika teksnya terlalu panjang, konten tersebut akan jebol keluar melewati batas bawah kotak baris (*overflow*). Lebih aman biarkan bernilai **`auto`** atau gunakan fungsi pembatas.",

                exampleCode: {
                  html: `<div class="dashboard-container">\n  <aside class="sidebar">Menu Navigasi</aside>\n  <main class="konten-utama">Widget Analisis A</main>\n  <main class="konten-utama">Widget Analisis B</main>\n</div>`,
                  css: `/* style.css */\n.dashboard-container {\n  display: grid;\n  \n  /* Kolom 1 = 250px (Sidebar), Kolom 2 dan 3 berbagi sisa ruang sama besar */\n  grid-template-columns: 250px 1fr 1fr;\n  \n  /* Mengatur baris pertama setinggi 200px, baris berikutnya otomatis (auto) */\n  grid-template-rows: 200px auto;\n  \n  gap: 20px;\n  background-color: #f4f6f7;\n  padding: 20px;\n  min-height: 100vh; /* Tinggi penuh satu layar */\n}\n\n.sidebar {\n  background-color: #2c3e50;\n  color: white;\n  padding: 20px;\n  grid-row: span 2; /* Sidebar disuruh memanjang ke bawah melewati 2 baris */\n}\n\n.konten-utama {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  padding: 20px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<div class="dashboard-container">\n  <div>Kolom 1</div>\n  <div>Kolom 2</div>\n  <div>Kolom 3</div>\n</div>`,
                  css: `.dashboard-container {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Membagi Layout Dashboard Proporsional",
                  description: "Mari aplikasikan unit **`fr`** dan fungsi **`repeat()`** untuk membuat grid dengan proporsi yang presisi dan rapi.",
                  checklist: [
                    "Di file HTML, buat sebuah kontainer induk dan isi dengan 3 elemen anak di dalamnya.",
                    "Setel kontainer induk menjadi **`display: grid;`** dengan **`gap: 15px;`**.",
                    "Gunakan unit **`fr`** untuk membuat susunan 3 kolom dengan perbandingan proporsi **1:3:1** (Tulis: **`grid-template-columns: 1fr 3fr 1fr;`**).",
                    "Lihat hasilnya di *browser*. Perhatikan bagaimana kolom tengah otomatis menjadi tiga kali lebih luas daripada kolom kanan dan kirinya, sangat cocok untuk area konten utama yang diapit dua *sidebar*."
                  ]
                },
              },
            },
          { name: "Grid Template Areas",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Jika pada materi sebelumnya kita menata letak halaman menggunakan koordinat garis angka atau fungsi **`span`** yang lumayan menguras logika, CSS Grid punya cara yang jauh lebih visual dan intuitif bernama **`grid-template-areas`**. Properti ini memungkinkan kamu untuk 'menggambar' denah tata letak halaman web secara langsung di dalam kode CSS menggunakan representasi teks (kata kunci). Tampilan kodemu akan terlihat persis seperti sketsa bentuk web yang kamu inginkan."
                    ],
                  },
                  {
                    heading: "Cara Kerja Grid Template Areas",
                    paragraphs: [
                      "Untuk menggunakan teknik ini, ada dua langkah berurutan yang harus kamu lakukan:"
                    ],
                  },
                  {
                    heading: "Langkah 1: Berikan Nama pada Elemen Anak (`grid-area`)",
                    paragraphs: [
                        "Kamu harus memberikan nama alias (identitas khusus) pada masing-masing elemen anak menggunakan properti `grid-area`. Nama ini bebas kamu tentukan sendiri.",
                        "**CSS**",
                        "**`.header-sistem { grid-area: kepala; }`**",
                        "**`.sidebar-sistem { grid-area: sayap; }`**",
                        "**`.konten-sistem { grid-area: badan; }`**",
                        "**`.footer-sistem { grid-area: kaki; }`**"
                      ],
                    },
                    {
                      heading: "Langkah 2: Gambar Peta pada Elemen Induk (`grid-template-areas`)",
                      paragraphs: [
                        "Setelah semua anak punya nama, panggil elemen induk dan susun nama-nama alias tersebut di dalam tanda petik untuk membentuk baris dan kolom denah webmu."
                      ],
                    }
                  ],

                tip: "Jika di dalam denah grid yang kamu gambar ada area sel yang ingin kamu biarkan kosong (tidak diisi oleh komponen apa pun), kamu cukup menuliskan tanda titik (**`.`**) pada posisi sel tersebut di dalam peta **`grid-template-areas`**.",

                note: "Setiap baris di dalam **`grid-template-areas`** harus memiliki jumlah kolom yang sama. Jika baris pertama berisi tiga kata kunci, maka semua baris berikutnya juga harus memiliki tiga kata kunci. Jika tidak, browser akan menganggap konfigurasi grid tersebut tidak valid.",

                warning: "Nama alias yang digunakan pada **`grid-area`** tidak boleh menggunakan tanda petik dan tidak boleh diawali angka. Cukup gunakan nama sederhana seperti **`header`**, **`sidebar`**, atau **`utama`**. Tanda petik hanya digunakan saat menyusun denah pada **`grid-template-areas`**.",

                exampleCode: {
                  html: `<div class="wadah-halaman">\n  <header class="header-sistem">Header Laporan (v1.0)</header>\n  <aside class="sidebar-sistem">Menu Kontrol</aside>\n  <main class="konten-sistem">Area Teks Analisis Sistem & Diagram</main>\n  <footer class="footer-sistem">© 2026 Hak Cipta Projek Laporan</footer>\n</div>`,
                  css: `/* style.css */\n\n/* 1. Hubungkan Elemen Anak dengan Nama Alias */\n.header-sistem {\n  grid-area: kepala;\n  background-color: #2c3e50;\n  color: white;\n}\n\n.sidebar-sistem {\n  grid-area: sayap;\n  background-color: #7f8c8d;\n  color: white;\n}\n\n.konten-sistem {\n  grid-area: badan;\n  background-color: #ffffff;\n}\n\n.footer-sistem {\n  grid-area: kaki;\n  background-color: #34495e;\n  color: white;\n}\n\n/* 2. Aktifkan Grid dan Gambar Petanya di Elemen Induk */\n.wadah-halaman {\n  display: grid;\n\n  grid-template-columns: 250px 1fr 1fr;\n  grid-template-rows: 80px auto 60px;\n  gap: 15px;\n\n  grid-template-areas:\n    "kepala kepala kepala"\n    "sayap badan badan"\n    "kaki kaki kaki";\n\n  min-height: 100vh;\n  background-color: #f5f6fa;\n  padding: 15px;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<div class="wadah-halaman">\n  <header class="header-sistem">Header</header>\n  <aside class="sidebar-sistem">Sidebar</aside>\n  <main class="konten-sistem">Konten</main>\n  <footer class="footer-sistem">Footer</footer>\n</div>`,
                  css: `.wadah-halaman {\n\n}\n\n.header-sistem {\n\n}\n\n.sidebar-sistem {\n\n}\n\n.konten-sistem {\n\n}\n\n.footer-sistem {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Menggambar Struktur Halaman Berita",
                  description: "Mari latih imajinasi visualmu dengan memetakan struktur tata letak tiga kolom menggunakan properti **`grid-template-areas`**.",
                  checklist: [
                    "Gunakan struktur 4 elemen anak dari contoh kode di atas.",
                    "Ubah nama alias (**`grid-area`**) menjadi **`top`**, **`menu`**, **`main`**, dan **`bottom`**.",
                    "Pada elemen induk gunakan **`grid-template-columns: 1fr 2fr 1fr;`**.",
                    "Susun **`grid-template-areas`** sehingga baris pertama berisi **`top top top`**.",
                    "Pada baris kedua gunakan **`menu main .`** sehingga kolom terakhir menjadi area kosong.",
                    "Pada baris ketiga gunakan **`bottom bottom bottom`**.",
                    "Jalankan di browser dan pastikan terdapat area kosong di sebelah kanan area konten utama."
                  ]
                },
              },
            },
          
        ],
      },
      {
        title: "Responsive & Animasi",
        icon: "📱",
        lessons: [
          { name: "Media Queries Dasar",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Hingga saat ini, kita sudah belajar cara membuat tata letak yang rapi menggunakan *Flexbox* dan *Grid*. Namun, sebuah halaman web yang bagus tidak hanya harus terlihat rapi di layar monitor laptop, melainkan harus tetap nyaman dibaca saat dibuka melalui layar *smartphone* yang sempit. **Media Queries** adalah fitur CSS yang memungkinkan kita menerapkan gaya desain yang berbeda-beda tergantung pada karakteristik perangkat yang digunakan (seperti lebar layar, tinggi layar, atau orientasi perangkat)."
                    ],
                  },
                  {
                    heading: "Konsep Responsive Web Design (RWD)",
                    paragraphs: [
                      "Dahulu, para pengembang web harus membuat dua buah situs terpisah (misalnya **detik.com** untuk desktop dan **m.detik.com** untuk handphone). Sekarang, dengan **Media Queries**, kita cukup membuat satu file HTML dan satu file CSS yang sama, namun tampilan visualnya otomatis akan berubah bentuk dan melar atau menciut secara dinamis mengikuti lebar wadah layar pembacanya."
                    ],
                  },
                  {
                    heading: "Sintaks Dasar Media Queries",
                    paragraphs: [
                      "Untuk menuliskan *Media Query*, kita menggunakan aturan `@media` diikuti oleh kondisi spesifik perangkat yang ingin kita sasar. Gaya CSS di dalam kurung kurawal hanya akan aktif jika kondisi tersebut terpenuhi."
                    ],
                  },
                  {
                    heading: "Istilah Kunci",
                    paragraphs: [
                      "**screen:** Menandakan bahwa aturan ini berlaku untuk perangkat berlayar (monitor, HP, dan tablet), bukan media cetak seperti printer.",
                      "**max-width: 768px:** Menentukan batas maksimum lebar layar. Jika lebar layar **768px** atau lebih kecil, maka aturan CSS di dalam *Media Query* akan dijalankan.",
                      "**min-width: 1024px:** Kebalikan dari **max-width**. Aturan CSS baru akan aktif jika lebar layar minimal **1024px** atau lebih besar."
                    ],
                  }
                ],

                tip: "Standar industri modern menyarankan pendekatan **Mobile-First Design**. Tulis CSS dasar untuk tampilan HP terlebih dahulu, kemudian gunakan `@media (min-width: ...)` untuk menambahkan tampilan yang lebih kompleks pada layar yang lebih besar.",

                note: "Agar Media Queries bekerja dengan benar di perangkat seluler, pastikan tag `<meta name=\"viewport\">` sudah ditambahkan di dalam bagian `<head>` pada file HTML.",

                warning: "Letakkan seluruh blok `@media` di bagian paling bawah file CSS. Jika diletakkan sebelum aturan CSS utama, hasilnya bisa tertimpa oleh aturan setelahnya karena sifat **Cascading** pada CSS.",

                exampleCode: {
                  html: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                  css: `/* =================================================== */\n/* 1. TAMPILAN DEFAULT (UNTUK DESKTOP / MONITOR PC)     */\n/* =================================================== */\n.wadah-halaman {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-areas:\n    "kepala kepala"\n    "sayap badan";\n  gap: 15px;\n}\n\n.header {\n  grid-area: kepala;\n  background: #2c3e50;\n  color: white;\n}\n\n.sidebar {\n  grid-area: sayap;\n  background: #7f8c8d;\n  color: white;\n}\n\n.content {\n  grid-area: badan;\n  background: #ffffff;\n}\n\n/* =================================================== */\n/* 2. ATURAN RESPONSIF (UNTUK LAYAR HP MAKSIMAL 768PX)  */\n/* =================================================== */\n@media screen and (max-width: 768px) {\n  .wadah-halaman {\n    grid-template-columns: 1fr;\n\n    grid-template-areas:\n      "kepala"\n      "sayap"\n      "badan";\n  }\n\n  .sidebar {\n    background: #e74c3c;\n  }\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<body>\n  <h1>Halo Responsive Web</h1>\n</body>`,
                  css: `body {\n  background-color: lightblue;\n}\n\n`,
                  js: ``
                },

                challenge: {
                  title: "Mengubah Warna Background Responsif",
                  description: "Mari buat eksperimen Media Query sederhana untuk memahami bagaimana CSS mendeteksi perubahan ukuran layar.",
                  checklist: [
                    "Buat satu tag `<body>` yang berisi satu elemen `<h1>`.",
                    "Berikan `background-color: lightblue;` pada selector `body`.",
                    "Di bagian paling bawah file CSS, buat blok `@media screen and (max-width: 600px) { ... }`.",
                    "Di dalam blok `@media`, ubah warna `body` menjadi `background-color: lightcoral;`.",
                    "Jalankan di browser, lalu ubah ukuran jendela browser dan perhatikan warna latar berubah saat lebar layar kurang dari **600px**."
                  ]
                },
              },
            },
          { name: "Hover dan Transition Effect",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Halaman web yang statis sering kali terasa kaku dan membosankan. Untuk memberikan pengalaman pengguna (*user experience*) yang lebih premium dan interaktif, kita bisa memanfaatkan *Pseudo-class* `:hover` dan properti `transition`. Gabungan kedua fitur ini memungkinkan kita mengubah gaya suatu elemen (misalnya mengubah warna tombol atau memperbesar ukuran kartu diagram) secara halus dan perlahan, bukan berubah secara instan."
                    ],
                  },
                  {
                    heading: "Komponen Interaktivitas Halus",
                    paragraphs: [
                      "Untuk membuat efek interaktif yang nyaman dilihat, CSS menyediakan dua fitur utama, yaitu `:hover` dan `transition`."
                    ],
                  },
                  {
                    heading: "1. Pseudo-class `:hover`",
                    paragraphs: [
                      "`:hover` adalah sebuah *state* atau kondisi khusus yang ditempelkan di belakang selektor CSS. Kode di dalam selektor ini hanya akan aktif ketika kursor mouse pengguna melayang di atas elemen tersebut."
                    ],
                  },
                  {
                    heading: "2. Properti `transition`",
                    paragraphs: [
                      "Secara bawaan, saat kursor menyentuh sebuah elemen, perubahan tampilannya akan terjadi secara instan. Properti `transition` bertugas memberikan durasi waktu agar perubahan tersebut berjalan mulus seperti efek memudar (*fading*).",
                      "**Property:** Nama properti CSS yang ingin dianimasikan, misalnya `background-color`, `transform`, atau `all` untuk semua properti yang didukung.",
                      "**Duration:** Lama animasi berlangsung, misalnya `0.3s` atau `1s`.",
                      "**Timing Function:** Mengatur karakteristik kecepatan animasi, misalnya `linear` atau `ease-in-out`."
                    ],
                  }
                ],

                tip: "Kesalahan yang paling sering dilakukan pemula adalah menuliskan `transition` di dalam blok `:hover`. Selalu letakkan properti `transition` pada selector utama (kondisi normal), bukan pada selector `:hover`, agar animasi berjalan mulus saat kursor masuk maupun keluar.",

                note: "Penulisan `transition` dapat dipersingkat menggunakan bentuk *shorthand*, misalnya `transition: all 0.3s ease-in-out;`.",

                warning: "Tidak semua properti CSS dapat dianimasikan menggunakan `transition`. Properti seperti `display` atau `font-family` tidak mendukung animasi transisi, sedangkan properti seperti `background-color`, `opacity`, `transform`, `width`, dan `border-radius` dapat dianimasikan dengan baik.",

                exampleCode: {
                  html: `<div class="kartu-metrik">\n  <h3>Efisiensi Sistem</h3>\n  <p>Status: Kecepatan server optimal di angka 98%.</p>\n</div>`,
                  css: `.kartu-metrik {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  padding: 25px;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n\n  transition: all 0.3s ease;\n}\n\n.kartu-metrik:hover {\n  background-color: #f8fafc;\n  border-color: #3498db;\n  transform: translateY(-5px);\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<button class="btn-unduh">Unduh Laporan Akhir</button>`,
                  css: `.btn-unduh {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Membuat Efek Tombol Mengembang",
                  description: "Mari buat sebuah tombol aksi utama (*Call to Action*) yang akan melebar secara halus dan berganti warna saat disorot kursor.",
                  checklist: [
                    "Buat sebuah tag `<button>` dengan teks **Unduh Laporan Akhir** dan beri `class=\"btn-unduh\"`.",
                    "Hias tombol dengan `background-color: #2ecc71;`, warna teks putih, hilangkan border, dan beri `padding` secukupnya.",
                    "Tambahkan `transition: background-color 0.4s, transform 0.4s;` pada `.btn-unduh`.",
                    "Buat selector `.btn-unduh:hover`, lalu ubah warna latar menjadi `#3498db` dan tambahkan `transform: scale(1.1);`.",
                    "Jalankan di browser, lalu arahkan kursor ke tombol dan amati efek transisinya."
                  ]
                },
              },
            },
          { name: "Keyframes Animation",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Jika pada materi sebelumnya kita belajar membuat animasi yang sifatnya reaktif (baru berjalan ketika dipicu kursor melalui `:hover`), maka di materi ini kita akan mempelajari **CSS Animations** menggunakan `@keyframes`. Fitur ini memungkinkan kita membuat animasi mandiri yang memiliki banyak tahapan perubahan dan dapat berjalan otomatis saat halaman web pertama kali dimuat."
                    ],
                  },
                  {
                    heading: "Dua Komponen Utama Animasi CSS",
                    paragraphs: [
                      "Untuk membuat animasi yang berjalan otomatis, CSS membutuhkan dua komponen utama, yaitu `@keyframes` dan properti `animation`."
                    ],
                  },
                  {
                    heading: "1. Deklarasi Alur Film (`@keyframes`)",
                    paragraphs: [
                      "`@keyframes` digunakan untuk menyusun skenario jalannya animasi dari awal hingga akhir. Timeline animasi dibagi menggunakan persentase mulai dari `0%` hingga `100%`."
                    ],
                  },
                  {
                    heading: "2. Properti Pemicu Film (`animation`)",
                    paragraphs: [
                      "Setelah skenario animasi selesai dibuat, kita perlu menghubungkannya ke elemen HTML menggunakan properti `animation` agar animasi dapat dijalankan."
                    ],
                  },
                  {
                    heading: "Properti Turunan `animation` yang Sering Dipakai",
                    paragraphs: [
                      "**animation-name:** Menentukan nama `@keyframes` yang akan digunakan.",
                      "**animation-duration:** Menentukan lama animasi berjalan dari awal hingga akhir, misalnya `2s`.",
                      "**animation-iteration-count:** Menentukan jumlah pengulangan animasi. Bisa berupa angka tertentu atau `infinite` agar terus berulang.",
                      "**animation-direction:** Menentukan arah animasi. Nilai `alternate` membuat animasi berjalan maju lalu kembali mundur secara halus."
                    ],
                  }
                ],

                tip: "Semua properti animasi dapat ditulis menggunakan bentuk *shorthand*, misalnya `animation: contohAnimasi 2s ease-in 0.5s infinite alternate;` sehingga kode menjadi lebih ringkas.",

                note: "Untuk animasi sederhana, kamu dapat menggunakan kata kunci `from` dan `to` sebagai pengganti `0%` dan `100%` di dalam `@keyframes`.",

                warning: "Gunakan animasi secukupnya. Terlalu banyak elemen yang bergerak secara bersamaan dapat mengganggu kenyamanan pengguna serta meningkatkan beban render browser.",

                exampleCode: {
                  html: `<div class="panel-status">\n  <span class="lampu-indikator"></span>\n  <p>Sistem Pemantauan Aktif</p>\n</div>`,
                  css: `.panel-status {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 20px;\n}\n\n.lampu-indikator {\n  width: 15px;\n  height: 15px;\n  background-color: #2ecc71;\n  border-radius: 50%;\n\n  animation: denyut 1.2s ease-in-out infinite alternate;\n}\n\n@keyframes denyut {\n  0% {\n    transform: scale(0.8);\n    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);\n  }\n\n  100% {\n    transform: scale(1.2);\n    box-shadow: 0 0 12px 6px rgba(46, 204, 113, 0);\n  }\n}`,
                  js: ``
                },

                starterCode: {
                  html: `<h1 class="judul-laporan">Laporan Akhir Analisis Sistem</h1>`,
                  css: `.judul-laporan {\n\n}`,
                  js: ``
                },

                challenge: {
                  title: "Membuat Efek Teks Muncul Perlahan (Fade-In)",
                  description: "Mari buat efek animasi sambutan profesional di mana judul halaman akan muncul secara perlahan dari bawah saat halaman pertama kali dibuka.",
                  checklist: [
                    "Buat elemen `<h1>` dengan teks **Laporan Akhir Analisis Sistem** dan beri `class=\"judul-laporan\"`.",
                    "Buat `@keyframes munculDariBawah` di bagian bawah file CSS.",
                    "Atur kondisi `from` dengan `opacity: 0;` dan `transform: translateY(30px);`.",
                    "Atur kondisi `to` dengan `opacity: 1;` dan `transform: translateY(0);`.",
                    "Tambahkan `animation: munculDariBawah 1.5s ease-out;` pada `.judul-laporan`.",
                    "Segarkan halaman browser dan amati efek teks yang muncul secara perlahan."
                  ]
                },
              },
            },
        ],
      },
      {
        title: "Mini Project",
        icon: "🚀",
        lessons: [
          { name: "Membuat landing page responsive"},
          { name: "Mini challenge CSS"},
        ],
      },
    ],

    ctaSubtitle: "Cocok untuk kamu yang sudah kenal HTML",
    ctaAudience: [
      "Sudah belajar HTML dasar",
      "Ingin desain lebih keren",
      "Mau kuasai layout modern",
    ],

    // ── Frontend Learning Path preview ──────────────────────────────────────
    curriculumPreview: [
      "CSS Introduction",
      "Selectors",
      "Colors",
      "Typography",
      "Box Model",
      "Flexbox",
      "Grid",
      "Responsive Design",
      "Animation",
      "Transition",
    ],
  },

  // ── JavaScript ────────────────────────────────────────────────────────────
  {
    id: "javascript-level-3",
    title: "JavaScript Basics",
    description:
      "Tambahkan interaksi seru ke website menggunakan JavaScript dasar.",
    thumbnail: "",
    level: "Mahir",
    language: "JavaScript",
    fullDescription:
      "Waktunya membuat website-mu hidup dan interaktif! JavaScript akan mengajarkan kamu cara membuat tombol yang bereaksi, menampilkan pesan, mengubah konten halaman secara dinamis, dan menciptakan pengalaman pengguna yang seru.",
    lessons: 12,
    rating: 4.9,
    students: 2100,
    order: 3,
    topics: ["Variables", "Function", "Event Button", "DOM Basics", "Mini Interaction"],
    color: "#F7DF1E",

    xp: 200,
    heroDescription:
      "Tambahkan interaksi seru dan buat website kamu benar-benar hidup dengan JavaScript!",

    statBadges: [
      {
        icon: BookOpen,
        label: "12 Materi",
        color: "text-blue-300",
        bg: "bg-blue-500/15 border-blue-400/20",
      },
      {
        icon: Trophy,
        label: "+200 XP",
        color: "text-yellow-300",
        bg: "bg-yellow-500/15 border-yellow-400/20",
      },
      {
        icon: Target,
        label: "Pro Level",
        color: "text-red-300",
        bg: "bg-red-500/15 border-red-400/20",
      },
      {
        icon: MonitorSmartphone,
        label: "Interactive App",
        color: "text-orange-400",
        bg: "bg-orange-500/15 border-orange-400/20",
      },
    ],

    codePreviewFile: "script.js",
    codePreview: [
      {
        indent: 0,
        tokens: [
          { text: "const ", colorClass: "text-purple-300" },
          { text: "greeting", colorClass: "text-blue-300" },
          { text: ' = "Hello!";', colorClass: "text-orange-400" },
        ],
      },
      {
        indent: 0,
        tokens: [
          { text: "function ", colorClass: "text-purple-300" },
          { text: "sayHi", colorClass: "text-blue-300" },
          { text: "() {", colorClass: "text-white/70" },
        ],
      },
      {
        indent: 1,
        tokens: [
          { text: "console.", colorClass: "text-white/70" },
          { text: "log", colorClass: "text-yellow-300" },
          { text: "(greeting);", colorClass: "text-white/60" },
        ],
      },
      {
        indent: 0,
        tokens: [{ text: "}", colorClass: "text-white/70" }],
      },
    ],

    learningTopics: [
      {
        icon: Hash,
        color: "bg-blue-50 text-blue-600",
        title: "Variable",
        desc: "Pelajari cara menyimpan dan menggunakan data dengan variabel.",
      },
      {
        icon: Code2,
        color: "bg-purple-50 text-purple-600",
        title: "Function",
        desc: "Buat blok kode yang bisa dipanggil berulang kali dengan mudah.",
      },
      {
        icon: Monitor,
        color: "bg-teal-50 text-teal-600",
        title: "DOM Manipulation",
        desc: "Ubah isi dan tampilan halaman web secara langsung.",
      },
      {
        icon: MousePointer,
        color: "bg-orange-50 text-orange-500",
        title: "Event Handling",
        desc: "Buat website bereaksi saat klik, ketik, atau hover.",
      },
      {
        icon: GitBranch,
        color: "bg-green-50 text-green-600",
        title: "Condition",
        desc: "Kendalikan alur program dengan if/else dan logika.",
      },
      {
        icon: Globe,
        color: "bg-rose-50 text-rose-500",
        title: "Interactive Website",
        desc: "Gabungkan semua skill untuk membuat website yang interaktif.",
      },
    ],

    curriculum: [
      {
        title: "Dasar JavaScript",
        icon: "✨",
        lessons: [
          { name: "Apa itu JavaScript (JS)?",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Kalau kemarin kita belajar HTML sebagai kerangka tulang dan CSS sebagai pakaian/kulit, maka JavaScript adalah otak dan ototnya.",
                      "JS adalah bahasa pemrograman yang bikin halaman web lu jadi \"hidup\" dan bisa diajak interaksi. Tanpa JS, web lu cuma sekadar poster digital yang diam. Dengan JS, web lu bisa merespons klik tombol, memunculkan pop-up, memvalidasi form, sampai mengambil data dari server tanpa perlu refresh halaman."
                    ],
                  },
                  {
                    heading: "Cara Menyisipkan JS ke HTML",
                    paragraphs: [
                      "Sama persis kayak CSS, ada dua cara utama buat memasukkan kode JS ke dalam file HTML lu:"
                    ],
                  },
                  {
                    heading: "Cara 1: Internal (Langsung di HTML)",
                    paragraphs: [
                      "Lu bisa nulis kode JS langsung di dalam tag `<script>`. Biasanya ditaruh di bagian paling bawah sebelum tag penutup `</body>`."
                    ],
                  },
                  {
                    heading: "Cara 2: External (File Terpisah)",
                    paragraphs: [
                      "🌟 *Best Practice* Ini cara paling direkomendasikan biar kode lu nggak berantakan. Lu bikin file baru (misal: `app.js`), lalu hubungkan ke HTML pakai atribut `src`."
                    ],
                  },
                  {
                    heading: "Variable (Wadah Penyimpanan)",
                    paragraphs: [
                      "Variabel itu ibarat kotak kosong yang lu kasih label nama, terus kotaknya bisa lu isi barang (data), dan barangnya bisa lu ambil atau ganti kapan aja.",
                      "Di JavaScript modern, ada dua kata kunci utama buat bikin kotak ini:"
                    ],
                  },
                  {
                    heading: "1. let (Kotak yang isinya bisa diganti-ganti)",
                    paragraphs: [
                      "Gunakan `let` kalau lu tahu nilai datanya bakal berubah di masa depan (misal: skor game, umur, status)."
                    ],
                  },
                  {
                    heading: "2. const (Kotak yang digembok / Konstanta)",
                    paragraphs: [
                      "Gunakan `const` (konstan) kalau nilai datanya mutlak dan nggak boleh diubah-ubah oleh siapa pun (misal: tanggal lahir, rumus phi, elemen DOM)."
                    ],
                  }
                ],

                tip: "Kenapa tag `<script>` ditaruh di paling bawah (sebelum `</body>`) dan bukan di `<head>`? Biar browser selesai ngebaca (*render*) semua elemen HTML (tampilan visual) lu dulu dari atas ke bawah. Kalau JS ditaruh di atas dan kodenya berat, web lu bakal kerasa *loading*-nya lama dan layarnya putih doang.",

                note: "Aturan penamaan variabel di JavaScript itu lumayan ketat tapi logis:\n\n1. Dilarang pakai spasi: `let judul laporan` (❌ ERROR)\n2. Dilarang diawali angka: `let 1tahap` (❌ ERROR)\n3. Gunakan gaya *camelCase*: Ini adalah standar emas programmer JS. Kata pertama diawali huruf kecil, dan kata berikutnya digabung tapi diawali huruf besar. Contoh yang benar: `judulLaporan`, `tahapSatu`, `sistemAnalisis`.",

                warning: "Dulu banget, orang pakai `var` buat bikin variabel. Tapi sekarang, jauhi `var`! `var` punya kelemahan sistem (sering bocor ke mana-mana dan bikin bug yang susah dicari). Biasakan selalu pakai `let` atau `const`.",

                exampleCode: {
                  html: `<!DOCTYPE html>
            <html lang="id">
            <head>
              <meta charset="UTF-8">
              <title>Dokumentasi Sistem</title>
            </head>
            <body>
              <h1>Buka Konsol Browser Lu!</h1>
              
              <script src="app.js"></script>
            </body>
            </html>`,
                  css: ``,
                  js: `/* app.js */

            // Menggunakan 'const' untuk data paten yang nggak akan berubah
            const judulDokumen = "Laporan Akhir Sistem Analisis";
            const lokasiPengerjaan = "Bekasi";

            // Menggunakan 'let' untuk data yang statusnya masih berjalan/bisa di-update
            let statusLaporan = "Sedang Disusun";
            let persentaseSelesai = 75;

            // Menampilkan isi kotak variabel ke dalam layar rahasia developer (Konsol)
            console.log(judulDokumen);
            console.log("Lokasi:", lokasiPengerjaan);
            console.log("Status Awal:", statusLaporan, "-", persentaseSelesai, "%");

            // Mensimulasikan ada perubahan data di tengah jalan
            statusLaporan = "Revisi Diagram Flow";
            persentaseSelesai = 80;

            console.log("Status Update:", statusLaporan, "-", persentaseSelesai, "%");`
                },

                starterCode: {
                  html: `<!DOCTYPE html>
            <html lang="id">
            <head>
              <meta charset="UTF-8">
              <title>Belajar JavaScript</title>
            </head>
            <body>

              <script src="app.js"></script>
            </body>
            </html>`,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Deklarasi Variabel Pertamaku",
                  description: "Mari biasakan jari-jari lu menulis variabel JS dengan benar dan melihat hasilnya secara langsung di ruang rahasia browser.",
                  checklist: [
                    "Buat file `index.html` kosong dan satu file `app.js`.",
                    "Hubungkan JS ke HTML pakai tag `<script>` yang disisipkan di atas tag penutup `</body>`.",
                    "Di dalam `app.js`, buat dua variabel `const` (contoh: nama lu dan kota tempat tinggal).",
                    "Buat dua variabel `let` (contoh: aktivitas yang lagi dikerjain dan target selesai).",
                    "Gunakan perintah `console.log()` untuk mencetak semua variabel tersebut.",
                    "Buka file HTML di browser, buka tab **Console**, dan pastikan semua data yang lu ketik tadi muncul dengan mulus tanpa pesan error merah!"
                  ]
                },
              },
          },
          { name: "Tipe Data dan Operator",
              content: {
                sections: [
                  {
                    paragraphs: [
                      "Di Bab 1 kita udah bikin \"kotak\" penyimpanannya (Variabel). Nah, sekarang di Bab 2 kita bakal belajar apa aja barang yang bisa dimasukin ke dalam kotak tersebut (Tipe Data) dan gimana cara kita ngolah barang-barang itu (Operator)."
                    ],
                  },
                  {
                    heading: "Tipe Data Dasar (Primitif)",
                    paragraphs: [
                      "JavaScript punya beberapa tipe data bawaan. Buat pemula, lu wajib banget nangkep 3 tipe data utama ini:"
                    ],
                  },
                  {
                    heading: "String (Teks)",
                    paragraphs: [
                      "Semua yang berupa huruf, kata, atau kalimat. Wajib dibungkus pakai tanda kutip (bisa kutip satu `'...'` atau kutip dua `\"...\"`)."
                    ],
                  },
                  {
                    heading: "Number (Angka)",
                    paragraphs: [
                      "Semua jenis angka, baik bilangan bulat (10) maupun desimal (3.14). Ingat, nulis angka nggak perlu pakai tanda kutip."
                    ],
                  },
                  {
                    heading: "Boolean (Saklar Logika)",
                    paragraphs: [
                      "Tipe data yang cuma punya dua kemungkinan mutlak: `true` (benar/nyala) atau `false` (salah/mati). Ini kepakai banget nanti buat bikin logika (misal: apakah user udah login? Jawabannya cuma `true` atau `false`)."
                    ],
                  },
                  {
                    heading: "Operator Aritmatika dan Logika",
                    paragraphs: [
                      "Setelah punya data, kita butuh alat buat ngolahnya."
                    ],
                  },
                  {
                    heading: "Operator Aritmatika (Matematika Dasar)",
                    paragraphs: [
                      "Sama persis kayak kalkulator jaman SD:",
                      "`+` (Tambah)",
                      "`-` (Kurang)",
                      "`*` (Kali)",
                      "`/` (Bagi)",
                      "`%` (Sisa Bagi / Modulo) -> Contoh: `10 % 3 = 1` (10 dibagi 3 sisa 1)."
                    ],
                  },
                  {
                    heading: "Operator Perbandingan (Menghasilkan Boolean)",
                    paragraphs: [
                      "Buat ngebandingin dua nilai. Hasilnya selalu `true` atau `false`:",
                      "`>` (Lebih besar), `<` (Lebih kecil)",
                      "`>=` (Lebih besar sama dengan), `<=` (Lebih kecil sama dengan)",
                      "`===` (Sama persis, baik nilai maupun tipe datanya)",
                      "`!==` (Tidak sama persis)"
                    ],
                  },
                  {
                    heading: "Operator Logika (Menggabungkan Boolean)",
                    paragraphs: [
                      "`&&` (AND): Bakal `true` HANYA JIKA semua kondisi benar.",
                      "`||` (OR): Bakal `true` JIKA SALAH SATU aja ada yang benar.",
                      "`!` (NOT): Kebalikan (kalau `true` jadi `false`)."
                    ],
                  },
                  {
                    heading: "Template Literals (Sihir Teks Modern)",
                    paragraphs: [
                      "Dulu, kalau kita mau gabungin teks dan variabel, kita harus pakai tanda tambah (`+`) yang rawan banget bikin typo spasi.",
                      "Cara Jadul: `let pesan = \"Halo, nama saya \" + nama + \". Umur saya \" + umur + \" tahun.\";`",
                      "Sekarang, kita punya Template Literals. Caranya, bungkus teks pakai tanda backtick ( ` ) — letaknya biasanya di sebelah kiri angka 1 di keyboard. Lalu, panggil variabel pakai `${...}`.",
                      "Cara Modern: `let pesan = \\`Halo, nama saya ${nama}. Umur saya ${umur} tahun.\\`;` (Jauh lebih rapi dan gampang dibaca!)"
                    ],
                  }
                ],

                note: "Lu mungkin bakal nemu operator sama dengan dobel (`==`) dan sama dengan tripel (`===`).\n\n• Selalu gunakan `===` (*Strict Equality*).\n• Kenapa? Karena `==` itu kadang \"sok tahu\". Kalau lu nulis `5 == \"5\"`, JS bakal bilang `true` (padahal yang satu angka, yang satu teks). Tapi kalau pakai `5 === \"5\"`, JS bakal tegas bilang `false` karena tipe datanya beda. Ini bakal nyelamatin lu dari banyak banget bug!",

                warning: "Hati-hati banget kalau nulis operasi matematika di dalam String.\n\nKalau lu nulis `let hasil = \"5\" + 2;`, hasilnya bukan `7`, melainkan `\"52\"`. Karena ada tanda kutip, JavaScript mengira lu cuma pengen nyambungin dua teks berdampingan, bukan ngitung matematika!",

                exampleCode: {
                  html: ``,
                  css: ``,
                  js: `/* app.js */

            // 1. Tipe Data Dasar
            let namaSistem = "Dashboard V1"; // String
            let skorPerforma = 85;           // Number
            let skorKeamanan = 90;           // Number
            let sudahRilis = false;          // Boolean

            // 2. Operator Aritmatika
            let totalSkor = skorPerforma + skorKeamanan;
            let rataRataSkor = totalSkor / 2;

            // 3. Operator Perbandingan & Logika
            // Sistem dianggap layak KALAU rata-rata di atas 80 DAN belum rilis
            let apakahLayak = (rataRataSkor > 80) && (sudahRilis === false);

            // 4. Template Literals
            let laporan = \`
              Info Sistem: \${namaSistem}
              Nilai Rata-rata: \${rataRataSkor}
              Status Kelayakan: \${apakahLayak}
            \`;

            console.log(laporan);`
                },

                starterCode: {
                  html: ``,
                  css: ``,
                  js: ``
                },

                challenge: {
                  title: "Kalkulator Profil Dinamis",
                  description: "Mari gabungkan semua ilmu tipe data, hitung-hitungan, dan *Template Literals* lu buat bikin profil karakter atau user.",
                  checklist: [
                    "Buka file `app.js` lu. Hapus kode yang lama.",
                    "Buat variabel String `namaUser` (isi dengan nama lu).",
                    "Buat variabel Number `tahunLahir` (isi dengan tahun kelahiran).",
                    "Buat variabel Number `tahunSekarang` (isi dengan angka 2026).",
                    "Hitung umur lu dengan operator kurang (`-`) dan simpan di variabel `umur`.",
                    "Buat variabel Boolean `apakahDewasa` yang mengecek apakah `umur >= 18`.",
                    "Gunakan Template Literals (`) untuk membuat kalimat: `Halo, saya [Nama]. Saya berumur [Umur] tahun. Status dewasa: [true/false].`.",
                    "Tampilkan hasilnya di `console.log()` dan lihat di browser!"
                  ]
                },
              },
            },

          { name: "Kontrol Alur",
            content: {
                sections: [
                  {
                    paragraphs: [
                      "Sejauh ini, kode yang kita tulis berjalan lurus dari atas ke bawah. Nah, **Kontrol Alur (Control Flow)** adalah cara kita memberi 'otak' pada JavaScript agar dia bisa mengambil keputusan (belok ke kiri atau ke kanan) dan melakukan pekerjaan berulang secara otomatis. Ini adalah inti dari semua logika aplikasi yang ada di dunia nyata."
                    ],
                  },
                  {
                    heading: "If Else Statement (Pengambilan Keputusan)",
                    paragraphs: [
                      "Ini adalah cara JS membuat keputusan berdasarkan kondisi tertentu (mengevaluasi Boolean `true` atau `false` yang kita bahas di Bab 2).",
                      "**if:** Jika kondisi benar, jalankan kode A.",
                      "**else if:** Jika kondisi pertama salah, coba cek kondisi kedua ini.",
                      "**else:** Jika semua kondisi di atas salah, jalankan kode terakhir ini (sebagai jalan keluar mutlak)."
                    ],
                  },
                  {
                    heading: "Switch Case (Alternatif yang Rapi)",
                    paragraphs: [
                      "Kalau kamu punya banyak kondisi yang harus dicek (biasanya untuk mengecek nilai yang spesifik/pasti, bukan rentang angka seperti `<` atau `>`), gunakan **switch** agar kode lebih rapi dan mudah dibaca dibandingkan membuat *if else* yang panjang."
                    ],
                  },
                  {
                    heading: "Loop (Perulangan)",
                    paragraphs: [
                      "Malas menulis `console.log()` sampai ratusan kali? Gunakan **Loop** agar JavaScript mengerjakan tugas yang sama secara otomatis."
                    ],
                  },
                  {
                    heading: "for Loop (Perulangan Terukur)",
                    paragraphs: [
                      "Dipakai kalau kamu sudah tahu berapa kali perulangan akan dilakukan. Di dalam kurung terdapat tiga bagian: titik awal, kondisi berhenti, dan perubahan nilai."
                    ],
                  },
                  {
                    heading: "while Loop (Perulangan Tak Tentu)",
                    paragraphs: [
                      "Digunakan jika kamu belum tahu pasti berapa kali perulangan akan berjalan. Selama kondisi masih bernilai `true`, maka perulangan akan terus dilakukan."
                    ],
                  },
                ],

                note: "Kesalahan fatal pemula saat membuat kondisi `if` adalah menggunakan satu tanda sama dengan (`=`). Jika kamu menulis `if (umur = 18)`, artinya kamu sedang memasukkan angka 18 ke variabel `umur`, bukan melakukan pengecekan. Selalu gunakan `===` untuk membandingkan nilai.",

                warning: "Hati-hati dengan **Infinite Loop** (perulangan tanpa batas). Jika kamu membuat `while` tetapi lupa mengubah nilai kondisinya (misalnya lupa menulis `bensin--`), maka browser akan terus menjalankan perulangan hingga tab menjadi lambat atau bahkan crash.",

                exampleCode: {
                  html: ``,
                  css: ``,
                  js: `/* app.js */\n\nconsole.log("--- MULAI SORTIR ANTREAN ---");\n\nfor (let nomorAntrean = 1; nomorAntrean <= 7; nomorAntrean++) {\n  if (nomorAntrean % 2 === 0) {\n    console.log(\`Nomor \${nomorAntrean} adalah GENAP - Silakan ke Loket A.\`);\n  } else {\n    console.log(\`Nomor \${nomorAntrean} adalah GANJIL - Silakan ke Loket B.\`);\n  }\n}\n\nconsole.log("--- SORTIR SELESAI ---");`
                },

                starterCode: {
                  html: ``,
                  css: ``,
                  js: ``,
                },

                challenge: {
                  title: "Bikin Mesin Hitung Mundur Roket",
                  description: "Mari latih logika perulangan dengan membuat sistem hitung mundur (countdown) peluncuran roket.",
                  checklist: [
                    "Buka file `app.js` dan bersihkan isinya.",
                    "Buat sebuah `for` loop yang menghitung mundur dari angka `10` sampai `1`. *(Clue: `for (let i = 10; i >= 1; i--)`)*.",
                    "Di dalam loop tersebut, buat `if else` statement.",
                    "Jika angkanya bukan `1`, cetak di konsol: `Hitung mundur: [angka]...` menggunakan *Template Literals*.",
                    "Jika angkanya tepat `1`, cetak: `Hitung mundur: 1... LUNCURKAN ROKET! 🚀`.",
                    "Simpan dan jalankan file, lalu lihat hasilnya di Console browser."
                  ]
                },
              },
            },
        ]
      },
      {
        title: "Tipe Data & Operator",
        icon: "🔢",
        lessons: [
          { name: "String, number, boolean"},
          { name: "Operator aritmatika & logika"},
          { name: "Template literals"},
        ],
      },
      {
        title: "Kontrol Alur",
        icon: "🔀",
        lessons: [
          { name: "If / else statement"},
          { name: "Switch case"},
          { name: "Loop: for & while" },
        ],
      },
      {
        title: "Function",
        icon: "⚙️",
        lessons: [
          { name: "Membuat & memanggil function"},
          { name: "Parameter & return value"},
          { name: "Arrow function"},
        ],
      },
      {
        title: "DOM & Event",
        icon: "🖱️",
        lessons: [
          { name: "Apa itu DOM?"},
          { name: "Mengubah elemen dengan JS"},
          { name: "addEventListener dasar"},
        ],
      },
      {
        title: "Mini Project",
        icon: "🚀",
        lessons: [
          { name: "Membuat to-do list interaktif"},
          { name: "Mini challenge JavaScript"},
        ],
      },
    ],

    ctaSubtitle: "Buat website kamu benar-benar hidup!",
    ctaAudience: [
      "Sudah paham HTML & CSS",
      "Ingin website interaktif",
      "Mau jadi developer handal",
    ],

    // ── Frontend Learning Path preview ──────────────────────────────────────
    curriculumPreview: [
      "Variables",
      "Data Types",
      "Functions",
      "Conditions",
      "Loops",
      "Arrays",
      "Objects",
      "DOM",
      "Events",
      "Fetch API",
      "Mini Project",
    ],
  },
];