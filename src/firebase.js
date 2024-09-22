import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLREJGvTHJG0j3z8s1_07JW8K6Blq90S4",
  authDomain: "calendar-app-e59f2.firebaseapp.com",
  projectId: "calendar-app-e59f2",
  storageBucket: "calendar-app-e59f2.appspot.com",
  messagingSenderId: "779644312517",
  appId: "1:779644312517:web:5bd83ba1e0a3274af3c9ac",
  measurementId: "G-7R1RPQ4RRJ",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const signOutUser = () => {
  return signOut(auth);
};

export { auth, signInWithGoogle, signOutUser };
