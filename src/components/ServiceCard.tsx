import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-64">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration} min</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-teal-600">${service.price}</p>
          <button
            onClick={() => onSelect(service)}
            className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-full text-sm font-medium hover:bg-teal-600 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}