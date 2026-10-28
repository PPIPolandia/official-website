// REST API Client helper for Web PPI Polandia Backend

const API_BASE = '/api';

export const api = {
  // 1. Fetch Full App Data
  async fetchFullData() {
    try {
      const res = await fetch(`${API_BASE}/data`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend REST API server unreachable. Using fallback local state.', err);
      return null;
    }
  },

  // 2. Admin Passcode Login
  async login(passcode) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: 'Gagal terhubung ke server autentikasi. Pastikan backend server sedang berjalan.' };
    }
  },

  // Google OAuth Login
  async loginWithGoogle(payload) {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      return {
        success: false,
        error: 'Gagal terhubung ke server autentikasi Google. Pastikan backend server sedang berjalan.'
      };
    }
  },

  // 3. Update Theme
  async updateTheme(activeThemeKey) {
    try {
      await fetch(`${API_BASE}/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeThemeKey })
      });
    } catch (err) {
      console.warn('API updateTheme error', err);
    }
  },

  // 4. Update Visi Misi
  async updateVisiMisi(data) {
    try {
      await fetch(`${API_BASE}/visi-misi`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateVisiMisi error', err);
    }
  },

  // 5. Update Sambutan Ketua
  async updateSambutanKetua(data) {
    try {
      await fetch(`${API_BASE}/sambutan-ketua`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateSambutanKetua error', err);
    }
  },

  // 6. Update Stats Data
  async updateStatsData(data) {
    try {
      await fetch(`${API_BASE}/stats`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateStatsData error', err);
    }
  },

  // 7. Divisi CRUD
  async addDivisi(data) {
    try {
      const res = await fetch(`${API_BASE}/divisi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.warn('API addDivisi error', err);
      return { ...data, id: `div-${Date.now()}` };
    }
  },

  async updateDivisi(data) {
    try {
      await fetch(`${API_BASE}/divisi/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateDivisi error', err);
    }
  },

  async deleteDivisi(id) {
    try {
      await fetch(`${API_BASE}/divisi/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API deleteDivisi error', err);
    }
  },

  // 8. Program Kerja CRUD
  async addProgramKerja(data) {
    try {
      const res = await fetch(`${API_BASE}/program-kerja`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.warn('API addProgramKerja error', err);
      return { ...data, id: `proja-${Date.now()}` };
    }
  },

  async updateProgramKerja(data) {
    try {
      await fetch(`${API_BASE}/program-kerja/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateProgramKerja error', err);
    }
  },

  async deleteProgramKerja(id) {
    try {
      await fetch(`${API_BASE}/program-kerja/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API deleteProgramKerja error', err);
    }
  },

  // 9. Pengurus CRUD & Positions
  async addPengurus(data) {
    try {
      const res = await fetch(`${API_BASE}/pengurus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.warn('API addPengurus error', err);
      return { ...data, id: `peng-${Date.now()}` };
    }
  },

  async updatePengurus(data) {
    try {
      await fetch(`${API_BASE}/pengurus/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updatePengurus error', err);
    }
  },

  async deletePengurus(id) {
    try {
      await fetch(`${API_BASE}/pengurus/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API deletePengurus error', err);
    }
  },

  async updatePengurusList(pengurusList) {
    try {
      await fetch(`${API_BASE}/pengurus-list`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pengurusList)
      });
    } catch (err) {
      console.warn('API updatePengurusList error', err);
    }
  },

  // 10. Kabinet & Kategori Berita Lists
  async updateKabinetList(kabinetList, pengurusList) {
    try {
      await fetch(`${API_BASE}/kabinet-list`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kabinetList, pengurus: pengurusList })
      });
    } catch (err) {
      console.warn('API updateKabinetList error', err);
    }
  },

  async updateKategoriBeritaList(kategoriBeritaList, beritaList) {
    try {
      await fetch(`${API_BASE}/kategori-berita-list`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kategoriBeritaList, berita: beritaList })
      });
    } catch (err) {
      console.warn('API updateKategoriBeritaList error', err);
    }
  },

  // 11. Berita CRUD
  async addBerita(data) {
    try {
      const res = await fetch(`${API_BASE}/berita`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.warn('API addBerita error', err);
      return { ...data, id: `news-${Date.now()}` };
    }
  },

  async updateBerita(data) {
    try {
      await fetch(`${API_BASE}/berita/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateBerita error', err);
    }
  },

  async deleteBerita(id) {
    try {
      await fetch(`${API_BASE}/berita/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API deleteBerita error', err);
    }
  },

  // 12. Kontak & Sosmed
  async updateKontak(data) {
    try {
      await fetch(`${API_BASE}/kontak`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('API updateKontak error', err);
    }
  },

  // 13. Pesan Masuk Inbox
  async addPesanMasuk(data) {
    try {
      const res = await fetch(`${API_BASE}/pesan-masuk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      console.warn('API addPesanMasuk error', err);
      return { ...data, id: `msg-${Date.now()}` };
    }
  },

  async markPesanRead(id) {
    try {
      await fetch(`${API_BASE}/pesan-masuk/${id}/read`, { method: 'PUT' });
    } catch (err) {
      console.warn('API markPesanRead error', err);
    }
  },

  async deletePesanMasuk(id) {
    try {
      await fetch(`${API_BASE}/pesan-masuk/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('API deletePesanMasuk error', err);
    }
  },

  // 14. Allowed Admins Management
  async updateAllowedAdmins(allowedAdminsList) {
    try {
      await fetch(`${API_BASE}/allowed-admins`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allowedAdminsList)
      });
    } catch (err) {
      console.warn('API updateAllowedAdmins error', err);
    }
  }
};
