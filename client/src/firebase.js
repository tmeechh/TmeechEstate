// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tmeech-estate.firebaseapp.com",
  projectId: "tmeech-estate",
  storageBucket: "tmeech-estate.appspot.com",
  messagingSenderId: "881897670490",
  appId: "1:881897670490:web:e6cdde074cbc1ad99b5563"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);