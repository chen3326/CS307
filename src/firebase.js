// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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