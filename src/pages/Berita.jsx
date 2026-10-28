import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Search, Calendar, User, Eye, X, Newspaper, ArrowRight, Share2, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

export const BeritaPage = ({ selectedNewsModal, setSelectedNewsModal }) => {
  const { berita, kategoriBeritaList } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['Semua', ...new Set([...(kategoriBeritaList || []), ...berita.map(b => b.kategori)])];

  const filteredNews = berita.filter(b => {
    const matchCat = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchSearch = b.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        b.konten.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Newspaper size={16} /> News & Announcements
          </span>
          <h1 className="section-title">Berita & Portal Kabar PPI Polandia</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Kumpulan artikel, pengumuman resmi, beasiswa, dan liputan kegiatan mahasiswa Indonesia di Polandia.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem', background: '#ffffff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Cari judul berita, beasiswa, atau kata kunci..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'Semua' ? 'Semua Kategori' : `Kategori: ${c}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* News Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredNews.map((item) => {
            const coverImage = item.gambar || (item.galeri && item.galeri[0]) || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80';

            return (
              <div key={item.id} className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img 
                  src={coverImage} 
                  alt={item.judul} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span className="pill-badge" style={{ fontSize: '0.75rem' }}>{item.kategori}</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} /> {item.tanggal}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.85rem', lineHeight: '1.35' }}>
                      {item.judul}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {item.ringkasan}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <User size={13} /> {item.penulis}
                    </span>

                    <button 
                      onClick={() => setSelectedNewsModal(item)}
                      className="btn btn-primary btn-sm"
                    >
                      Baca Berita <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* News Article Reader Modal */}
        {selectedNewsModal && (
          <div className="modal-overlay" onClick={() => setSelectedNewsModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '0' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={selectedNewsModal.gambar || (selectedNewsModal.galeri && selectedNewsModal.galeri[0])} 
                  alt={selectedNewsModal.judul} 
                  style={{ width: '100%', height: '340px', objectFit: 'cover' }}
                />
                <button 
                  onClick={() => setSelectedNewsModal(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(15, 23, 42, 0.7)',
                    color: '#ffffff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span className="pill-badge">{selectedNewsModal.kategori}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>📅 {selectedNewsModal.tanggal}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>✍️ {selectedNewsModal.penulis}</span>
                </div>

                <h1 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1.25rem', lineHeight: '1.3' }}>
                  {selectedNewsModal.judul}
                </h1>

                <div style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '2rem' }}>
                  {selectedNewsModal.konten}
                </div>

                {/* Multi-Photo Gallery for News Article */}
                {selectedNewsModal.galeri && selectedNewsModal.galeri.length > 0 && (
                  <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Camera size={18} color="var(--primary)" /> Galeri Foto Artikel ({selectedNewsModal.galeri.length} Foto)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                      {selectedNewsModal.galeri.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => setLightboxImage(photo)}
                          style={{
                            height: '90px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.03)';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <img src={photo} alt={`Dokumentasi ${pIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Diterbitkan oleh PPI Polandia</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNewsModal(null)}>
                    Tutup Berita
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="modal-overlay"
            onClick={() => setLightboxImage(null)}
            style={{ background: 'rgba(15, 23, 42, 0.92)', zIndex: 1100 }}
          >
            <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImage}
                alt="Dokumentasi Full"
                style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
              />
              <button
                onClick={() => setLightboxImage(null)}
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
