import React, { useState } from 'react';
import { CalendarHeader } from '../../components/staff/calendar/CalendarHeader';
import { ProviderColumn } from '../../components/staff/calendar/ProviderColumn';
import { mockAppointments } from '../../data/mockAppointments';
import { staffMembers } from '../../data/mockStaff';
import { TIME_SLOTS } from '../../lib/constants';
import type { Staff } from '../../types/staff';

export function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const providers = staffMembers.filter(
    staff => staff.role === 'practitioner' || staff.role === 'admin'
  );

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleTimeSlotClick = (time: string, provider: Staff) => {
    console.log(`Clicked ${time} for ${provider.name}`);
    // TODO: Open appointment creation modal
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <CalendarHeader
          currentDate={currentDate}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onToday={handleToday}
        />
        
        <div className="flex border-t border-l">
          {/* Time column */}
          <div className="w-20 flex-shrink-0">
            <div className="h-16 border-b border-r p-4 bg-gray-50">
              <span className="text-sm font-medium text-gray-500">Time</span>
            </div>
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="h-20 border-b border-r p-2 bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-500">{time}</span>
              </div>
            ))}
          </div>

          {/* Provider columns */}
          {providers.map((provider) => (
            <ProviderColumn
              key={provider.id}
              provider={provider}
              appointments={mockAppointments.filter(
                apt => apt.date === currentDate.toISOString().split('T')[0]
              )}
              onTimeSlotClick={(time) => handleTimeSlotClick(time, provider)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}