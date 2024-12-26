import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Transaction } from '../types/revenue';

export function usePayments() {
  const [payments, setPayments] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const paymentsQuery = query(collection(db, 'payments'), orderBy('date', 'desc'));
      const snapshot = await getDocs(paymentsQuery);
      const paymentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      setPayments(paymentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async (payment: Omit<Transaction, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'payments'), {
        ...payment,
        createdAt: new Date().toISOString()
      });
      const newPayment = { id: docRef.id, ...payment };
      setPayments([newPayment, ...payments]);
      return newPayment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payment');
      throw err;
    }
  };

  const updatePayment = async (updatedPayment: Transaction) => {
    try {
      const docRef = doc(db, 'payments', updatedPayment.id);
      await updateDoc(docRef, {
        ...updatedPayment,
        updatedAt: new Date().toISOString()
      });
      setPayments(payments.map(payment => 
        payment.id === updatedPayment.id ? updatedPayment : payment
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update payment');
      throw err;
    }
  };

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment
  };
}