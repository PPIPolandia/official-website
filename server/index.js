import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const TMP_DB_PATH = path.join(os.tmpdir(), 'ppip-official-db.json');

// Automatically load .env file from project root in local environment
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        const k = key.trim();
        if (!process.env[k]) {
          process.env[k] = vals.join('=').trim();
        }
      }
    });
  } catch (err) {
    console.warn('Could not load .env file:', err);
  }
}

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json({ limit: '4mb' }));

// ============================================================================
// CRYPTOGRAPHIC STATELESS ADMIN TOKEN & RATE LIMITING
// ============================================================================
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const loginAttempts = new Map(); // IP -> { count, resetAt }

const getSigningSecret = () => {
  const base = process.env.ADMIN_PASSCODE || '';
  const extra = process.env.GOOGLE_CLIENT_SECRET || 'ppip-polandia-hmac-salt-2025';
  return crypto.createHash('sha256').update(`${base}:${extra}`).digest();
};

const createAdminToken = (userPayload) => {
  const payload = {
    sub: userPayload.email || 'super-admin',
    name: userPayload.name || 'Admin PPI Polandia',
    role: userPayload.role || 'Admin',
    exp: Date.now() + TOKEN_TTL_MS
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSigningSecret())
    .update(payloadB64)
    .digest('base64url');
  return `${payloadB64}.${signature}`;
};

const verifyAdminToken = (token) => {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const expectedSig = crypto
      .createHmac('sha256', getSigningSecret())
      .update(payloadB64)
      .digest('base64url');

    const sigBuf = Buffer.from(signature, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

const extractTokenFromReq = (req) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
};

const requireAdminAuth = (req, res, next) => {
  const token = extractTokenFromReq(req);
  const verified = verifyAdminToken(token);
  if (!verified) {
    return res.status(401).json({
      success: false,
      error: 'Akses ditolak: Sesi Admin tidak valid atau telah berakhir. Silakan login kembali.'
    });
  }
  req.adminUser = verified;
  next();
};

// Constant-time string comparison for passcode
const safePasscodeCompare = (input, expected) => {
  if (typeof input !== 'string' || typeof expected !== 'string' || !expected) return false;
  const inputHash = crypto.createHash('sha256').update(input).digest();
  const expectedHash = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(inputHash, expectedHash);
};

// ============================================================================
// DATABASE READ / WRITE (WITH VERCEL SERVERLESS EPHEMERAL FALLBACK)
// ============================================================================
let memoryDB = null;

const readDB = () => {
  try {
    if (memoryDB) return memoryDB;
    if (fs.existsSync(TMP_DB_PATH)) {
      const rawTmp = fs.readFileSync(TMP_DB_PATH, 'utf8');
      memoryDB = JSON.parse(rawTmp);
      return memoryDB;
    }
    if (!fs.existsSync(DB_PATH)) {
      return null;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    memoryDB = JSON.parse(raw);
    return memoryDB;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return null;
  }
};

const writeDB = (data) => {
  memoryDB = data;
  const serialized = JSON.stringify(data, null, 2);
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, serialized, 'utf8');
    return true;
  } catch {
    // Fallback for Vercel Serverless read-only file system
    try {
      fs.writeFileSync(TMP_DB_PATH, serialized, 'utf8');
      return true;
    } catch (tmpErr) {
      console.error('Error writing to fallback tmp db:', tmpErr);
      return false;
    }
  }
};

// ============================================================================
// API ROUTES
// ============================================================================

// 1. GET FULL DATA (Public fields by default; includes private admin fields only if authenticated)
app.get('/api/data', (req, res) => {
  const db = readDB();
  if (!db) {
    return res.status(500).json({ error: 'Failed to read database' });
  }

  const isAdmin = Boolean(verifyAdminToken(extractTokenFromReq(req)));

  if (isAdmin) {
    return res.json(db);
  }

  // Strip sensitive admin-only fields for unauthenticated public visitors
  const { allowedAdmins, pesanMasuk, ...publicData } = db;
  res.json(publicData);
});

// 2. ADMIN AUTH LOGIN (PASSCODE WITH BRUTE-FORCE RATE LIMITING)
app.post('/api/auth/login', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const attempt = loginAttempts.get(clientIp);

  if (attempt && now < attempt.resetAt && attempt.count >= 10) {
    return res.status(429).json({
      success: false,
      error: 'Terlalu banyak percobaan login gagal. Silakan coba lagi dalam 15 menit.'
    });
  }

  const { passcode } = req.body || {};
  const adminPass = process.env.ADMIN_PASSCODE;

  if (!adminPass) {
    return res.status(500).json({
      success: false,
      error: 'Konfigurasi ADMIN_PASSCODE belum diatur di environment server'
    });
  }

  if (safePasscodeCompare(passcode, adminPass)) {
    loginAttempts.delete(clientIp);
    const user = {
      name: 'Admin Utama PPI Polandia',
      email: '',
      picture: '',
      role: 'Super Admin',
      loginType: 'passcode'
    };
    const token = createAdminToken(user);
    return res.json({
      success: true,
      token,
      user
    });
  }

  const currentCount = attempt && now < attempt.resetAt ? attempt.count + 1 : 1;
  loginAttempts.set(clientIp, { count: currentCount, resetAt: now + 15 * 60 * 1000 });
  return res.status(401).json({ success: false, error: 'Kode akses admin salah' });
});

// GOOGLE SIGN-IN OAUTH AUTHENTICATION (CRYPTOGRAPHIC VERIFICATION VIA GOOGLE TOKENINFO)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body || {};
    if (!credential || typeof credential !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Token kredensial Google tidak ditemukan atau tidak valid.'
      });
    }

    // Verify JWT signature & claims directly against Google's official tokeninfo endpoint
    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
    const googleRes = await fetch(verifyUrl);
    if (!googleRes.ok) {
      return res.status(401).json({
        success: false,
        error: 'Token Google tidak valid atau telah kedaluwarsa.'
      });
    }

    const tokenInfo = await googleRes.json();
    const expectedClientId = process.env.VITE_GOOGLE_CLIENT_ID;
    if (expectedClientId && tokenInfo.aud !== expectedClientId) {
      return res.status(401).json({
        success: false,
        error: 'Client ID token Google tidak cocok dengan aplikasi ini.'
      });
    }

    if (tokenInfo.email_verified !== 'true' && tokenInfo.email_verified !== true) {
      return res.status(401).json({
        success: false,
        error: 'Email Google belum terverifikasi.'
      });
    }

    const lowerEmail = (tokenInfo.email || '').toLowerCase();
    const userName = tokenInfo.name || 'Pengurus PPI Polandia';
    const userPicture = tokenInfo.picture || '';

    const db = readDB();
    const allowedAdmins = db && Array.isArray(db.allowedAdmins) ? db.allowedAdmins : [
      { id: 'admin-3', email: 'ppi.polandia@gmail.com', nama: 'Akun Resmi PPI Polandia', peran: 'Super Admin' }
    ];

    const foundAdmin = allowedAdmins.find(admin => admin.email && admin.email.toLowerCase() === lowerEmail);

    if (foundAdmin) {
      const user = {
        name: foundAdmin.nama || userName,
        email: lowerEmail,
        picture: userPicture,
        role: foundAdmin.peran || 'Admin Terdaftar',
        loginType: 'google'
      };
      const token = createAdminToken(user);
      return res.json({
        success: true,
        token,
        user
      });
    } else {
      return res.status(403).json({
        success: false,
        error: `Akses ditolak untuk ${lowerEmail}. Email ini belum didaftarkan di daftar Admin PPI Polandia oleh Super Admin.`
      });
    }
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan sistem saat memverifikasi login Google'
    });
  }
});

// 3. UPDATE THEME (Admin Protected)
app.put('/api/theme', requireAdminAuth, (req, res) => {
  const { activeThemeKey } = req.body;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.activeThemeKey = activeThemeKey;
  writeDB(db);
  res.json({ success: true, activeThemeKey });
});

// 4. UPDATE VISI MISI (Admin Protected)
app.put('/api/visi-misi', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.visiMisi = req.body;
  writeDB(db);
  res.json({ success: true, visiMisi: db.visiMisi });
});

// 5. UPDATE SAMBUTAN KETUA (Admin Protected)
app.put('/api/sambutan-ketua', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.sambutanKetua = req.body;
  writeDB(db);
  res.json({ success: true, sambutanKetua: db.sambutanKetua });
});

// 6. UPDATE STATS DATA (Admin Protected)
app.put('/api/stats', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.statsData = req.body;
  writeDB(db);
  res.json({ success: true, statsData: db.statsData });
});

// 7. DIVISI CRUD (Public GET, Admin Protected POST/PUT/DELETE)
app.get('/api/divisi', (req, res) => {
  const db = readDB();
  res.json(db ? db.divisi : []);
});

app.post('/api/divisi', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `div-${Date.now()}` };
  db.divisi.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/divisi/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.divisi = db.divisi.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/divisi/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.divisi = db.divisi.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 8. PROGRAM KERJA CRUD (Public GET, Admin Protected POST/PUT/DELETE)
