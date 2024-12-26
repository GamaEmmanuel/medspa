import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Calendar, Clock, FileText, MessageSquare, CreditCard, Award } from 'lucide-react';
import type { ClientProfile as ClientProfileType } from '../../types/client';

interface ClientProfileProps {
  client: ClientProfileType;
  onClose: () => void;
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm rounded-lg ${
        isActive
          ? 'bg-teal-100 text-teal-800'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

export function ClientProfile({ client, onClose }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'conversations' | 'billing'>('info');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <div className="flex items-center mt-1">
                <Award className="h-5 w-5 text-teal-500 mr-2" />
                <span className="text-sm font-medium capitalize">{client.priceTier} Member</span>
                <span className="text-sm text-gray-500 ml-2">
                  since {formatDate(client.memberSince)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex space-x-4">
            <Tab
              label="Information"
              isActive={activeTab === 'info'}
              onClick={() => setActiveTab('info')}
            />
            <Tab
              label="Conversations"
              isActive={activeTab === 'conversations'}
              onClick={() => setActiveTab('conversations')}
            />
            <Tab
              label="Billing"
              isActive={activeTab === 'billing'}
              onClick={() => setActiveTab('billing')}
            />
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600">Age: {client.age}</p>
                    <p className="text-gray-600">Gender: {client.gender}</p>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                      <p className="text-gray-600">
                        {client.address.street}<br />
                        {client.address.city}, {client.address.state} {client.address.zipCode}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-600">{client.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-600">{client.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Next Appointment</h3>
                  {client.nextAppointment ? (
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-teal-500 mr-2" />
                        <p className="text-teal-700">{client.nextAppointment.date}</p>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-teal-500 mr-2" />
                        <p className="text-teal-700">{client.nextAppointment.time}</p>
                      </div>
                      <p className="text-teal-700">{client.nextAppointment.service}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No upcoming appointments</p>
                  )}
                </div>
              </div>

              {/* Visit History */}
              <div>
                <h3 className="text-lg font-medium mb-4">Visit History</h3>
                <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                  {client.visits.map((visit, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{visit.service}</p>
                          <p className="text-sm text-gray-500">{formatDate(visit.date)}</p>
                        </div>
                        {visit.notes && (
                          <div className="flex items-start">
                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                            <p className="text-sm text-gray-600">{visit.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="space-y-4">
              {client.conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-teal-500 mr-2" />
                      <span className="font-medium">{conversation.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(conversation.date)}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 mb-1">{conversation.summary}</p>
                  <p className="text-gray-600 text-sm mb-2">{conversation.details}</p>
                  <p className="text-sm text-gray-500">Staff: {conversation.staff}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Current Balance</h4>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(client.accountBalance.current)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Pending Charges</h4>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(client.accountBalance.pending)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Total Spent</h4>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(client.totalSpent)}
                  </p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium mb-3">Last Payment</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">
                      {client.accountBalance.lastPayment.method}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(client.accountBalance.lastPayment.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(client.accountBalance.lastPayment.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-teal-800">Price Tier Benefits</h4>
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium capitalize">
                    {client.priceTier}
                  </span>
                </div>
                <ul className="text-sm text-teal-700 space-y-1">
                  {client.priceTier === 'preferred' && (
                    <>
                      <li>• 10% discount on all services</li>
                      <li>• Priority booking</li>
                      <li>• Quarterly complimentary consultation</li>
                    </>
                  )}
                  {client.priceTier === 'vip' && (
                    <>
                      <li>• 20% discount on all services</li>
                      <li>• VIP priority booking</li>
                      <li>• Monthly complimentary consultation</li>
                      <li>• Exclusive access to new treatments</li>
                    </>
                  )}
                  {client.priceTier === 'standard' && (
                    <>
                      <li>• Standard pricing</li>
                      <li>• Regular booking privileges</li>
                      <li>• Semi-annual consultation</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}