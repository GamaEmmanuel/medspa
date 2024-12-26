import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type Query,
  type DocumentData,
  type CollectionReference
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirestore<T extends DocumentData>(
  collectionName: string,
  queryConstraints: Array<Parameters<typeof query>[1]> = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectionRef = collection(db, collectionName) as CollectionReference<T>;

  useEffect(() => {
    fetchData();
  }, [collectionName, JSON.stringify(queryConstraints)]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const q = query(collectionRef, ...queryConstraints);
      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
      setData(fetchedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const add = async (item: Omit<T, 'id'>) => {
    try {
      const docRef = await addDoc(collectionRef, {
        ...item,
        createdAt: new Date().toISOString()
      });
      const newItem = { id: docRef.id, ...item } as T;
      setData([...data, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      throw err;
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...item,
        updatedAt: new Date().toISOString()
      });
      setData(data.map(d => d.id === id ? { ...d, ...item } : d));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setData(data.filter(d => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    refresh: fetchData
  };
}