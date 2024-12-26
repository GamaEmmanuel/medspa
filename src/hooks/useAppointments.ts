import { orderBy } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import type { Appointment } from '../types';

export function useAppointments() {
  const {
    data: appointments,
    loading,
    error,
    add: addAppointment,
    update: updateAppointment,
    remove: deleteAppointment
  } = useFirestore<Appointment>('appointments', [orderBy('date', 'desc'), orderBy('time', 'desc')]);

  return {
    appointments,
    loading,
    error,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
}