import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import {
  LayoutDashboard,
  Target,
  Quote,
  Layers,
  ListTodo,
  Users,
  Newspaper,
  PhoneCall,
  Inbox,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Save,
  LogOut,
  RotateCcw,
  Check,
  Sparkles,
  ArrowRight,
  UserPlus,
  AlertTriangle,
  Upload,
  Crop,
  Camera,
  X,
  Palette,
  ShieldCheck
} from 'lucide-react';
import { ImageCropperModal } from '../components/ImageCropperModal';
import { DateRangePicker } from '../components/DateRangePicker';
import { DivisiIcon, DIVISION_ICONS } from '../components/DivisiIcon';
import { renderSocialIcon, SOCIAL_PLATFORMS } from '../components/SocialIcons';
import logoPPIP from '../assets/Logo PPIP.png';
import polandFlag from '../assets/poland.png';
import indonesiaFlag from '../assets/indonesia.png';

export const AdminDashboard = ({ onExitAdmin, adminUser }) => {
  const currentAdmin = {
    name: adminUser?.name || 'Admin Utama PPI Polandia',
    email: adminUser?.email !== undefined ? adminUser.email : '',
    picture: adminUser?.picture || logoPPIP,
    loginType: adminUser?.loginType || 'passcode'
  };
  const {
    activeThemeKey,
    changeTheme,
    THEME_PRESETS,
    visiMisi,
    updateVisiMisi,
    sambutanKetua,
    updateSambutanKetua,
    statsData,
    updateStatsData,
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
    markPesanRead,
    deletePesan,
    allowedAdmins,
    addAllowedAdmin,
    updateAllowedAdmin,
    deleteAllowedAdmin,
    resetToDefaultData
  } = useAppData();

  const [activeTab, setActiveTab] = useState('overview');

  // State for Allowed Admin Modal
  const [allowedAdminModal, setAllowedAdminModal] = useState(null); // null, 'add', or editing object

  // State for new Cabinet creation inline/modal
  const [showKabinetModal, setShowKabinetModal] = useState(false);
  const [newKabinetName, setNewKabinetName] = useState('');
  const [confirmDeleteKabinet, setConfirmDeleteKabinet] = useState(null);

  // State for Kategori Berita Manager
  const [showKategoriBeritaModal, setShowKategoriBeritaModal] = useState(false);
  const [newKategoriBeritaName, setNewKategoriBeritaName] = useState('');
  const [editingKategori, setEditingKategori] = useState(null);
  const [confirmDeleteKategori, setConfirmDeleteKategori] = useState(null);

  // State for Image Cropper
  const [cropperState, setCropperState] = useState(null);

  // State for Proja Documentation URL input
  const [projaDocUrlInput, setProjaDocUrlInput] = useState('');

  // State for Berita Gallery URL input
  const [beritaDocUrlInput, setBeritaDocUrlInput] = useState('');

  // Combined cabinet options list
  const cabinetOptions = [...new Set([
    ...(kabinetList || []),
    ...(pengurus || []).map(p => p?.kabinet),
    ...(divisi || []).map(d => d?.kabinet),
    ...(programKerja || []).map(p => p?.kabinet)
  ].filter(Boolean))];
  if (cabinetOptions.length === 0) {
    cabinetOptions.push('2024/2025 - Kabinet Garuda Nusantara');
  }

  // Pengurus Cabinet Filter in Admin (dynamically initialized to active cabinet)
  const [adminCabinetFilter, setAdminCabinetFilter] = useState(() => cabinetOptions[0]);

  // Auto-sync adminCabinetFilter when cabinet options update or server data loads
  React.useEffect(() => {
    if (cabinetOptions.length > 0 && !cabinetOptions.includes(adminCabinetFilter)) {
      setAdminCabinetFilter(cabinetOptions[0]);
    }
  }, [kabinetList, pengurus]);

  // Local Form States for Editing
  const [visiForm, setVisiForm] = useState(visiMisi);
  const [sambutanForm, setSambutanForm] = useState(sambutanKetua);
  const [kontakForm, setKontakForm] = useState(kontak);
  const [localStats, setLocalStats] = useState(statsData || []);

  // Sync local form states with context data when context updates
  React.useEffect(() => {
    setVisiForm(visiMisi);
  }, [visiMisi]);

  React.useEffect(() => {
    setSambutanForm(sambutanKetua);
  }, [sambutanKetua]);

  React.useEffect(() => {
    setKontakForm(kontak);
  }, [kontak]);

  React.useEffect(() => {
    setLocalStats(statsData || []);
  }, [statsData]);

  // Modals for CRUD
  const [divisiModal, setDivisiModal] = useState(null); // null, 'add', or editing object
  const [projaModal, setProjaModal] = useState(null); // null, 'add', or editing object
  const [pengurusModal, setPengurusModal] = useState(null); // null, 'add', or editing object
  const [beritaModal, setBeritaModal] = useState(null); // null, 'add', or editing object
  const [sosmedModal, setSosmedModal] = useState(null); // null, 'add', or editing object { id, platform, label, url }

  // Stats
  const unreadMessagesCount = pesanMasuk.filter(m => m.status === 'Belum Dibaca').length;

  return (
    <div className="admin-layout animate-fade-in">
      {/* SIDEBAR NAVIGATION (Matching Image 2 - Coursie style) */}
      <aside className="admin-sidebar">
        <div style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src={logoPPIP} alt="PPIP" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0, color: '#0f172a' }}>Admin Portal</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <img src={indonesiaFlag} alt="Indonesia" style={{ width: '16px', height: '11px', borderRadius: '2px', objectFit: 'cover' }} />
                  <img src={polandFlag} alt="Poland" style={{ width: '16px', height: '11px', borderRadius: '2px', objectFit: 'cover' }} />
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>PPI POLANDIA</span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} /> Overview Stats
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'visiMisi' ? 'active' : ''}`}
            onClick={() => setActiveTab('visiMisi')}
          >
            <Target size={18} /> Visi & Sambutan
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'divisi' ? 'active' : ''}`}
            onClick={() => setActiveTab('divisi')}
          >
            <Layers size={18} /> Kelola Divisi ({divisi.length})
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'proja' ? 'active' : ''}`}
            onClick={() => setActiveTab('proja')}
          >
            <ListTodo size={18} /> Program Kerja ({programKerja.length})
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'pengurus' ? 'active' : ''}`}
            onClick={() => setActiveTab('pengurus')}
          >
            <Users size={18} /> Pengurus & Urutan ({pengurus.length})
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'berita' ? 'active' : ''}`}
            onClick={() => setActiveTab('berita')}
          >
            <Newspaper size={18} /> Kelola Berita ({berita.length})
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'kontak' ? 'active' : ''}`}
            onClick={() => setActiveTab('kontak')}
          >
            <PhoneCall size={18} /> Kelola Kontak
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            <Inbox size={18} /> Pesan Masuk
            {unreadMessagesCount > 0 && (
              <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '9999px', fontWeight: 800 }}>
                {unreadMessagesCount}
              </span>
            )}
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'tema' ? 'active' : ''}`}
            onClick={() => setActiveTab('tema')}
          >
            <Palette size={18} /> Pengaturan Tema
          </div>

          <div
            className={`admin-nav-item ${activeTab === 'allowedAdmins' ? 'active' : ''}`}
            onClick={() => setActiveTab('allowedAdmins')}
          >
            <ShieldCheck size={18} /> Kelola Admin ({(allowedAdmins || []).length})
          </div>
        </nav>

        {/* Footer Actions */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={resetToDefaultData}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', color: '#d97706', fontSize: '0.82rem' }}
          >
            <RotateCcw size={15} /> Reset Data Ke Bawaan
          </button>

          <button
            onClick={onExitAdmin}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <LogOut size={15} /> Exit to Public Web
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: '#ffffff', padding: '1.25rem 2rem', borderRadius: '16px', border: '1px solid #e5e7eb', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0 }}>
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'visiMisi' && 'Kelola Visi Misi & Sambutan Ketua'}
              {activeTab === 'divisi' && 'Kelola Divisi Organisasi'}
              {activeTab === 'proja' && 'Kelola Program Kerja'}
              {activeTab === 'pengurus' && 'Kelola Pengurus & Urutan Nama'}
              {activeTab === 'berita' && 'Kelola Berita & Artikel'}
              {activeTab === 'kontak' && 'Kelola Kontak & Social Media'}
              {activeTab === 'inbox' && 'Inbox / Pesan Masuk Visitors'}
              {activeTab === 'tema' && 'Kustomisasi Tema Warna Website'}
              {activeTab === 'allowedAdmins' && 'Kelola Akses Admin & Email Google'}
            </h1>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Panel Pengaturan Admin PPI Polandia</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.4rem 0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <img
                src={currentAdmin.picture || logoPPIP}
                alt={currentAdmin.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'contain', background: '#ffffff', border: '2px solid var(--primary)', padding: '2px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>{currentAdmin.name}</span>
                  {currentAdmin.loginType === 'google' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', background: '#dcfce7', color: '#15803d', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '9999px' }} title="Google Verified Admin PPI Polandia">
                      <ShieldCheck size={12} /> Google Verified
                    </span>
                  )}
                </div>
                {currentAdmin.email ? (
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{currentAdmin.email}</span>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700 }}>Super Admin</span>
                )}
              </div>
            </div>

            <button onClick={onExitAdmin} className="btn btn-primary btn-sm">
              Lihat Website Utama <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards (Inspired by Coursie Admin Image) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="stat-card stat-card-featured">
                <div style={{ opacity: 0.9, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Total Program Kerja</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{programKerja.length}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.5rem' }}>
                  {programKerja.filter(p => p.status === 'Selesai').length} Telah Selesai
                </div>
              </div>

              <div className="stat-card">
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Anggota Pengurus</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{pengurus.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.5rem' }}>
                  Terstruktur Sesuai Urutan
                </div>
              </div>

              <div className="stat-card">
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Total Artikel Berita</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{berita.length}</div>
                <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '0.5rem' }}>
                  Terpublikasi Aktif
                </div>
              </div>

              <div className="stat-card">
                <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pesan Masuk</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: unreadMessagesCount > 0 ? '#ef4444' : '#0f172a' }}>
                  {pesanMasuk.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: unreadMessagesCount > 0 ? '#ef4444' : '#64748b', fontWeight: 600, marginTop: '0.5rem' }}>
                  {unreadMessagesCount} Belum Dibaca
                </div>
              </div>
            </div>

            {/* Quick Overview Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Proja status overview */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#0f172a' }}>Status Program Kerja</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {programKerja.slice(0, 5).map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{p.nama}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.divisiNama}</div>
                      </div>
                      <span className={`pill-badge ${p.status === 'Selesai' ? 'pill-badge-success' : p.status === 'Berjalan' ? 'pill-badge-warning' : ''}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Messages */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#0f172a' }}>Pesan Pengunjung Terbaru</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pesanMasuk.slice(0, 4).map(m => (
                    <div key={m.id} style={{ paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                        <strong style={{ color: '#0f172a' }}>{m.nama}</strong>
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{m.tanggal}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#475569', fontStyle: 'italic' }}>"{m.subjek || m.pesan.slice(0, 50)}..."</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISI MISI & SAMBUTAN */}
        {activeTab === 'visiMisi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Form Statistik Angka di Hero Beranda */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Statistik Angka di Hero Beranda</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                    Kelola angka dan label statistik utama (seperti "500+" "Mahasiswa Aktif") yang tampil di bagian atas Beranda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newArr = [...localStats, { id: `stat-${Date.now()}`, angka: '100+', label: 'Statistik Baru' }];
                    setLocalStats(newArr);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={15} /> Tambah Item Statistik
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); updateStatsData(localStats); }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {localStats.length === 0 ? (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
                      Belum ada item statistik. Klik tombol <strong>"Tambah Item Statistik"</strong> untuk menambahkan.
                    </div>
                  ) : (
                    localStats.map((st, idx) => (
                      <div key={st.id || idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                        <div className="form-group" style={{ marginBottom: 0, flex: '1', minWidth: '140px' }}>
                          <label className="form-label" style={{ fontSize: '0.8rem' }}>Angka / Nilai (misal: 500+)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={st.angka}
                            onChange={(e) => {
                              const newArr = [...localStats];
                              newArr[idx] = { ...newArr[idx], angka: e.target.value };
                              setLocalStats(newArr);
                            }}
                            required
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0, flex: '2', minWidth: '200px' }}>
                          <label className="form-label" style={{ fontSize: '0.8rem' }}>Label Keterangan (misal: Mahasiswa Aktif/ Divisi/ Kota)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={st.label}
                            onChange={(e) => {
                              const newArr = [...localStats];
                              newArr[idx] = { ...newArr[idx], label: e.target.value };
                              setLocalStats(newArr);
                            }}
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newArr = localStats.filter((_, i) => i !== idx);
                            setLocalStats(newArr);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444', alignSelf: 'flex-end', marginBottom: '4px', padding: '0.6rem 0.8rem' }}
                          title="Hapus Item Statistik"
                        >
                          <Trash2 size={15} /> Hapus
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Simpan Perubahan Statistik
                </button>
              </form>
            </div>

            {/* Form Visi & Misi */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#0f172a' }}>Ubah Visi & Misi</h3>
              <form onSubmit={(e) => { e.preventDefault(); updateVisiMisi(visiForm); }}>
                <div className="form-group">
                  <label className="form-label">Visi Utama PPI Polandia</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    value={visiForm.visi}
                    onChange={(e) => setVisiForm({ ...visiForm, visi: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>
                      Misi Organisasi ({visiForm.misi.length} Poin)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setVisiForm({ ...visiForm, misi: [...visiForm.misi, ''] });
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)', background: 'var(--primary-light)', fontSize: '0.82rem' }}
                    >
                      <Plus size={14} /> Tambah Misi Baru
                    </button>
                  </div>

                  {visiForm.misi.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', width: '24px', flexShrink: 0 }}>
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={`Tuliskan poin misi ke-${idx + 1}...`}
                        value={m}
                        onChange={(e) => {
                          const updated = [...visiForm.misi];
                          updated[idx] = e.target.value;
                          setVisiForm({ ...visiForm, misi: updated });
                        }}
                      />
                      {visiForm.misi.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = visiForm.misi.filter((_, i) => i !== idx);
                            setVisiForm({ ...visiForm, misi: updated });
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444', padding: '0.6rem', flexShrink: 0 }}
                          title="Hapus Poin Misi Ini"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setVisiForm({ ...visiForm, misi: [...visiForm.misi, ''] });
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
                  >
                    <Plus size={15} /> Tambah Poin Misi Baru
                  </button>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} /> Simpan Perubahan Visi Misi
                </button>
              </form>
            </div>

            {/* Form Sambutan Ketua */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#0f172a' }}>Ubah Sambutan & Ucapan Ketua PPI</h3>
              <form onSubmit={(e) => { e.preventDefault(); updateSambutanKetua(sambutanForm); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Ketua Umum</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sambutanForm.nama}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, nama: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Jabatan</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sambutanForm.jabatan}
                      onChange={(e) => setSambutanForm({ ...sambutanForm, jabatan: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Kabinet</label>
                  <input
                    type="text"
                    className="form-input"
                    value={sambutanForm.kabinet}
                    onChange={(e) => setSambutanForm({ ...sambutanForm, kabinet: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Foto Ketua PPI</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                    {sambutanForm.foto && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                        <img
                          src={sambutanForm.foto}
                          alt="Preview Ketua"
                          style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
                        />
                        <button
                          type="button"
                          onClick={() => setCropperState({ src: sambutanForm.foto, aspectRatio: 4 / 3, target: 'sambutan' })}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.3rem' }}
                        >
                          <Crop size={13} color="var(--primary)" /> Potong Foto
                        </button>
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: '220px' }}>
                      <label
                        className="btn btn-secondary btn-sm"
                        style={{ cursor: 'pointer', display: 'inline-flex', gap: '0.4rem', marginBottom: '0.5rem', background: '#ffffff' }}
                      >
                        <Upload size={16} color="var(--primary)" /> Upload & Potong Foto
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCropperState({ src: reader.result, aspectRatio: 4 / 3, target: 'sambutan' });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Atau tempelkan URL Foto:</div>
                      <input
                        type="text"
                        className="form-input"
                        style={{ marginTop: '0.2rem', fontSize: '0.85rem' }}
                        placeholder="https://images.unsplash.com/..."
                        value={sambutanForm.foto}
                        onChange={(e) => setSambutanForm({ ...sambutanForm, foto: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan & Sambutan Ketua PPI</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    value={sambutanForm.ucapan}
                    onChange={(e) => setSambutanForm({ ...sambutanForm, ucapan: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  <Save size={16} /> Simpan Sambutan Ketua
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA DIVISI */}
        {activeTab === 'divisi' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Daftar Divisi Organisasi</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Kelola daftar divisi dan kabinet penanggung jawab</span>
              </div>
              <button onClick={() => setDivisiModal({ nama: '', kode: '', deskripsi: '', ikon: 'Target', jumlahAnggota: 5, kabinet: adminCabinetFilter || cabinetOptions[0] })} className="btn btn-primary btn-sm">
                <Plus size={16} /> Tambah Divisi Baru
              </button>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem 1.5rem', width: '80px' }}>Ikon</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Kode</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Nama Divisi</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Kabinet</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Deskripsi</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {divisi.map((d) => (
                    <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          <DivisiIcon name={d.ikon} size={22} color="var(--primary)" />
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{d.kode}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#0f172a' }}>{d.nama}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '6px', color: '#475569', fontWeight: 600 }}>
                          {d.kabinet || adminCabinetFilter || 'Semua Kabinet'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', maxWidth: '350px' }}>{d.deskripsi}</td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button onClick={() => setDivisiModal(d)} className="btn btn-secondary btn-sm" style={{ marginRight: '0.5rem' }}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteDivisi(d.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Divisi Modal */}
            {divisiModal && (
              <div className="modal-overlay" onClick={() => setDivisiModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    {divisiModal.id ? 'Edit Divisi' : 'Tambah Divisi Baru'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (divisiModal.id) updateDivisi(divisiModal);
                    else addDivisi(divisiModal);
                    setDivisiModal(null);
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Nama Divisi</label>
                        <input type="text" className="form-input" value={divisiModal.nama} onChange={(e) => setDivisiModal({ ...divisiModal, nama: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Kabinet Penanggung Jawab</label>
                        <select
                          className="form-select"
                          value={divisiModal.kabinet || adminCabinetFilter}
                          onChange={(e) => setDivisiModal({ ...divisiModal, kabinet: e.target.value })}
                        >
                          {cabinetOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kode Singkatan (Contoh: HUMAS, EDUC)</label>
                      <input type="text" className="form-input" value={divisiModal.kode} onChange={(e) => setDivisiModal({ ...divisiModal, kode: e.target.value })} required />
                    </div>

                    {/* Interactive Icon Picker Grid */}
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Pilih Ikon Divisi</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary-light)', padding: '0.25rem 0.65rem', borderRadius: '8px', border: '1px solid var(--primary-border)' }}>
                          Ikon Terpilih: <DivisiIcon name={divisiModal.ikon || 'Target'} size={18} color="var(--primary)" />
                        </span>
                      </label>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(46px, 1fr))',
                        gap: '0.5rem',
                        maxHeight: '170px',
                        overflowY: 'auto',
                        background: '#f8fafc',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}>
                        {DIVISION_ICONS.map((item) => {
                          const isSelected = (divisiModal.ikon || 'Target') === item.name;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setDivisiModal({ ...divisiModal, ikon: item.name })}
                              title={item.name}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '46px',
                                borderRadius: '10px',
                                border: isSelected ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                background: isSelected ? 'var(--primary-light)' : '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                boxShadow: isSelected ? '0 2px 6px rgba(37, 99, 235, 0.2)' : 'none'
                              }}
                            >
                              <item.Icon size={22} color={isSelected ? 'var(--primary)' : '#64748b'} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Deskripsi Divisi</label>
                      <textarea rows={3} className="form-textarea" value={divisiModal.deskripsi} onChange={(e) => setDivisiModal({ ...divisiModal, deskripsi: e.target.value })} required />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setDivisiModal(null)}>Batal</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan Divisi</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: KELOLA PROGRAM KERJA */}
        {activeTab === 'proja' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Daftar Program Kerja</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Kelola daftar program kerja, divisi, dan kabinet penanggung jawab</span>
              </div>
              <button onClick={() => {
                setProjaDocUrlInput('');
                setProjaModal({ nama: '', divisiId: divisi[0]?.id || '', divisiNama: divisi[0]?.nama || '', kabinet: adminCabinetFilter || cabinetOptions[0], deskripsi: '', tanggal: '', lokasi: '', status: 'Terencana', penanggungJawab: '', dokumentasi: [] });
              }} className="btn btn-primary btn-sm">
                <Plus size={16} /> Tambah Proja Baru
              </button>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Program Kerja</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Divisi & Kabinet</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Tanggal & Lokasi</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {programKerja.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.nama}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>PJ: {p.penanggungJawab || '-'}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-start' }}>
                          <span className="pill-badge">{p.divisiNama}</span>
                          {p.kabinet && (
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                              {p.kabinet}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#475569', fontSize: '0.85rem' }}>
                        <div>📅 {p.tanggal}</div>
                        <div>📍 {p.lokasi}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span className={`pill-badge ${p.status === 'Selesai' ? 'pill-badge-success' : p.status === 'Berjalan' ? 'pill-badge-warning' : ''}`}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button onClick={() => {
                          setProjaDocUrlInput('');
                          setProjaModal({ ...p, dokumentasi: p.dokumentasi || [] });
                        }} className="btn btn-secondary btn-sm" style={{ marginRight: '0.5rem' }}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteProgram(p.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Proja Modal */}
            {projaModal && (
              <div className="modal-overlay" onClick={() => setProjaModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    {projaModal.id ? 'Edit Program Kerja' : 'Tambah Program Kerja Baru'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (projaModal.id) updateProgram(projaModal);
                    else addProgram(projaModal);
                    setProjaModal(null);
                  }}>
                    <div className="form-group">
                      <label className="form-label">Nama Program Kerja</label>
                      <input type="text" className="form-input" value={projaModal.nama} onChange={(e) => setProjaModal({ ...projaModal, nama: e.target.value })} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Pilih Divisi Penanggung Jawab</label>
                        <select
                          className="form-select"
                          value={projaModal.divisiId}
                          onChange={(e) => {
                            const selectedDiv = divisi.find(d => d.id === e.target.value);
                            setProjaModal({
                              ...projaModal,
                              divisiId: e.target.value,
                              divisiNama: selectedDiv ? selectedDiv.nama : ''
                            });
                          }}
                        >
                          {divisi.map(d => (
                            <option key={d.id} value={d.id}>{d.nama}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Kabinet Penanggung Jawab</label>
                        <select
                          className="form-select"
                          value={projaModal.kabinet || adminCabinetFilter}
                          onChange={(e) => setProjaModal({ ...projaModal, kabinet: e.target.value })}
                        >
                          {cabinetOptions.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Tanggal Pelaksanaan (Pick Date / Rentang Tanggal)</label>
                        <DateRangePicker
                          value={projaModal.tanggal}
                          onChange={(newVal) => setProjaModal({ ...projaModal, tanggal: newVal })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Lokasi Kegiatan</label>
                        <input type="text" className="form-input" value={projaModal.lokasi} onChange={(e) => setProjaModal({ ...projaModal, lokasi: e.target.value })} placeholder="Contoh: Warsaw / Online" />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Status Proja</label>
                        <select className="form-select" value={projaModal.status} onChange={(e) => setProjaModal({ ...projaModal, status: e.target.value })}>
                          <option value="Terencana">Terencana</option>
                          <option value="Berjalan">Berjalan</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Penanggung Jawab (PJ)</label>
                        <input type="text" className="form-input" value={projaModal.penanggungJawab} onChange={(e) => setProjaModal({ ...projaModal, penanggungJawab: e.target.value })} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Deskripsi Ringkas Kegiatan</label>
                      <textarea rows={3} className="form-textarea" value={projaModal.deskripsi} onChange={(e) => setProjaModal({ ...projaModal, deskripsi: e.target.value })} required />
                    </div>

                    {/* Section Dokumentasi Foto Kegiatan */}
                    <div className="form-group" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginTop: '1rem' }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a' }}>
                        <Camera size={18} color="var(--primary)" /> Dokumentasi Foto Kegiatan ({projaModal.dokumentasi ? projaModal.dokumentasi.length : 0} Foto)
                      </label>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                        Upload foto dokumentasi kegiatan dari komputer (dengan fitur potong/crop foto) atau tambahkan via URL link gambar.
                      </p>

                      {/* Display Thumbnails */}
                      {projaModal.dokumentasi && projaModal.dokumentasi.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                          {projaModal.dokumentasi.map((photoUrl, idx) => (
                            <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '80px', border: '1px solid #cbd5e1', background: '#000' }}>
                              <img src={photoUrl} alt={`Dokumentasi ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDocs = projaModal.dokumentasi.filter((_, i) => i !== idx);
                                  setProjaModal({ ...projaModal, dokumentasi: updatedDocs });
                                }}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  background: 'rgba(239, 68, 68, 0.9)',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '24px',
                                  height: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                                title="Hapus foto ini"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '1rem' }}>
                          Belum ada foto dokumentasi yang diunggah untuk program kerja ini.
                        </div>
                      )}

                      {/* Upload & URL Input controls */}
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', background: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Upload size={15} color="var(--primary)" /> Upload & Potong Foto
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setCropperState({ src: reader.result, aspectRatio: 16 / 9, target: 'projaDokumentasi' });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
                          <input
                            type="text"
                            className="form-input"
                            style={{ fontSize: '0.85rem' }}
                            placeholder="https://images.unsplash.com/..."
                            value={projaDocUrlInput}
                            onChange={(e) => setProjaDocUrlInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (projaDocUrlInput.trim()) {
                                setProjaModal({
                                  ...projaModal,
                                  dokumentasi: [...(projaModal.dokumentasi || []), projaDocUrlInput.trim()]
                                });
                                setProjaDocUrlInput('');
                              }
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ flexShrink: 0 }}
                          >
                            <Plus size={14} /> Tambah URL
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setProjaModal(null)}>Batal</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan Proja</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: KELOLA PENGURUS & URUTAN NAMA (CRITICAL USER FEATURE!) */}
        {activeTab === 'pengurus' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Kelola Structure Pengurus & Adjust Position Index</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Gunakan tombol ↑ / ↓ atau ubah angka indeks posisi untuk mengatur urutan tampilan pengurus</span>
              </div>

              <button
                onClick={() => setPengurusModal({
                  nama: '',
                  jabatan: '',
                  kabinet: adminCabinetFilter,
                  divisiId: 'BPH',
                  foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
                  kampus: 'University of Warsaw',
                  jurusan: '',
                  email: '',
                  linkedin: ''
                })}
                className="btn btn-primary btn-sm"
              >
                <UserPlus size={16} /> Tambah Pengurus Baru
              </button>
            </div>

            {/* Cabinet Selector Filter & Cabinet Manager in Admin */}
            <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Filter Kabinet:</span>
              <select
                className="form-select"
                style={{ width: 'auto', flex: 1, minWidth: '220px' }}
                value={adminCabinetFilter}
                onChange={(e) => setAdminCabinetFilter(e.target.value)}
              >
                {cabinetOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <button
                onClick={() => setShowKabinetModal(true)}
                className="btn btn-secondary btn-sm"
                style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)', background: 'var(--primary-light)' }}
              >
                <Plus size={15} /> Tambah Kabinet Baru
              </button>

              <button
                onClick={() => setConfirmDeleteKabinet(adminCabinetFilter)}
                className="btn btn-secondary btn-sm"
                style={{ color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2' }}
                title="Hapus kabinet yang sedang dipilih"
              >
                <Trash2 size={15} /> Hapus Kabinet Ini
              </button>
            </div>

            {/* Pengurus Table with Reorder Actions */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem 1.5rem', width: '120px' }}>Urutan Posisi</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Nama & Foto</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Jabatan</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Kampus & Jurusan</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi Edit / Hapus</th>
                  </tr>
                </thead>
                <tbody>
                  {(pengurus || [])
                    .filter(p => p && (p.kabinet === adminCabinetFilter || (!p.kabinet && adminCabinetFilter === cabinetOptions[0])))
                    .sort((a, b) => (a.positionIndex || 0) - (b.positionIndex || 0))
                    .map((item, idx) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        {/* Position Adjustment Controls */}
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <button
                                onClick={() => movePengurusPosition(item.id, 'up')}
                                className="btn btn-secondary btn-icon"
                                style={{ width: '24px', height: '24px', padding: 0 }}
                                title="Geser Urutan Ke Atas"
                              >
                                <ArrowUp size={12} />
                              </button>
                              <button
                                onClick={() => movePengurusPosition(item.id, 'down')}
                                className="btn btn-secondary btn-icon"
                                style={{ width: '24px', height: '24px', padding: 0 }}
                                title="Geser Urutan Ke Bawah"
                              >
                                <ArrowDown size={12} />
                              </button>
                            </div>
                            <input
                              type="number"
                              style={{ width: '50px', padding: '4px 6px', fontSize: '0.85rem', borderRadius: '6px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 700 }}
                              value={item.positionIndex || (idx + 1)}
                              onChange={(e) => updatePengurusPositionIndex(item.id, e.target.value)}
                            />
                          </div>
                        </td>

                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={item.foto} alt={item.nama} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.nama}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{item.email}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                          {item.jabatan}
                        </td>

                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#475569' }}>
                          <div>{item.kampus}</div>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.jurusan}</div>
                        </td>

                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <button onClick={() => setPengurusModal(item)} className="btn btn-secondary btn-sm" style={{ marginRight: '0.5rem' }}>
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => deletePengurus(item.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pengurus Modal */}
            {pengurusModal && (
              <div className="modal-overlay" onClick={() => setPengurusModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    {pengurusModal.id ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (pengurusModal.id) updatePengurus(pengurusModal);
                    else addPengurus(pengurusModal);
                    setPengurusModal(null);
                  }}>
                    <div className="form-group">
                      <label className="form-label">Nama Lengkap Pengurus</label>
                      <input type="text" className="form-input" value={pengurusModal.nama} onChange={(e) => setPengurusModal({ ...pengurusModal, nama: e.target.value })} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Jabatan (Contoh: Ketua Umum / Kadiv Medinfo)</label>
                        <input type="text" className="form-input" value={pengurusModal.jabatan} onChange={(e) => setPengurusModal({ ...pengurusModal, jabatan: e.target.value })} required />
                      </div>
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label className="form-label" style={{ margin: 0 }}>Nama Kabinet (Dropdown)</label>
                          <button
                            type="button"
                            onClick={() => setShowKabinetModal(true)}
                            style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}
                          >
                            + Kabinet Baru
                          </button>
                        </div>
                        <select
                          className="form-select"
                          value={pengurusModal.kabinet}
                          onChange={(e) => setPengurusModal({ ...pengurusModal, kabinet: e.target.value })}
                          required
                        >
                          {cabinetOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Nama Kampus di Polandia</label>
                        <input type="text" className="form-input" value={pengurusModal.kampus} onChange={(e) => setPengurusModal({ ...pengurusModal, kampus: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Jurusan / Program Studi</label>
                        <input type="text" className="form-input" value={pengurusModal.jurusan} onChange={(e) => setPengurusModal({ ...pengurusModal, jurusan: e.target.value })} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Foto Profil Pengurus</label>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                        {pengurusModal.foto && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                            <img
                              src={pengurusModal.foto}
                              alt="Preview Profil"
                              style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
                            />
                            <button
                              type="button"
                              onClick={() => setCropperState({ src: pengurusModal.foto, aspectRatio: 1, target: 'pengurus' })}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.3rem' }}
                            >
                              <Crop size={13} color="var(--primary)" /> Potong Foto
                            </button>
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: '220px' }}>
                          <label
                            className="btn btn-secondary btn-sm"
                            style={{ cursor: 'pointer', display: 'inline-flex', gap: '0.4rem', marginBottom: '0.5rem', background: '#ffffff' }}
                          >
                            <Upload size={16} color="var(--primary)" /> Upload & Potong Foto
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setCropperState({ src: reader.result, aspectRatio: 1, target: 'pengurus' });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Atau tempelkan URL Foto:</div>
                          <input
                            type="text"
                            className="form-input"
                            style={{ marginTop: '0.2rem', fontSize: '0.85rem' }}
                            placeholder="https://images.unsplash.com/..."
                            value={pengurusModal.foto}
                            onChange={(e) => setPengurusModal({ ...pengurusModal, foto: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setPengurusModal(null)}>Batal</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan Pengurus</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Tambah Kabinet Baru */}
            {showKabinetModal && (
              <div className="modal-overlay" onClick={() => setShowKabinetModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#0f172a' }}>
                    Tambah Nama Kabinet Baru
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Masukkan nama kabinet dan periode tahun kepengurusan (contoh: <em>2025/2026 - Kabinet Nusantara Jaya</em>).
                  </p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (newKabinetName.trim()) {
                      addKabinet(newKabinetName);
                      setAdminCabinetFilter(newKabinetName.trim());
                      if (pengurusModal) {
                        setPengurusModal({ ...pengurusModal, kabinet: newKabinetName.trim() });
                      }
                      setNewKabinetName('');
                      setShowKabinetModal(false);
                    }
                  }}>
                    <div className="form-group">
                      <label className="form-label">Nama Kabinet & Periode</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Contoh: 2025/2026 - Kabinet Nusantara Jaya"
                        value={newKabinetName}
                        onChange={(e) => setNewKabinetName(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowKabinetModal(false)}>
                        Batal
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        Simpan Kabinet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Konfirmasi Hapus Kabinet */}
            {confirmDeleteKabinet && (
              <div className="modal-overlay" onClick={() => setConfirmDeleteKabinet(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ background: '#fef2f2', padding: '0.6rem', borderRadius: '12px', color: '#ef4444' }}>
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Hapus Kabinet</h3>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Konfirmasi penghapusan data</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    Apakah Kamu yakin ingin menghapus <strong>"{confirmDeleteKabinet}"</strong>? Seluruh data pengurus dalam kabinet ini juga akan ikut dihapus.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setConfirmDeleteKabinet(null)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1, background: '#dc2626' }}
                      onClick={() => {
                        const target = confirmDeleteKabinet;
                        deleteKabinet(target);
                        const remaining = cabinetOptions.filter(c => c !== target);
                        if (remaining.length > 0) {
                          setAdminCabinetFilter(remaining[0]);
                        }
                        setConfirmDeleteKabinet(null);
                      }}
                    >
                      Ya, Hapus Kabinet
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: KELOLA BERITA */}
        {activeTab === 'berita' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Daftar Artikel & Berita</h3>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setShowKategoriBeritaModal(true)}
                  className="btn btn-secondary btn-sm"
                  style={{ borderColor: '#cbd5e1' }}
                >
                  <Layers size={16} color="var(--primary)" /> Kelola Kategori Berita ({kategoriBeritaList.length})
                </button>

                <button
                  onClick={() => {
                    setBeritaDocUrlInput('');
                    setBeritaModal({
                      judul: '',
                      ringkasan: '',
                      konten: '',
                      kategori: kategoriBeritaList[0] || 'Kegiatan',
                      penulis: 'PPI Polandia',
                      tanggal: new Date().toLocaleDateString('id-ID'),
                      gambar: '',
                      galeri: []
                    });
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} /> Tulis Berita Baru
                </button>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Judul Artikel</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Kategori</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Tanggal & Penulis</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {berita.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{b.judul}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{b.ringkasan.slice(0, 70)}...</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}><span className="pill-badge">{b.kategori}</span></td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', color: '#64748b' }}>
                        <div>{b.tanggal}</div>
                        <div>✍️ {b.penulis}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button onClick={() => {
                          setBeritaDocUrlInput('');
                          setBeritaModal({ ...b, galeri: b.galeri || (b.gambar ? [b.gambar] : []) });
                        }} className="btn btn-secondary btn-sm" style={{ marginRight: '0.5rem' }}>
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteBerita(b.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Berita Modal */}
            {beritaModal && (
              <div className="modal-overlay" onClick={() => setBeritaModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    {beritaModal.id ? 'Edit Artikel Berita' : 'Tulis Artikel Berita Baru'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // Fallback cover image if not explicitly set
                    const finalCover = beritaModal.gambar || (beritaModal.galeri && beritaModal.galeri[0]) || '';
                    const finalData = { ...beritaModal, gambar: finalCover };
                    if (beritaModal.id) updateBerita(finalData);
                    else addBerita(finalData);
                    setBeritaModal(null);
                  }}>
                    <div className="form-group">
                      <label className="form-label">Judul Berita</label>
                      <input type="text" className="form-input" value={beritaModal.judul} onChange={(e) => setBeritaModal({ ...beritaModal, judul: e.target.value })} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Kategori Artikel</span>
                          <button
                            type="button"
                            onClick={() => setShowKategoriBeritaModal(true)}
                            style={{ fontSize: '0.78rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: 0 }}
                          >
                            + Kelola Kategori
                          </button>
                        </label>
                        <select
                          className="form-select"
                          value={beritaModal.kategori}
                          onChange={(e) => setBeritaModal({ ...beritaModal, kategori: e.target.value })}
                        >
                          {kategoriBeritaList.map((kat) => (
                            <option key={kat} value={kat}>{kat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Penulis / Tim Redaksi</label>
                        <input type="text" className="form-input" value={beritaModal.penulis} onChange={(e) => setBeritaModal({ ...beritaModal, penulis: e.target.value })} required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Foto Sampul Utama (Cover)</label>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
                        {(beritaModal.gambar || (beritaModal.galeri && beritaModal.galeri[0])) && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                            <img
                              src={beritaModal.gambar || (beritaModal.galeri && beritaModal.galeri[0])}
                              alt="Preview Sampul"
                              style={{ width: '100px', height: '60px', borderRadius: '10px', objectFit: 'cover', border: '2px solid var(--primary)', flexShrink: 0 }}
                            />
                            <button
                              type="button"
                              onClick={() => setCropperState({ src: beritaModal.gambar || beritaModal.galeri[0], aspectRatio: 16 / 9, target: 'berita' })}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.3rem' }}
                            >
                              <Crop size={13} color="var(--primary)" /> Potong Sampul
                            </button>
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: '220px' }}>
                          <label
                            className="btn btn-secondary btn-sm"
                            style={{ cursor: 'pointer', display: 'inline-flex', gap: '0.4rem', marginBottom: '0.5rem', background: '#ffffff' }}
                          >
                            <Upload size={16} color="var(--primary)" /> Upload & Potong Sampul
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setCropperState({ src: reader.result, aspectRatio: 16 / 9, target: 'berita' });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Atau tempelkan URL Gambar Sampul:</div>
                          <input
                            type="text"
                            className="form-input"
                            style={{ marginTop: '0.2rem', fontSize: '0.85rem' }}
                            placeholder="https://images.unsplash.com/..."
                            value={beritaModal.gambar}
                            onChange={(e) => setBeritaModal({ ...beritaModal, gambar: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section Lampiran & Galeri Foto Artikel */}
                    <div className="form-group" style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginTop: '1rem' }}>
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a' }}>
                        <Camera size={18} color="var(--primary)" /> Galeri & Lampiran Foto Artikel ({beritaModal.galeri ? beritaModal.galeri.length : 0} Foto)
                      </label>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem' }}>
                        Upload beberapa foto dokumentasi berita. Foto pertama otomatis dijadikan foto sampul (cover) jika sampul belum diisi.
                      </p>

                      {/* Display Thumbnails */}
                      {beritaModal.galeri && beritaModal.galeri.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                          {beritaModal.galeri.map((photoUrl, idx) => (
                            <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '80px', border: '1px solid #cbd5e1', background: '#000' }}>
                              <img src={photoUrl} alt={`Foto ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedGaleri = beritaModal.galeri.filter((_, i) => i !== idx);
                                  const newCover = beritaModal.gambar === photoUrl ? (updatedGaleri[0] || '') : beritaModal.gambar;
                                  setBeritaModal({ ...beritaModal, gambar: newCover, galeri: updatedGaleri });
                                }}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  background: 'rgba(239, 68, 68, 0.9)',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '24px',
                                  height: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer'
                                }}
                                title="Hapus foto ini"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '1rem' }}>
                          Belum ada galeri foto yang diunggah untuk artikel berita ini.
                        </div>
                      )}

                      {/* Upload & URL Input controls */}
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', background: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Upload size={15} color="var(--primary)" /> Upload & Potong Foto
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setCropperState({ src: reader.result, aspectRatio: 16 / 9, target: 'beritaGaleri' });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>

                        <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
                          <input
                            type="text"
                            className="form-input"
                            style={{ fontSize: '0.85rem' }}
                            placeholder="https://images.unsplash.com/..."
                            value={beritaDocUrlInput}
                            onChange={(e) => setBeritaDocUrlInput(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (beritaDocUrlInput.trim()) {
                                const updatedGaleri = [...(beritaModal.galeri || []), beritaDocUrlInput.trim()];
                                setBeritaModal({
                                  ...beritaModal,
                                  gambar: beritaModal.gambar || beritaDocUrlInput.trim(),
                                  galeri: updatedGaleri
                                });
                                setBeritaDocUrlInput('');
                              }
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ flexShrink: 0 }}
                          >
                            <Plus size={14} /> Tambah URL
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Ringkasan Singkat (Highlight)</label>
                      <input type="text" className="form-input" value={beritaModal.ringkasan} onChange={(e) => setBeritaModal({ ...beritaModal, ringkasan: e.target.value })} required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Isi Konten Berita Lengkap</label>
                      <textarea rows={6} className="form-textarea" value={beritaModal.konten} onChange={(e) => setBeritaModal({ ...beritaModal, konten: e.target.value })} required />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setBeritaModal(null)}>Batal</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Terbitkan Artikel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Kelola Kategori Berita */}
            {showKategoriBeritaModal && (
              <div className="modal-overlay" onClick={() => setShowKategoriBeritaModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: 0 }}>
                      Kelola Kategori Berita
                    </h3>
                    <button onClick={() => setShowKategoriBeritaModal(false)} style={{ color: '#94a3b8' }}>
                      <X size={20} />
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                    Tambah, ubah nama, atau hapus daftar kategori berita yang muncul di dropdown dan filter website.
                  </p>

                  {/* Add New Category Input */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (newKategoriBeritaName.trim()) {
                      addKategoriBerita(newKategoriBeritaName);
                      setNewKategoriBeritaName('');
                    }
                  }} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nama kategori baru..."
                      value={newKategoriBeritaName}
                      onChange={(e) => setNewKategoriBeritaName(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                      <Plus size={15} /> Tambah
                    </button>
                  </form>

                  {/* Category List with Edit & Delete */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto', background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    {kategoriBeritaList.map((kat) => (
                      <div key={kat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.8rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        {editingKategori && editingKategori.oldName === kat ? (
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            updateKategoriBerita(editingKategori.oldName, editingKategori.newName);
                            setEditingKategori(null);
                          }} style={{ display: 'flex', gap: '0.5rem', flex: 1, marginRight: '0.5rem' }}>
                            <input
                              type="text"
                              className="form-input"
                              style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem' }}
                              value={editingKategori.newName}
                              onChange={(e) => setEditingKategori({ ...editingKategori, newName: e.target.value })}
                              autoFocus
                            />
                            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>Simpan</button>
                            <button type="button" onClick={() => setEditingKategori(null)} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>Batal</button>
                          </form>
                        ) : (
                          <>
                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{kat}</span>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                              <button
                                onClick={() => setEditingKategori({ oldName: kat, newName: kat })}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.3rem 0.5rem' }}
                                title="Ubah Nama Kategori"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                onClick={() => setConfirmDeleteKategori(kat)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '0.3rem 0.5rem', color: '#ef4444' }}
                                title="Hapus Kategori"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button onClick={() => setShowKategoriBeritaModal(false)} className="btn btn-primary">
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Konfirmasi Hapus Kategori */}
            {confirmDeleteKategori && (
              <div className="modal-overlay" onClick={() => setConfirmDeleteKategori(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ background: '#fef2f2', padding: '0.6rem', borderRadius: '12px', color: '#ef4444' }}>
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Hapus Kategori Berita</h3>
                      <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Konfirmasi penghapusan data</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                    Apakah Kamu yakin ingin menghapus kategori <strong>"{confirmDeleteKategori}"</strong>?
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                      onClick={() => setConfirmDeleteKategori(null)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1, background: '#dc2626' }}
                      onClick={() => {
                        deleteKategoriBerita(confirmDeleteKategori);
                        setConfirmDeleteKategori(null);
                      }}
                    >
                      Ya, Hapus Kategori
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: KELOLA KONTAK */}
        {activeTab === 'kontak' && (() => {
          const currentSosmedList = (kontakForm.sosmedList && kontakForm.sosmedList.length > 0)
            ? kontakForm.sosmedList
            : [
              kontakForm.instagram && { id: 'sm-1', platform: 'Instagram', label: '@ppipolandia', url: kontakForm.instagram },
              kontakForm.youtube && { id: 'sm-2', platform: 'YouTube', label: 'PPI Polandia TV', url: kontakForm.youtube },
              kontakForm.linkedin && { id: 'sm-3', platform: 'LinkedIn', label: 'PPI Polandia', url: kontakForm.linkedin },
              kontakForm.tiktok && { id: 'sm-4', platform: 'TikTok', label: '@ppipolandia', url: kontakForm.tiktok }
            ].filter(Boolean);

          const handleSaveKontakSubmit = (e) => {
            e.preventDefault();
            const updatedForm = {
              ...kontakForm,
              sosmedList: currentSosmedList
            };
            updateKontak(updatedForm);
          };

          const handleDeleteSosmed = (id) => {
            const newList = currentSosmedList.filter(item => item.id !== id);
            const updatedForm = {
              ...kontakForm,
              sosmedList: newList
            };
            setKontakForm(updatedForm);
            updateKontak(updatedForm);
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#0f172a' }}>Ubah Informasi Kontak Utama Sekretariat</h3>
                <form onSubmit={handleSaveKontakSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email Utama Organisasi</label>
                      <input type="email" className="form-input" value={kontakForm.email || ''} onChange={(e) => setKontakForm({ ...kontakForm, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nomor Telepon / WA</label>
                      <input type="text" className="form-input" value={kontakForm.telepon || ''} onChange={(e) => setKontakForm({ ...kontakForm, telepon: e.target.value })} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Alamat Sekretariat di Polandia</label>
                    <input type="text" className="form-input" value={kontakForm.alamat || ''} onChange={(e) => setKontakForm({ ...kontakForm, alamat: e.target.value })} required />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                    <Save size={16} /> Simpan Informasi Kontak Utama
                  </button>
                </form>
              </div>

              {/* Dynamic Social Media & Custom Channels */}
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Daftar Media Sosial & Kanal Komunikasi</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                      Kelola platform media sosial, kanal instant messaging, atau tautan resmi PPI Polandia yang muncul di website.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSosmedModal({ id: null, platform: 'Instagram', label: '', url: '' })}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Tambah Media Sosial Baru
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {currentSosmedList.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '12px' }}>
                      Belum ada media sosial. Klik <strong>"Tambah Media Sosial Baru"</strong> untuk menambahkan.
                    </div>
                  ) : (
                    currentSosmedList.map((item) => {
                      const meta = SOCIAL_PLATFORMS.find(p => p.name === item.platform) || { badgeBg: 'var(--primary-light)', color: 'var(--primary)' };
                      return (
                        <div
                          key={item.id}
                          style={{
                            padding: '1.25rem',
                            borderRadius: '14px',
                            border: '1px solid #e2e8f0',
                            background: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                            <div style={{ background: meta.badgeBg, padding: '0.6rem', borderRadius: '12px', color: meta.color, display: 'flex', flexShrink: 0 }}>
                              {renderSocialIcon(item.platform, 20, meta.color)}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{item.platform}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.label || item.url}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                            <button
                              type="button"
                              onClick={() => setSosmedModal({ ...item })}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.4rem 0.6rem' }}
                              title="Edit Social Media"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSosmed(item.id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.4rem 0.6rem', color: '#ef4444' }}
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Modal Tambah / Edit Social Media */}
              {sosmedModal && (
                <div className="modal-overlay" onClick={() => setSosmedModal(null)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: 0 }}>
                        {sosmedModal.id ? 'Edit Media Sosial' : 'Tambah Media Sosial / Kanal Kontak'}
                      </h3>
                      <button onClick={() => setSosmedModal(null)} style={{ color: '#94a3b8' }}>
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const currentList = (kontakForm.sosmedList && kontakForm.sosmedList.length > 0)
                        ? kontakForm.sosmedList
                        : [
                          kontakForm.instagram && { id: 'sm-1', platform: 'Instagram', label: '@ppipolandia', url: kontakForm.instagram },
                          kontakForm.youtube && { id: 'sm-2', platform: 'YouTube', label: 'PPI Polandia TV', url: kontakForm.youtube },
                          kontakForm.linkedin && { id: 'sm-3', platform: 'LinkedIn', label: 'PPI Polandia', url: kontakForm.linkedin },
                          kontakForm.tiktok && { id: 'sm-4', platform: 'TikTok', label: '@ppipolandia', url: kontakForm.tiktok }
                        ].filter(Boolean);

                      let updatedList;
                      if (sosmedModal.id) {
                        updatedList = currentList.map(item => item.id === sosmedModal.id ? sosmedModal : item);
                      } else {
                        updatedList = [...currentList, { ...sosmedModal, id: `sm-${Date.now()}` }];
                      }

                      // Sync legacy properties for instagram, youtube, linkedin, tiktok
                      const legacyUpdates = {};
                      updatedList.forEach(item => {
                        const p = item.platform.toLowerCase();
                        if (p.includes('instagram')) legacyUpdates.instagram = item.url;
                        if (p.includes('youtube')) legacyUpdates.youtube = item.url;
                        if (p.includes('linkedin')) legacyUpdates.linkedin = item.url;
                        if (p.includes('tiktok')) legacyUpdates.tiktok = item.url;
                      });

                      const newKontakForm = {
                        ...kontakForm,
                        ...legacyUpdates,
                        sosmedList: updatedList
                      };

                      setKontakForm(newKontakForm);
                      updateKontak(newKontakForm);
                      setSosmedModal(null);
                    }}>
                      <div className="form-group">
                        <label className="form-label">Pilih Platform / Social Media</label>
                        <select
                          className="form-select"
                          value={sosmedModal.platform}
                          onChange={(e) => setSosmedModal({ ...sosmedModal, platform: e.target.value })}
                          required
                        >
                          {SOCIAL_PLATFORMS.map(p => (
                            <option key={p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Username / Label Tampilan</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Contoh: @ppipolandia atau PPI Polandia Official"
                          value={sosmedModal.label || ''}
                          onChange={(e) => setSosmedModal({ ...sosmedModal, label: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">URL Link / Tautan</label>
                        <input
                          type="url"
                          className="form-input"
                          placeholder="https://..."
                          value={sosmedModal.url || ''}
                          onChange={(e) => setSosmedModal({ ...sosmedModal, url: e.target.value })}
                          required
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setSosmedModal(null)}>Batal</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                          <Save size={16} /> Simpan Data
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB 8: INBOX PESAN MASUK */}
        {activeTab === 'inbox' && (
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#0f172a' }}>Daftar Pesan Masuk dari Form Leave Message</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pesanMasuk.length === 0 ? (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                  Belum ada pesan masuk di inbox.
                </div>
              ) : (
                pesanMasuk.map((msg) => (
                  <div key={msg.id} className="card" style={{ padding: '1.5rem', background: msg.status === 'Belum Dibaca' ? 'var(--primary-light)' : '#ffffff', borderLeft: msg.status === 'Belum Dibaca' ? '4px solid var(--primary)' : '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>{msg.nama}</h4>
                        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>&lt;{msg.email}&gt;</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{msg.tanggal}</span>
                        <button onClick={() => markPesanRead(msg.id)} className="btn btn-secondary btn-sm">
                          <Check size={14} /> Tandai Dibaca
                        </button>
                        <button onClick={() => deletePesan(msg.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#334155', marginBottom: '0.5rem' }}>
                      Subjek: {msg.subjek || '(Tanpa Subjek)'}
                    </div>

                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: '1.6', background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      {msg.pesan}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: PENGATURAN TEMA */}
        {activeTab === 'tema' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                  Pilih Skema Warna Utama Website
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  Pilih salah satu dari 7 skema tema warna bawaan di bawah ini. Perubahan warna akan langsung diterapkan secara instan ke seluruh tombol, accent gradient, badge, dan elemen visual website.
                </p>
              </div>

              {/* Theme Selector Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem'
              }}>
                {Object.values(THEME_PRESETS || {}).map((t) => {
                  const isActive = activeThemeKey === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => changeTheme(t.id)}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '16px',
                        border: isActive ? `2px solid ${t.primary}` : '1px solid #e2e8f0',
                        background: isActive ? t.primaryLight : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? `0 6px 20px ${t.primary}25` : '0 2px 6px rgba(0,0,0,0.03)',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: t.primaryGradient,
                            boxShadow: `0 4px 10px ${t.primary}40`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 800
                          }}>
                            {isActive ? <Check size={18} /> : null}
                          </div>
                          <div>
                            <h4 style={{ fontSize: '1rem', margin: 0, color: '#0f172a' }}>{t.name}</h4>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>{t.colorCode}</span>
                          </div>
                        </div>

                        {isActive && (
                          <span style={{
                            background: t.primary,
                            color: '#ffffff',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            textTransform: 'uppercase'
                          }}>
                            Aktif
                          </span>
                        )}
                      </div>

                      {/* Preview Palette Strips */}
                      <div style={{ display: 'flex', gap: '6px', marginTop: '0.75rem' }}>
                        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: t.primary }} title="Primary Color" />
                        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: t.primaryHover }} title="Primary Hover" />
                        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: t.primaryBorder }} title="Border Color" />
                        <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: t.primaryLight }} title="Light Background" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Preview Demonstration Section */}
              <div style={{ background: '#f8fafc', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="var(--primary)" /> Live Demo Pratinjau Elemen Visual Tema
                </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                  <button className="btn btn-primary">
                    Tombol Utama <ArrowRight size={16} />
                  </button>

                  <button className="btn btn-outline">
                    Tombol Outline
                  </button>

                  <span className="pill-badge">
                    <Sparkles size={14} /> Badge Accent Tema
                  </span>

                  <span className="section-tag" style={{ margin: 0 }}>
                    Section Tag Text
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: KELOLA ADMIN & AKSES GOOGLE LOGIN */}
        {activeTab === 'allowedAdmins' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>Daftar Email Admin Terdaftar</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                  Hanya email Google yang terdaftar di tabel ini yang diizinkan untuk login ke Dashboard Admin via Google Sign-In.
                </p>
              </div>
              <button
                onClick={() => setAllowedAdminModal({ email: '', nama: '', peran: 'Admin Pengurus' })}
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} /> Tambah Admin Baru
              </button>
            </div>

            {/* Info Security Banner */}
            <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)', padding: '1.25rem 1.5rem', borderRadius: '16px', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ShieldCheck size={28} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>Sistem Otentikasi Akses Admin Presisi</h4>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.83rem', color: '#475569', lineHeight: 1.4 }}>
                  Super Admin dapat mendaftarkan email Google siapapun (Gmail personal, email institusi, atau custom domain). Begitu email terdaftar, pengurus tersebut dapat langsung mengklik <strong>"Masuk dengan Google"</strong> untuk mengakses dashboard ini.
                </p>
              </div>
            </div>

            {/* Admin Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Email Admin Google</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Nama Pengurus</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Peran / Jabatan</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Tanggal Terdaftar</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {(allowedAdmins || []).map((admin) => (
                    <tr key={admin.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>
                            {(admin.nama || admin.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: '#0f172a', display: 'block' }}>{admin.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#334155', fontWeight: 600 }}>{admin.nama || '-'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span className="pill-badge" style={{ background: admin.peran === 'Super Admin' ? '#fef3c7' : 'var(--primary-light)', color: admin.peran === 'Super Admin' ? '#92400e' : 'var(--primary)', borderColor: admin.peran === 'Super Admin' ? '#fde68a' : 'var(--primary-border)' }}>
                          {admin.peran || 'Admin'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.82rem' }}>
                        {admin.ditambahkanPada || '-'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setAllowedAdminModal(admin)}
                          className="btn btn-secondary btn-sm"
                          style={{ marginRight: '0.5rem' }}
                          title="Edit Info Admin"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => deleteAllowedAdmin(admin.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444' }}
                          title="Hapus Dari Daftar Admin"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Allowed Admin Add/Edit Modal */}
            {allowedAdminModal && (
              <div className="modal-overlay" onClick={() => setAllowedAdminModal(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '500px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#0f172a' }}>
                    {allowedAdminModal.id ? 'Edit Data Admin' : 'Tambah Email Admin Google Baru'}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (allowedAdminModal.id) {
                      updateAllowedAdmin(allowedAdminModal);
                    } else {
                      addAllowedAdmin(allowedAdminModal.email, allowedAdminModal.nama, allowedAdminModal.peran);
                    }
                    setAllowedAdminModal(null);
                  }}>
                    <div className="form-group">
                      <label className="form-label">Email Google Admin (Gmail / Custom Domain)</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="contoh: nama.pengurus@gmail.com"
                        value={allowedAdminModal.email}
                        onChange={(e) => setAllowedAdminModal({ ...allowedAdminModal, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nama Lengkap / Panggilan Admin</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="contoh: Farhan Al-Ghifari"
                        value={allowedAdminModal.nama}
                        onChange={(e) => setAllowedAdminModal({ ...allowedAdminModal, nama: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Peran / Otoritas Admin</label>
                      <select
                        className="form-input"
                        value={allowedAdminModal.peran}
                        onChange={(e) => setAllowedAdminModal({ ...allowedAdminModal, peran: e.target.value })}
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin Pengurus">Admin Pengurus</option>
                        <option value="Admin Konten">Admin Konten / Medinfo</option>
                        <option value="Admin Divisi">Admin Divisi</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setAllowedAdminModal(null)}>
                        Batal
                      </button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                        Simpan Admin
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Cropper Modal */}
        {cropperState && (
          <ImageCropperModal
            imageSrc={cropperState.src}
            aspectRatio={cropperState.aspectRatio || 1}
            onCancel={() => setCropperState(null)}
            onCropComplete={(croppedBase64) => {
              if (cropperState.target === 'sambutan') {
                setSambutanForm({ ...sambutanForm, foto: croppedBase64 });
              } else if (cropperState.target === 'pengurus' && pengurusModal) {
                setPengurusModal({ ...pengurusModal, foto: croppedBase64 });
              } else if (cropperState.target === 'berita' && beritaModal) {
                setBeritaModal({ ...beritaModal, gambar: croppedBase64 });
              } else if (cropperState.target === 'beritaGaleri' && beritaModal) {
                const currentGaleri = beritaModal.galeri || [];
                const updatedGaleri = [...currentGaleri, croppedBase64];
                setBeritaModal({
                  ...beritaModal,
                  gambar: beritaModal.gambar || croppedBase64,
                  galeri: updatedGaleri
                });
              } else if (cropperState.target === 'projaDokumentasi' && projaModal) {
                setProjaModal({
                  ...projaModal,
                  dokumentasi: [...(projaModal.dokumentasi || []), croppedBase64]
                });
              }
              setCropperState(null);
            }}
          />
        )}
      </main>
    </div>
  );
};
