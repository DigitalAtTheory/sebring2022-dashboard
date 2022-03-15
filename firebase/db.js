import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const mintRef = collection(db, "mint-400-2022");
const truckRef = collection(db, "sebring-truck-2022");
const corralRef = collection(db, "sebring-corvette-corral-2022");
const platzRef = collection(db, "sebring-porsche-platz-2022");
const corvetteRef = collection(db, "sebring-corvette-2022");
const porscheRef = collection(db, "sebring-porsche-2022");
const lexusRef = collection(db, "sebring-porsche-2022");

export {
  db,
  mintRef,
  truckRef,
  corralRef,
  platzRef,
  corvetteRef,
  porscheRef,
  lexusRef,
};
