// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "studystream-4c254.firebaseapp.com",
  projectId: "studystream-4c254",
  storageBucket: "studystream-4c254.appspot.com",
  messagingSenderId: "881095901352",
  appId: "1:881095901352:web:5b92a193bc60ec95f6829d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()