import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnFGigUIPx4vy6CSnWwDIfh6wE38nYWpQ",
  authDomain: "iq-insight.firebaseapp.com",
  projectId: "iq-insight",
  storageBucket: "iq-insight.firebasestorage.app",
  messagingSenderId: "792361586470",
  appId: "1:792361586470:web:0624c2c53b2717d78f7be7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
