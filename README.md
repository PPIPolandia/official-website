# Website Resmi PPI Polandia (Perhimpunan Pelajar Indonesia di Polandia)

Portal informasi, manajemen kabinet, program kerja, berita, dan layanan mahasiswa resmi **PPI Polandia**.

## 🚀 Panduan Deployment ke Vercel (Akun Vercel Mana Pun)

Proyek ini telah dikonfigurasi penuh menggunakan [`vercel.json`](./vercel.json), Serverless Function ([`api/index.js`](./api/index.js)), serta dukungan **Vercel Storage (Upstash Serverless Redis)** agar semua perubahan di Dashboard Admin tersimpan secara **permanen**.

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

### 3. Aktifkan Penyimpanan Database Permanen (Vercel Storage - Pilihan 1)
Agar setiap penambahan/perubahan berita, pengurus, foto, dan pesan masuk dari Dashboard Admin tersimpan permanen selamanya:
1. Setelah project selesai di-deploy di Vercel, buka halaman project tersebut di Vercel lalu klik tab **"Storage"** di menu atas.
2. Klik **"Create Database"** -> pilih **"Upstash"** -> pilih **"Serverless Redis (KV)"** -> klik **Continue**.
3. Pilih paket **Free (Gratis)**, beri nama bebas (misal `ppip-db`), lalu klik **Create**.
4. Klik tombol **"Connect Project"** -> pilih project website ini -> klik **Connect**.
   *(Vercel akan otomatis menambahkan variabel `KV_REST_API_URL` & `KV_REST_API_TOKEN` atau `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` ke projectmu).*
5. Buka tab **"Deployments"** -> klik titik tiga (`...`) pada deployment paling atas -> klik **"Redeploy"** agar fungsi serverless membaca database baru tersebut.

### 4. Daftarkan Domain Vercel / Domain PPI Dunia di Google Cloud Console
Agar tombol **Login dengan Google** di modal Admin dapat berfungsi pada domain baru:
1. Buka [Google Cloud Console -> Credentials](https://console.cloud.google.com/apis/credentials).
2. Klik **OAuth 2.0 Client ID** yang digunakan pada `VITE_GOOGLE_CLIENT_ID`.
3. Pada bagian **Authorized JavaScript origins**, tambahkan URL domain Vercel atau custom domain resmi dari PPI Dunia (contoh: `https://official-website-ppip.vercel.app` atau domain resmi PPI Polandia).
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
