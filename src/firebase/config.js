import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "retro-sanat.firebaseapp.com",
  projectId: "retro-sanat",
  storageBucket: "retro-sanat.appspot.com",
  messagingSenderId: "448079427610",
  appId: "1:448079427610:web:65b12b6f9ebbc77c6ff9a3",
  measurementId: "G-QH5D33L17Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth hizmetinin referansı
export const auth = getAuth(app)

// sağlayıcının referansı
export const provider = new GoogleAuthProvider()

// veritabanı referansı
export const db = getFirestore(app)

// dosya saklama için storage referansı
export const storage = getStorage(app)

