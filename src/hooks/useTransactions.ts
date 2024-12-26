import { orderBy } from 'firebase/firestore';
import { useFirestore } from './useFirestore';
import type { Transaction } from '../types/revenue';

export function useTransactions() {
  const {
    data: transactions,
    loading,
    error,
    add: addTransaction,
    update: updateTransaction,
    remove: deleteTransaction
  } = useFirestore<Transaction>('transactions', [orderBy('date', 'desc')]);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction
  };
}