import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyCDZRNCS-XOeyc47Ml9FTSUA_GAsRjLsjI",
  authDomain: "pruebafsbase.firebaseapp.com",
  projectId: "pruebafsbase",
  storageBucket: "pruebafsbase.firebasestorage.app",
  messagingSenderId: "108540942941",
  appId: "1:108540942941:web:3d470132a8beafb3348bb4",
  measurementId: "G-RBDCND20N5"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const recordatoriosRef = collection(db, 'recordatorios')