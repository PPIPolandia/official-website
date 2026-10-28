import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { renderSocialIcon, SOCIAL_PLATFORMS } from '../components/SocialIcons';

export const KontakPage = () => {
  const { kontak, submitLeaveMessage } = useAppData();

  const [form, setForm] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const activeSosmedList = (kontak.sosmedList && kontak.sosmedList.length > 0)
    ? kontak.sosmedList
    : [
        kontak.instagram && { id: 'sm-1', platform: 'Instagram', label: '@ppipolandia', url: kontak.instagram },
        kontak.youtube && { id: 'sm-2', platform: 'YouTube', label: 'PPI Polandia TV', url: kontak.youtube },
        kontak.linkedin && { id: 'sm-3', platform: 'LinkedIn', label: 'PPI Polandia', url: kontak.linkedin },
        kontak.tiktok && { id: 'sm-4', platform: 'TikTok', label: '@ppipolandia', url: kontak.tiktok }
      ].filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.pesan) return;
    submitLeaveMessage(form);
    setForm({ nama: '', email: '', subjek: '', pesan: '' });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <MessageSquare size={16} /> Contact & Connect
          </span>
          <h1 className="section-title">Kontak & Media Sosial PPI Polandia</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Hubungi sekretariat resmi kami atau hubungi kami melalui platform media sosial PPI Polandia.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left Column: Social Media & Directory */}
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1.5rem' }}>
              Daftar Kanal Resmi PPI Polandia
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff' }}>
                <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '14px', color: 'var(--primary)' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Alamat Sekretariat</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>{kontak.alamat}</div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff' }}>
                <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '14px', color: 'var(--primary)' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Email Utama</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>{kontak.email}</div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#ffffff' }}>
                <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '14px', color: 'var(--primary)' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Telepon / WhatsApp</div>
                  <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>{kontak.telepon}</div>
                </div>
              </div>
            </div>

            {/* Social Cards */}
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '1rem' }}>
              Platform Social Media ({activeSosmedList.length})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {activeSosmedList.map((item) => {
                const meta = SOCIAL_PLATFORMS.find(p => p.name === item.platform) || { badgeBg: 'var(--primary-light)', color: 'var(--primary)' };
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card card-hover"
                    style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                  >
                    <div style={{ background: meta.badgeBg, padding: '0.6rem', borderRadius: '12px', color: meta.color, display: 'flex' }}>
                      {renderSocialIcon(item.platform, 20, meta.color)}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{item.platform}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.label || item.url}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Leave Message Form */}
          <div>
            <div className="card" style={{ padding: '2.5rem', background: '#ffffff', border: '1.5px solid var(--primary-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '14px', color: 'var(--primary)' }}>
                  <Send size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: 0 }}>Leave a Message</h2>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Tinggalkan pesan langsung ke email PPI Polandia</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nama Kamu..."
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Pengirim</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subjek Pesan</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Subjek atau Topik"
                    value={form.subjek}
                    onChange={(e) => setForm({ ...form, subjek: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pesan Lengkap</label>
                  <textarea
                    rows={5}
                    className="form-textarea"
                    placeholder="Tuliskan pertanyaan atau informasi di sini..."
                    value={form.pesan}
                    onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Kirim Pesan Sekarang <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
