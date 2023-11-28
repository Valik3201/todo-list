// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   addDoc,
//   Timestamp,
// } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Configuration object for Firebase.
 * @typedef {Object} FirebaseConfig
 * @property {string} apiKey - Firebase API key.
 * @property {string} authDomain - Firebase authentication domain.
 * @property {string} projectId - Firebase project ID.
 * @property {string} storageBucket - Firebase storage bucket.
 * @property {string} messagingSenderId - Firebase messaging sender ID.
 * @property {string} appId - Firebase application ID.
 * @property {string} measurementId - Firebase measurement ID.
 */

/**
 * Initializes Firebase with the provided configuration.
 * @param {FirebaseConfig} config - Firebase configuration object.
 * @returns {Object} - Firebase app instance.
 */
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

/**
 * Firestore database instance.
 * @type {Object}
 */
const db = getFirestore(firebaseApp);

// Export the Firestore database instance
export { db };
