import { initializeApp } from "firebase/app";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
export const FirebaseApp = initializeApp(firebaseConfig);
