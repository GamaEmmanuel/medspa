import React from 'react';
import type { Appointment } from '../../../types';

interface TimeSlotProps {
  time: string;
  appointment?: Appointment;
  onClick: () => void;
}

export function TimeSlot({ time, appointment, onClick }: TimeSlotProps) {
  if (!appointment) {
    return (
      <div
        onClick={onClick}
        className="h-20 border-b border-r p-2 hover:bg-gray-50 cursor-pointer"
      >
        <span className="text-sm text-gray-400">{time}</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="h-20 border-b border-r p-2 bg-teal-50 hover:bg-teal-100 cursor-pointer"
    >
      <div className="text-sm font-medium text-teal-700">{appointment.service.name}</div>
      <div className="text-sm text-teal-600">{appointment.name}</div>
      <div className="text-xs text-teal-500">{time}</div>
    </div>
  );
}