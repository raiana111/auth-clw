import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBF1Qgj3ElzHHrWr_P_LE8HWV0Plucl61Y",
    authDomain: "nana-auth.firebaseapp.com",
    databaseURL: "https://nana-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nana-auth",
    storageBucket: "nana-auth.firebasestorage.app",
    messagingSenderId: "685098094530",
    appId: "1:685098094530:web:4809b6108645dcae28505b",
    measurementId: "G-MC24FK60S7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

export async function emailSignIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function emailSignUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function userSignOut() {
  return await signOut(auth);
}