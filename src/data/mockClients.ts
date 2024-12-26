import type { ClientProfile } from '../types/client';

export const mockClients: ClientProfile[] = [
  {
    id: 'c1',
    name: 'Jane Smith',
    age: 35,
    gender: 'female',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001'
    },
    visits: [
      {
        date: '2024-03-15',
        service: 'Hydrafacial',
        notes: 'Sensitive skin, used gentle settings'
      },
      {
        date: '2024-02-01',
        service: 'LED Therapy',
        notes: 'Focused on acne-prone areas'
      }
    ],
    nextAppointment: {
      date: '2024-04-01',
      time: '10:00',
      service: 'Botox'
    },
    medicalHistory: 'No allergies, sensitive skin',
    preferences: 'Prefers afternoon appointments',
    conversations: [
      {
        id: 'conv1',
        date: '2024-03-15',
        type: 'in-person',
        summary: 'Treatment consultation',
        details: 'Discussed treatment plan and skin concerns. Recommended monthly Hydrafacial.',
        staff: 'Dr. Sarah Johnson'
      },
      {
        id: 'conv2',
        date: '2024-03-10',
        type: 'phone',
        summary: 'Appointment rescheduling',
        details: 'Client called to reschedule appointment due to work conflict.',
        staff: 'Emma Davis'
      }
    ],
    accountBalance: {
      current: 0,
      pending: 399,
      lastPayment: {
        amount: 199,
        date: '2024-03-15',
        method: 'Credit Card'
      }
    },
    priceTier: 'preferred',
    memberSince: '2023-01-15',
    totalSpent: 2499
  },
  {
    id: 'c2',
    name: 'Michael Johnson',
    age: 42,
    gender: 'male',
    email: 'michael.j@example.com',
    phone: '(555) 987-6543',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90002'
    },
    visits: [
      {
        date: '2024-03-10',
        service: 'Botox',
        notes: 'First-time treatment'
      }
    ],
    nextAppointment: {
      date: '2024-04-10',
      time: '14:00',
      service: 'Hydrafacial'
    },
    medicalHistory: 'No significant medical history',
    conversations: [
      {
        id: 'conv3',
        date: '2024-03-10',
        type: 'in-person',
        summary: 'Initial consultation',
        details: 'First visit. Discussed treatment options and expectations.',
        staff: 'Dr. Sarah Johnson'
      }
    ],
    accountBalance: {
      current: 399,
      pending: 0,
      lastPayment: {
        amount: 399,
        date: '2024-03-10',
        method: 'Debit Card'
      }
    },
    priceTier: 'standard',
    memberSince: '2024-03-10',
    totalSpent: 399
  }
];