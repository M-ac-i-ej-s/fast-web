/**
 * plugins/firebase.ts
 *
 * Firebase configuration and initialization
 */

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace with your Firebase config
// Get this from Firebase Console > Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcZwPZs6iWo0OQuJvpk6n5DSCYl3U4lO0',
  authDomain: 'fastweb-a8cd6.firebaseapp.com',
  projectId: 'fastweb-a8cd6',
  storageBucket: 'fastweb-a8cd6.firebasestorage.app',
  messagingSenderId: '375246664754',
  appId: '1:375246664754:web:aa95cad55b88e65625f82b',
  measurementId: 'G-F11KPKFCVE',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

export default app
