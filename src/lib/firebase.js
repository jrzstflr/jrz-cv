import { initializeApp } from "firebase/app"
import { 
  getAuth, 
  GithubAuthProvider, 
  GoogleAuthProvider,
  signInWithPopup,
  // Add these new imports for email/password
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6uCTRzfbBVblZgQx_AYZpDlho31JVWPw",
  authDomain: "rating-1fac3.firebaseapp.com",
  projectId: "rating-1fac3",
  storageBucket: "rating-1fac3.appspot.com",
  messagingSenderId: "602761472670",
  appId: "1:602761472670:web:5d5d84fd7e42cbff92e98f",
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

const githubProvider = new GithubAuthProvider()
const googleProvider = new GoogleAuthProvider()

export {
  auth,
  db,
  githubProvider,
  googleProvider,
  signInWithPopup,
  // Export new email/password functions
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
}