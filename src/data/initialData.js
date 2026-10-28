export const initialVisiMisi = {
  visi: "Mewujudkan PPI Polandia yang Mandiri dalam Ekosistem, Unggul dalam Kualitas Sumber Daya, Kuat dalam Jejaring Inklusif, dan Berdampak Global",
  misi: [
    "Revitalisasi Citra dan Kemandirian Organisasi",
    "Akselerasi Kontribusi dan Keilmuan",
    "Menciptakan Ekosistem Suportif dan Jejaring Inklusif",
    "Peningkatan Kualitas Sumber Daya dan Dedikasi"
  ]
};

export const initialSambutanKetua = {
  nama: "Nadia Azhaar",
  jabatan: "Ketua Umum PPI Polandia 2025/2026",
  kabinet: "Kabinet Revita",
  foto: "/uploads/sambutan-ketua.png",
  ucapan: "Selamat datang di portal resmi PPI Polandia. Kami hadir untuk menyatukan seluruh pelajar Indonesia di bumi Copernicus dan Chopin. Bersama Kabinet Revita mari kita jadikan masa studi di Polandia tidak hanya sebagai ruang menimba ilmu, tetapi juga sebagai panggung karya, pengabdian, dan diplomasi bangsa."
};

export const THEME_PRESETS = {
  biru: {
    id: 'biru',
    name: 'Biru (Royal Blue)',
    colorCode: '#2563eb',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#eff6ff',
    primaryBorder: '#bfdbfe',
    primaryGradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    borderFocus: '#3b82f6'
  },
  merah: {
    id: 'merah',
    name: 'Merah (Crimson Red)',
    colorCode: '#dc2626',
    primary: '#dc2626',
    primaryHover: '#b91c1c',
    primaryLight: '#fef2f2',
    primaryBorder: '#fecaca',
    primaryGradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    borderFocus: '#ef4444'
  },
  kuning: {
    id: 'kuning',
    name: 'Kuning (Golden Amber)',
    colorCode: '#d97706',
    primary: '#d97706',
    primaryHover: '#b45309',
    primaryLight: '#fffbeb',
    primaryBorder: '#fde68a',
    primaryGradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    borderFocus: '#f59e0b'
  },
  hijau: {
    id: 'hijau',
    name: 'Hijau (Emerald Green)',
    colorCode: '#059669',
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#ecfdf5',
    primaryBorder: '#a7f3d0',
    primaryGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    borderFocus: '#10b981'
  },
  ungu: {
    id: 'ungu',
    name: 'Ungu (Deep Purple)',
    colorCode: '#7c3aed',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    primaryLight: '#f5f3ff',
    primaryBorder: '#ddd6fe',
    primaryGradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
    borderFocus: '#8b5cf6'
  },
  abuTua: {
    id: 'abuTua',
    name: 'Abu Tua (Slate Charcoal)',
    colorCode: '#334155',
    primary: '#334155',
    primaryHover: '#1e293b',
    primaryLight: '#f8fafc',
    primaryBorder: '#cbd5e1',
    primaryGradient: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
    borderFocus: '#475569'
  },
  coklat: {
    id: 'coklat',
    name: 'Coklat (Warm Espresso)',
    colorCode: '#854d0e',
    primary: '#854d0e',
    primaryHover: '#713f12',
    primaryLight: '#fefce8',
    primaryBorder: '#fef08a',
    primaryGradient: 'linear-gradient(135deg, #854d0e 0%, #a16207 100%)',
    borderFocus: '#a16207'
  }
};

export const initialStatsData = [
  { id: 'stat-1', angka: '600+', label: 'Mahasiswa Aktif' },
  { id: 'stat-2', angka: '5', label: 'Divisi Strategis' },
  { id: 'stat-3', angka: '10+', label: 'Kota di Polandia' }
];

