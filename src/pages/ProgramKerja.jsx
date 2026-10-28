import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Search, Filter, Calendar, MapPin, CheckCircle2, Clock, PlayCircle, UserCheck, X, FileText, Camera, Image as ImageIcon, Award, Users } from 'lucide-react';

export const ProgramKerjaPage = ({ selectedDivisionFilter, setSelectedDivisionFilter }) => {
  const { programKerja, divisi, kabinetList, pengurus } = useAppData();

  const safeProgramKerja = Array.isArray(programKerja) ? programKerja.filter(Boolean) : [];
  const safeDivisi = Array.isArray(divisi) ? divisi.filter(Boolean) : [];
  const safeKabinetList = Array.isArray(kabinetList) ? kabinetList.filter(Boolean) : [];
  const safePengurus = Array.isArray(pengurus) ? pengurus.filter(Boolean) : [];

  // Extract unique cabinet options
  const cabinetOptions = [
    'Semua Kabinet',
    ...new Set([
      ...safeKabinetList,
      ...safePengurus.map(p => p?.kabinet),
      ...safeDivisi.map(d => d?.kabinet),
      ...safeProgramKerja.map(p => p?.kabinet)
    ].filter(Boolean))
  ];

  const [selectedCabinet, setSelectedCabinet] = useState('Semua Kabinet');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [detailModal, setDetailModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Filter Logic
  const filteredPrograms = safeProgramKerja.filter((item) => {
    // Cabinet filter
    const matchCabinet = selectedCabinet === 'Semua Kabinet' || !item.kabinet || item.kabinet === selectedCabinet;

    // Division filter
    const matchDivision = selectedDivisionFilter === 'Semua' || item.divisiId === selectedDivisionFilter;
    
    // Status filter
    const matchStatus = selectedStatus === 'Semua' || item.status === selectedStatus;

    // Search term (name or description)
    const matchSearch = (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (item.deskripsi || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (item.divisiNama || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchCabinet && matchDivision && matchStatus && matchSearch;
  });

  const getStatusBadge = (status) => {
    if (status === 'Selesai') {
      return <span className="pill-badge pill-badge-success"><CheckCircle2 size={13} /> Selesai</span>;
    } else if (status === 'Berjalan') {
      return <span className="pill-badge pill-badge-warning"><PlayCircle size={13} /> Berjalan</span>;
    }
    return <span className="pill-badge"><Clock size={13} /> Terencana</span>;
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <FileText size={16} /> Work Programs & Agenda
          </span>
          <h1 className="section-title">Program Kerja PPI Polandia</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Cari dan filter program kerja berdasarkan kabinet, divisi penanggung jawab, atau kata kunci kegiatan.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem', background: '#ffffff' }}>
          {/* Search Input & Selectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px 180px', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Cari nama program kerja, kata kunci, atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Cabinet Dropdown Selector */}
            <select
              className="form-select"
              value={selectedCabinet}
              onChange={(e) => setSelectedCabinet(e.target.value)}
            >
              {cabinetOptions.map(cab => (
                <option key={cab} value={cab}>
                  {cab === 'Semua Kabinet' ? '🏛️ Semua Kabinet' : `🏛️ ${cab}`}
                </option>
              ))}
            </select>

            {/* Status Dropdown Selector */}
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Semua">Semua Status</option>
              <option value="Terencana">Status: Terencana</option>
              <option value="Berjalan">Status: Berjalan</option>
              <option value="Selesai">Status: Selesai</option>
            </select>
          </div>

          {/* Division Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={14} /> Filter Divisi:
            </span>

            <button
              onClick={() => setSelectedDivisionFilter('Semua')}
              className={`btn btn-sm ${selectedDivisionFilter === 'Semua' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Semua Divisi ({safeProgramKerja.filter(p => selectedCabinet === 'Semua Kabinet' || !p.kabinet || p.kabinet === selectedCabinet).length})
            </button>

            {safeDivisi.map((div) => {
              const isActive = selectedDivisionFilter === div.id;
              const count = safeProgramKerja.filter(p => {
                const matchDiv = p.divisiId === div.id;
                const matchCab = selectedCabinet === 'Semua Kabinet' || !p.kabinet || p.kabinet === selectedCabinet;
                return matchDiv && matchCab;
              }).length;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivisionFilter(div.id)}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {div.nama} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.92rem', color: '#64748b' }}>
            Menampilkan <strong>{filteredPrograms.length}</strong> program kerja {selectedCabinet !== 'Semua Kabinet' && `(${selectedCabinet})`}
          </span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {selectedCabinet !== 'Semua Kabinet' && (
              <button 
                onClick={() => setSelectedCabinet('Semua Kabinet')}
                style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}
              >
                Reset Kabinet ×
              </button>
            )}
            {selectedDivisionFilter !== 'Semua' && (
              <button 
                onClick={() => setSelectedDivisionFilter('Semua')}
                style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}
              >
                Reset Divisi ×
              </button>
            )}
          </div>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', background: '#ffffff' }}>
            <div style={{ background: 'var(--primary-light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--primary)' }}>
              <Search size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Tidak ada program kerja ditemukan</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Coba sesuaikan kata kunci pencarian, pilih kabinet lain, atau reset filter divisi.
            </p>
            <button onClick={() => { setSearchTerm(''); setSelectedCabinet('Semua Kabinet'); setSelectedDivisionFilter('Semua'); setSelectedStatus('Semua'); }} className="btn btn-secondary btn-sm">
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {filteredPrograms.map((item) => {
              const coverImage = item.gambar || (item.dokumentasi && item.dokumentasi[0]);

              return (
                <div 
                  key={item.id} 
                  className="card card-hover"
                  style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt={item.nama}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    />
                  )}

                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span className="pill-badge" style={{ fontSize: '0.78rem' }}>
                            {item.divisiNama}
                          </span>
                          {item.kabinet && (
                            <span style={{ fontSize: '0.72rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#475569', fontWeight: 600 }}>
                              {item.kabinet}
                            </span>
                          )}
                        </div>
                        {getStatusBadge(item.status)}
                      </div>

                      <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem', lineHeight: '1.35' }}>
                        {item.nama}
                      </h3>

                      <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                        {item.deskripsi}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.85rem', color: '#475569', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={15} color="var(--primary)" />
                          <span>{item.tanggal}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={15} color="var(--primary)" />
                          <span>{item.lokasi}</span>
                        </div>
                        {item.penanggungJawab && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserCheck size={15} color="var(--primary)" />
                            <span>PJ: {item.penanggungJawab}</span>
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => setDetailModal(item)}
                        className="btn btn-secondary btn-sm" 
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        Detail & Dokumen <ImageIcon size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Proja Modal */}
        {detailModal && (
          <div className="modal-overlay" onClick={() => setDetailModal(null)} style={{ zIndex: 9999 }}>
            <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span className="pill-badge">{detailModal.divisiNama}</span>
                    {detailModal.kabinet && <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{detailModal.kabinet}</span>}
                    {getStatusBadge(detailModal.status)}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800 }}>{detailModal.nama}</h2>
                </div>
                <button onClick={() => setDetailModal(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {detailModal.deskripsi}
              </p>

              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block' }}>Waktu / Tanggal:</span>
                  <strong style={{ color: '#0f172a' }}>{detailModal.tanggal}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block' }}>Lokasi Kegiatan:</span>
                  <strong style={{ color: '#0f172a' }}>{detailModal.lokasi}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block' }}>Penanggung Jawab (PJ):</span>
                  <strong style={{ color: '#0f172a' }}>{detailModal.penanggungJawab || '-'}</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block' }}>Alokasi Anggaran:</span>
                  <strong style={{ color: 'var(--primary)' }}>{detailModal.anggaran || '-'}</strong>
                </div>
              </div>

              {/* Dokumentasi Galeri Foto */}
              {detailModal.dokumentasi && detailModal.dokumentasi.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Camera size={16} color="var(--primary)" /> Dokumentasi Foto Kegiatan:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                    {detailModal.dokumentasi.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt={`Dokumentasi ${i + 1}`}
                        onClick={() => setLightboxImage(imgUrl)}
                        style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer', border: '1px solid #e2e8f0' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Lightbox Preview Modal */}
        {lightboxImage && (
          <div className="modal-overlay" onClick={() => setLightboxImage(null)} style={{ zIndex: 99999, background: 'rgba(0,0,0,0.85)' }}>
            <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
              <img src={lightboxImage} alt="Preview Large" style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }} />
              <button onClick={() => setLightboxImage(null)} style={{ position: 'absolute', top: '-40px', right: '0', color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={28} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
