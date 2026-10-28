import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const DateRangePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isHoveringDate, setIsHoveringDate] = useState(null);

  const [customTextInput, setCustomTextInput] = useState(value || '');

  useEffect(() => {
    setCustomTextInput(value || '');
  }, [value]);

  // Calendar Math
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Navigation
  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  // Date Selection Handlers
  const handleDateClick = (day) => {
    const selected = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(selected);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Complete range selection
      if (selected < startDate) {
        setEndDate(startDate);
        setStartDate(selected);
      } else {
        setEndDate(selected);
      }
    }
  };

  const handleDateMouseEnter = (day) => {
    if (startDate && !endDate) {
      setIsHoveringDate(new Date(year, month, day));
    }
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const isInRange = (day) => {
    if (!startDate) return false;
    const current = new Date(year, month, day);
    const endTarget = endDate || isHoveringDate;
    if (!endTarget) return false;

    const start = startDate < endTarget ? startDate : endTarget;
    const end = startDate < endTarget ? endTarget : startDate;

    return current >= start && current <= end;
  };

  // Format Date Range into Indonesian Text String
  const formatIndonesianDateRange = (sDate, eDate) => {
    if (!sDate) return '';
    
    if (!eDate || isSameDay(sDate, eDate)) {
      // Single Date
      return `${sDate.getDate()} ${MONTH_NAMES[sDate.getMonth()]} ${sDate.getFullYear()}`;
    }

    const start = sDate < eDate ? sDate : eDate;
    const end = sDate < eDate ? eDate : sDate;

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      // Same Month: "15 - 18 November 2025"
      return `${start.getDate()} - ${end.getDate()} ${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      // Different Month, Same Year: "28 November - 2 Desember 2025"
      return `${start.getDate()} ${MONTH_NAMES[start.getMonth()]} - ${end.getDate()} ${MONTH_NAMES[end.getMonth()]} ${start.getFullYear()}`;
    } else {
      // Different Year
      return `${start.getDate()} ${MONTH_NAMES[start.getMonth()]} ${start.getFullYear()} - ${end.getDate()} ${MONTH_NAMES[end.getMonth()]} ${end.getFullYear()}`;
    }
  };

  const handleApplyRange = () => {
    const formatted = formatIndonesianDateRange(startDate, endDate);
    if (formatted) {
      onChange(formatted);
      setCustomTextInput(formatted);
    }
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Pilih tanggal atau ketik langsung (Contoh: 15-18 November 2025)"
          value={customTextInput}
          onChange={(e) => {
            setCustomTextInput(e.target.value);
            onChange(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-secondary"
          style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.4rem', flexShrink: 0 }}
          title="Buka Kalender Rentang Tanggal"
        >
          <CalendarIcon size={18} color="var(--primary)" /> Pilih Tanggal
        </button>
      </div>

      {/* Date Range Picker Popover Modal */}
      {isOpen && (
        <div 
          className="card animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            zIndex: 9999,
            padding: '1.25rem',
            width: '320px',
            background: '#ffffff',
            boxShadow: '0 15px 35px -5px rgba(0,0,0,0.15)',
            border: '1px solid #cbd5e1'
          }}
        >
          {/* Header Month Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button type="button" onClick={prevMonth} className="btn btn-secondary btn-icon" style={{ width: '28px', height: '28px', padding: 0 }}>
              <ChevronLeft size={16} />
            </button>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
              {MONTH_NAMES[month]} {year}
            </div>
            <button type="button" onClick={nextMonth} className="btn btn-secondary btn-icon" style={{ width: '28px', height: '28px', padding: 0 }}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day Names Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center', marginBottom: '0.5rem' }}>
            {DAY_NAMES.map((d) => (
              <span key={d} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>{d}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', textAlign: 'center' }}>
            {/* Empty slots before first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days of Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const currentDate = new Date(year, month, day);

              const isStart = isSameDay(currentDate, startDate);
              const isEnd = isSameDay(currentDate, endDate);
              const inRange = isInRange(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => handleDateMouseEnter(day)}
                  style={{
                    padding: '0.45rem 0',
                    fontSize: '0.82rem',
                    fontWeight: isStart || isEnd ? 800 : 500,
                    borderRadius: isStart || isEnd ? '8px' : '4px',
                    border: 'none',
                    cursor: 'pointer',
                    background: isStart || isEnd ? 'var(--primary)' : inRange ? 'var(--primary-light)' : 'transparent',
                    color: isStart || isEnd ? '#ffffff' : inRange ? 'var(--primary)' : '#0f172a',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Selection Hint & Apply Footer */}
          <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
              {startDate ? (
                <span>Hasil: <strong>{formatIndonesianDateRange(startDate, endDate)}</strong></span>
              ) : (
                'Klik 1x untuk tanggal tunggal, atau klik 2x untuk rentang hari.'
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ flex: 1.5 }}
                onClick={handleApplyRange}
              >
                <Check size={14} /> Terapkan Tanggal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
