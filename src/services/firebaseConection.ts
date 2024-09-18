
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKOxGAmQDGXMUb99DDJcM0k-6tcSOPJgk",
  authDomain: "reactlinks-5a660.firebaseapp.com",
  projectId: "reactlinks-5a660",
  storageBucket: "reactlinks-5a660.appspot.com",
  messagingSenderId: "497914450727",
  appId: "1:497914450727:web:a10d00aea5e85ee5064f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};
