import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { mockClients } from '../../data/mockClients';
import { ClientProfile } from '../../components/staff/ClientProfile';
import { NewClientForm } from '../../components/staff/NewClientForm';
import type { ClientProfile as ClientProfileType } from '../../types/client';

export function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientProfileType | null>(null);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [clients, setClients] = useState(mockClients);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (newClientData: Omit<ClientProfileType, 'id' | 'visits' | 'conversations' | 'totalSpent'>) => {
    const newClient: ClientProfileType = {
      ...newClientData,
      id: `c${clients.length + 1}`,
      visits: [],
      conversations: [],
      totalSpent: 0
    };
    
    setClients([...clients, newClient]);
    setShowNewClientForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Clients</h2>
            <button
              onClick={() => setShowNewClientForm(true)}
              className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add New Client
            </button>
          </div>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredClients.map(client => (
            <div
              key={client.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedClient(client)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                {client.nextAppointment && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Next Appointment</p>
                    <p className="text-sm text-gray-500">
                      {client.nextAppointment.date} at {client.nextAppointment.time}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}

      {showNewClientForm && (
        <NewClientForm
          onClose={() => setShowNewClientForm(false)}
          onSubmit={handleAddClient}
        />
      )}
    </div>
  );
}