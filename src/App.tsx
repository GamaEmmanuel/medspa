import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StaffPortal } from './pages/StaffPortal';
import { LandingPage } from './pages/LandingPage';
import { ROUTES } from './lib/constants';
import { testSupabaseConnection } from './lib/supabase/utils';

function App() {
  useEffect(() => {
    // Test Supabase connection on app load
    testSupabaseConnection();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path="/staff/*" element={<StaffPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;