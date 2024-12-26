import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import type { Appointment } from '../../types';

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{appointment.name}</p>
                  <p className="text-sm text-gray-500">{appointment.service.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {appointment.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {appointment.time}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}