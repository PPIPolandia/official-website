import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Users, GraduationCap, Mail, Award, ArrowUpDown } from 'lucide-react';
import { LinkedinIcon } from '../components/SocialIcons';

export const PengurusPage = () => {
  const { pengurus, kabinetList } = useAppData();

  const safePengurus = Array.isArray(pengurus) ? pengurus.filter(Boolean) : [];
  const safeKabinetList = Array.isArray(kabinetList) ? kabinetList.filter(Boolean) : [];

  // Extract unique cabinet options combining registered kabinetList and existing pengurus
  const cabinetOptions = [...new Set([...safeKabinetList, ...safePengurus.map(p => p?.kabinet).filter(Boolean)])];

  // Default to first cabinet (or 2024/2025)
  const [selectedCabinet, setSelectedCabinet] = useState(cabinetOptions[0] || '2024/2025 - Kabinet Garuda Nusantara');

  // Filter members by selected cabinet & SORT BY positionIndex ASCENDING!
  const filteredPengurus = safePengurus
    .filter(p => p && p.kabinet === selectedCabinet)
    .sort((a, b) => (a.positionIndex || 0) - (b.positionIndex || 0));

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Award size={16} /> Cabinet Structure & Team
          </span>
          <h1 className="section-title">Pengurus & Struktur Kabinet</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Daftar jajaran badan pengurus harian dan kepala divisi PPI Polandia yang disusun berurutan sesuai tata kelola organisasi.
          </p>
        </div>

        {/* Cabinet Selection Tabs & Dropdown */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '3rem', background: '#ffffff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>
              Pilih Periode Kepengurusan & Nama Kabinet:
            </label>

            {/* Pills Tab Selection */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {cabinetOptions.map((cab) => (
                <button
                  key={cab}
                  onClick={() => setSelectedCabinet(cab)}
                  className={`btn ${selectedCabinet === cab ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '9999px', fontSize: '0.9rem' }}
                >
                  <Users size={16} /> {cab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Cabinet Title Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #e2e8f0' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>{selectedCabinet}</h2>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Total {filteredPengurus.length} Jajaran Pengurus (Urutan disesuaikan dari Admin Dashboard)
            </span>
          </div>
          <div className="pill-badge" style={{ fontSize: '0.8rem' }}>
            <ArrowUpDown size={13} /> Urutan Resmi Admin
          </div>
        </div>

        {/* Members Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredPengurus.map((item, idx) => (
            <div key={item.id} className="card card-hover" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
              
              {/* Order Number Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: '0.78rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--primary-border)'
              }}>
                #{item.positionIndex || (idx + 1)}
              </div>

              {/* Avatar Photo */}
              <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
                <img 
                  src={item.foto} 
                  alt={item.nama} 
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #ffffff',
                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.15)'
                  }}
                />
              </div>

              {/* Name & Role */}
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                {item.nama}
              </h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
                {item.jabatan}
              </div>

              {/* University & Major info */}
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', width: '100%', fontSize: '0.85rem', color: '#475569', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                  <GraduationCap size={15} color="var(--primary)" /> {item.kampus}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {item.jurusan}
                </div>
              </div>

              {/* Contacts & Social */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {item.email && (
                  <a href={`mailto:${item.email}`} title={item.email} style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}>
                    <Mail size={16} />
                  </a>
                )}
                {item.linkedin && (
                  <a href={item.linkedin} target="_blank" rel="noreferrer" title="LinkedIn Profile" style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}>
                    <LinkedinIcon size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
