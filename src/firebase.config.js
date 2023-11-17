// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcSOtGHkdNaq6nWGe7Nw-Hwcb-HdmyjCI",
  authDomain: "real-state-app-re0fb.firebaseapp.com",
  projectId: "real-state-app-re0fb",
  storageBucket: "real-state-app-re0fb.appspot.com",
  messagingSenderId: "669350576270",
  appId: "1:669350576270:web:21ef440f2d140286abc9df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
//const auth = getAuth(app);