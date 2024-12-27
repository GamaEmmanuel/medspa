import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/staff/LoginForm';
import { DashboardHeader } from '../components/staff/DashboardHeader';
import { Navigation } from '../components/staff/Navigation';
import { DashboardPage } from './staff/DashboardPage';
import { AppointmentsPage } from './staff/AppointmentsPage';
import { RevenuePage } from './staff/RevenuePage';
import { ClientsPage } from './staff/ClientsPage';
import { ServicesPage } from './staff/ServicesPage';
import { staffMembers } from '../data/mockStaff';
import { ROUTES } from '../lib/constants';
import { saveAuthToStorage, clearAuthFromStorage, getStoredAuth } from '../lib/utils/auth';
import type { Staff, AuthState } from '../types/staff';

function StaffPortalContent({ user, onLogout }: { user: Staff; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader user={user} onLogout={onLogout} />
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="home" element={<DashboardPage />} />
            <Route path="calendar" element={<AppointmentsPage />} />
            <Route path="sales" element={<RevenuePage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export function StaffPortal() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (storedAuth) {
      setAuth(storedAuth);
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const handleLogin = (email: string, password: string, keepSignedIn: boolean) => {
    const user = staffMembers.find(staff => staff.email === email);
    
    if (user && password === 'password') {
      const newAuth = {
        isAuthenticated: true,
        user,
        loading: false,
        error: null
      };
      setAuth(newAuth);
      saveAuthToStorage(newAuth, keepSignedIn);
    } else {
      setAuth(prev => ({
        ...prev,
        error: 'Invalid email or password',
        loading: false
      }));
    }
  };

  const handleLogout = () => {
    clearAuthFromStorage();
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
    navigate(ROUTES.HOME);
  };

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated || !auth.user) {
    return <LoginForm onLogin={handleLogin} error={auth.error || undefined} />;
  }

  return <StaffPortalContent user={auth.user} onLogout={handleLogout} />;
}