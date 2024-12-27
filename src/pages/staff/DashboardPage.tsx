import React, { useState } from 'react';
import { StatsOverview } from '../../components/staff/StatsOverview';
import { AppointmentList } from '../../components/staff/AppointmentList';
import { TimeFilter, TimePeriod } from '../../components/staff/filters/TimeFilter';
import { mockAppointments } from '../../data/mockAppointments';
import { getDateRange } from '../../lib/utils/dates';

export function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('today');
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();

  const dateRange = timePeriod === 'custom' && customStartDate && customEndDate
    ? { start: customStartDate, end: customEndDate }
    : getDateRange(timePeriod);

  // Filter appointments based on date range
  const upcomingAppointments = mockAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointment.status === 'upcoming' &&
      appointmentDate >= dateRange.start &&
      appointmentDate <= dateRange.end
    );
  });

  // Calculate stats based on date range
  const mockStats = {
    totalAppointments: upcomingAppointments.length,
    upcomingAppointments: upcomingAppointments.length,
    totalRevenue: upcomingAppointments.reduce((sum, apt) => sum + apt.service.price, 0),
    popularServices: [
      { name: 'Hydrafacial', count: 45 },
      { name: 'Botox', count: 32 },
      { name: 'LED Therapy', count: 28 }
    ]
  };

  const handleCustomDateChange = (start: Date, end: Date) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
  };

  return (
    <div className="space-y-6">
      <TimeFilter
        selected={timePeriod}
        onSelect={setTimePeriod}
        startDate={customStartDate}
        endDate={customEndDate}
        onDateChange={handleCustomDateChange}
      />
      <StatsOverview stats={mockStats} />
      <AppointmentList appointments={upcomingAppointments} />
    </div>
  );
}