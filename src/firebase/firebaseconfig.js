// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc2W9qVqXJi0uVL0xBNjNOMJr3tkzDylU",
  authDomain: "fir-auth-app-ed08a.firebaseapp.com",
  projectId: "fir-auth-app-ed08a",
  storageBucket: "fir-auth-app-ed08a.firebasestorage.app",
  messagingSenderId: "25776675296",
  appId: "1:25776675296:web:bd5b3a1ea254ef7e537385",
  measurementId: "G-WKK7LR6SD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
