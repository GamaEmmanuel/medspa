import type { Transaction, RevenueByService, RevenueByClinic, MonthlyRevenue } from '../types/revenue';

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '2024-03-20',
    clientName: 'Jane Smith',
    service: 'Hydrafacial',
    amount: 199,
    paymentMethod: 'Credit Card',
    clinic: 'Downtown Clinic',
    status: 'completed'
  },
  {
    id: 't2',
    date: '2024-03-20',
    clientName: 'Michael Johnson',
    service: 'Botox',
    amount: 399,
    paymentMethod: 'Debit Card',
    clinic: 'Westside Location',
    status: 'completed'
  },
  {
    id: 't3',
    date: '2024-03-19',
    clientName: 'Sarah Davis',
    service: 'LED Therapy',
    amount: 149,
    paymentMethod: 'Cash',
    clinic: 'Downtown Clinic',
    status: 'completed'
  },
  {
    id: 't4',
    date: '2024-03-19',
    clientName: 'Emma Wilson',
    service: 'Hydrafacial',
    amount: 199,
    paymentMethod: 'Credit Card',
    clinic: 'Eastside Branch',
    status: 'refunded'
  }
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 25000, transactions: 125 },
  { month: 'Feb', revenue: 28000, transactions: 140 },
  { month: 'Mar', revenue: 32000, transactions: 160 },
  { month: 'Apr', revenue: 30000, transactions: 150 },
  { month: 'May', revenue: 35000, transactions: 175 },
  { month: 'Jun', revenue: 38000, transactions: 190 }
];

export const revenueByService: RevenueByService[] = [
  { service: 'Hydrafacial', revenue: 15000, transactions: 75 },
  { service: 'Botox', revenue: 25000, transactions: 62 },
  { service: 'LED Therapy', revenue: 8000, transactions: 53 },
  { service: 'Chemical Peel', revenue: 12000, transactions: 40 },
  { service: 'Microdermabrasion', revenue: 10000, transactions: 50 }
];

export const revenueByClinic: RevenueByClinic[] = [
  { clinic: 'Downtown Clinic', revenue: 28000, transactions: 140 },
  { clinic: 'Westside Location', revenue: 22000, transactions: 110 },
  { clinic: 'Eastside Branch', revenue: 20000, transactions: 100 }
];