export const initialDivisi = [
  {
    id: "div-1",
    nama: "Kesejahteraan dan Kekraban Anggota",
    kode: "KESRA",
    deskripsi: "Mengkoordinasikan advokasi beasiswa, seminar ilmiah, workshop penulisan jurnal, dan bimbingan akademik bagi mahasiswa Indonesia di Polandia.",
    ikon: "HeartHandshake",
    jumlahAnggota: 6
  },
  {
    id: "div-2",
    nama: "Hubungan Luar, Advokasi, dan Diplomasi Budaya",
    kode: "HADIB",
    deskripsi: "Menjalin komunikasi aktif dengan KBRI Warsaw, PPI Kota se-Polandia, PPI Dunia, serta program penyambutan mahasiswa baru (Welcoming Party).",
    ikon: "Users",
    jumlahAnggota: 8
  },
  {
    id: "div-3",
    nama: "Pengembangan Sumber Daya dan Karir",
    kode: "PSDK",
    deskripsi: "Fokus pada penguatan kapasitas kepemimpinan, kaderisasi internal, gathering anggota, serta peningkatan kesejahteraan pelajar.",
    ikon: "Sparkles",
    jumlahAnggota: 5
  },
  {
    id: "div-4",
    nama: "Media Informasi dan Komunikasi Publik",
    kode: "MEDKOM",
    deskripsi: "Wadalah apresiasi bakat, pengenalan budaya Nusantara di berbagai festival kota Polandia, serta turnamen olahraga tahunan (Indo-Polish Games).",
    ikon: "Megaphone",
    jumlahAnggota: 7
  },
  {
    id: "div-5",
    nama: "Kewirausahaan dan Dana Usaha",
    kode: "KWU",
    deskripsi: "Mengelola seluruh kanal publikasi PPI Polandia, produksi konten edukatif, podcast, majalah digital, serta dokumentasi kegiatan.",
    ikon: "Target",
    jumlahAnggota: 6
  }
];

