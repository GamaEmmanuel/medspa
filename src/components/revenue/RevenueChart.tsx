import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CHART_COLORS } from '../../lib/constants';

interface RevenueChartProps {
  data: Array<{ [key: string]: string | number }>;
  xKey: string;
  yKey: string;
  title: string;
}

export function RevenueChart({ data, xKey, yKey, title }: RevenueChartProps) {
  const formatYAxis = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis tickFormatter={formatYAxis} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar dataKey={yKey} fill={CHART_COLORS.primary} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}