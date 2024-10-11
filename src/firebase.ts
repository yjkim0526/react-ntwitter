// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG33iaLqnP4njtl5IWLuZ0GCaIpSNASy4",
  authDomain: "twitter-firebase-e2b80.firebaseapp.com",
  projectId: "twitter-firebase-e2b80",
  storageBucket: "twitter-firebase-e2b80.appspot.com",
  messagingSenderId: "1053289851676",
  appId: "1:1053289851676:web:43b2006f6acc4163f1a8d9",
  measurementId: "G-9XBB5VWC6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);
console.log(analytics);
// const analytics = getAnalytics(app);

export const auth = getAuth(app); // Auth 사용