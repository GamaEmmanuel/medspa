export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'practitioner' | 'receptionist';
  specialties?: string[];
}

export interface ClinicStats {
  totalAppointments: number;
  upcomingAppointments: number;
  totalRevenue: number;
  popularServices: Array<{ name: string; count: number }>;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: Staff | null;
  loading: boolean;
  error: string | null;
}