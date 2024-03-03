// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCHSGhD5jScj0aUk7x2MSR6ILZdVGbzSeM",
  authDomain: "testing-10257.firebaseapp.com",
  projectId: "testing-10257",
  storageBucket: "testing-10257.appspot.com",
  messagingSenderId: "179973156350",
  appId: "1:179973156350:web:53d94c079f5e5ce60ba4af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
