import React from 'react';
import { LogOut, User } from 'lucide-react';
import type { Staff } from '../../types/staff';

interface DashboardHeaderProps {
  user: Staff;
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-8 w-8 text-teal-500" />
            <div className="ml-3">
              <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}