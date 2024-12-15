import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "retrosanat.firebaseapp.com",
  projectId: "retrosanat",
  storageBucket: "retrosanat.firebasestorage.app",
  messagingSenderId: "403003299067",
  appId: import.meta.env.VITE_APP_ID
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

