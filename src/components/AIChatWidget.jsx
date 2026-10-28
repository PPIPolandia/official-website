import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ExternalLink, RefreshCw, ChevronDown, PhoneCall } from 'lucide-react';

const QA_DATABASE = [
  {
    id: 'syarat-kuliah',
    question: '🎓 Syarat & Alur Pendaftaran Kuliah di Polandia',
    keywords: ['syarat', 'daftar', 'pendaftaran', 'kuliah', 'alur', 'masuk', 'ijazah', 'ielts', 'toefl', 'dokumen', 'intake'],
    answer: `Untuk menempuh studi (S1/S2/S3) di Polandia, berikut adalah syarat umum & alurnya:

1. **Persyaratan Dokumen**:
   • Ijazah & Transkrip Nilai (diterjemahkan ke Bahasa Inggris/Polandia oleh Penerjemah Tersumpah / Sworn Translator).
   • Apostille / Legalisir Dokumen dari Kemenkumham, Kemenlu & Kedubes.
   • Sertifikat Kemampuan Bahasa Inggris (IELTS min. 6.0 - 6.5, TOEFL iBT, atau Duolingo English Test sesuai ketentuan kampus).
   • Paspor Aktif (min. berlaku 18 bulan ke depan).
   • Motivation Letter & Surat Rekomendasi Akademik.

2. **Jadwal Pendaftaran**:
   • Winter Intake (Oktober): Pendaftaran dibuka Maret - Juli.
   • Summer Intake (Februari): Pendaftaran dibuka Oktober - Desember.`
  },
  {
    id: 'biaya-hidup',
    question: '💰 Estimasi Biaya Hidup & Tempat Tinggal',
    keywords: ['biaya', 'hidup', 'sewa', 'kamar', 'asrama', 'makan', 'pengeluaran', 'harga', 'rupiah', 'pln', 'zloty'],
    answer: `Estimasi rata-rata biaya hidup mahasiswa di Polandia berkisar antara **2.000 – 3.500 PLN/bulan** (~Rp 8 – 14 juta), tergantung kota tinggal:

• **Sewa Tempat Tinggal / Asrama**:
  - Asrama Kampus (Dormitory): 600 - 1.100 PLN/bulan.
  - Sewa Kamar Privat (Private Room): 1.000 - 1.800 PLN/bulan.
• **Konsumsi / Belanja Makan**: 600 - 1.000 PLN/bulan.
• **Transportasi Umum Mahasiswa**: 50 - 90 PLN/bulan (Diskon 51% khusus mahasiswa ber-Legitymacja).
• **Asuransi Kesehatan (NFZ)**: ~55 PLN/bulan.

*Kota seperti Warsaw & Kraków memiliki estimasi lebih tinggi dibanding Poznań, Wrocław, atau Gdańsk.*`
  },
  {
    id: 'kerja-parttime',
    question: '💼 Aturan Izin Kerja Part-Time bagi Mahasiswa',
    keywords: ['kerja', 'part time', 'parttime', 'gaji', 'sambilan', 'kerjaan', 'upah', 'ijin', 'izin', 'legit'],
    answer: `Ya! Mahasiswa asing di Polandia berhak bekerja secara **LEGAL**:

1. **Status Full-Time Student**:
   Mahasiswa perguruan tinggi negeri/swasta jalur reguler (full-time degree) yang memegang Visa Pelajar (D-Type) atau Karta Pobytu **TIDAK memerlukan izin kerja tambahan (Work Permit)**.

2. **Batas Jam Kerja & Upah**:
   • Disarankan maksimal 20 jam/minggu saat masa kuliah aktif agar tidak mengganggu studi.
   • Upah minimum nasional Polandia saat ini berkisar **~28.10 PLN/jam (brutto)**.
   • Lapangan kerja populer: Restoran/café, delivery rider, pengajar Bahasa Inggris, customer service multibahasa, atau magang perusahaan (internship).`
  },
  {
    id: 'visa-trc',
    question: '📄 Cara Pengurusan Visa & Karta Pobytu (TRC)',
    keywords: ['visa', 'trc', 'karta pobytu', 'pobytu', 'kedubes', 'legalitas', 'imigrasi', 'paspor', 'urzad'],
    answer: `Berikut alur pengurusan dokumen tinggal di Polandia:

1. **Visa Pelajar (National Visa D-Type)**:
   • Diajukan di Kedutaan Besar Republik Polandia di Jakarta sebelum berangkat.
   • Melampirkan *Letter of Acceptance (LoA)* resmi kampus, bukti akomodasi, asuransi travel/kesehatan, dan rekening koran bukti kecukupan dana.

2. **Karta Pobytu (Temporary Residence Permit / TRC)**:
   • Kartu izin tinggal sementara di Polandia yang diajukan di Kantor Urusan Warga Negara (*Urząd Wojewódzki*) di kota tempat Anda tinggal sebelum visa habis.
   • Berlaku 1 – 3 tahun dan berfungsi sebagai ID card resmi di wilayah Schengen.`
  },
  {
    id: 'whatsapp-hotline',
    question: '📱 Tanya Langsung via WhatsApp (+48 795 340 632)',
    keywords: ['whatsapp', 'wa', 'hotline', 'admin', 'bantuan', 'kontak', 'hubungi', 'tanya', 'nomor', 'telepon'],
    answer: `Jika Anda membutuhkan bantuan khusus, pertanyaan spesifik di luar daftar ini, atau ingin berkonsultasi langsung dengan pengurus PPI Polandia:

Anda dapat langsung mengirim pesan WhatsApp ke **Hotline Resmi PPI Polandia**:
👉 **+48 795 340 632**

Tim pengurus kami akan dengan senang hati membantu Anda!`
  }
];

