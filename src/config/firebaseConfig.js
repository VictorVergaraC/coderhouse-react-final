import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAD97abE8h-dD8g9TisZE3uXpwhJpOEzxE",
  authDomain: "coderhouse-react-60995.firebaseapp.com",
  projectId: "coderhouse-react-60995",
  storageBucket: "coderhouse-react-60995.appspot.com",
  messagingSenderId: "324215993382",
  appId: "1:324215993382:web:9ee3269452340c6d9962e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const DATABASE = getFirestore(app)