import { APPOINTMENT_STATUS } from '../lib/constants';

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  image: string;
}

export interface Appointment {
  id: string;
  service: Service;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: typeof APPOINTMENT_STATUS[keyof typeof APPOINTMENT_STATUS];
}