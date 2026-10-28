import React from 'react';
import { useAppData } from '../context/AppDataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useAppData();

  if (!toast) return null;

  const isWarning = toast.type === 'warning';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        background: isWarning ? '#fffbe6' : 'var(--primary-light)',
        border: `1.5px solid ${isWarning ? '#ffe58f' : 'var(--primary-border)'}`,
        color: isWarning ? '#d48806' : 'var(--primary)',
        padding: '12px 20px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '600',
        fontSize: '0.92rem',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      {isWarning ? (
        <AlertCircle size={20} color="#d48806" />
      ) : (
        <CheckCircle2 size={20} color="var(--primary)" />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
