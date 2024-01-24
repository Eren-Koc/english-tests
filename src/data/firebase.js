import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCjQnSrCGsr1GNvXhN54WB7LaMiscgOxs",
    authDomain: "english-tests-48dd4.firebaseapp.com",
    projectId: "english-tests-48dd4",
    storageBucket: "english-tests-48dd4.appspot.com",
    messagingSenderId: "284670996986",
    appId: "1:284670996986:web:6ccc5e27d23c7d055a3443",
    measurementId: "G-5LLPWLFZYR"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
  