// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbl8shiMSfDgz20puwGdhDfUWvfbUIYDQ",
  authDomain: "roombnb-522e7.firebaseapp.com",
  projectId: "roombnb-522e7",
  storageBucket: "roombnb-522e7.appspot.com",
  messagingSenderId: "946829382364",
  appId: "1:946829382364:web:0a164a7a956f5539d61a19",
  measurementId: "G-ZR4F6ZDZJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };