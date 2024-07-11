
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "meech-estatev2.firebaseapp.com",
  projectId: "meech-estatev2",
  storageBucket: "meech-estatev2.appspot.com",
  messagingSenderId: "259189302347",
  appId: "1:259189302347:web:63cc090a76914b5ff259ce"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);