# Website Resmi PPI Polandia (Perhimpunan Pelajar Indonesia di Polandia)

Portal informasi, manajemen kabinet, program kerja, berita, dan layanan mahasiswa resmi **PPI Polandia**.

## 🚀 Panduan Deployment ke Vercel (Akun Vercel Mana Pun)

Proyek ini telah dikonfigurasi penuh menggunakan [`vercel.json`](./vercel.json) dan Serverless Function ([`api/index.js`](./api/index.js)) sehingga dapat di-deploy di **akun Vercel mana saja** yang terhubung ke repository GitHub ini.

### 1. Import Project di Vercel
1. Masuk ke dashboard [Vercel](https://vercel.com) menggunakan akun yang diinginkan.
2. Klik **Add New...** -> **Project**, lalu pilih repository `PPIPolandia/official-website`.
3. Framework Preset akan otomatis terdeteksi sebagai **Vite**.

### 2. Tambahkan Environment Variables di Vercel
Sebelum menekan tombol **Deploy** (atau melalui menu **Project Settings -> Environment Variables**), tambahkan variabel berikut sesuai dengan file [`.env.example`](./.env.example):

| Nama Variabel | Deskripsi |
| :--- | :--- |
| `ADMIN_PASSCODE` | Kata sandi rahasia untuk masuk ke Dashboard Admin |
| `VITE_GOOGLE_CLIENT_ID` | Client ID OAuth 2.0 dari Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Client Secret OAuth 2.0 dari Google Cloud Console |

### 3. Daftarkan Domain Vercel di Google Cloud Console (Untuk Login Google)
Agar tombol **Login dengan Google** di modal Admin dapat berfungsi pada domain Vercel baru:
1. Buka [Google Cloud Console -> Credentials](https://console.cloud.google.com/apis/credentials).
2. Klik **OAuth 2.0 Client ID** yang digunakan pada `VITE_GOOGLE_CLIENT_ID`.
3. Pada bagian **Authorized JavaScript origins**, tambahkan URL domain Vercel atau custom domain resmi (contoh: `https://official-website-ppip.vercel.app` atau `https://ppipolandia.org`).
4. Klik **Save**.

---

## 💻 Menjalankan Secara Lokal (Development)

1. Salin file `.env.example` menjadi `.env` dan isi kredensial yang sesuai.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server backend API (port 5000) dan frontend Vite secara bersamaan:
   ```bash
   npm run server
   npm run dev
   ```
