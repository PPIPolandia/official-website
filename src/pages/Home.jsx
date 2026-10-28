import React, { useState, useEffect, useMemo } from 'react';
import { useAppData } from '../context/AppDataContext';
import { DivisiIcon } from '../components/DivisiIcon';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Target,
  Compass,
  Quote,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Trophy,
  Calendar,
  Eye,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export const Home = ({ setActivePage, setSelectedDivisionFilter, onReadNews }) => {
  const { visiMisi, sambutanKetua, statsData, divisi, programKerja, berita, kontak, submitLeaveMessage } = useAppData();

  // Dynamic Hero Images collected from Program Kerja
  const heroImages = useMemo(() => {
    const list = [];
    if (programKerja && programKerja.length > 0) {
      programKerja.forEach((proker) => {
        if (proker.gambar) {
          list.push({
            url: proker.gambar,
            title: proker.nama,
            divisi: proker.divisiNama || 'Program Kerja PPIP',
            lokasi: proker.lokasi || 'Polandia'
          });
        }
        if (proker.dokumentasi && Array.isArray(proker.dokumentasi)) {
          proker.dokumentasi.forEach((docUrl) => {
            if (docUrl && docUrl !== proker.gambar) {
              list.push({
                url: docUrl,
                title: proker.nama,
                divisi: proker.divisiNama || 'Dokumentasi Proker',
                lokasi: proker.lokasi || 'Polandia'
              });
            }
          });
        }
      });
    }

    if (list.length === 0) {
      list.push({
        url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
        title: 'Gathering Pelajar Indonesia di Polandia',
        divisi: 'PPI Polandia',
        lokasi: 'Warsaw'
      });
    }

    return list;
  }, [programKerja]);

  // Hero Slider State & Timer
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentHero = heroImages[heroIndex] || heroImages[0];

  // Slider State for Divisi
  const [divisiSlide, setDivisiSlide] = useState(0);

  // Slider State for Berita
  const [beritaSlide, setBeritaSlide] = useState(0);

  // Form state for Leave Message
  const [messageForm, setMessageForm] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageForm.nama || !messageForm.email || !messageForm.pesan) return;
    submitLeaveMessage(messageForm);
    setMessageForm({ nama: '', email: '', subjek: '', pesan: '' });
  };

  const iconMap = {
    GraduationCap: <GraduationCap size={32} color="var(--primary)" />,
    Users: <Users size={32} color="var(--primary)" />,
    Target: <Target size={32} color="var(--primary)" />,
    Trophy: <Trophy size={32} color="var(--primary)" />,
    Sparkles: <Sparkles size={32} color="var(--primary)" />
  };

  // Next / Prev Divisi Slider
  const nextDivisi = () => {
    setDivisiSlide((prev) => (prev + 1) % divisi.length);
  };
  const prevDivisi = () => {
    setDivisiSlide((prev) => (prev - 1 + divisi.length) % divisi.length);
  };

  // Next / Prev Berita Slider
  const nextBerita = () => {
    setBeritaSlide((prev) => (prev + 1) % berita.length);
  };
  const prevBerita = () => {
    setBeritaSlide((prev) => (prev - 1 + berita.length) % berita.length);
  };

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <section className="hero-bg" style={{ padding: '5rem 0 4rem' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} /> Website Resmi PPI Polandia
            </div>
            <h1 style={{ fontSize: '3.2rem', lineHeight: '1.15', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              Mewadahi, Mengabdi, & Menghubungkan<span style={{ color: 'var(--primary)', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Pelajar Indonesia di Polandia</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
              Selamat datang di portal informasi terpadu Persatuan Pelajar Indonesia (PPI) Polandia. Temukan program kerja, informasi beasiswa, riset, serta jaringan pelajar se-Polandia.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => { setActivePage('programKerja'); window.scrollTo(0, 0); }}
                style={{ padding: '0.85rem 1.8rem' }}
              >
                Lihat Program Kerja <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => { setActivePage('divisi'); window.scrollTo(0, 0); }}
                style={{ padding: '0.85rem 1.8rem' }}
              >
                Jelajahi Divisi
              </button>
            </div>

            {/* Quick Stat Badges */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
              {(statsData || []).map((st) => (
                <div key={st.id || st.label}>
                  <h4 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800 }}>{st.angka}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{st.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Banner Visual Slider */}
          <div style={{ position: 'relative' }}>
            <div className="card" style={{ padding: '0.5rem', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(226, 232, 240, 0.9)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '390px', borderRadius: '16px', overflow: 'hidden' }}>
                <img
                  key={currentHero.url}
                  src={currentHero.url}
                  alt={currentHero.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    transition: 'all 0.6s ease-in-out'
                  }}
                  className="animate-fade-in"
                />

                {/* Slider Controls (Next / Prev) */}
                {heroImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}
                      title="Foto Sebelumnya"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroIndex((prev) => (prev + 1) % heroImages.length)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0f172a',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 2,
                        transition: 'all 0.2s ease'
                      }}
                      title="Foto Selanjutnya"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Dot Indicators */}
                {heroImages.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    display: 'flex',
                    gap: '5px',
                    zIndex: 2,
                    background: 'rgba(15, 23, 42, 0.4)',
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {heroImages.map((_, idx) => (
                      <div
                        key={idx}
                        onClick={() => setHeroIndex(idx)}
                        style={{
                          width: idx === heroIndex ? '16px' : '6px',
                          height: '6px',
                          borderRadius: '9999px',
                          background: idx === heroIndex ? 'var(--primary)' : 'rgba(255,255,255,0.6)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Overlay Glass Card */}
            <div className="card" style={{
              position: 'absolute',
              bottom: '-25px',
              left: '-20px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '320px',
              background: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              zIndex: 3
            }}>
              <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '14px', color: '#059669' }}>
                <CheckCircle size={26} />
              </div>
              <div>
                <h5 style={{ fontSize: '0.95rem', margin: 0, color: '#0f172a' }}>PPI Polandia Active</h5>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Warsaw • Kraków • Wrocław • Gdańsk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag" style={{ justifyContent: 'center' }}>
              <Compass size={16} /> Visi & Misi Organisasi
            </span>
            <h2 className="section-title">Komitmen Utama PPI Polandia</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Landasan bergerak dan bertindak untuk mewujudkan pelayanan serta diplomasi mahasiswa yang progresif.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '2.5rem', alignItems: 'stretch' }}>
            {/* Visi Card */}
            <div className="card" style={{ padding: '2.5rem', background: 'linear-gradient(145deg, var(--primary-light) 0%, #ffffff 100%)', borderColor: 'var(--primary-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="pill-badge" style={{ width: 'fit-content', marginBottom: '1.5rem' }}>
                <Target size={16} /> VISI UTAMA
              </div>
              <h3 style={{ fontSize: '1.6rem', lineHeight: '1.4', color: 'var(--primary)', marginBottom: '1rem' }}>
                "{visiMisi.visi}"
              </h3>
            </div>

            {/* Misi Card List */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#0f172a' }}>Misi Strategis PPI Polandia:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {visiMisi.misi.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <p style={{ fontSize: '0.98rem', color: '#334155', lineHeight: '1.5', margin: 0, paddingTop: '3px' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UCAPAN / PESAN KETUA PPI */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="card" style={{ padding: '3rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={sambutanKetua.foto}
                  alt={sambutanKetua.nama}
                  style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }}
                />

              </div>

              <div>
                <Quote size={48} color="var(--primary-border)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                <span className="section-tag">Pesan Ketua PPI Polandia</span>
                <h3 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1rem' }}>
                  {sambutanKetua.kabinet}
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{sambutanKetua.ucapan}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{sambutanKetua.nama}</div>
                  <span style={{ color: '#cbd5e1' }}>•</span>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{sambutanKetua.jabatan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDER DIVISI */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span className="section-tag"><Sparkles size={16} /> Struktur Organisasi</span>
              <h2 className="section-title" style={{ margin: 0 }}>Slider Divisi PPI Polandia</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={prevDivisi} className="btn btn-secondary btn-icon" title="Sebelumnya">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextDivisi} className="btn btn-secondary btn-icon" title="Berikutnya">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Divisi Cards Slider Display */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {divisi.slice(divisiSlide, divisiSlide + 3).concat(
              divisi.length < 3 ? [] : divisi.slice(0, Math.max(0, (divisiSlide + 3) - divisi.length))
            ).map((item) => (
              <div
                key={item.id}
                className="card card-hover"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'var(--primary-light)', padding: '0.85rem', borderRadius: '16px', color: 'var(--primary)' }}>
                      <DivisiIcon name={item.ikon} size={32} color="var(--primary)" />
                    </div>
                    <span className="pill-badge">{item.kode}</span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                    {item.nama}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {item.deskripsi}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                    {item.jumlahAnggota} Pengurus
                  </span>
                  <button
                    onClick={() => {
                      setSelectedDivisionFilter(item.id);
                      setActivePage('programKerja');
                      window.scrollTo(0, 0);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    Program Kerja <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDER BERITA & KABAR */}
      <section style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <span className="section-tag"><Calendar size={16} /> Informasi Terkini</span>
              <h2 className="section-title" style={{ margin: 0 }}>Kabar & Berita PPI Polandia</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={prevBerita} className="btn btn-secondary btn-icon">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextBerita} className="btn btn-secondary btn-icon">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {berita.slice(beritaSlide, beritaSlide + 3).concat(
              berita.length < 3 ? [] : berita.slice(0, Math.max(0, (beritaSlide + 3) - berita.length))
            ).map((item) => (
              <div key={item.id} className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img
                  src={item.gambar}
                  alt={item.judul}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="pill-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>{item.kategori}</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>• {item.tanggal}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                      {item.judul}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                      {item.ringkasan}
                    </p>
                  </div>

                  <button
                    onClick={() => onReadNews(item)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Eye size={15} /> Baca Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAVE MESSAGE SECTION */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="card" style={{ padding: '3.5rem', background: 'radial-gradient(100% 100% at 0% 0%, var(--primary-light) 0%, #ffffff 100%)', borderColor: 'var(--primary-border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="section-tag"><MessageSquare size={16} /> Hubungi Kami</span>
                <h2 className="section-title">Leave a Message</h2>
                <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Punya pertanyaan seputar studi di Polandia, beasiswa, atau ingin menjalin kemitraan dengan PPI Polandia? Kirimkan pesan langsung di bawah ini.
                </p>
                <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>📧 Inbox PPI Polandia</div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    Pesan Kamu akan otomatis diteruskan ke email <strong>{kontak?.email || 'info@ppipolandia.org'}</strong> dan tercatat di Inbox Admin Dashboard.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleMessageSubmit} className="card" style={{ padding: '2rem', background: '#ffffff' }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Budi Pratama"
                    value={messageForm.nama}
                    onChange={(e) => setMessageForm({ ...messageForm, nama: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Pengirim</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="nama@email.com"
                    value={messageForm.email}
                    onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subjek Pesan</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Tujuan atau topik pertanyaan"
                    value={messageForm.subjek}
                    onChange={(e) => setMessageForm({ ...messageForm, subjek: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan / Pertanyaan</label>
                  <textarea
                    rows={4}
                    className="form-textarea"
                    placeholder="Tuliskan pesan lengkap Kamu di sini..."
                    value={messageForm.pesan}
                    onChange={(e) => setMessageForm({ ...messageForm, pesan: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Kirim Pesan <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSOR & MITRA PENDUKUNG PPI DUNIA SECTION */}
      <section style={{ padding: '3.5rem 0 1rem', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}>
              <Sparkles size={15} /> Mitra & Sponsor Resmi Domain PPI Dunia
            </span>
            <h3 style={{ fontSize: '1.35rem', color: '#0f172a', margin: 0 }}>
              Didukung Oleh
            </h3>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {[
              {
                name: 'PANDI (Pengelola Nama Domain Internet Indonesia)',
                src: '/sponsors/pandi.png',
                url: 'https://pandi.id'
              },
              {
                name: 'IDCloudHost',
                src: '/sponsors/idcloudhost.png',
                url: 'https://idcloudhost.com'
              },
              {
                name: 's.id',
                src: '/sponsors/s-id.png',
                url: 'https://s.id'
              }
            ].map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                title={sponsor.name}
                className="card card-hover"
                style={{
                  padding: '1.25rem 2.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  minWidth: '200px',
                  height: '92px'
                }}
              >
                <img
                  src={sponsor.src}
                  alt={sponsor.name}
                  style={{
                    maxHeight: '52px',
                    maxWidth: '160px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
