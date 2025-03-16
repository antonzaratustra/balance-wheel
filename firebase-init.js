// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyzigwSvdr8neaujmOqL3arcuXLe83UVo",
  authDomain: "mentorist-1111.firebaseapp.com",
  projectId: "mentorist-1111",
  storageBucket: "mentorist-1111.firebasestorage.app",
  messagingSenderId: "73083879430",
  appId: "1:73083879430:web:25b64c11f3cd75d80dc387",
  measurementId: "G-RWCL6CQ31K"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("Firebase App:", app);
console.log("Firebase Analytics:", analytics);
console.log("Firebase Auth:", auth);
console.log("Firestore DB:", db);
