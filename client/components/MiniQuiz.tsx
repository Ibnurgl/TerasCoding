import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trophy, Star, Zap, RotateCcw, MousePointerClick } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: "HTML" | "CSS" | "JavaScript";
}

const allQuestions: Question[] = [
  // ── HTML Questions ──────────────────────────────────────────────────────────
  {
    id: 1,
    question: "Fungsi utama dari HTML dalam pembuatan website adalah untuk...",
    options: [
      "Membuat tampilan website menjadi berwarna dan menarik",
      "Menyusun kerangka dan struktur dasar halaman web",
      "Menambahkan interaksi dan animasi pada tombol",
      "Menyimpan data pengguna ke dalam database",
    ],
    correctAnswer: 1,
    explanation: "HTML (HyperText Markup Language) berfungsi ibarat tulang punggung sebuah website, yaitu untuk menyusun kerangka dan struktur dasar konten sebelum diberi gaya oleh CSS.",
    topic: "HTML",
  },
  {
    id: 2,
    question: "Tag HTML manakah yang berfungsi sebagai pembungkus seluruh konten yang akan terlihat langsung oleh pengunjung website?",
    options: ["<head>", "<title>", "<body>", "<html>"],
    correctAnswer: 2,
    explanation: "Semua teks, gambar, dan elemen yang ingin ditampilkan di layar browser kepada pengunjung harus diletakkan di dalam tag <body>.",
    topic: "HTML",
  },
  {
    id: 3,
    question: "Sebagian besar tag dalam HTML memiliki pasangan pembuka dan penutup. Manakah format penulisan tag penutup yang benar?",
    options: ["<tag>", "</tag>", "<\\tag>", "<tag/>"],
    correctAnswer: 1,
    explanation: "Tag penutup di HTML selalu diawali dengan tanda garis miring (slash) setelah kurung sudut siku pembuka, misalnya </h1> atau </div>.",
    topic: "HTML",
  },
  {
    id: 4,
    question: "Kode <!DOCTYPE html> yang selalu ditulis pada baris paling atas dokumen HTML berfungsi untuk...",
    options: [
      "Memberi warna latar belakang website",
      "Memberitahu browser bahwa dokumen ini menggunakan standar HTML5",
      "Menyambungkan dokumen HTML dengan file CSS",
      "Membuat judul tab pada browser",
    ],
    correctAnswer: 1,
    explanation: "Deklarasi DOCTYPE wajib ditambahkan di awal dokumen agar browser memahami bahwa kita sedang menulis kode menggunakan versi HTML5 terbaru.",
    topic: "HTML",
  },
  {
    id: 5,
    question: "Tag manakah yang paling tepat digunakan untuk membuat sub-judul dengan ukuran sedikit lebih kecil dari judul utama <h1>?",
    options: ["<h1>", "<h3>", "<h2>", "<h6>"],
    correctAnswer: 2,
    explanation: "HTML menyediakan tag heading dari <h1> (paling besar) hingga <h6> (paling kecil). <h2> digunakan untuk sub-judul tingkat kedua.",
    topic: "HTML",
  },
  {
    id: 6,
    question: "Jika kamu sedang menulis di dalam tag <p> dan ingin memaksa teks berpindah ke baris baru tanpa membuat paragraf baru, tag apa yang digunakan?",
    options: ["<br>", "<hr>", "<p>", "<b>"],
    correctAnswer: 0,
    explanation: "Tag <br> (Line Break) digunakan untuk memutus baris teks dan melanjutkannya di baris bawahnya, dan tag ini tidak memerlukan tag penutup.",
    topic: "HTML",
  },
  {
    id: 7,
    question: "Untuk membuat sebuah teks menjadi cetak tebal (bold), tag HTML apa yang dapat digunakan?",
    options: ["<i> atau <em>", "<b> atau <strong>", "<u> atau <ins>", "<p> atau <span>"],
    correctAnswer: 1,
    explanation: "Tag <b> digunakan untuk menebalkan teks secara visual, sedangkan <strong> menebalkan teks sekaligus memberi penekanan makna secara semantik.",
    topic: "HTML",
  },
  {
    id: 8,
    question: "Potongan kode manakah yang akan menghasilkan teks dengan format cetak miring?",
    options: [
      "<i>Teks ini miring</i>",
      "<b>Teks ini miring</b>",
      "<u>Teks ini miring</u>",
      "<s>Teks ini miring</s>",
    ],
    correctAnswer: 0,
    explanation: "Tag <i> (Italic) atau <em> (Emphasis) digunakan dalam HTML untuk membuat teks tercetak miring.",
    topic: "HTML",
  },
  {
    id: 9,
    question: "Kamu ditugaskan membuat daftar belanjaan yang menggunakan simbol titik (bullet points). Tag pembungkus apa yang harus digunakan?",
    options: ["<ol>", "<li>", "<ul>", "<dl>"],
    correctAnswer: 2,
    explanation: "Tag <ul> (Unordered List) digunakan untuk membuat daftar yang tidak berurutan dan secara default akan menampilkan simbol bullet.",
    topic: "HTML",
  },
  {
    id: 10,
    question: "Atribut apa yang wajib ada di dalam tag <a> agar tautan (link) bisa diklik dan mengarahkan pengunjung ke halaman lain?",
    options: ["src", "link", "href", "action"],
    correctAnswer: 2,
    explanation: "Atribut 'href' (Hypertext Reference) wajib diletakkan di dalam tag <a> untuk menentukan alamat URL tujuan dari tautan tersebut.",
    topic: "HTML",
  },
  {
    id: 11,
    question: "Potongan kode yang benar untuk menampilkan gambar bernama 'logo.png' di halaman web adalah...",
    options: [
      '<img src="logo.png">',
      '<image href="logo.png">',
      '<picture src="logo.png">',
      '<img link="logo.png">',
    ],
    correctAnswer: 0,
    explanation: "Tag <img> membutuhkan atribut 'src' (source) untuk memanggil nama file atau sumber alamat dari gambar yang ingin ditampilkan.",
    topic: "HTML",
  },
  {
    id: 12,
    question: "Saat menyematkan tag <video> atau <audio>, atribut apa yang harus ditambahkan agar tombol play, pause, dan pengatur volume muncul di layar?",
    options: ["play-button", "controls", "autoplay", "menu"],
    correctAnswer: 1,
    explanation: "Atribut 'controls' wajib ditambahkan agar browser memunculkan antarmuka (UI) pemutar media bawaan yang bisa diinteraksi oleh pengguna.",
    topic: "HTML",
  },
  {
    id: 13,
    question: "Dalam pembuatan struktur tabel HTML dasar, tag <tr> digunakan untuk membuat...",
    options: [
      "Baris baru (Table Row)",
      "Kolom data (Table Data)",
      "Judul tabel (Table Heading)",
      "Garis tepi tabel (Table Border)",
    ],
    correctAnswer: 0,
    explanation: "Tag <tr> singkatan dari Table Row, yang fungsinya untuk memulai baris baru secara horizontal di dalam sebuah tabel.",
    topic: "HTML",
  },
  {
    id: 14,
    question: "Tag apa yang paling tepat digunakan untuk menuliskan teks pada bagian kepala/judul kolom tabel agar tercetak tebal dan berada di tengah sel?",
    options: ["<td>", "<tr>", "<th>", "<table>"],
    correctAnswer: 2,
    explanation: "Tag <th> (Table Header) digunakan untuk sel yang berisi judul kolom. Secara bawaan, teks di dalamnya akan ditebalkan dan diratakan ke tengah.",
    topic: "HTML",
  },
  {
    id: 15,
    question: "Atribut apa yang harus ditambahkan pada tag <td> atau <th> jika kamu ingin menggabungkan dua kolom yang bersebelahan menjadi satu sel yang lebar?",
    options: ['merge="2"', 'rowspan="2"', 'colspan="2"', 'combine="2"'],
    correctAnswer: 2,
    explanation: "Atribut 'colspan' (Column Span) digunakan untuk melebarkan atau menggabungkan sel secara horizontal (melintasi beberapa kolom).",
    topic: "HTML",
  },
  {
    id: 16,
    question: "Untuk membuat kolom isian dalam formulir di mana pengguna bisa mengetikkan nama pendek, potongan kode mana yang benar?",
    options: [
      '<input type="text">',
      '<form type="name">',
      '<input type="password">',
      '<textarea type="text">',
    ],
    correctAnswer: 0,
    explanation: 'Tag <input> dengan atribut type="text" akan menghasilkan kotak isian standar untuk mengetikkan data teks satu baris.',
    topic: "HTML",
  },
  {
    id: 17,
    question: "Manakah dari potongan kode berikut yang akan menghasilkan sebuah kotak centang yang bisa dipilih banyak sekaligus dalam formulir?",
    options: [
      '<input type="box">',
      '<input type="check">',
      '<input type="checkbox">',
      '<select option="check">',
    ],
    correctAnswer: 2,
    explanation: 'Atribut type="checkbox" pada tag <input> digunakan untuk membuat opsi kotak centang yang memungkinkan pengguna memilih lebih dari satu pilihan.',
    topic: "HTML",
  },
  {
    id: 18,
    question: "Apa keuntungan utama menggunakan tag semantic (seperti <header>, <nav>, <footer>) dibandingkan hanya menggunakan tag <div> biasa?",
    options: [
      "Membuat tampilan website otomatis menjadi lebih indah tanpa CSS",
      "Mengurangi ukuran file dokumen HTML secara drastis",
      "Membuat struktur kode lebih bermakna dan mudah dipahami oleh mesin pencari (SEO)",
      "Membuat website menjadi kebal dari serangan virus",
    ],
    correctAnswer: 2,
    explanation: "Elemen semantic memberikan makna (arti) pada struktur dokumen web, sehingga memudahkan screen reader dan mesin pencari seperti Google untuk membaca konten website.",
    topic: "HTML",
  },
  {
    id: 19,
    question: "Tag semantic manakah yang paling tepat digunakan untuk membungkus kumpulan tautan atau menu navigasi utama pada website?",
    options: ["<header>", "<nav>", "<main>", "<aside>"],
    correctAnswer: 1,
    explanation: "Tag <nav> secara spesifik dibuat untuk mendefinisikan area di dalam halaman yang berisi tautan navigasi (menu) utama.",
    topic: "HTML",
  },
  {
    id: 20,
    question: "Bagaimana cara menulis komentar di dalam kode HTML agar teks tersebut tidak terlihat oleh pengguna di layar browser?",
    options: [
      "// Ini komentar",
      "/* Ini komentar */",
      "<!-- Ini komentar -->",
      "<! Ini komentar !>",
    ],
    correctAnswer: 2,
    explanation: "Dalam HTML, komentar ditulis dengan mengapit teks menggunakan tanda <!-- dan -->. Komentar ini berguna untuk memberi catatan bagi developer.",
    topic: "HTML",
  },

  // ── CSS Questions ───────────────────────────────────────────────────────────
  {
    id: 21,
    question: "Apa fungsi utama dari CSS (Cascading Style Sheets) dalam pembuatan website?",
    options: [
      "Menyusun kerangka dasar website",
      "Mengatur gaya visual dan tata letak halaman web",
      "Menambahkan interaksi logika ke dalam tombol",
      "Menyimpan data pengguna di server",
    ],
    correctAnswer: 1,
    explanation: "CSS secara khusus digunakan untuk memperindah tampilan, mengatur tata letak (layout), dan memberikan gaya visual (seperti warna dan ukuran) pada elemen HTML.",
    topic: "CSS",
  },
  {
    id: 22,
    question: "Manakah cara yang paling direkomendasikan dan efisien untuk menyisipkan CSS ke dalam proyek website yang memiliki banyak halaman?",
    options: [
      "Inline CSS (di dalam atribut style)",
      "Internal CSS (di dalam tag <style>)",
      "External CSS (menggunakan tag <link>)",
      "JavaScript CSS (menggunakan DOM)",
    ],
    correctAnswer: 2,
    explanation: "External CSS sangat disarankan karena memisahkan kode tampilan (CSS) dengan kerangka konten (HTML), sehingga file CSS bisa digunakan berulang kali di berbagai halaman yang berbeda.",
    topic: "CSS",
  },
  {
    id: 23,
    question: "Jika kamu ingin memberikan gaya pada elemen HTML yang memiliki atribut class=\"tombol\", bagaimana cara memanggilnya di dalam file CSS?",
    options: ["#tombol", ".tombol", "*tombol", "tombol"],
    correctAnswer: 1,
    explanation: "Dalam CSS, selektor Class selalu diawali dengan tanda titik (.) sebelum menuliskan nama class-nya.",
    topic: "CSS",
  },
  {
    id: 24,
    question: "Simbol apa yang digunakan sebagai penanda bahwa sebuah gaya CSS diterapkan menggunakan selektor ID?",
    options: ["Titik (.)", "Bintang (*)", "Pagar (#)", "Dolar ($)"],
    correctAnswer: 2,
    explanation: "Selektor ID dipanggil menggunakan tanda pagar (#). ID bersifat sangat spesifik dan unik, sehingga idealnya hanya digunakan pada satu elemen di dalam satu halaman HTML.",
    topic: "CSS",
  },
  {
    id: 25,
    question: "Properti CSS apa yang digunakan untuk mengubah warna huruf pada sebuah elemen teks?",
    options: ["background-color", "color", "text-color", "font-color"],
    correctAnswer: 1,
    explanation: "Properti 'color' secara khusus digunakan untuk mengatur warna teks, sementara 'background-color' digunakan untuk warna latar belakang.",
    topic: "CSS",
  },
  {
    id: 26,
    question: "Potongan kode mana yang benar untuk mengubah jenis huruf menjadi Arial pada sebuah paragraf?",
    options: [
      "p { text-font: Arial; }",
      "p { font-style: Arial; }",
      "p { font-family: Arial; }",
      "p { text-family: Arial; }",
    ],
    correctAnswer: 2,
    explanation: "Properti 'font-family' digunakan untuk menentukan jenis font atau keluarga huruf yang akan diterapkan pada elemen teks tersebut.",
    topic: "CSS",
  },
  {
    id: 27,
    question: "Dalam konsep Box Model, properti apa yang digunakan untuk mengatur ruang kosong di *dalam* elemen (jarak antara konten teks dengan garis tepi/border)?",
    options: ["Margin", "Padding", "Border", "Content"],
    correctAnswer: 1,
    explanation: "Padding menciptakan ruang kosong di dalam elemen itu sendiri. Semakin besar padding, konten di dalamnya akan semakin terdorong menjauh dari garis tepinya (border).",
    topic: "CSS",
  },
  {
    id: 28,
    question: "Properti apa yang digunakan pada Box Model untuk memberikan jarak di *luar* elemen, agar elemen tersebut tidak menempel dengan elemen lain di sekitarnya?",
    options: ["Margin", "Padding", "Spacing", "Border"],
    correctAnswer: 0,
    explanation: "Margin adalah ruang kosong transparan di bagian paling luar elemen. Margin berfungsi untuk saling mendorong atau memberi jarak antar elemen di sebuah halaman web.",
    topic: "CSS",
  },
  {
    id: 29,
    question: "Jika kamu ingin menyembunyikan sebuah elemen dari halaman web sepenuhnya (elemen hilang seolah tidak pernah ada), properti display apa yang harus digunakan?",
    options: [
      "display: hidden;",
      "display: none;",
      "display: block;",
      "display: invisible;",
    ],
    correctAnswer: 1,
    explanation: "Properti 'display: none;' akan menghilangkan elemen beserta seluruh ruang tata letaknya, sehingga area kosongnya akan langsung diisi oleh elemen lain.",
    topic: "CSS",
  },
  {
    id: 30,
    question: "Langkah pertama yang wajib dilakukan untuk menggunakan sistem Flexbox pada kumpulan elemen adalah mendeklarasikan properti pada elemen induknya (Parent). Properti apakah itu?",
    options: [
      "position: absolute;",
      "float: left;",
      "display: flex;",
      "align: center;",
    ],
    correctAnswer: 2,
    explanation: "Memberikan properti 'display: flex;' pada elemen pembungkus (Parent) akan secara otomatis mengaktifkan mode Flexbox untuk mengatur anak-anak elemen di dalamnya.",
    topic: "CSS",
  },
  {
    id: 31,
    question: "Secara bawaan (default), ke arah manakah anak-anak elemen (Child) akan tersusun ketika induknya (Parent) diberikan `display: flex;`?",
    options: [
      "Menyamping dari kiri ke kanan (row)",
      "Menurun dari atas ke bawah (column)",
      "Menyamping dari kanan ke kiri (row-reverse)",
      "Menumpuk di tengah layar",
    ],
    correctAnswer: 0,
    explanation: "Nilai default dari properti 'flex-direction' adalah 'row'. Ini menyebabkan semua elemen di dalam flexbox otomatis berjajar menyamping dalam satu baris horisontal.",
    topic: "CSS",
  },
  {
    id: 32,
    question: "Pada layout Flexbox, properti apa yang digunakan untuk mengatur perataan posisi anak-anak elemen di sepanjang garis utamanya (main axis)?",
    options: [
      "align-items",
      "justify-content",
      "text-align",
      "flex-wrap",
    ],
    correctAnswer: 1,
    explanation: "Properti 'justify-content' digunakan untuk mendistribusikan sisa ruang kosong dan mengatur perataan baris pada sumbu utama (misal: dibuat rata tengah menggunakan justify-content: center;).",
    topic: "CSS",
  },
  {
    id: 33,
    question: "Apa perbedaan utama antara tata letak menggunakan Flexbox dan CSS Grid?",
    options: [
      "Flexbox hanya untuk warna, Grid untuk bentuk kotak",
      "Flexbox bekerja untuk 1 dimensi (hanya baris atau kolom), CSS Grid bekerja untuk 2 dimensi (baris dan kolom sekaligus)",
      "Flexbox sudah usang, CSS Grid adalah teknologi wajib saat ini",
      "Flexbox untuk elemen gambar, CSS Grid untuk teks",
    ],
    correctAnswer: 1,
    explanation: "Flexbox lebih cocok untuk menyelaraskan item dalam satu baris atau satu kolom saja, sedangkan Grid dirancang untuk membuat tata letak yang lebih kompleks dengan mengatur baris dan kolom secara bersamaan.",
    topic: "CSS",
  },
  {
    id: 34,
    question: "Properti Grid apa yang digunakan untuk mendefinisikan jumlah dan lebar kolom (vertikal) pada elemen induk?",
    options: [
      "grid-template-rows",
      "grid-template-columns",
      "grid-columns-size",
      "grid-layout",
    ],
    correctAnswer: 1,
    explanation: "Properti 'grid-template-columns' membagi ruang lebar wadah Grid menjadi beberapa lajur kolom dengan menentukan nilai ukurannya (misal dengan pixel atau fraksi/fr).",
    topic: "CSS",
  },
  {
    id: 35,
    question: "Fungsi utama dan keuntungan dari menggunakan fitur `grid-template-areas` adalah...",
    options: [
      "Memberikan nama spesifik pada setiap area layout sehingga kode mudah divisualisasikan dan diatur posisinya",
      "Secara otomatis memberikan warna acak yang berbeda pada tiap kolom",
      "Membuat grid otomatis berubah menjadi flexbox saat di layar kecil",
      "Menghilangkan border di dalam grid",
    ],
    correctAnswer: 0,
    explanation: "Konsep 'grid-template-areas' sangat intuitif karena memungkinkan kita menamai bagian-bagian halaman (seperti 'header', 'sidebar', 'footer') dan menyusun layout-nya seperti membuat pola peta pada CSS.",
    topic: "CSS",
  },
  {
    id: 36,
    question: "Fitur di CSS yang digunakan untuk membuat tampilan website beradaptasi otomatis dan tetap rapi saat dibuka di berbagai ukuran layar (seperti HP atau Tablet) disebut...",
    options: [
      "Flexbox Rules",
      "CSS Grid Layout",
      "Media Queries (@media)",
      "CSS Animation",
    ],
    correctAnswer: 2,
    explanation: "Media Queries (@media) mengecek spesifikasi perangkat (terutama ukuran layar/lebar layar) dan menjalankan kode CSS khusus yang hanya berlaku untuk ukuran tersebut.",
    topic: "CSS",
  },
  {
    id: 37,
    question: "Jika kamu menulis kode `@media (max-width: 768px)`, apa arti kondisi tersebut?",
    options: [
      "Aturan CSS hanya akan aktif jika lebar layar minimal (paling kecil) 768px",
      "Aturan CSS hanya akan aktif jika lebar layar maksimal (paling besar) 768px atau lebih kecil dari itu",
      "Aturan CSS akan mengubah resolusi layar menjadi persis 768px",
      "Aturan CSS akan mengaktifkan tinggi layar maksimal 768px",
    ],
    correctAnswer: 1,
    explanation: "Kondisi 'max-width' menetapkan batas atas layar. Kode CSS di dalamnya akan diaktifkan secara otomatis khusus untuk layar dengan ukuran 768px ke bawah (seperti HP atau tablet kecil).",
    topic: "CSS",
  },
  {
    id: 38,
    question: "Pseudo-class CSS apa yang ditambahkan agar tombol berubah warna atau tampilannya HANYA saat kursor mouse pengguna diarahkan di atasnya (tanpa diklik)?",
    options: [":active", ":hover", ":focus", ":visited"],
    correctAnswer: 1,
    explanation: "Pseudo-class ':hover' digunakan untuk membuat efek visual interaktif saat kursor melayang tepat di atas elemen (biasanya sering diaplikasikan pada tombol atau tautan link).",
    topic: "CSS",
  },
  {
    id: 39,
    question: "Ketika membuat efek Hover, properti CSS apa yang ditambahkan agar perubahan warnanya terlihat halus dan mengalir perlahan, bukannya berubah tiba-tiba/mendadak?",
    options: ["transform", "animation", "transition", "opacity"],
    correctAnswer: 2,
    explanation: "Properti 'transition' menjembatani perubahan gaya antar status (misalnya dari warna biasa ke warna efek hover) dengan menambahkan durasi kelambatan agar efeknya terlihat mengalir halus.",
    topic: "CSS",
  },
  {
    id: 40,
    question: "Untuk membuat animasi kompleks yang dapat bergerak melewati beberapa tahapan berurutan (contoh dari 0% ke 50% hingga 100%), deklarasi atau fungsi apa yang digunakan di CSS?",
    options: [
      "@animation",
      "@keyframes",
      "@media",
      "@transition",
    ],
    correctAnswer: 1,
    explanation: "Aturan '@keyframes' memberikan kita kontrol penuh untuk mendefinisikan perubahan gaya (style) elemen pada titik persentase tertentu selama satu siklus animasi berlangsung.",
    topic: "CSS",
  },

  // ── JavaScript Questions ───────────────────────────────────────────────────
  {
    id: 41,
    question: "Perintah apa yang digunakan untuk mencetak pesan atau mengecek nilai variabel ke dalam konsol (console) browser?",
    options: [
      "print()",
      "console.log()",
      "document.write()",
      "log.console()",
    ],
    correctAnswer: 1,
    explanation: "console.log() adalah perintah dasar di JavaScript yang paling sering digunakan oleh developer untuk mencetak informasi, teks, atau mengecek nilai variabel langsung di konsol browser.",
    topic: "JavaScript",
  },
  {
    id: 42,
    question: "Jika kamu ingin membuat variabel yang nilainya bisa diubah-ubah di kemudian hari, kata kunci (keyword) apa yang paling tepat digunakan?",
    options: [
      "const",
      "var",
      "let",
      "int",
    ],
    correctAnswer: 2,
    explanation: "Kata kunci 'let' diperkenalkan pada JavaScript modern untuk mendeklarasikan variabel yang nilainya dapat diperbarui. Ini lebih aman dan direkomendasikan dibandingkan menggunakan 'var'.",
    topic: "JavaScript",
  },
  {
    id: 43,
    question: "Saat kamu membuat variabel untuk menyimpan nilai Phi (3.14) yang tidak boleh diubah selamanya, kata kunci apa yang harus digunakan?",
    options: [
      "let",
      "const",
      "static",
      "fixed",
    ],
    correctAnswer: 1,
    explanation: "Kata kunci 'const' (constant) digunakan untuk membuat variabel yang nilainya tetap. Sekali nilai dimasukkan ke dalam 'const', nilai tersebut tidak dapat diubah lagi.",
    topic: "JavaScript",
  },
  {
    id: 44,
    question: "Tag HTML apa yang digunakan untuk menyisipkan atau menulis kode JavaScript secara langsung di dalam file HTML?",
    options: [
      "<javascript>",
      "<js>",
      "<script>",
      "<code>",
    ],
    correctAnswer: 2,
    explanation: "Semua kode JavaScript, baik yang ditulis langsung (internal) maupun yang dipanggil dari file luar (eksternal), wajib diletakkan di dalam tag <script> pada file HTML.",
    topic: "JavaScript",
  },
  {
    id: 45,
    question: "Tipe data apa yang digunakan untuk merepresentasikan teks atau karakter di dalam JavaScript?",
    options: [
      "String",
      "Number",
      "Boolean",
      "Object",
    ],
    correctAnswer: 0,
    explanation: "String adalah tipe data untuk teks. Nilai string selalu ditandai dengan penggunaan tanda kutip, baik kutip tunggal ('...') maupun kutip ganda (\"...\").",
    topic: "JavaScript",
  },
  {
    id: 46,
    question: "Operator matematika mana yang digunakan untuk mendapatkan sisa hasil bagi dari dua buah bilangan (modulo)?",
    options: [
      "/",
      "*",
      "%",
      "//",
    ],
    correctAnswer: 2,
    explanation: "Operator modulus atau modulo direpresentasikan dengan tanda persen (%). Operator ini akan mengembalikan nilai sisa dari pembagian. Contohnya, 10 % 3 hasilnya adalah 1.",
    topic: "JavaScript",
  },
  {
    id: 47,
    question: "Manakah dari nilai berikut ini yang merupakan nilai dari tipe data Boolean?",
    options: [
      "\"true\" dan \"false\"",
      "1 dan 0",
      "true dan false",
      "yes dan no",
    ],
    correctAnswer: 2,
    explanation: "Boolean adalah tipe data logika yang hanya memiliki dua kemungkinan nilai mutlak tanpa tanda kutip, yaitu true (benar) dan false (salah).",
    topic: "JavaScript",
  },
  {
    id: 48,
    question: "Operator perbandingan apa yang disarankan di JavaScript untuk mengecek apakah dua nilai SAMA PERSIS (identik) baik dari segi nilai maupun tipe datanya?",
    options: [
      "=",
      "==",
      "===",
      "!=",
    ],
    correctAnswer: 2,
    explanation: "Operator === (strict equality) mengecek kesamaan nilai sekaligus tipe datanya. Ini jauh lebih akurat dan aman dibandingkan == yang bisa menganggap teks \"1\" sama dengan angka 1.",
    topic: "JavaScript",
  },
  {
    id: 49,
    question: "Potongan kode mana yang benar untuk membuat percabangan (if statement) sederhana?",
    options: [
      "if kondisi { }",
      "if (kondisi) { }",
      "if kondisi = true then { }",
      "if {kondisi} ( )",
    ],
    correctAnswer: 1,
    explanation: "Struktur dasar percabangan 'if' menggunakan kurung biasa () untuk meletakkan kondisi, lalu diikuti kurung kurawal {} yang berisi blok kode yang akan dijalankan jika kondisinya benar.",
    topic: "JavaScript",
  },
  {
    id: 50,
    question: "Jika semua kondisi pada blok `if` maupun `else if` tidak ada yang terpenuhi (bernilai false), blok kode mana yang akan otomatis dijalankan sebagai pilihan terakhir?",
    options: [
      "then",
      "catch",
      "else",
      "finally",
    ],
    correctAnswer: 2,
    explanation: "Blok 'else' diletakkan paling akhir dalam percabangan. Ia berfungsi sebagai jalan keluar atau aksi default yang pasti dieksekusi apabila semua kondisi sebelumnya salah (false).",
    topic: "JavaScript",
  },
  {
    id: 51,
    question: "Dalam perulangan `for (let i = 0; i < 5; i++)`, apa fungsi dari kode `i++`?",
    options: [
      "Mereset nilai i menjadi 0 kembali",
      "Menambahkan nilai i dengan angka 1 di setiap akhir siklus perulangan",
      "Mengurangi nilai i sebesar 1",
      "Menghentikan perulangan jika i lebih dari 5",
    ],
    correctAnswer: 1,
    explanation: "i++ adalah operator increment (penambahan). Fungsinya untuk menambah nilai variabel i sebanyak 1 angka di setiap akhir siklus perulangan agar kondisi akhirnya bisa tercapai dan berhenti.",
    topic: "JavaScript",
  },
  {
    id: 52,
    question: "Struktur kontrol alur apa yang lebih rapi digunakan sebagai alternatif `if-else` bertumpuk ketika kita memiliki banyak sekali kondisi spesifik yang harus dicek terhadap satu nilai variabel?",
    options: [
      "while loop",
      "for loop",
      "switch case",
      "do while",
    ],
    correctAnswer: 2,
    explanation: "Switch case sangat cocok digunakan untuk membandingkan satu nilai variabel dengan banyak kemungkinan kasus (case) spesifik secara lebih terstruktur dan rapi dibandingkan if-else yang panjang.",
    topic: "JavaScript",
  },
  {
    id: 53,
    question: "Bagaimana cara mendeklarasikan (membuat) sebuah fungsi (function) yang bernama `hitungTotal` di JavaScript?",
    options: [
      "function hitungTotal() { }",
      "create function hitungTotal() { }",
      "def hitungTotal() { }",
      "function: hitungTotal() { }",
    ],
    correctAnswer: 0,
    explanation: "Penulisan standar untuk membuat fungsi di JavaScript selalu dimulai dengan kata kunci 'function', diikuti nama fungsinya, kurung biasa (), dan diakhiri kurung kurawal {} untuk blok logikanya.",
    topic: "JavaScript",
  },
  {
    id: 54,
    question: "Setelah kamu membuat fungsi `function sapaUser() { ... }`, bagaimana cara yang benar untuk memanggil atau mengeksekusi fungsi tersebut?",
    options: [
      "call sapaUser;",
      "sapaUser[];",
      "sapaUser();",
      "run sapaUser;",
    ],
    correctAnswer: 2,
    explanation: "Untuk menjalankan sebuah fungsi yang telah dibuat, kita harus memanggil nama fungsi tersebut beserta tanda kurung () di belakangnya.",
    topic: "JavaScript",
  },
  {
    id: 55,
    question: "Variabel yang diletakkan di dalam tanda kurung pada saat pembuatan fungsi, yang bertugas menampung nilai (input) yang dikirim dari luar, disebut...",
    options: [
      "Return",
      "Parameter",
      "Output",
      "Property",
    ],
    correctAnswer: 1,
    explanation: "Parameter adalah variabel khusus yang didefinisikan di dalam kurung fungsi saat pembuatan. Parameter berfungsi menangkap argumen (data) yang dimasukkan pengguna saat fungsi itu dipanggil.",
    topic: "JavaScript",
  },
  {
    id: 56,
    question: "Kata kunci apa yang digunakan di dalam sebuah fungsi untuk mengembalikan atau menghasilkan sebuah nilai akhir (output) ke tempat fungsi itu dipanggil?",
    options: [
      "stop",
      "break",
      "return",
      "output",
    ],
    correctAnswer: 2,
    explanation: "Kata kunci 'return' berfungsi ganda: ia menghentikan eksekusi di dalam fungsi secara langsung, dan mengirimkan (mengembalikan) sebuah hasil atau nilai proses ke kode yang memanggil fungsi tersebut.",
    topic: "JavaScript",
  },
  {
    id: 57,
    question: "Metode DOM apa yang paling umum dan akurat digunakan untuk menangkap sebuah elemen HTML berdasarkan atribut 'id' yang dimilikinya?",
    options: [
      "document.selectId()",
      "document.querySelector()",
      "document.getElementById()",
      "document.catchId()",
    ],
    correctAnswer: 2,
    explanation: "Metode document.getElementById() digunakan secara spesifik untuk mencari dan mengambil kendali atas satu elemen HTML yang memiliki identitas ID yang sesuai.",
    topic: "JavaScript",
  },
  {
    id: 58,
    question: "Setelah berhasil menangkap sebuah elemen judul `<h1>` ke dalam variabel JavaScript, properti apa yang bisa digunakan untuk mengubah teks/tulisan di dalam judul tersebut?",
    options: [
      "innerText",
      "changeText",
      "htmlText",
      "value",
    ],
    correctAnswer: 0,
    explanation: "Properti 'innerText' (serta 'textContent') digunakan untuk membaca konten teks asli atau mengubah konten tulisan yang ada di dalam sebuah elemen HTML.",
    topic: "JavaScript",
  },
  {
    id: 59,
    question: "Metode DOM apa yang digunakan untuk \"mendengarkan\" atau memantau interaksi yang dilakukan pengguna (misalnya mengklik tombol) pada suatu elemen?",
    options: [
      "listenEvent()",
      "onInteraction()",
      "addEventListener()",
      "catchEvent()",
    ],
    correctAnswer: 2,
    explanation: "addEventListener() adalah metode yang ditempelkan pada elemen HTML agar JavaScript selalu bersiap merespons apabila terjadi suatu event tertentu (seperti klik atau ketik) dari pengguna.",
    topic: "JavaScript",
  },
  {
    id: 60,
    question: "Saat menggunakan kode `tombol.addEventListener(\"___\", ubahWarna);`, kata apa yang harus diisikan pada bagian kosong tersebut agar fungsi berjalan saat tombol DITEKAN?",
    options: [
      "press",
      "click",
      "submit",
      "hover",
    ],
    correctAnswer: 1,
    explanation: "Event \"click\" adalah jenis interaksi yang paling umum digunakan pada DOM untuk mendeteksi saat kursor pengguna menekan tombol sebelah kiri mouse atau menekan layar HP pada elemen tersebut.",
    topic: "JavaScript",
  },
];

