import { orderBy } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import type { ClientProfile } from '../types/client';

export function useClients() {
  const {
    data: clients,
    loading,
    error,
    add: addClient,
    update: updateClient,
    remove: deleteClient
  } = useFirestore<ClientProfile>('clients', [orderBy('memberSince', 'desc')]);

  return {
    clients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient
  };
}