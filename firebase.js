import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc2W9qVqXJi0uVL0xBNjNOMJr3tkzDylU",
  authDomain: "fir-auth-app-ed08a.firebaseapp.com",
  projectId: "fir-auth-app-ed08a",
  storageBucket: "fir-auth-app-ed08a.firebasestorage.app",
  messagingSenderId: "25776675296",
  appId: "1:25776675296:web:bd5b3a1ea254ef7e537385",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);