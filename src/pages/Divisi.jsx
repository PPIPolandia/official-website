import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { ArrowRight, Layers, ListTodo, Users, Award } from 'lucide-react';
import { DivisiIcon } from '../components/DivisiIcon';

export const DivisiPage = ({ setActivePage, setSelectedDivisionFilter }) => {
  const { divisi, programKerja, kabinetList, pengurus } = useAppData();

  const safeDivisi = Array.isArray(divisi) ? divisi.filter(Boolean) : [];
  const safeProgramKerja = Array.isArray(programKerja) ? programKerja.filter(Boolean) : [];
  const safeKabinetList = Array.isArray(kabinetList) ? kabinetList.filter(Boolean) : [];
  const safePengurus = Array.isArray(pengurus) ? pengurus.filter(Boolean) : [];

  // Extract unique cabinet options combining kabinetList, pengurus, divisi, and proja
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

  // Filter divisions by selected cabinet
  const filteredDivisi = safeDivisi.filter(item => {
    if (selectedCabinet === 'Semua Kabinet') return true;
    return !item.kabinet || item.kabinet === selectedCabinet;
  });

  const handleDivisiClick = (divisiId) => {
    setSelectedDivisionFilter(divisiId);
    setActivePage('programKerja');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Layers size={16} /> Structure & Divisions
          </span>
          <h1 className="section-title">Divisi Organisasi PPI Polandia</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Pilih kabinet di bawah ini untuk melihat daftar divisi dan program kerja khusus yang dikelola oleh masing-masing jajaran kabinet.
          </p>
        </div>

        {/* Cabinet Selector Filter */}
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '3rem', background: '#ffffff', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="var(--primary)" /> Pilih Periode Kabinet:
            </span>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {cabinetOptions.map((cab) => (
                <button
                  key={cab}
                  onClick={() => setSelectedCabinet(cab)}
                  className={`btn ${selectedCabinet === cab ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '9999px', fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                >
                  <Users size={14} /> {cab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Cabinet Title Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: 0 }}>
              {selectedCabinet === 'Semua Kabinet' ? 'Daftar Seluruh Divisi' : selectedCabinet}
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Total {filteredDivisi.length} Divisi Aktif
            </span>
          </div>
        </div>

        {/* Division Cards Grid */}
        {filteredDivisi.length === 0 ? (
          <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center', background: '#ffffff' }}>
            <Layers size={36} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Belum ada divisi terdaftar untuk kabinet ini</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Pilih kabinet lain atau tambahkan divisi baru melalui Admin Dashboard.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {filteredDivisi.map((item) => {
              const countProja = safeProgramKerja.filter(p => {
                const matchDiv = p.divisiId === item.id;
                const matchCab = selectedCabinet === 'Semua Kabinet' || !p.kabinet || p.kabinet === selectedCabinet;
                return matchDiv && matchCab;
              }).length;

              return (
                <div
                  key={item.id}
                  className="card card-hover"
                  onClick={() => handleDivisiClick(item.id)}
                  style={{
                    padding: '2.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: 'var(--primary-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--primary-border)'
                      }}>
                        <DivisiIcon name={item.ikon} size={36} color="var(--primary)" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                        <span className="pill-badge" style={{ fontSize: '0.85rem' }}>
                          {item.kode}
                        </span>
                        {item.kabinet && (
                          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                            {item.kabinet}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                      {item.nama}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2rem' }}>
                      {item.deskripsi}
                    </p>
                  </div>

                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
                      <ListTodo size={16} />
                      <span>{countProja} Program Kerja</span>
                    </div>

                    <div className="btn btn-primary btn-sm" style={{ padding: '0.45rem 1rem' }}>
                      Lihat Proja <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
