import { orderBy } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import type { Service } from '../types';

export function useServices() {
  const {
    data: services,
    loading,
    error,
    add: addService,
    update: updateService,
    remove: deleteService
  } = useFirestore<Service>('services', [orderBy('createdAt')]);

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService
  };
}