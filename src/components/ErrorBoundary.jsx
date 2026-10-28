import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      // Clear local storage keys to clear any corrupted data
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('ppip_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn('Failed clearing localStorage:', e);
    }
    // Reload page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          padding: '2rem',
          fontFamily: 'sans-serif'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '2.5rem',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#ef4444',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <AlertTriangle size={32} />
            </div>
            
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem', fontWeight: 800 }}>
              Terjadi Kendala Tampilan Web
            </h2>
            
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Aplikasi mengalami kendala saat memuat data tampilan. Hal ini biasanya terjadi jika kuota penyimpanan browser penuh atau terdapat format data yang terganggu.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'var(--primary, #0284c7)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
                }}
              >
                <RefreshCw size={16} /> Pulihkan Data & Muat Ulang
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
