import React from 'react';
import { LayoutDashboard, Calendar, DollarSign, Users, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { 
      path: ROUTES.STAFF.DASHBOARD, 
      icon: LayoutDashboard, 
      label: 'Home' 
    },
    { 
      path: ROUTES.STAFF.APPOINTMENTS, 
      icon: Calendar, 
      label: 'Calendar' 
    },
    {
      path: ROUTES.STAFF.REVENUE,
      icon: DollarSign,
      label: 'Sales'
    },
    {
      path: ROUTES.STAFF.CLIENTS,
      icon: Users,
      label: 'Clients'
    },
    {
      path: ROUTES.STAFF.SERVICES,
      icon: Briefcase,
      label: 'Services'
    }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {links.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-3 py-4 text-sm font-medium ${
                location.pathname === path
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}