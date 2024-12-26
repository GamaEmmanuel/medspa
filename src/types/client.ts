export interface Conversation {
  id: string;
  date: string;
  type: 'chat' | 'email' | 'phone' | 'in-person';
  summary: string;
  details: string;
  staff: string;
}

export interface AccountBalance {
  current: number;
  pending: number;
  lastPayment: {
    amount: number;
    date: string;
    method: string;
  };
}

export type PriceTier = 'standard' | 'preferred' | 'vip';

export interface ClientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  visits: {
    date: string;
    service: string;
    notes?: string;
  }[];
  nextAppointment?: {
    date: string;
    time: string;
    service: string;
  };
  medicalHistory?: string;
  preferences?: string;
  conversations: Conversation[];
  accountBalance: AccountBalance;
  priceTier: PriceTier;
  memberSince: string;
  totalSpent: number;
}