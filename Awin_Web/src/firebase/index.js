import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVM6GdukD0ewRT8zldqoblwMUQ9m1-Z00",
  authDomain: "vue-auth-6eb31.firebaseapp.com",
  projectId: "vue-auth-6eb31",
  storageBucket: "vue-auth-6eb31.appspot.com",
  messagingSenderId: "22902835681",
  appId: "1:22902835681:web:c40c613057ebb7a78eaaa0",
  measurementId: "G-RYRLPZE76P",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
