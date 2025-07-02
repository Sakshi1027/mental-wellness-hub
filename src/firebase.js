// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvomtMD7PNgQCOK5X-0o1N5NPkbIW-34g",
  authDomain: "mentalwelnesshub.firebaseapp.com",
  projectId: "mentalwelnesshub",
  storageBucket: "mentalwelnesshub.firebasestorage.app",
  messagingSenderId: "232732521367",
  appId: "1:232732521367:web:102b838bb99a78362b0ad2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; 