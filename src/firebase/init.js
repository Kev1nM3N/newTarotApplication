// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tarotreactapp.firebaseapp.com",
  projectId: "tarotreactapp",
  storageBucket: "tarotreactapp.appspot.com",
  messagingSenderId: "901880967652",
  appId: "1:901880967652:web:4cf90771ac2fb3f5d417f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();