import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
}

export function CalendarHeader({ currentDate, onPrevDay, onNextDay, onToday }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevDay}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onNextDay}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-md"
          >
            Today
          </button>
        </div>
      </div>
    </div>
  );
}