import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDz1kDeEfTYXazVjdLXm82VI-V3pMQd3_g",
  authDomain: "coingeckoapi-eaa70.firebaseapp.com",
  projectId: "coingeckoapi-eaa70",
  storageBucket: "coingeckoapi-eaa70.firebasestorage.app",
  messagingSenderId: "1057764057610",
  appId: "1:1057764057610:web:0566fa3bae6c900702f5f3",
  measurementId: "G-8YZQCPCBQ8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };