export const initialVisiMisi = {
  visi: "Menjadi wadah berorganisasi yang inklusif, inovatif, dan berdaya saing global untuk seluruh pelajar Indonesia di Polandia, serta menjadi jembatan diplomasi budaya dan akademik antara Indonesia dan Polandia.",
  misi: [
    "Memberikan pelayanan, perlindungan, serta advokasi yang tanggap bagi seluruh mahasiswa Indonesia di Polandia.",
    "Mendorong pengembangan kompetensi kepemimpinan, riset, dan profesionalitas anggota melalui program kerja berkelanjutan.",
    "Menguatkan jaringan kemitraan strategis dengan KBRI Warsaw, PPI Dunia, Perguruan Tinggi di Polandia, dan instansi global.",
    "Mempromosikan keanekaragaman dan kekayaan budaya Indonesia di kancah internasional."
  ]
};

export const initialSambutanKetua = {
  nama: "M. Farhan Al-Ghifari",
  jabatan: "Ketua Umum PPI Polandia 2024/2025",
  kabinet: "Kabinet Garuda Nusantara",
  foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  ucapan: "Selamat datang di portal resmi PPI Polandia. Kami hadir untuk menyatukan seluruh pelajar Indonesia di bumi Copernicus dan Chopin. Bersama Kabinet Garuda Nusantara, mari kita jadikan masa studi di Polandia tidak hanya sebagai ruang menimba ilmu, tetapi juga sebagai panggung karya, pengabdian, dan diplomasi bangsa."
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
    nama: "Pendidikan & Akademik",
    kode: "EDUC",
    deskripsi: "Mengkoordinasikan advokasi beasiswa, seminar ilmiah, workshop penulisan jurnal, dan bimbingan akademik bagi mahasiswa Indonesia di Polandia.",
    ikon: "GraduationCap",
    jumlahAnggota: 6
  },
  {
    id: "div-2",
    nama: "Hubungan Masyarakat & Internal",
    kode: "HUMAS",
    deskripsi: "Menjalin komunikasi aktif dengan KBRI Warsaw, PPI Kota se-Polandia, PPI Dunia, serta program penyambutan mahasiswa baru (Welcoming Party).",
    ikon: "Users",
    jumlahAnggota: 8
  },
  {
    id: "div-3",
    nama: "Pengembangan Organisasi & SDM",
    kode: "POSDM",
    deskripsi: "Fokus pada penguatan kapasitas kepemimpinan, kaderisasi internal, gathering anggota, serta peningkatan kesejahteraan pelajar.",
    ikon: "Target",
    jumlahAnggota: 5
  },
  {
    id: "div-4",
    nama: "Seni, Budaya & Olahraga",
    kode: "SENORA",
    deskripsi: "Wadalah apresiasi bakat, pengenalan budaya Nusantara di berbagai festival kota Polandia, serta turnamen olahraga tahunan (Indo-Polish Games).",
    ikon: "Trophy",
    jumlahAnggota: 7
  },
  {
    id: "div-5",
    nama: "Media, Informasi & Publikasi",
    kode: "MEDINFO",
    deskripsi: "Mengelola seluruh kanal publikasi PPI Polandia, produksi konten edukatif, podcast, majalah digital, serta dokumentasi kegiatan.",
    ikon: "Sparkles",
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
    id: "peng-1",
    nama: "M. Farhan Al-Ghifari",
    jabatan: "Ketua Umum",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "BPH",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    kampus: "University of Warsaw",
    jurusan: "International Relations",
    email: "farhan@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 1
  },
  {
    id: "peng-2",
    nama: "Anisa Rahmawati",
    jabatan: "Wakil Ketua Umum",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "BPH",
    foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    kampus: "Warsaw University of Technology",
    jurusan: "Computer Science",
    email: "anisa@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 2
  },
  {
    id: "peng-3",
    nama: "Dimas Rizky Utama",
    jabatan: "Sekretaris Jenderal",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "BPH",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    kampus: "Jagiellonian University Kraków",
    jurusan: "Biotechnology",
    email: "dimas@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 3
  },
  {
    id: "peng-4",
    nama: "Siti Nurhaliza",
    jabatan: "Bendahara Umum",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "BPH",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    kampus: "SGH Warsaw School of Economics",
    jurusan: "Finance & Accounting",
    email: "siti@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 4
  },
  {
    id: "peng-5",
    nama: "Kevin Pratama",
    jabatan: "Kadiv Pendidikan & Akademik",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "div-1",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    kampus: "Wrocław University of Science",
    jurusan: "Mechanical Engineering",
    email: "kevin@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 5
  },
  {
    id: "peng-6",
    nama: "Nadia Zulaikha",
    jabatan: "Kadiv Hubungan Masyarakat",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "div-2",
    foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
    kampus: "Adam Mickiewicz University Poznań",
    jurusan: "Journalism & Media",
    email: "nadia@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 6
  },
  {
    id: "peng-7",
    nama: "Budi Santoso",
    jabatan: "Kadiv POSDM",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "div-3",
    foto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=500&q=80",
    kampus: "AGH University of Kraków",
    jurusan: "Energy Management",
    email: "budi@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 7
  },
  {
    id: "peng-8",
    nama: "Maya Indah",
    jabatan: "Kadiv Seni, Budaya & Olahraga",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "div-4",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    kampus: "Fryderyk Chopin University of Music Warsaw",
    jurusan: "Musicology",
    email: "maya@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 8
  },
  {
    id: "peng-9",
    nama: "Rizky Ramadhan",
    jabatan: "Kadiv Medinfo",
    kabinet: "2024/2025 - Kabinet Garuda Nusantara",
    divisiId: "div-5",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    kampus: "University of Gdańsk",
    jurusan: "Digital Marketing",
    email: "rizky@ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 9
  },
  /* Previous Cabinet Alumni Sample */
  {
    id: "peng-10",
    nama: "Ahmad Fauzi",
    jabatan: "Ketua Umum (Demisioner)",
    kabinet: "2023/2024 - Kabinet Merdeka Pelajar",
    divisiId: "BPH",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    kampus: "University of Warsaw",
    jurusan: "Economics",
    email: "fauzi@alumni.ppipolandia.org",
    linkedin: "https://linkedin.com",
    positionIndex: 1
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
  email: "info@ppipolandia.org",
  telepon: "+48 22 123 4567",
  alamat: "ul. Wiejska 12/4, 00-490 Warszawa, Rzeczpospolita Polska",
  instagram: "https://instagram.com/ppipolandia",
  youtube: "https://youtube.com/@ppipolandiaofficial",
  linkedin: "https://linkedin.com/company/ppi-polandia",
  tiktok: "https://tiktok.com/@ppipolandia",
  sosmedList: [
    { id: "sm-1", platform: "Instagram", label: "@ppipolandia", url: "https://instagram.com/ppipolandia" },
    { id: "sm-2", platform: "YouTube", label: "PPI Polandia TV", url: "https://youtube.com/@ppipolandiaofficial" },
    { id: "sm-3", platform: "LinkedIn", label: "PPI Polandia", url: "https://linkedin.com/company/ppi-polandia" },
    { id: "sm-4", platform: "TikTok", label: "@ppipolandia", url: "https://tiktok.com/@ppipolandia" }
  ]
};

export const initialPesanMasuk = [
  {
    id: "msg-1",
    nama: "Rizka Amelia",
    email: "rizka.amelia@gmail.com",
    subjek: "Pertanyaan Beasiswa S2 Warsaw University",
    pesan: "Halo Kak pengurus PPI Polandia, saya calon mahasiswa yang baru lolos seleksi berkas. Mohon info pengurusan visa pelajar di Jakarta. Terima kasih!",
    tanggal: "19 September 2025 - 14:20",
    status: "Belum Dibaca"
  },
  {
    id: "msg-2",
    nama: "Bambang Sujipto",
    email: "bambang.sujipto@corp.id",
    subjek: "Penawaran Kerjasama Sponsorship Cultural Night",
    pesan: "Selamat siang rekan-rekan PPI Polandia. Kami dari Perusahaan FinTech Indonesia bermaksud ingin mensponsori acara Malam Pesona Nusantara di Warsaw.",
    tanggal: "15 September 2025 - 09:15",
    status: "Sudah Dibaca"
  }
];

export const initialKabinetList = [
  "2024/2025 - Kabinet Garuda Nusantara",
  "2023/2024 - Kabinet Merdeka Pelajar"
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
    id: "admin-1",
    email: "info@ppipolandia.org",
    nama: "Admin Utama PPI Polandia",
    peran: "Super Admin",
    ditambahkanPada: "2025-01-01"
  },
  {
    id: "admin-2",
    email: "ketua@ppipolandia.org",
    nama: "Ketua Umum PPI Polandia",
    peran: "Admin Pengurus",
    ditambahkanPada: "2025-01-01"
  },
  {
    id: "admin-3",
    email: "medinfo@ppipolandia.org",
    nama: "Tim Medinfo & Komunikasi",
    peran: "Admin Konten",
    ditambahkanPada: "2025-01-01"
  }
];


