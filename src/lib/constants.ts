// Route constants
export const ROUTES = {
  HOME: '/',
  STAFF: {
    ROOT: '/staff',
    DASHBOARD: '/staff/home',
    APPOINTMENTS: '/staff/calendar',
    REVENUE: '/staff/sales',
    CLIENTS: '/staff/clients',
    SERVICES: '/staff/services'
  },
} as const;

// Appointment status constants
export const APPOINTMENT_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Time slots
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00',
] as const;

// Chart colors
export const CHART_COLORS = {
  primary: '#14b8a6',
  secondary: '#0d9488',
  tertiary: '#0f766e',
  background: '#f3f4f6',
} as const;