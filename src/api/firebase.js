import { initializeApp } from 'firebase/app'
import "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { firebaseConfig } from '../config/configKeys'

const app = initializeApp(firebaseConfig)

const auth = getAuth()
const firestore = getFirestore()

export { 
    auth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    firestore,
    setDoc,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    updatePassword,
    updateEmail,
    updateProfile 
};