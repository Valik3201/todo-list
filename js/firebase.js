import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPiM6zb7stGXMQrzkdgu7JGQRqnI8qS9s",
  authDomain: "to-do-app-3201.firebaseapp.com",
  projectId: "to-do-app-3201",
  storageBucket: "to-do-app-3201.appspot.com",
  messagingSenderId: "330808552450",
  appId: "1:330808552450:web:c0534db7addeed186c8b1b",
  measurementId: "G-20QR7YXTR3",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// const db = firebase.firestore();

export { firebaseApp, db, collection, getDocs, Timestamp, addDoc };
