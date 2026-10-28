import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';
import {
  initialVisiMisi,
  initialSambutanKetua,
  THEME_PRESETS,
  initialStatsData,
  initialDivisi,
  initialProgramKerja,
  initialPengurus,
  initialBerita,
  initialKontak,
  initialPesanMasuk,
  initialKabinetList,
  initialKategoriBeritaList,
  initialAllowedAdmins
} from '../data/initialData';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  // Theme State & CSS Variable Application
  const [activeThemeKey, setActiveThemeKey] = useState(() => {
    const saved = localStorage.getItem('ppip_themeKey');
    return saved && THEME_PRESETS[saved] ? saved : 'biru';
  });

  // Apply root CSS variables whenever activeThemeKey changes
  useEffect(() => {
    const theme = THEME_PRESETS[activeThemeKey] || THEME_PRESETS.biru;
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-hover', theme.primaryHover);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--primary-border', theme.primaryBorder);
    root.style.setProperty('--primary-gradient', theme.primaryGradient);
    root.style.setProperty('--border-focus', theme.borderFocus);
    localStorage.setItem('ppip_themeKey', activeThemeKey);
  }, [activeThemeKey]);

  // Safe localStorage helper to prevent white screens on corrupted storage or JSON parse errors
  const safeJSONParse = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      const parsed = JSON.parse(saved);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch (err) {
      console.warn(`Failed parsing localStorage key "${key}". Clearing key and fallbacking.`, err);
      try { localStorage.removeItem(key); } catch (e) {}
      return fallback;
    }
  };

  const safeJSONSave = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`localStorage save warning for key "${key}" (quota might be exceeded). Server state remains safe.`, err);
    }
  };

  const changeTheme = (themeKey) => {
    if (THEME_PRESETS[themeKey]) {
      setActiveThemeKey(themeKey);
      api.updateTheme(themeKey);
      showToast(`Tema warna website berhasil diubah ke ${THEME_PRESETS[themeKey].name}!`);
    }
  };

  // Initialize state with safe localStorage parsing or fallback to defaults
  const [visiMisi, setVisiMisi] = useState(() => safeJSONParse('ppip_visiMisi', initialVisiMisi));
  const [sambutanKetua, setSambutanKetua] = useState(() => safeJSONParse('ppip_sambutanKetua', initialSambutanKetua));
  const [statsData, setStatsData] = useState(() => safeJSONParse('ppip_statsData', initialStatsData));
  const [divisi, setDivisi] = useState(() => safeJSONParse('ppip_divisi', initialDivisi));
  const [programKerja, setProgramKerja] = useState(() => safeJSONParse('ppip_programKerja', initialProgramKerja));
  const [pengurus, setPengurus] = useState(() => safeJSONParse('ppip_pengurus', initialPengurus));
  const [kabinetList, setKabinetList] = useState(() => safeJSONParse('ppip_kabinetList', initialKabinetList));
  const [kategoriBeritaList, setKategoriBeritaList] = useState(() => safeJSONParse('ppip_kategoriBeritaList', initialKategoriBeritaList));
  const [berita, setBerita] = useState(() => safeJSONParse('ppip_berita', initialBerita));
  const [kontak, setKontak] = useState(() => safeJSONParse('ppip_kontak', initialKontak));
  const [pesanMasuk, setPesanMasuk] = useState(initialPesanMasuk);
  const [allowedAdmins, setAllowedAdmins] = useState(initialAllowedAdmins);

  // Load live data from Backend REST API
  const refreshServerData = async () => {
    const db = await api.fetchFullData();
    if (db) {
      if (db.activeThemeKey) setActiveThemeKey(db.activeThemeKey);
      if (db.visiMisi) setVisiMisi(db.visiMisi);
      if (db.sambutanKetua) setSambutanKetua(db.sambutanKetua);
      if (db.statsData) setStatsData(db.statsData);
      if (db.divisi) setDivisi(db.divisi);
      if (db.programKerja) setProgramKerja(db.programKerja);
      if (db.pengurus) setPengurus(db.pengurus);
      if (db.kabinetList) setKabinetList(db.kabinetList);
      if (db.kategoriBeritaList) setKategoriBeritaList(db.kategoriBeritaList);
      if (db.berita) setBerita(db.berita);
      if (db.kontak) setKontak(db.kontak);
      if (Array.isArray(db.pesanMasuk)) setPesanMasuk(db.pesanMasuk);
      if (Array.isArray(db.allowedAdmins)) setAllowedAdmins(db.allowedAdmins);
    }
  };

  useEffect(() => {
    refreshServerData();
  }, []);

  // Active Admin Toast Message State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync public data to localStorage safely as client fallback
  useEffect(() => { safeJSONSave('ppip_visiMisi', visiMisi); }, [visiMisi]);
  useEffect(() => { safeJSONSave('ppip_sambutanKetua', sambutanKetua); }, [sambutanKetua]);
  useEffect(() => { safeJSONSave('ppip_statsData', statsData); }, [statsData]);
  useEffect(() => { safeJSONSave('ppip_divisi', divisi); }, [divisi]);
  useEffect(() => { safeJSONSave('ppip_programKerja', programKerja); }, [programKerja]);
  useEffect(() => { safeJSONSave('ppip_pengurus', pengurus); }, [pengurus]);
  useEffect(() => { safeJSONSave('ppip_kabinetList', kabinetList); }, [kabinetList]);
  useEffect(() => { safeJSONSave('ppip_kategoriBeritaList', kategoriBeritaList); }, [kategoriBeritaList]);
  useEffect(() => { safeJSONSave('ppip_berita', berita); }, [berita]);
  useEffect(() => { safeJSONSave('ppip_kontak', kontak); }, [kontak]);

  // Handlers for Allowed Admins Management
  const addAllowedAdmin = (email, nama, peran = 'Admin') => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;
    if (allowedAdmins.some(a => a.email.toLowerCase() === trimmedEmail)) {
      showToast(`Email ${trimmedEmail} sudah ada di daftar Admin!`, 'warning');
      return;
    }
    const newAdmin = {
      id: `admin-${Date.now()}`,
      email: trimmedEmail,
      nama: nama.trim() || trimmedEmail.split('@')[0],
      peran: peran.trim() || 'Admin',
      ditambahkanPada: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    const updated = [...allowedAdmins, newAdmin];
    setAllowedAdmins(updated);
    api.updateAllowedAdmins(updated);
    showToast(`Email ${trimmedEmail} berhasil didaftarkan sebagai ${newAdmin.peran}!`);
  };

  const updateAllowedAdmin = (updatedItem) => {
    const updated = allowedAdmins.map(item => item.id === updatedItem.id ? updatedItem : item);
    setAllowedAdmins(updated);
    api.updateAllowedAdmins(updated);
    showToast(`Data admin ${updatedItem.email} berhasil diperbarui!`);
  };

  const deleteAllowedAdmin = (id) => {
    if (allowedAdmins.length <= 1) {
      showToast('Sistem memerlukan minimal 1 email admin terdaftar!', 'warning');
      return;
    }
    const target = allowedAdmins.find(a => a.id === id);
    const updated = allowedAdmins.filter(a => a.id !== id);
    setAllowedAdmins(updated);
    api.updateAllowedAdmins(updated);
    showToast(`Admin ${target ? target.email : ''} berhasil dihapus dari sistem!`, 'warning');
  };

  // Handlers for Kabinet Management
  const addKabinet = (namaKabinet) => {
    const trimmed = namaKabinet.trim();
    if (!trimmed) return;
    if (kabinetList.includes(trimmed)) {
      showToast('Nama kabinet ini sudah ada!', 'warning');
      return;
    }
    const updatedList = [...kabinetList, trimmed];
    setKabinetList(updatedList);
    api.updateKabinetList(updatedList, pengurus);
    showToast(`Kabinet "${trimmed}" berhasil ditambahkan!`);
  };

  const deleteKabinet = (namaKabinet) => {
    if (kabinetList.length <= 1) {
      showToast('Minimal harus ada 1 kabinet dalam sistem!', 'warning');
      return;
    }
    const updatedKabinet = kabinetList.filter(k => k !== namaKabinet);
    const updatedPengurus = pengurus.filter(p => p.kabinet !== namaKabinet);
    setKabinetList(updatedKabinet);
    setPengurus(updatedPengurus);
    api.updateKabinetList(updatedKabinet, updatedPengurus);
    showToast(`Kabinet "${namaKabinet}" berhasil dihapus!`, 'warning');
  };

  // Handlers for Kategori Berita Management
  const addKategoriBerita = (namaKategori) => {
    const trimmed = namaKategori.trim();
    if (!trimmed) return;
    if (kategoriBeritaList.includes(trimmed)) {
      showToast('Kategori berita ini sudah ada!', 'warning');
      return;
    }
    const updated = [...kategoriBeritaList, trimmed];
    setKategoriBeritaList(updated);
    api.updateKategoriBeritaList(updated, berita);
    showToast(`Kategori berita "${trimmed}" berhasil ditambahkan!`);
  };

  const updateKategoriBerita = (oldNama, newNama) => {
    const trimmed = newNama.trim();
    if (!trimmed) return;
    if (kategoriBeritaList.includes(trimmed) && trimmed !== oldNama) {
      showToast('Kategori berita dengan nama ini sudah ada!', 'warning');
      return;
    }
    const updatedKat = kategoriBeritaList.map(k => k === oldNama ? trimmed : k);
    const updatedBerita = berita.map(b => b.kategori === oldNama ? { ...b, kategori: trimmed } : b);
    setKategoriBeritaList(updatedKat);
    setBerita(updatedBerita);
    api.updateKategoriBeritaList(updatedKat, updatedBerita);
    showToast(`Kategori berita "${oldNama}" berhasil diubah menjadi "${trimmed}"!`);
  };

  const deleteKategoriBerita = (namaKategori) => {
    if (kategoriBeritaList.length <= 1) {
      showToast('Minimal harus ada 1 kategori berita dalam sistem!', 'warning');
      return;
    }
    const updated = kategoriBeritaList.filter(k => k !== namaKategori);
    setKategoriBeritaList(updated);
    api.updateKategoriBeritaList(updated, berita);
    showToast(`Kategori berita "${namaKategori}" berhasil dihapus!`, 'warning');
  };

  // Handlers for Visi & Misi
  const updateVisiMisi = (data) => {
    setVisiMisi(data);
    api.updateVisiMisi(data);
    showToast('Visi & Misi berhasil diperbarui!');
  };

  // Handlers for Sambutan Ketua
  const updateSambutanKetua = (data) => {
    setSambutanKetua(data);
    api.updateSambutanKetua(data);
    showToast('Sambutan Ketua PPI berhasil diperbarui!');
  };

  // Handlers for Divisi
  const addDivisi = async (newItem) => {
    const created = await api.addDivisi(newItem);
    setDivisi(prev => [...prev, created]);
    showToast('Divisi baru berhasil ditambahkan!');
  };

  const updateDivisi = (updatedItem) => {
    setDivisi(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    api.updateDivisi(updatedItem);
    showToast('Data divisi berhasil diperbarui!');
  };

  const deleteDivisi = (id) => {
    setDivisi(prev => prev.filter(item => item.id !== id));
    api.deleteDivisi(id);
    showToast('Divisi berhasil dihapus!', 'warning');
  };

  // Handlers for Program Kerja
  const addProgram = async (newItem) => {
    const created = await api.addProgramKerja(newItem);
    setProgramKerja(prev => [created, ...prev]);
    showToast('Program Kerja baru berhasil ditambahkan!');
  };

  const updateProgram = (updatedItem) => {
    setProgramKerja(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    api.updateProgramKerja(updatedItem);
    showToast('Program Kerja berhasil diperbarui!');
  };

  const deleteProgram = (id) => {
    setProgramKerja(prev => prev.filter(item => item.id !== id));
    api.deleteProgramKerja(id);
    showToast('Program Kerja berhasil dihapus!', 'warning');
  };

  // Handlers for Pengurus & Position Ordering!
  const addPengurus = async (newItem) => {
    const maxPos = pengurus.length > 0 ? Math.max(...pengurus.map(p => p.positionIndex || 0)) : 0;
    const itemWithPos = {
      ...newItem,
      positionIndex: maxPos + 1
    };
    const created = await api.addPengurus(itemWithPos);
    setPengurus(prev => [...prev, created]);
    showToast('Pengurus baru berhasil ditambahkan!');
  };

  const updatePengurus = (updatedItem) => {
    setPengurus(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    api.updatePengurus(updatedItem);
    showToast('Data pengurus berhasil diperbarui!');
  };

  const deletePengurus = (id) => {
    setPengurus(prev => prev.filter(item => item.id !== id));
    api.deletePengurus(id);
    showToast('Data pengurus berhasil dihapus!', 'warning');
  };

  // Move Pengurus position index UP or DOWN
  const movePengurusPosition = (id, direction) => {
    let updatedList = [];
    setPengurus(prev => {
      const sorted = [...prev].sort((a, b) => (a.positionIndex || 0) - (b.positionIndex || 0));
      const index = sorted.findIndex(p => p.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

      // Swap position indices
      const currentPos = sorted[index].positionIndex;
      const targetPos = sorted[targetIndex].positionIndex;

      sorted[index].positionIndex = targetPos;
      sorted[targetIndex].positionIndex = currentPos;

      updatedList = [...sorted];
      return updatedList;
    });
    if (updatedList.length > 0) api.updatePengurusList(updatedList);
    showToast(`Urutan pengurus berhasil digeser ke ${direction === 'up' ? 'atas' : 'bawah'}`);
  };

  // Set explicit numeric position index
  const updatePengurusPositionIndex = (id, newIndex) => {
    let updatedList = [];
    setPengurus(prev => {
      updatedList = prev.map(p => p.id === id ? { ...p, positionIndex: Number(newIndex) } : p);
      return updatedList;
    });
    api.updatePengurusList(updatedList);
    showToast('Posisi urutan pengurus berhasil disimpan!');
  };

  // Handlers for Berita
  const addBerita = async (newItem) => {
    const itemWithData = {
      ...newItem,
      dibaca: '0 kali'
    };
    const created = await api.addBerita(itemWithData);
    setBerita(prev => [created, ...prev]);
    showToast('Berita baru berhasil diterbitkan!');
  };

  const updateBerita = (updatedItem) => {
    setBerita(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    api.updateBerita(updatedItem);
    showToast('Berita berhasil diperbarui!');
  };

  const deleteBerita = (id) => {
    setBerita(prev => prev.filter(item => item.id !== id));
    api.deleteBerita(id);
    showToast('Berita berhasil dihapus!', 'warning');
  };

  // Handlers for Kontak & Sosmed
  const updateKontak = (data) => {
    setKontak(data);
    api.updateKontak(data);
    showToast('Informasi Kontak & Sosmed berhasil diperbarui!');
  };

  // Handlers for Leave Message Form & Inbox
  const submitLeaveMessage = async (data) => {
    const newMsgData = {
      ...data,
      tanggal: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Belum Dibaca'
    };
    const created = await api.addPesanMasuk(newMsgData);
    setPesanMasuk(prev => [created, ...prev]);
    showToast('Pesan Kamu telah terkirim ke email & inbox PPI Polandia!');
  };

  const markPesanRead = (id) => {
    setPesanMasuk(prev => prev.map(msg => msg.id === id ? { ...msg, status: 'Sudah Dibaca' } : msg));
    api.markPesanRead(id);
  };

  const deletePesan = (id) => {
    setPesanMasuk(prev => prev.filter(msg => msg.id !== id));
    api.deletePesanMasuk(id);
    showToast('Pesan berhasil dihapus dari inbox!', 'warning');
  };

  // Handlers for Hero Stats
  const updateStatsData = (newStatsList) => {
    setStatsData(newStatsList);
    api.updateStatsData(newStatsList);
    showToast('Data statistik Hero berhasil diperbarui!');
  };

  const addStatItem = (item) => {
    const updated = [...statsData, { ...item, id: `stat-${Date.now()}` }];
    setStatsData(updated);
    api.updateStatsData(updated);
    showToast('Item statistik baru berhasil ditambahkan!');
  };

  const deleteStatItem = (id) => {
    const updated = statsData.filter(s => s.id !== id);
    setStatsData(updated);
    api.updateStatsData(updated);
    showToast('Item statistik berhasil dihapus!', 'warning');
  };

  // Reset to default data
  const resetToDefaultData = () => {
    setActiveThemeKey('biru');
    setVisiMisi(initialVisiMisi);
    setSambutanKetua(initialSambutanKetua);
    setStatsData(initialStatsData);
    setDivisi(initialDivisi);
    setProgramKerja(initialProgramKerja);
    setPengurus(initialPengurus);
    setKabinetList(initialKabinetList);
    setKategoriBeritaList(initialKategoriBeritaList);
    setBerita(initialBerita);
    setKontak(initialKontak);
    setPesanMasuk(initialPesanMasuk);
    setAllowedAdmins(initialAllowedAdmins);
    localStorage.clear();
    showToast('Seluruh data berhasil di-reset ke data bawaan!');
  };

  return (
    <AppDataContext.Provider value={{
      activeThemeKey,
      changeTheme,
      THEME_PRESETS,
      visiMisi,
      updateVisiMisi,
      sambutanKetua,
      updateSambutanKetua,
      statsData,
      updateStatsData,
      addStatItem,
      deleteStatItem,
      divisi,
      addDivisi,
      updateDivisi,
      deleteDivisi,
      programKerja,
      addProgram,
      updateProgram,
      deleteProgram,
      pengurus,
      addPengurus,
      updatePengurus,
      deletePengurus,
      movePengurusPosition,
      updatePengurusPositionIndex,
      kabinetList,
      addKabinet,
      deleteKabinet,
      kategoriBeritaList,
      addKategoriBerita,
      updateKategoriBerita,
      deleteKategoriBerita,
      berita,
      addBerita,
      updateBerita,
      deleteBerita,
      kontak,
      updateKontak,
      pesanMasuk,
      submitLeaveMessage,
      markPesanRead,
      deletePesan,
      allowedAdmins,
      addAllowedAdmin,
      updateAllowedAdmin,
      deleteAllowedAdmin,
      refreshServerData,
      resetToDefaultData,
      toast,
      showToast
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
