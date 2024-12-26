import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ServicesList } from '../../components/staff/services/ServicesList';
import { ServiceForm } from '../../components/staff/services/ServiceForm';
import { useServices } from '../../hooks/useServices';
import type { Service } from '../../types';

export function ServicesPage() {
  const { services, addService, updateService, deleteService } = useServices();
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleSubmit = (service: Omit<Service, 'id'>) => {
    if (editingService) {
      updateService({ ...service, id: editingService.id });
    } else {
      addService(service);
    }
    setShowServiceForm(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Services Management</h2>
        <button
          onClick={() => setShowServiceForm(true)}
          className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>

      <ServicesList
        services={services}
        onEdit={(service) => {
          setEditingService(service);
          setShowServiceForm(true);
        }}
        onDelete={deleteService}
      />

      {showServiceForm && (
        <ServiceForm
          service={editingService}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}