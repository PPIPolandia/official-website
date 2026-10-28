import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Sparkles } from 'lucide-react';
import logoPPIP from '../assets/Logo PPIP.png';
import polandFlag from '../assets/poland.png';
import indonesiaFlag from '../assets/indonesia.png';

export const Navbar = ({ activePage, setActivePage, onOpenAdminModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'divisi', label: 'Divisi' },
    { id: 'programKerja', label: 'Program Kerja' },
    { id: 'berita', label: 'Berita' },
    { id: 'pengurus', label: 'Pengurus' },
    { id: 'kontak', label: 'Kontak' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e2e8f0',
      transition: 'var(--transition)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Logo PPI Polandia */}
        <div
          onClick={() => handleNavClick('beranda')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <img
            src={logoPPIP}
            alt="Logo PPI Polandia"
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                PPI POLANDIA
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <img src={indonesiaFlag} alt="Indonesia" style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                <img src={polandFlag} alt="Poland" style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
              Persatuan Pelajar Indonesia di Polandia
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          <div style={{
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            border: '1px solid #e2e8f0'
          }}>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? '#ffffff' : '#475569',
                    background: isActive ? 'var(--primary-gradient)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px var(--primary-border)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Admin Dashboard CTA & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onOpenAdminModal}
            className="btn btn-secondary"
            style={{
              padding: '0.6rem 1.1rem',
              fontSize: '0.88rem',
              borderRadius: '9999px',
              gap: '0.4rem',
              border: '1.5px solid var(--primary-border)',
              background: 'var(--primary-light)',
              color: 'var(--primary)'
            }}
          >
            <ShieldCheck size={18} color="var(--primary)" />
            <span>Dashboard Admin</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-toggle"
            style={{ display: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                fontWeight: activePage === item.id ? 700 : 500,
                background: activePage === item.id ? 'var(--primary-light)' : 'transparent',
                color: activePage === item.id ? 'var(--primary)' : '#334155'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