export const initialProgramKerja = [
  {
    id: "proja-1",
    divisiId: "div-1",
    divisiNama: "Pendidikan & Akademik",
    nama: "Indonesian Student Scientific Summit (ISSS) 2025",
    deskripsi: "Simposium ilmiah mahasiswa Indonesia se-Eropa Tengah untuk mempresentasikan paper riset & inovasi teknologi.",
    tanggal: "15-16 November 2025",
    lokasi: "University of Warsaw & Hybrid",
    status: "Terencana",
    anggaran: "15,000 PLN",
    penanggungJawab: "Kevin Pratama",
    dokumentasi: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proja-2",
    divisiId: "div-1",
    divisiNama: "Pendidikan & Akademik",
    nama: "Webinar Beasiswa & Tips Survival Studi Polandia",
    deskripsi: "Sesi berbagi pengalaman pengajuan beasiswa NAWA, Erasmus+, dan bimbingan adaptasi akademis bagi calon mahasiswa.",
    tanggal: "10 Agustus 2025",
    lokasi: "Zoom Meeting",
    status: "Selesai",
    anggaran: "500 PLN",
    penanggungJawab: "Siti Rahma",
    dokumentasi: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proja-3",
    divisiId: "div-2",
    divisiNama: "Hubungan Masyarakat & Internal",
    nama: "Welcoming Gathering Student 2025/2026",
    deskripsi: "Acara penyambutan mahasiswa baru Indonesia yang mendarat di Warsaw, Krakow, Wroclaw, dan Gdansk.",
    tanggal: "28 September 2025",
    lokasi: "Taman Łazienki Królewskie, Warsaw",
    status: "Berjalan",
    anggaran: "3,500 PLN",
    penanggungJawab: "Nadia Zulaikha",
    dokumentasi: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proja-4",
    divisiId: "div-3",
    divisiNama: "Pengembangan Organisasi & SDM",
    nama: "PPI Polandia Leadership & Capacity Camp",
    deskripsi: "Pelatihan manajemen organisasi, diplomasi muda, dan team building bagi seluruh pengurus kabinet.",
    tanggal: "5-6 Oktober 2025",
    lokasi: "Kraków, Polandia",
    status: "Terencana",
    anggaran: "4,000 PLN",
    penanggungJawab: "Budi Santoso",
    dokumentasi: []
  },
  {
    id: "proja-5",
    divisiId: "div-4",
    divisiNama: "Seni, Budaya & Olahraga",
    nama: "Indonesian Cultural Night (Malam Pesona Nusantara)",
    deskripsi: "Pentas seni tari tradisional, pertunjukan gamelan, dan kuliner gratis khas Indonesia di jantung kota Warsaw.",
    tanggal: "20 Desember 2025",
    lokasi: "Teatr Dramatyczny, Warszawa",
    status: "Terencana",
    anggaran: "20,000 PLN",
    penanggungJawab: "Maya Indah",
    dokumentasi: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "proja-6",
    divisiId: "div-5",
    divisiNama: "Media, Informasi & Publikasi",
    nama: "Peluncuran Website & Podcast PPI Polandia Voice",
    deskripsi: "Pengembangan kanal digital terpadu dan podcast kisah inspiratif mahasiswa Indonesia tinggal di Polandia.",
    tanggal: "1 September 2025",
    lokasi: "Spotify & Web PPIP",
    status: "Selesai",
    anggaran: "1,200 PLN",
    penanggungJawab: "Rizky Ramadhan",
    dokumentasi: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const initialPengurus = [
  {
    nama: "Nadia Azhaar",
    jabatan: "Ketua Umum",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076209027.png",
    kampus: "Medical University of Warsaw",
    jurusan: "PhD of Medical Science",
    email: "",
    linkedin: "",
    positionIndex: 1,
    id: "peng-1790076209027"
  },
  {
    nama: "Elizabeth Claresta Wira P",
    jabatan: "Wakil Ketua",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076318166.png",
    kampus: "Vistula University",
    jurusan: "Bachelor of International Relations",
    email: "",
    linkedin: "",
    positionIndex: 2,
    id: "peng-1790076318166"
  },
  {
    nama: "Bennedic Dennis Whitley",
    jabatan: "Sekretaris 1",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076407434.png",
    kampus: "Vizja University",
    jurusan: "Bachelor of Social Media and Digital Marketing",
    email: "",
    linkedin: "",
    positionIndex: 3,
    id: "peng-1790076407434"
  },
  {
    nama: "Devi Napitupulu",
    jabatan: "Sekretaris 2",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076480498.png",
    kampus: "University of Warsaw",
    jurusan: "Bachelor of Finance, International Investment and Accounting",
    email: "",
    linkedin: "",
    positionIndex: 4,
    id: "peng-1790076480498"
  },
  {
    nama: "Rafi Kusuma Falah R",
    jabatan: "Bendahara",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076549316.png",
    kampus: "Vistula University",
    jurusan: "Bachelor of Business Security and Analytics",
    email: "",
    linkedin: "",
    positionIndex: 5,
    id: "peng-1790076549316"
  },
  {
    nama: "Smith Jheremia Hasiholan S",
    jabatan: "Kadiv KESRA",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076729746.png",
    kampus: "Vistula University",
    jurusan: "Computer Engineering",
    email: "",
    linkedin: "",
    positionIndex: 6,
    id: "peng-1790076729746"
  },
  {
    nama: "Muhammad Rafi Dezar",
    jabatan: "Kadiv HADIB",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790076952086.png",
    kampus: "Vistula University",
    jurusan: "Master of Energy Management",
    email: "",
    linkedin: "",
    positionIndex: 7,
    id: "peng-1790076952086"
  },
  {
    nama: "Karima Afandi",
    jabatan: "Kadiv PSDK",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077022975.png",
    kampus: "Nicolaus Copernicus University",
    jurusan: "PhD in Medical Chemistry and Biopolymer Sciences",
    email: "",
    linkedin: "",
    positionIndex: 8,
    id: "peng-1790077022975"
  },
  {
    nama: "Syafira Rosa Amalia",
    jabatan: "Kadiv MEDKOM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077160273.png",
    kampus: "Warsaw University of Technology",
    jurusan: "Master of Computer Science",
    email: "",
    linkedin: "",
    positionIndex: 9,
    id: "peng-1790077160273"
  },
  {
    nama: "Aurora Zevanya Sinurat",
    jabatan: "Kadiv KWU",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077382685.png",
    kampus: "Vizja University",
    jurusan: "Bachelor of International Relations",
    email: "",
    linkedin: "",
    positionIndex: 10,
    id: "peng-1790077382685"
  },
  {
    nama: "Yasinta Putri Cinta A",
    jabatan: "Staff KESRA",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077459815.png",
    kampus: "University of Warsaw",
    jurusan: "Master of International Business",
    email: "",
    linkedin: "",
    positionIndex: 11,
    id: "peng-1790077459815"
  },
  {
    nama: "Xamuelle Yedydo Blez T",
    jabatan: "Staff KESRA",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077520099.png",
    kampus: "Warsaw University of Technology",
    jurusan: "Bachelor of Aerospace Engineering",
    email: "",
    linkedin: "",
    positionIndex: 12,
    id: "peng-1790077520099"
  },
  {
    nama: "Zahira Rufaida",
    jabatan: "Staff HADIB",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790077576710.png",
    kampus: "Nicolaus Copernicus University",
    jurusan: "PhD of Biology",
    email: "",
    linkedin: "",
    positionIndex: 13,
    id: "peng-1790077576710"
  },
  {
    nama: "Merry Erliani",
    jabatan: "Staff HADIB",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079322734.jpg",
    kampus: "University of Warsaw",
    jurusan: "Master of Sustainable Development",
    email: "",
    linkedin: "",
    positionIndex: 14,
    id: "peng-1790079322734"
  },
  {
    nama: "Kadek Astri Dwijayanti",
    jabatan: "Staff HADIB",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079364709.jpg",
    kampus: "University of Warsaw",
    jurusan: "Master of International Relations",
    email: "",
    linkedin: "",
    positionIndex: 15,
    id: "peng-1790079364709"
  },
  {
    nama: "Abdul Aziz Baihaqi",
    jabatan: "Staff PSDM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079459477.jpg",
    kampus: "Nicolaus Copernicus University",
    jurusan: "PhD of Business Administration",
    email: "",
    linkedin: "",
    positionIndex: 16,
    id: "peng-1790079459477"
  },
  {
    nama: "Hessa Azzahwa Tarzhy",
    jabatan: "Staff PSDM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079535803.jpg",
    kampus: "Vizja University",
    jurusan: "Bachelor of Fashion Design",
    email: "",
    linkedin: "",
    positionIndex: 17,
    id: "peng-1790079535803"
  },
  {
    nama: "Vivienne Anabel Susanto",
    jabatan: "Staff PSDM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079619512.jpg",
    kampus: "University of Wroclaw",
    jurusan: "Bachelor of Business and Administration",
    email: "",
    linkedin: "",
    positionIndex: 18,
    id: "peng-1790079619512"
  },
  {
    nama: "Didih RIzki Chandranegara",
    jabatan: "Staff MEDKOM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079744689.jpg",
    kampus: "AGH University of Krakow",
    jurusan: "PhD of Information Technology",
    email: "",
    linkedin: "",
    positionIndex: 19,
    id: "peng-1790079744689"
  },
  {
    nama: "Pramoedya Asher Satya R",
    jabatan: "Staff MEDKOM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079817907.jpg",
    kampus: "Vizja University",
    jurusan: "Bachelor of Social Communication and Public Relation",
    email: "",
    linkedin: "",
    positionIndex: 20,
    id: "peng-1790079817907"
  },
  {
    nama: "Cheryl Pridiani Cayadewi",
    jabatan: "Staff MEDKOM",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079934863.jpg",
    kampus: "Vistula University",
    jurusan: "Bachelor of Business and Security Analytics",
    email: "",
    linkedin: "",
    positionIndex: 21,
    id: "peng-1790079934863"
  },
  {
    nama: "Bagas Valerius Saragih",
    jabatan: "Staff KWU",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790079996976.jpg",
    kampus: "Vizja University",
    jurusan: "Bachelor of Marketing Student",
    email: "",
    linkedin: "",
    positionIndex: 22,
    id: "peng-1790079996976"
  },
  {
    nama: "Adelaide Miracle Romamti",
    jabatan: "Staff KWU",
    kabinet: "2025/2026 - Kabinet Revita",
    divisiId: "BPH",
    foto: "/uploads/pengurus-peng-1790080053548.jpg",
    kampus: "Vizja University",
    jurusan: "Bachelor of Cosmetology and Health Science",
    email: "",
    linkedin: "",
    positionIndex: 23,
    id: "peng-1790080053548"
  }
];

export const initialBerita = [
  {
    id: "news-1",
    judul: "PPI Polandia Sambut 150+ Mahasiswa Baru Indonesia Tahun Ajaran 2024/2025",
    ringkasan: "Kegiatan penyambutan hangat mahasiswa baru berlangsung meriah di Warsaw dengan partisipasi perwakilan KBRI Warsaw.",
    konten: "PPI Polandia kembali menyambut kedatangan para mahasiswa baru dari berbagai pelosok Nusantara yang memilih melanjutkan studi di universitas-universitas ternama Polandia seperti University of Warsaw, Warsaw University of Technology, dan Jagiellonian University Krakow. Acara ini diisi dengan pengenalan sistem transportasi publik, pendaftaran Karta Czasowego Pobytu (KCP), hingga tips bertahan hidup saat musim dingin.",
    kategori: "Penyambutan",
    penulis: "Divisi Humas & Medinfo",
    tanggal: "18 September 2025",
    gambar: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
    ],
    dibaca: "420 kali"
  },
  {
    id: "news-2",
    judul: "Panduan Lengkap Pengajuan Beasiswa NAWA Polandia untuk Jenjang S2 & S3",
    ringkasan: "Simak tahapan pendaftaran, kelengkapan berkas, serta tips wawancara langsung dari penerima beasiswa NAWA Polandia.",
    konten: "Badan Nasional Pertukaran Akademik Polandia (NAWA) kembali membuka pendaftaran program beasiswa Stefan Banach & Lukasiewicz untuk mahasiswa dari negara berkembang termasuk Indonesia. Beasiswa ini menanggung biaya kuliah penuh serta tunjangan hidup bulanan sebesar 1,500 PLN - 1,700 PLN. Dalam artikel ini, Divisi Pendidikan PPI Polandia mengurai trik membuat motivation letter yang memikat dewan juri.",
    kategori: "Beasiswa",
    penulis: "Divisi Pendidikan & Akademik",
    tanggal: "05 September 2025",
    gambar: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    ],
    dibaca: "1,280 kali"
  },
  {
    id: "news-3",
    judul: "Tim Tari PPI Polandia Pukau Pengunjung Festival Pop-Up Culture Kraków",
    ringkasan: "Tarian Saman dan Reog Ponorogo memukau ratusan masyarakat lokal Polandia di Main Square Kraków.",
    konten: "Tim kesenian Divisi Seni & Budaya PPI Polandia sukses mengharumkan nama bangsa dalam pagelaran festival budaya internasional di Kraków. Ratusan penonton terpukau dengan ritme cepat Tari Saman Aceh serta penampilan kostum megah Nusantara. KBRI Warsaw turut mendukung acara ini dengan menyediakan booth kuliner rendang dan nasi goreng gratis.",
    kategori: "Budaya",
    penulis: "Divisi SENORA",
    tanggal: "22 Agustus 2025",
    gambar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    ],
    dibaca: "850 kali"
  },
  {
    id: "news-4",
    judul: "Pengumuman Pembukaan Pendaftaran Pengurus PPI Kota Kraków & Wrocław",
    ringkasan: "Kesempatan emas bagi mahasiswa di wilayah Polandia Selatan untuk bergabung memperluas jaringan kepemimpinan.",
    konten: "Untuk memperkuat pelayanan di daerah regional, PPI Polandia membuka open recruitment pengurus cabang untuk PPI Kota Kraków dan PPI Kota Wrocław. Pendaftaran dibuka hingga 30 September 2025. Persyaratan lengkap dapat diakses melalui portal resmi ini.",
    kategori: "Pengumuman",
    penulis: "Divisi POSDM",
    tanggal: "12 Agustus 2025",
    gambar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    galeri: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    ],
    dibaca: "610 kali"
  }
];

