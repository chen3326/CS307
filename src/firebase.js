// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

import {useEffect, useState} from "react";


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

// TODO: Add password change and update function
export function passwordChange(password) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user.updatePassword(password)
                .then(() => {
                    return console.log("Password Updated")
                })
                .catch((err) => {
                    console.error(err)
                    return console.log("unable to change password")
                })
            const uid = user.uid;
        } else {
            return console.log("User not logged In")
        }
    });
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

