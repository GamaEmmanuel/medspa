export interface Transaction {
  id: string;
  date: string;
  clientName: string;
  service: string;
  amount: number;
  paymentMethod: string;
  clinic: string;
  status: 'completed' | 'refunded';
}

export interface RevenueByService {
  service: string;
  revenue: number;
  transactions: number;
}

export interface RevenueByClinic {
  clinic: string;
  revenue: number;
  transactions: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  transactions: number;
}