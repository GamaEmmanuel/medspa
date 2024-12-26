import React from 'react';
import { RevenueChart } from '../../components/revenue/RevenueChart';
import { TransactionList } from '../../components/revenue/TransactionList';
import {
  transactions,
  monthlyRevenue,
  revenueByService,
  revenueByClinic
} from '../../data/mockRevenue';

export function RevenuePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <RevenueChart
            data={monthlyRevenue}
            xKey="month"
            yKey="revenue"
            title="Monthly Revenue"
          />
        </div>
        <div className="lg:col-span-2">
          <RevenueChart
            data={revenueByService}
            xKey="service"
            yKey="revenue"
            title="Revenue by Service"
          />
        </div>
        <div>
          <RevenueChart
            data={revenueByClinic}
            xKey="clinic"
            yKey="revenue"
            title="Revenue by Clinic"
          />
        </div>
      </div>

      <TransactionList transactions={transactions} />
    </div>
  );
}