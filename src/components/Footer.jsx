import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';
import { renderSocialIcon, SOCIAL_PLATFORMS } from './SocialIcons';
import logoPPIP from '../assets/Logo PPIP.png';
import polandFlag from '../assets/poland.png';
import indonesiaFlag from '../assets/indonesia.png';

export const Footer = ({ setActivePage, onOpenAdminModal }) => {
  const { kontak } = useAppData();

  const activeSosmedList = (kontak.sosmedList && kontak.sosmedList.length > 0)
    ? kontak.sosmedList
    : [
        kontak.instagram && { id: 'sm-1', platform: 'Instagram', label: '@ppipolandia', url: kontak.instagram },
        kontak.youtube && { id: 'sm-2', platform: 'YouTube', label: 'PPI Polandia TV', url: kontak.youtube },
        kontak.linkedin && { id: 'sm-3', platform: 'LinkedIn', label: 'PPI Polandia', url: kontak.linkedin },
        kontak.tiktok && { id: 'sm-4', platform: 'TikTok', label: '@ppipolandia', url: kontak.tiktok }
      ].filter(Boolean);

  return (
    <footer style={{
      background: '#0f172a',
      color: '#cbd5e1',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      marginTop: '5rem',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img 
                src={logoPPIP} 
                alt="Logo PPI Polandia" 
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }} 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.2rem', margin: 0 }}>PPI POLANDIA</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <img src={indonesiaFlag} alt="Indonesia" style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                    <img src={polandFlag} alt="Poland" style={{ width: '18px', height: '12px', borderRadius: '2px', objectFit: 'cover' }} />
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Persatuan Pelajar Indonesia</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Organisasi resmi wadah berhimpun, mengabdi, dan berkembang bagi seluruh pelajar & mahasiswa Indonesia yang sedang menempuh studi di Republik Polandia.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {activeSosmedList.map((item) => {
                const meta = SOCIAL_PLATFORMS.find(p => p.name === item.platform) || { color: 'var(--primary)' };
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`${item.platform}: ${item.label || item.url}`}
                    style={{
                      background: '#1e293b',
                      padding: '0.65rem',
                      borderRadius: '50%',
                      color: meta.color || '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s, background 0.2s'
                    }}
                  >
                    {renderSocialIcon(item.platform, 18, meta.color)}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Navigasi Halaman</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => { setActivePage('beranda'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Beranda</button></li>
              <li><button onClick={() => { setActivePage('divisi'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Profil Divisi</button></li>
              <li><button onClick={() => { setActivePage('programKerja'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Program Kerja</button></li>
              <li><button onClick={() => { setActivePage('berita'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Kabar & Berita</button></li>
              <li><button onClick={() => { setActivePage('pengurus'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Struktur Pengurus</button></li>
              <li><button onClick={() => { setActivePage('kontak'); window.scrollTo(0,0); }} style={{ color: '#94a3b8' }}>Kontak & Sosmed</button></li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Kontak Sekretariat</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{kontak.alamat}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} color="var(--primary)" />
                <span>{kontak.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} color="var(--primary)" />
                <span>{kontak.telepon}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} PPI Polandia. All rights reserved. Made with <Heart size={14} color="#ef4444" style={{ display: 'inline', margin: '0 2px' }} /> for Indonesian Students in Poland.
          </div>
          <button 
            onClick={onOpenAdminModal}
            style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            Access Admin Portal →
          </button>
        </div>
      </div>
    </footer>
  );
};
