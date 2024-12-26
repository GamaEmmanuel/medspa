import React from 'react';
import { Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';
import type { ClinicStats } from '../../types/staff';

interface StatsOverviewProps {
  stats: ClinicStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-teal-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Appointments</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalAppointments}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-teal-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Upcoming</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.upcomingAppointments}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-teal-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-teal-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Top Service</p>
            <p className="text-2xl font-semibold text-gray-900">
              {stats.popularServices[0]?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}