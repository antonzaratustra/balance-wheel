// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBd7CvFe-ZQE1gebnQvY9TDzKOX-E_E4QM",
  authDomain: "mentorist-ai.firebaseapp.com",
  projectId: "mentorist-ai",
  storageBucket: "mentorist-ai.firebasestorage.app",
  messagingSenderId: "803934103485",
  appId: "1:803934103485:web:47814d1df581a9255014d4",
  measurementId: "G-Q7RPLCNV7B"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase App:", app);
console.log("Firebase Analytics:", analytics);
console.log("Firebase Auth:", auth);
console.log("Firestore DB:", db);
