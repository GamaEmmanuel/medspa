import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export function StaffPortal() {
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
    
    if (user && password === 'password') { // In production, use proper password hashing
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
  };

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={auth.error || undefined} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader user={auth.user as Staff} onLogout={handleLogout} />
        <Navigation />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route path={ROUTES.STAFF.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.STAFF.APPOINTMENTS} element={<AppointmentsPage />} />
              <Route path={ROUTES.STAFF.REVENUE} element={<RevenuePage />} />
              <Route path={ROUTES.STAFF.CLIENTS} element={<ClientsPage />} />
              <Route path={ROUTES.STAFF.SERVICES} element={<ServicesPage />} />
              <Route path={ROUTES.STAFF.ROOT} element={<Navigate to={ROUTES.STAFF.DASHBOARD} replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}