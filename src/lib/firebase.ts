import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsMfyVms-oT10wrvxsIgLkxqds5XkUFOk",
  authDomain: "medspa-c3d9c.firebaseapp.com",
  projectId: "medspa-c3d9c",
  storageBucket: "medspa-c3d9c.firebasestorage.app",
  messagingSenderId: "842864533624",
  appId: "1:842864533624:web:024c76675c292ff6c10d8d"
};

// Initialize Firebase first
const app = initializeApp(firebaseConfig);

// Then initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };