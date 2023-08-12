import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_APP_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMEIN,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_FIREBASE_APPID,
  measurementId: process.env.NEXT_APP_FIREBASE_MEASUREMENT_ID,
});

export const storage = getStorage(firebaseApp);
