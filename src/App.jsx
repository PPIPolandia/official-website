import React, { useState } from 'react';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { api } from './api';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AdminModal } from './components/AdminModal';
import { AIChatWidget } from './components/AIChatWidget';

import { Home } from './pages/Home';
import { DivisiPage } from './pages/Divisi';
import { ProgramKerjaPage } from './pages/ProgramKerja';
import { BeritaPage } from './pages/Berita';
import { PengurusPage } from './pages/Pengurus';
import { KontakPage } from './pages/Kontak';
import { AdminDashboard } from './pages/AdminDashboard';

export function MainApp() {
  const { refreshServerData } = useAppData();
  const [activePage, setActivePage] = useState('beranda');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  
  // Shared state between Divisi and Program Kerja pages
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState('Semua');

  // Shared state for Berita article detail reader modal
  const [selectedNewsModal, setSelectedNewsModal] = useState(null);

  const handleReadNews = (newsItem) => {
    setSelectedNewsModal(newsItem);
    setActivePage('berita');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = async (userData) => {
    setAdminUser(userData || {
      name: 'Admin Utama PPI Polandia',
      email: '',
      picture: '',
      loginType: 'passcode'
    });
    await refreshServerData();
    setIsAdminModalOpen(false);
    setActivePage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Show Navbar & Footer only on Public pages */}
      {activePage !== 'admin' && (
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      )}

      {/* Main Page Rendering */}
      <main style={{ flex: 1 }}>
        {activePage === 'beranda' && (
          <Home 
            setActivePage={setActivePage}
            setSelectedDivisionFilter={setSelectedDivisionFilter}
            onReadNews={handleReadNews}
          />
        )}

        {activePage === 'divisi' && (
          <DivisiPage 
            setActivePage={setActivePage}
            setSelectedDivisionFilter={setSelectedDivisionFilter}
          />
        )}

        {activePage === 'programKerja' && (
          <ProgramKerjaPage 
            selectedDivisionFilter={selectedDivisionFilter}
            setSelectedDivisionFilter={setSelectedDivisionFilter}
          />
        )}

        {activePage === 'berita' && (
          <BeritaPage 
            selectedNewsModal={selectedNewsModal}
            setSelectedNewsModal={setSelectedNewsModal}
          />
        )}

        {activePage === 'pengurus' && (
          <PengurusPage />
        )}

        {activePage === 'kontak' && (
          <KontakPage />
        )}

        {activePage === 'admin' && (
          <AdminDashboard 
            adminUser={adminUser}
            onExitAdmin={() => {
              api.logout();
              setAdminUser(null);
              setActivePage('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {activePage !== 'admin' && (
        <Footer 
          setActivePage={setActivePage}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      )}

      {/* Toast Notification Container */}
      <Toast />

      {/* Floating AI Assistant Chatbot Widget */}
      {activePage !== 'admin' && <AIChatWidget />}

      {/* Admin Passcode Modal */}
      <AdminModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppDataProvider>
        <MainApp />
      </AppDataProvider>
    </ErrorBoundary>
  );
}
