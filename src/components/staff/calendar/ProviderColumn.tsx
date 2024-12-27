import React from 'react';
import { TimeSlot } from './TimeSlot';
import type { Staff } from '../../../types/staff';
import type { Appointment } from '../../../types';
import { TIME_SLOTS } from '../../../lib/constants';

interface ProviderColumnProps {
  provider: Staff;
  appointments: Appointment[];
  onTimeSlotClick: (time: string, provider: Staff) => void;
}

export function ProviderColumn({ provider, appointments, onTimeSlotClick }: ProviderColumnProps) {
  return (
    <div className="flex-1">
      <div className="h-16 border-b border-r p-4 bg-gray-50">
        <div className="font-medium text-gray-700">{provider.name}</div>
        <div className="text-sm text-gray-500 capitalize">{provider.role}</div>
      </div>
      <div>
        {TIME_SLOTS.map((time) => {
          const appointment = appointments.find(
            (apt) => apt.time === time
          );
          
          return (
            <TimeSlot
              key={time}
              time={time}
              appointment={appointment}
              onClick={() => onTimeSlotClick(time, provider)}
            />
          );
        })}
      </div>
    </div>
  );
}