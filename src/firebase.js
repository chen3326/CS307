// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword, sendEmailVerification, updateEmail, deleteUser } from "firebase/auth";


import {useEffect, useState} from "react";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBNSzngOJk4iyDWUmSRSIF1Qx9TKzB0i10",
    authDomain: "cs307-bdbca.firebaseapp.com",
    projectId: "cs307-bdbca",
    storageBucket: "cs307-bdbca.appspot.com",
    messagingSenderId: "162185983080",
    appId: "1:162185983080:web:af175f3e595466abb937dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth);
}

export function deleteU() {
    const user = auth.currentUser;
    return deleteUser(user);
}

// TODO: Add password change and update function
export function passwordChange(password) {
    return updatePassword(auth.currentUser, password);
}
// Custom Hook
export function useAuth() {
    const [ currentUser, setCurrentUser ] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])
    return currentUser;
}
export function emailUpdate(email) {
    return updateEmail(auth.currentUser, email);
}

export function verificationEmail(email) {
    return sendEmailVerification(auth.currentUser, email);
}

export const storage =  getStorage();