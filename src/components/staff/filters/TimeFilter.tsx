import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export type TimePeriod = 'today' | 'yesterday' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

interface TimeFilterProps {
  selected: TimePeriod;
  onSelect: (period: TimePeriod) => void;
  startDate?: Date;
  endDate?: Date;
  onDateChange?: (start: Date, end: Date) => void;
}

export function TimeFilter({ selected, onSelect, startDate, endDate, onDateChange }: TimeFilterProps) {
  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-2">
        {periods.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected === value
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {selected === 'custom' && (
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              value={startDate?.toISOString().split('T')[0]}
              onChange={(e) => {
                const newStart = new Date(e.target.value);
                onDateChange?.(newStart, endDate || new Date());
              }}
              className="px-3 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="date"
              value={endDate?.toISOString().split('T')[0]}
              onChange={(e) => {
                const newEnd = new Date(e.target.value);
                onDateChange?.(startDate || new Date(), newEnd);
              }}
              className="px-3 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}