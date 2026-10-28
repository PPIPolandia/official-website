import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Automatically load .env file from project root
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        process.env[key.trim()] = vals.join('=').trim();
      }
    });
  } catch (err) {
    console.warn('Could not load .env file:', err);
  }
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper functions for Database Read / Write
const readDB = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return null;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return null;
  }
};

const writeDB = (data) => {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
};

// API ROUTES

// 1. GET FULL DATA
app.get('/api/data', (req, res) => {
  const db = readDB();
  if (!db) {
    return res.status(500).json({ error: 'Failed to read database' });
  }
  res.json(db);
});

// 2. ADMIN AUTH LOGIN (PASSCODE & GOOGLE OAUTH)
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  const adminPass = process.env.ADMIN_PASSCODE;
  if (!adminPass) {
    return res.status(500).json({ success: false, error: 'Konfigurasi ADMIN_PASSCODE belum diatur di environment server' });
  }
  if (passcode && passcode === adminPass) {
    res.json({
      success: true,
      token: 'ppip-admin-token-authenticated',
      user: {
        name: 'Admin Utama PPI Polandia',
        email: '',
        picture: '',
        role: 'Super Admin'
      }
    });
  } else {
    res.status(401).json({ success: false, error: 'Kode akses admin salah' });
  }
});

// GOOGLE SIGN-IN OAUTH AUTHENTICATION
app.post('/api/auth/google', (req, res) => {
  try {
    const { credential, email: rawEmail, name: rawName, picture: rawPicture } = req.body;
    let userEmail = rawEmail;
    let userName = rawName || 'Pengurus PPI Polandia';
    let userPicture = rawPicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';

    // If credential JWT string is provided, decode payload
    if (credential && typeof credential === 'string') {
      try {
        const payloadBase64 = credential.split('.')[1];
        if (payloadBase64) {
          const decodedPayload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));
          userEmail = decodedPayload.email || userEmail;
          userName = decodedPayload.name || userName;
          userPicture = decodedPayload.picture || userPicture;
        }
      } catch (err) {
        console.warn('Could not decode JWT payload directly:', err);
      }
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, error: 'Email Google tidak ditemukan' });
    }

    const lowerEmail = userEmail.toLowerCase();
    const db = readDB();
    const allowedAdmins = db && Array.isArray(db.allowedAdmins) ? db.allowedAdmins : [
      { id: 'admin-1', email: 'info@ppipolandia.org', nama: 'Admin Utama PPI Polandia', peran: 'Super Admin' }
    ];

    const foundAdmin = allowedAdmins.find(admin => admin.email && admin.email.toLowerCase() === lowerEmail);

    if (foundAdmin) {
      res.json({
        success: true,
        token: `ppip-google-token-${Date.now()}`,
        user: {
          name: foundAdmin.nama || userName,
          email: userEmail,
          picture: userPicture,
          role: foundAdmin.peran || 'Admin Terdaftar'
        }
      });
    } else {
      res.status(403).json({
        success: false,
        error: `Akses ditolak untuk ${userEmail}. Email ini belum didaftarkan di daftar Admin PPI Polandia oleh Super Admin.`
      });
    }
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ success: false, error: 'Terjadi kesalahan sistem saat memproses login Google' });
  }
});

// 3. UPDATE THEME
app.put('/api/theme', (req, res) => {
  const { activeThemeKey } = req.body;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.activeThemeKey = activeThemeKey;
  writeDB(db);
  res.json({ success: true, activeThemeKey });
});

// 4. UPDATE VISI MISI
app.put('/api/visi-misi', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.visiMisi = req.body;
  writeDB(db);
  res.json({ success: true, visiMisi: db.visiMisi });
});

// 5. UPDATE SAMBUTAN KETUA
app.put('/api/sambutan-ketua', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.sambutanKetua = req.body;
  writeDB(db);
  res.json({ success: true, sambutanKetua: db.sambutanKetua });
});

// 6. UPDATE STATS DATA
app.put('/api/stats', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.statsData = req.body;
  writeDB(db);
  res.json({ success: true, statsData: db.statsData });
});

// 7. DIVISI CRUD
app.get('/api/divisi', (req, res) => {
  const db = readDB();
  res.json(db ? db.divisi : []);
});

app.post('/api/divisi', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `div-${Date.now()}` };
  db.divisi.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/divisi/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.divisi = db.divisi.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/divisi/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.divisi = db.divisi.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 8. PROGRAM KERJA CRUD
app.get('/api/program-kerja', (req, res) => {
  const db = readDB();
  res.json(db ? db.programKerja : []);
});

app.post('/api/program-kerja', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `proja-${Date.now()}` };
  db.programKerja.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/program-kerja/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.programKerja = db.programKerja.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/program-kerja/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.programKerja = db.programKerja.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 9. PENGURUS CRUD
app.get('/api/pengurus', (req, res) => {
  const db = readDB();
  res.json(db ? db.pengurus : []);
});

app.post('/api/pengurus', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `peng-${Date.now()}` };
  db.pengurus.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/pengurus/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = db.pengurus.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/pengurus/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = db.pengurus.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

app.put('/api/pengurus-list', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = req.body;
  writeDB(db);
  res.json({ success: true, pengurus: db.pengurus });
});

// 10. KABINET LIST & KATEGORI BERITA LIST
app.put('/api/kabinet-list', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kabinetList = req.body.kabinetList;
  if (req.body.pengurus) db.pengurus = req.body.pengurus;
  writeDB(db);
  res.json({ success: true, kabinetList: db.kabinetList, pengurus: db.pengurus });
});

app.put('/api/kategori-berita-list', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kategoriBeritaList = req.body.kategoriBeritaList;
  if (req.body.berita) db.berita = req.body.berita;
  writeDB(db);
  res.json({ success: true, kategoriBeritaList: db.kategoriBeritaList, berita: db.berita });
});

// 11. BERITA CRUD
app.get('/api/berita', (req, res) => {
  const db = readDB();
  res.json(db ? db.berita : []);
});

app.post('/api/berita', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `news-${Date.now()}` };
  db.berita.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/berita/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.berita = db.berita.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/berita/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.berita = db.berita.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 12. KONTAK & SOSMED
app.get('/api/kontak', (req, res) => {
  const db = readDB();
  res.json(db ? db.kontak : {});
});

app.put('/api/kontak', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kontak = req.body;
  writeDB(db);
  res.json({ success: true, kontak: db.kontak });
});

// 13. PESAN MASUK INBOX
app.get('/api/pesan-masuk', (req, res) => {
  const db = readDB();
  res.json(db ? db.pesanMasuk : []);
});

app.post('/api/pesan-masuk', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = {
    ...req.body,
    id: `msg-${Date.now()}`,
    tanggal: req.body.tanggal || new Date().toLocaleString('id-ID'),
    status: 'Belum Dibaca'
  };
  db.pesanMasuk.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/pesan-masuk/:id/read', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pesanMasuk = db.pesanMasuk.map((msg) => (msg.id === id ? { ...msg, status: 'Sudah Dibaca' } : msg));
  writeDB(db);
  res.json({ success: true, id });
});

app.delete('/api/pesan-masuk/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pesanMasuk = db.pesanMasuk.filter((msg) => msg.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 14. KELOLA ALLOWED ADMINS
app.put('/api/allowed-admins', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.allowedAdmins = req.body;
  writeDB(db);
  res.json({ success: true, allowedAdmins: db.allowedAdmins });
});

// Serve static assets in production if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Production Backend REST API server running on http://localhost:${PORT}`);
});
