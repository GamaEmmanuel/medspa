import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Service } from '../types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesQuery = query(collection(db, 'services'), orderBy('createdAt'));
      const snapshot = await getDocs(servicesQuery);
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      setServices(servicesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'services'), {
        ...service,
        createdAt: new Date().toISOString()
      });
      const newService = { id: docRef.id, ...service };
      setServices([...services, newService]);
      return newService;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add service');
      throw err;
    }
  };

  const updateService = async (updatedService: Service) => {
    try {
      const docRef = doc(db, 'services', updatedService.id);
      await updateDoc(docRef, {
        ...updatedService,
        updatedAt: new Date().toISOString()
      });
      setServices(services.map(service => 
        service.id === updatedService.id ? updatedService : service
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
      throw err;
    }
  };

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService
  };
}