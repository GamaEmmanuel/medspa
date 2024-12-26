import React from 'react';
import { StatsOverview } from '../../components/staff/StatsOverview';
import { AppointmentList } from '../../components/staff/AppointmentList';
import { mockAppointments } from '../../data/mockAppointments';

const mockStats = {
  totalAppointments: 150,
  upcomingAppointments: 25,
  totalRevenue: 28500,
  popularServices: [
    { name: 'Hydrafacial', count: 45 },
    { name: 'Botox', count: 32 },
    { name: 'LED Therapy', count: 28 }
  ]
};

export function DashboardPage() {
  const upcomingAppointments = mockAppointments.filter(
    appointment => appointment.status === 'upcoming'
  );

  return (
    <div className="space-y-6">
      <StatsOverview stats={mockStats} />
      <AppointmentList appointments={upcomingAppointments} />
    </div>
  );
}