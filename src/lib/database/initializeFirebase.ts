import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { services } from '../../data/services';
import { mockClients } from '../../data/mockClients';
import { mockAppointments } from '../../data/mockAppointments';
import { transactions } from '../../data/mockRevenue';

export async function initializeFirebaseCollections() {
  try {
    // Initialize Services
    const servicesCol = collection(db, 'services');
    const existingServices = await getDocs(query(servicesCol));
    
    if (existingServices.empty) {
      for (const service of services) {
        await addDoc(servicesCol, {
          ...service,
          createdAt: new Date().toISOString()
        });
      }
      console.log('Services initialized');
    }

    // Initialize Clients
    const clientsCol = collection(db, 'clients');
    const existingClients = await getDocs(query(clientsCol));
    
    if (existingClients.empty) {
      for (const client of mockClients) {
        await addDoc(clientsCol, {
          ...client,
          createdAt: new Date().toISOString()
        });
      }
      console.log('Clients initialized');
    }

    // Initialize Appointments
    const appointmentsCol = collection(db, 'appointments');
    const existingAppointments = await getDocs(query(appointmentsCol));
    
    if (existingAppointments.empty) {
      for (const appointment of mockAppointments) {
        await addDoc(appointmentsCol, {
          ...appointment,
          createdAt: new Date().toISOString()
        });
      }
      console.log('Appointments initialized');
    }

    // Initialize Transactions
    const transactionsCol = collection(db, 'transactions');
    const existingTransactions = await getDocs(query(transactionsCol));
    
    if (existingTransactions.empty) {
      for (const transaction of transactions) {
        await addDoc(transactionsCol, {
          ...transaction,
          createdAt: new Date().toISOString()
        });
      }
      console.log('Transactions initialized');
    }

    return true;
  } catch (error) {
    console.error('Error initializing collections:', error);
    throw error;
  }
}