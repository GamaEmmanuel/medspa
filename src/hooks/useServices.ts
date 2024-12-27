import { useState } from 'react';
import { services as initialServices } from '../data/services';
import type { Service } from '../types';

export function useServices() {
  const [services, setServices] = useState<Service[]>(initialServices);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: `s${services.length + 1}`
    };
    setServices([...services, newService]);
  };

  const updateService = (updatedService: Service) => {
    setServices(services.map(service => 
      service.id === updatedService.id ? updatedService : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  return {
    services,
    addService,
    updateService,
    deleteService
  };
}