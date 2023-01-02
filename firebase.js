// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy4Edj3uz9rj8iaJV7uv68lNAYM0oqQ_M",
  authDomain: "awesomeproject-6518e.firebaseapp.com",
  projectId: "awesomeproject-6518e",
  storageBucket: "awesomeproject-6518e.appspot.com",
  messagingSenderId: "1050234164541",
  appId: "1:1050234164541:web:91b33c087f548320f0e154"
};

// Initialize Firebase
let app; 
if (!firebase.apps.length) {
    app = initializeApp(firebaseConfig);
} 

const auth = getAuth(app);

export { auth };