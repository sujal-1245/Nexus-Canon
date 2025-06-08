// src/firebase.js

// Import only what's needed
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config (from Firebase console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nexus-canon.firebaseapp.com",
  projectId: "nexus-canon",
  storageBucket: "nexus-canon.appspot.com",
  messagingSenderId: "789989648470",
  appId: "1:789989648470:web:7fc813cfda0161420573f7",
  measurementId: "G-3X3Q27MGRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional (only works in browser, not SSR or dev environments without HTTPS)
const analytics = getAnalytics(app);

// Export Firebase Auth and Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, analytics };
