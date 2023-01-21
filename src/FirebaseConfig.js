// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0CkroohlRFZJLnharx27isC8lCYEsgAE",
    authDomain: "promern-3ca8e.firebaseapp.com",
    databaseURL: "https://promern-3ca8e-default-rtdb.firebaseio.com",
    projectId: "promern-3ca8e",
    storageBucket: "promern-3ca8e.appspot.com",
    messagingSenderId: "790155995542",
    appId: "1:790155995542:web:64593e2957560b48cb15b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
export default db;