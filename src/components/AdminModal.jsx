import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, ArrowRight, KeyRound, ShieldCheck, AlertTriangle } from 'lucide-react';
import { api } from '../api';

export const AdminModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize Google Identity Services SDK button if available
    const initGoogleSDK = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
            callback: async (response) => {
              setIsLoading(true);
              setErrorMessage('');
              const res = await api.loginWithGoogle({ credential: response.credential });
              setIsLoading(false);
              if (res.success) {
                onLoginSuccess(res.user);
              } else {
                setErrorMessage(res.error || 'Akses ditolak. Email tidak terdaftar sebagai admin.');
              }
            }
          });

          if (googleBtnRef.current) {
            window.google.accounts.id.renderButton(googleBtnRef.current, {
              theme: 'outline',
              size: 'large',
              width: '100%',
              text: 'signin_with',
              shape: 'pill'
            });
          }
        } catch (err) {
          console.warn('Google SDK init info:', err);
        }
      }
    };

    initGoogleSDK();
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await api.login(passcode);
    setIsLoading(false);

    if (res.success) {
      setPasscode('');
      onLoginSuccess(res.user);
    } else {
      setErrorMessage('Kode akses admin salah! Silakan periksa kembali kata sandi Anda.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '460px', padding: '2rem', background: '#ffffff', borderRadius: '24px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--primary-light)', padding: '0.65rem', borderRadius: '14px', color: 'var(--primary)' }}>
              <Lock size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#0f172a' }}>Login Dashboard Admin</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Portal Pengelolaan Resmi PPI Polandia</p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            lineHeight: 1.4
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* GOOGLE SIGN-IN SECTION */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a', marginBottom: '0.75rem' }}>
            <ShieldCheck size={16} color="var(--primary)" /> Login dengan Akun Google Terdaftar
          </label>

          {/* Official Google SDK Render Container */}
          <div ref={googleBtnRef} style={{ width: '100%', minHeight: '44px' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', color: '#cbd5e1' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ padding: '0 0.75rem', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>atau gunakan kode akses</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        {/* PASSCODE FORM SECTION */}
        <form onSubmit={handlePasscodeSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569' }}>
              <KeyRound size={15} color="var(--primary)" /> Kode Akses Admin (Passcode Utama)
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Masukkan password admin..."
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setErrorMessage(''); }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Batal
            </button>
            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ flex: 1.5 }}>
              {isLoading ? 'Verifikasi...' : 'Masuk Dashboard'} <ArrowRight size={16} />
            </button>
          </div>
        </form>

        <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          💡 Pembatasan Keamanan: Hanya email Google yang terdaftar di menu <strong>"Kelola Admin"</strong> yang diizinkan masuk.
        </div>
      </div>
    </div>
  );
};
