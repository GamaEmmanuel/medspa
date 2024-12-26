import { APPOINTMENT_STATUS } from '../lib/constants';
import type { Appointment } from '../types';

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    service: { 
      id: '1', 
      name: 'Hydrafacial', 
      duration: 60, 
      price: 199, 
      description: 'Deep cleansing facial', 
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881' 
    },
    date: '2024-03-20',
    time: '09:00',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0123',
    notes: 'First time client',
    status: APPOINTMENT_STATUS.UPCOMING
  },
  {
    id: '2',
    service: { 
      id: '2', 
      name: 'Botox', 
      duration: 45, 
      price: 399, 
      description: 'Anti-aging treatment', 
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c' 
    },
    date: '2024-03-20',
    time: '10:00',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '555-0124',
    status: APPOINTMENT_STATUS.UPCOMING
  },
  {
    id: '3',
    service: { 
      id: '3', 
      name: 'LED Therapy', 
      duration: 30, 
      price: 149, 
      description: 'Light therapy treatment', 
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9' 
    },
    date: '2024-03-19',
    time: '14:00',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    phone: '555-0125',
    status: APPOINTMENT_STATUS.COMPLETED
  },
  {
    id: '4',
    service: { 
      id: '1', 
      name: 'Hydrafacial', 
      duration: 60, 
      price: 199, 
      description: 'Deep cleansing facial', 
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881' 
    },
    date: '2024-03-19',
    time: '15:00',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '555-0126',
    status: APPOINTMENT_STATUS.CANCELLED
  }
];