const renderFormattedText = (text) => {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    const tokens = line.split(regex);

    return (
      <React.Fragment key={lIdx}>
        {tokens.map((token, tIdx) => {
          if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
            return (
              <strong key={tIdx} style={{ fontWeight: 700 }}>
                {token.slice(2, -2)}
              </strong>
            );
          } else if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
            return (
              <em key={tIdx} style={{ fontStyle: 'italic' }}>
                {token.slice(1, -1)}
              </em>
            );
          }
          return token;
        })}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: 'Halo! Saya Asisten AI PPI Polandia 🇵🇱🇮🇩. Ada yang bisa saya bantu seputar kehidupan dan studi di Polandia?\n\nSilakan klik salah satu topik pertanyaan cepat di bawah ini atau ketikkan pertanyaan Anda:',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showOptions: true
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  const handleSelectQuestion = (qaItem) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: qaItem.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: qaItem.answer,
        isWhatsApp: qaItem.id === 'whatsapp-hotline',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showOptions: true
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const handleSendCustomQuery = (e) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    const lowerQuery = query.toLowerCase();

    // Match query keywords
    let matchedQA = QA_DATABASE.find((item) =>
      item.keywords.some((kw) => lowerQuery.includes(kw))
    );

    setTimeout(() => {
      setIsTyping(false);

      if (matchedQA) {
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: matchedQA.answer,
          isWhatsApp: matchedQA.id === 'whatsapp-hotline',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showOptions: true
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Fallback to WhatsApp Hotline redirect for non-matched query
        const fallbackMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Terima kasih atas pertanyaannya! Jawaban spesifik mengenai "*${query}*" memerlukan informasi langsung dari tim pengurus PPI Polandia.\n\nSilakan hubungi **Hotline WhatsApp PPI Polandia (+48 795 340 632)** untuk mendapatkan respon resmi & bantuan langsung.`,
          isWhatsApp: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showOptions: true
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    }, 900);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Percakapan telah direset. Silakan pilih topik pertanyaan atau ketikkan pesan Anda:',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        showOptions: true
      }
    ]);
  };

  const waUrl = "https://wa.me/48795340632?text=Halo%20PPI%20Polandia,%20saya%20ingin%20bertanya%20seputar%20studi%20dan%20informasi%20di%20Polandia.";

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99990 }}>
      {/* Floating Toggle Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          style={{
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 22px 12px 16px',
            boxShadow: '0 12px 30px -5px rgba(37, 99, 235, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
        >
          <div style={{ position: 'relative', display: 'flex' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
              <Bot size={22} color="#ffffff" />
            </div>
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              background: '#10b981',
              borderRadius: '50%',
              border: '2px solid #ffffff'
            }} />
          </div>
          <span>Chat AI PPIP</span>
          <Sparkles size={16} color="#fbbf24" style={{ animation: 'pulse 2s infinite' }} />
        </button>
      )}

      {/* Main Chat Modal Window */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: isMinimized ? '60px' : '560px',
            maxHeight: 'calc(100vh - 100px)',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--primary-gradient)',
              padding: '1rem 1.25rem',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%', display: 'flex' }}>
                <Bot size={22} color="#ffffff" />
                <span style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '10px',
                  height: '10px',
                  background: '#10b981',
                  borderRadius: '50%',
                  border: '2px solid #ffffff'
                }} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Asisten AI PPI Polandia <Sparkles size={14} color="#fbbf24" />
                </h4>
                <div style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 500 }}>Online • Respons Instan</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={handleReset}
                title="Reset Percakapan"
                style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.8, cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Perbesar Chat' : 'Minimalkan Chat'}
                style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.8, cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              >
                <ChevronDown size={18} style={{ transform: isMinimized ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                style={{ background: 'none', border: 'none', color: '#ffffff', opacity: 0.8, cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List Body */}
              <div
                style={{
                  flex: 1,
                  padding: '1rem',
                  overflowY: 'auto',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        gap: '0.5rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      {msg.sender === 'bot' && (
                        <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '50%', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                          <Bot size={16} />
                        </div>
                      )}

                      <div
                        style={{
                          maxWidth: '82%',
                          background: msg.sender === 'user' ? 'var(--primary)' : '#ffffff',
                          color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                          padding: '0.85rem 1.1rem',
                          borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(37, 99, 235, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                          fontSize: '0.88rem',
                          lineHeight: '1.55',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {renderFormattedText(msg.text)}

                        {/* WhatsApp Action Card Button inside Bot Response if applicable */}
                        {msg.isWhatsApp && (
                          <div style={{ marginTop: '0.85rem' }}>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#25D366',
                                color: '#ffffff',
                                padding: '0.6rem 1rem',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                textDecoration: 'none',
                                boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                              }}
                            >
                              <PhoneCall size={16} /> Chat WhatsApp Hotline (+48 795 340 632) <ExternalLink size={14} />
                            </a>
                          </div>
                        )}

                        <div style={{ fontSize: '0.68rem', opacity: 0.65, marginTop: '4px', textAlign: 'right' }}>
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.sender === 'user' && (
                        <div style={{ background: '#e2e8f0', padding: '6px', borderRadius: '50%', color: '#475569', flexShrink: 0, marginTop: '2px' }}>
                          <User size={16} />
                        </div>
                      )}
                    </div>

                    {/* Quick Question Suggestion Chips */}
                    {msg.sender === 'bot' && msg.showOptions && (
                      <div style={{ paddingLeft: '28px', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>
                          Pilihan Topik Pertanyaan:
                        </div>
                        {QA_DATABASE.map((qa) => (
                          <button
                            key={qa.id}
                            onClick={() => handleSelectQuestion(qa)}
                            style={{
                              textAlign: 'left',
                              background: '#ffffff',
                              border: '1px solid var(--primary-border)',
                              color: 'var(--primary)',
                              padding: '0.55rem 0.85rem',
                              borderRadius: '12px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--primary-light)';
                              e.currentTarget.style.transform = 'translateX(3px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#ffffff';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            {qa.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ background: 'var(--primary-light)', padding: '6px', borderRadius: '50%', color: 'var(--primary)' }}>
                      <Bot size={16} />
                    </div>
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '0.75rem 1rem',
                        borderRadius: '18px 18px 18px 4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Sparkles size={14} color="var(--primary)" /> AI sedang mengetik jawaban...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Form Footer */}
              <form
                onSubmit={handleSendCustomQuery}
                style={{
                  padding: '0.85rem 1rem',
                  background: '#ffffff',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <input
                  type="text"
                  placeholder="Ketik pertanyaan Anda di sini..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.7rem 1rem',
                    borderRadius: '50px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#f8fafc',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = '#ffffff'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  style={{
                    background: inputQuery.trim() ? 'var(--primary-gradient)' : '#cbd5e1',
                    color: '#ffffff',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputQuery.trim() ? 'pointer' : 'not-allowed',
                    transition: 'transform 0.15s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => { if (inputQuery.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};