app.get('/api/program-kerja', (req, res) => {
  const db = readDB();
  res.json(db ? db.programKerja : []);
});

app.post('/api/program-kerja', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `proja-${Date.now()}` };
  db.programKerja.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/program-kerja/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.programKerja = db.programKerja.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/program-kerja/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.programKerja = db.programKerja.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 9. PENGURUS CRUD (Public GET, Admin Protected POST/PUT/DELETE)
app.get('/api/pengurus', (req, res) => {
  const db = readDB();
  res.json(db ? db.pengurus : []);
});

app.post('/api/pengurus', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `peng-${Date.now()}` };
  db.pengurus.push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/pengurus/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = db.pengurus.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/pengurus/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = db.pengurus.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

app.put('/api/pengurus-list', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pengurus = req.body;
  writeDB(db);
  res.json({ success: true, pengurus: db.pengurus });
});

// 10. KABINET LIST & KATEGORI BERITA LIST (Admin Protected)
app.put('/api/kabinet-list', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kabinetList = req.body.kabinetList;
  if (req.body.pengurus) db.pengurus = req.body.pengurus;
  writeDB(db);
  res.json({ success: true, kabinetList: db.kabinetList, pengurus: db.pengurus });
});

app.put('/api/kategori-berita-list', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kategoriBeritaList = req.body.kategoriBeritaList;
  if (req.body.berita) db.berita = req.body.berita;
  writeDB(db);
  res.json({ success: true, kategoriBeritaList: db.kategoriBeritaList, berita: db.berita });
});

// 11. BERITA CRUD (Public GET, Admin Protected POST/PUT/DELETE)
app.get('/api/berita', (req, res) => {
  const db = readDB();
  res.json(db ? db.berita : []);
});

app.post('/api/berita', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  const newItem = { ...req.body, id: `news-${Date.now()}` };
  db.berita.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/berita/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.berita = db.berita.map((item) => (item.id === id ? { ...req.body, id } : item));
  writeDB(db);
  res.json(req.body);
});

app.delete('/api/berita/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.berita = db.berita.filter((item) => item.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 12. KONTAK & SOSMED (Public GET, Admin Protected PUT)
app.get('/api/kontak', (req, res) => {
  const db = readDB();
  res.json(db ? db.kontak : {});
});

app.put('/api/kontak', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.kontak = req.body;
  writeDB(db);
  res.json({ success: true, kontak: db.kontak });
});

// 13. PESAN MASUK INBOX (Admin Protected GET/PUT/DELETE, Public Sanitized POST)
app.get('/api/pesan-masuk', requireAdminAuth, (req, res) => {
  const db = readDB();
  res.json(db ? db.pesanMasuk : []);
});

app.post('/api/pesan-masuk', (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });

  const { nama, email, subjek, pesan, tanggal } = req.body || {};
  if (!nama || !email || !pesan) {
    return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi' });
  }

  const sanitize = (str, maxLen) =>
    String(str || '')
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, maxLen);

  const newItem = {
    nama: sanitize(nama, 100),
    email: sanitize(email, 120),
    subjek: sanitize(subjek, 150),
    pesan: sanitize(pesan, 2000),
    id: `msg-${Date.now()}`,
    tanggal: sanitize(tanggal, 60) || new Date().toLocaleString('id-ID'),
    status: 'Belum Dibaca'
  };

  if (!Array.isArray(db.pesanMasuk)) db.pesanMasuk = [];
  db.pesanMasuk.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.put('/api/pesan-masuk/:id/read', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pesanMasuk = db.pesanMasuk.map((msg) => (msg.id === id ? { ...msg, status: 'Sudah Dibaca' } : msg));
  writeDB(db);
  res.json({ success: true, id });
});

app.delete('/api/pesan-masuk/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.pesanMasuk = db.pesanMasuk.filter((msg) => msg.id !== id);
  writeDB(db);
  res.json({ success: true, id });
});

// 14. KELOLA ALLOWED ADMINS (Admin Protected)
app.put('/api/allowed-admins', requireAdminAuth, (req, res) => {
  const db = readDB();
  if (!db) return res.status(500).json({ error: 'Database error' });
  db.allowedAdmins = req.body;
  writeDB(db);
  res.json({ success: true, allowedAdmins: db.allowedAdmins });
});

// Serve static assets in standalone production mode if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (!process.env.VERCEL && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server only when run directly (not inside Vercel Serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Production Backend REST API server running on http://localhost:${PORT}`);
  });
}

export default app;