export const initialKontak = {
  email: "ppi.polandia@gmail.com",
  telepon: "+48 795 340 632",
  alamat: "Estonska 3/5, Warsaw, Poland 03-903",
  instagram: "https://instagram.com/ppi.polandia",
  youtube: "https://www.youtube.com/@ppi.polandia",
  linkedin: "https://linkedin.com/company/ppi-polandia",
  tiktok: "https://tiktok.com/@ppipolandia",
  sosmedList: [
    { id: "sm-1", platform: "Instagram", label: "@ppi.polandia", url: "https://instagram.com/ppi.polandia" },
    { id: "sm-2", platform: "YouTube", label: "PPI Polandia", url: "https://www.youtube.com/@ppi.polandia" }
  ]
};

export const initialPesanMasuk = [];

export const initialKabinetList = [
  "2025/2026 - Kabinet Revita"
];

export const initialKategoriBeritaList = [
  "Penyambutan",
  "Beasiswa",
  "Budaya",
  "Akademik",
  "Kegiatan",
  "Opini & Edukasi",
  "Pengumuman"
];

export const initialAllowedAdmins = [
  {
    id: "admin-3",
    email: "ppi.polandia@gmail.com",
    nama: "Akun Resmi PPI Polandia",
    peran: "Super Admin",
    ditambahkanPada: "2025-01-01"
  }
];