const TIMER_SECONDS = 15;

const topicColors: Record<string, string> = {
  HTML: "bg-red-100 text-red-600",
  CSS: "bg-blue-100 text-blue-600",
  JavaScript: "bg-yellow-100 text-yellow-700",
};

const topicEmoji: Record<string, string> = {
  HTML: "/htmlicon.svg",
  CSS: "/cssicon.svg",
  JavaScript: "/jsicon.svg",
};

export interface MiniQuizProps {
  topic?: "HTML" | "CSS" | "JavaScript";
  courseTitle?: string;
  onCompleteRoadmap?: () => void;
}

// ── Circular SVG timer ──────────────────────────────────────────────────────
function CircularTimer({
  timeLeft,
  total,
  isIdle,
}: {
  timeLeft: number;
  total: number;
  isIdle: boolean;
}) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  // Idle → full ring (no shrinkage). Active → ring shrinks with time.
  const strokeDashoffset = isIdle ? 0 : circumference * (1 - timeLeft / total);

  const color = isIdle
    ? "#d1d5db"                         // gray-300 — waiting, no urgency
    : timeLeft > 10
    ? "#10b981"                         // emerald — safe
    : timeLeft > 5
    ? "#FF8A1F"                         // orange — caution
    : "#ef4444";                        // red — urgent

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="-rotate-90">
        {/* Track */}
        <circle cx="28" cy="28" r={radius} stroke="#e5e7eb" strokeWidth="3.5" fill="none" />
        {/* Progress arc */}
        <circle
          cx="28" cy="28" r={radius}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>
        {isIdle ? total : timeLeft}
      </span>
    </div>
  );
}

export default function MiniQuiz({ topic, courseTitle, onCompleteRoadmap }: MiniQuizProps) {
  const questions = topic ? allQuestions.filter((q) => q.topic === topic) : allQuestions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer]             = useState<number | null>(null);
  const [isAnswered, setIsAnswered]                     = useState(false);
  const [score, setScore]                               = useState(0);
  const [timeLeft, setTimeLeft]                         = useState(TIMER_SECONDS);
  const [showCompletion, setShowCompletion]             = useState(false);
  const [streak, setStreak]                             = useState(0);
  const [showXpPop, setShowXpPop]                       = useState(false);

  // ── BUG FIX: timer stays idle until user clicks their first answer ──────
  const [hasStarted, setHasStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  // ── Countdown — only runs after first answer click ──────────────────────
  useEffect(() => {
    // Guard: do nothing until the user has made their first pick
    if (!hasStarted || isAnswered || showCompletion) return;
    if (timeLeft <= 0) {
      setIsAnswered(true);
      setStreak(0);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, showCompletion, hasStarted]);

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentQuestionIndex]);

  const handleSelectAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    // First answer click ever → activate timer for subsequent questions
    if (!hasStarted) setHasStarted(true);
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 1500);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      // hasStarted remains true — timer auto-runs from Q2 onwards
    } else {
      setShowCompletion(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setShowCompletion(false);
    setTimeLeft(TIMER_SECONDS);
    setHasStarted(false); // Reset to idle — timer waits again
  };

  const optionLabels = ["A", "B", "C", "D"];

  const getScoreEmoji = () => {
    const pct = score / questions.length;
    if (pct === 1) return "🏆";
    if (pct >= 0.8) return "🥇";
    if (pct >= 0.6) return "🥈";
    return "💪";
  };

  const getScoreMessage = () => {
    const pct = score / questions.length;
    if (pct === 1) return "Sempurna! Kamu luar biasa!";
    if (pct >= 0.8) return "Hebat sekali! Terus belajar ya!";
    if (pct >= 0.6) return "Bagus! Kamu sudah paham banyak hal!";
    return "Jangan menyerah! Coba lagi dan kamu pasti bisa!";
  };

  return (
    <section id="quiz" className="py-20 bg-gradient-to-br from-lavender to-lavender-dark">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Section header */}
        <div className="text-center mb-10 animate-fade-in">
          <span className="inline-block bg-orange/10 text-orange text-sm font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <img src="/miniquiz.svg" alt="quiz" className="inline w-5 h-5 object-contain" /> Mini Quiz
          </span>
          <h2 className="text-4xl font-bold text-purple mb-2">
            Uji Pengetahuanmu!
          </h2>
          <p className="text-gray-500">
            Jawab pertanyaan dan buktikan pemahamanmu!
          </p>
        </div>

        {/* Completion screen */}
        {showCompletion ? (
          <div className="bg-white rounded-3xl p-8 shadow-card-hover border border-purple/10 text-center animate-pop-in">
            <div className="text-7xl mb-4">{getScoreEmoji()}</div>
            <h3 className="text-3xl font-bold text-purple mb-2">Quiz Selesai!</h3>
            <p className="text-gray-500 mb-6">{getScoreMessage()}</p>

            {/* Score cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-lavender rounded-2xl p-4">
                <p className="text-3xl font-bold text-purple">{score}/{questions.length}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Jawaban Benar</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4">
                <p className="text-3xl font-bold text-emerald-600">{Math.round((score / questions.length) * 100)}%</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Akurasi</p>
              </div>
            </div>

            {/* Achievement badge */}
            {score === questions.length && (
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-dark text-white rounded-2xl py-3 px-6 mb-6 shadow-orange-glow">
                <Trophy size={20} />
                <span className="font-bold">Achievement Unlocked: Perfect Score! 🎯</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                <RotateCcw size={18} />
                Coba Lagi
              </button>
              <button
                onClick={() => {
                  if (onCompleteRoadmap) {
                    onCompleteRoadmap();
                  } else {
                    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-orange-glow"
              >
                Kembali ke Roadmap →
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* ── Stats bar ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 mb-5 border border-purple/10 shadow-card">

              {/* Score */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange/10 rounded-xl flex items-center justify-center">
                  <Zap size={16} className="text-orange" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Benar</p>
                  <p className="text-lg font-bold text-orange leading-none">{score}</p>
                </div>
              </div>

              {/* Timer — center */}
              <div className="flex flex-col items-center gap-1">
                <CircularTimer timeLeft={timeLeft} total={TIMER_SECONDS} isIdle={!hasStarted} />
                {/* Idle nudge sits below the ring */}
                {!hasStarted && (
                  <p className="text-[9px] font-semibold text-gray-400 text-center leading-tight max-w-[68px]">
                    klik untuk<br />mulai
                  </p>
                )}
              </div>

              {/* Streak */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Streak</p>
                  <p className="text-lg font-bold text-yellow-500 leading-none">
                    {streak}{streak > 0 ? " 🔥" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Progress dots ───────────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ease-out ${
                      i < currentQuestionIndex
                        ? "w-6 h-2 bg-purple"       // completed
                        : i === currentQuestionIndex
                        ? "w-8 h-2 bg-orange"        // active
                        : "w-2 h-2 bg-gray-200"      // upcoming
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400">
                {score} benar · {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl p-7 shadow-card-hover border border-purple/10 relative overflow-hidden">
              {/* Correct popup */}
              {showXpPop && (
                <div className="absolute top-4 right-4 bg-orange text-white font-bold px-4 py-2 rounded-xl shadow-orange-glow animate-slide-up text-sm z-10">
                  ✅ Benar! ✨
                </div>
              )}

              {/* Topic badge + idle hint / active hint */}
              <div className="flex items-center justify-between mb-5">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${topicColors[currentQuestion.topic]}`}>
                  <img src={topicEmoji[currentQuestion.topic]} alt={currentQuestion.topic} className="w-4 h-4 object-contain" />
                  {currentQuestion.topic}
                </span>

                {!hasStarted ? (
                  /* Shown before first click — main idle UX hint */
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                    <MousePointerClick size={11} />
                    Klik jawaban untuk memulai quiz
                  </span>
                ) : (
                  /* Shown after timer has started */
                  <span className="text-xs text-gray-400 font-medium">
                    Jawab dalam {TIMER_SECONDS} detik!
                  </span>
                )}
              </div>

              {/* Question text */}
              <h3 className="text-xl font-bold text-purple mb-6 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* Answer options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQuestion.correctAnswer;

                  let classes =
                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium text-sm flex items-center gap-3 ";

                  if (!isAnswered) {
                    classes += "border-gray-100 bg-white hover:border-purple/30 hover:bg-lavender hover:shadow-sm hover:translate-x-0.5 cursor-pointer active:scale-[0.99]";
                  } else if (isCorrectOption) {
                    classes += "border-emerald-400 bg-emerald-50 text-emerald-800";
                  } else if (isSelected && !isCorrect) {
                    classes += "border-red-400 bg-red-50 text-red-700";
                  } else {
                    classes += "border-gray-200 opacity-50 cursor-default";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={isAnswered}
                      className={classes}
                    >
                      {/* Option label */}
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                          isAnswered && isCorrectOption
                            ? "bg-emerald-500 text-white"
                            : isAnswered && isSelected && !isCorrect
                            ? "bg-red-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isAnswered && isCorrectOption ? (
                          <CheckCircle size={14} />
                        ) : isAnswered && isSelected && !isCorrect ? (
                          <XCircle size={14} />
                        ) : (
                          optionLabels[index]
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isAnswered && (
                <div
                  className={`p-4 rounded-xl mb-5 border-l-4 animate-slide-up ${
                    isCorrect
                      ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                      : "bg-red-50 border-red-400 text-red-800"
                  }`}
                >
                  <p className="font-bold text-base mb-1">
                    {isCorrect ? (
                      <span>✅ Mantap! Jawaban kamu benar!</span>
                    ) : (
                      <span>❌ Belum tepat, coba lagi!</span>
                    )}
                  </p>
                  <p className="text-sm opacity-80">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next button */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-orange hover:bg-orange-dark text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-orange-glow animate-pop-in"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Soal Berikutnya →" : "Lihat Hasil 🏆"}
                </button>
              )}
            </div>

            {/* Tip */}
            <div className="mt-5 p-4 bg-purple/5 rounded-xl border border-purple/10 flex items-start gap-3">
              <span className="text-xl flex-shrink-0"><img src="/tipsicon.svg" alt="tips" className="inline w-7 h-7 object-contain" /></span>
              <p className="text-sm text-gray-600">
                <strong className="text-purple">Tips Belajar:</strong> Jawab dengan percaya diri! Kalau salah, baca penjelasannya — itu cara paling cepat untuk belajar.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}