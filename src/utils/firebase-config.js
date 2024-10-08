import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBtHQu4XEmwP6p-ADgI9LjHoMh0tYHdz84",
  authDomain: "ecommerce-d7e36.firebaseapp.com",
  projectId: "ecommerce-d7e36",
  storageBucket: "ecommerce-d7e36.appspot.com",
  messagingSenderId: "722858024510",
  appId: "1:722858024510:web:4238481e5f395957eefb6f",
  measurementId: "G-4PJ6YPM8LD"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);

export default firebaseAppConfig;
