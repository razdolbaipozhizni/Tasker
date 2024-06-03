// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpxspCDgio4ZKiORX0oofGOOX-LSr_k6Q",
  authDomain: "tasker-a4f32.firebaseapp.com",
  projectId: "tasker-a4f32",
  storageBucket: "tasker-a4f32.appspot.com",
  messagingSenderId: "154447757861",
  appId: "1:154447757861:web:891c99607174f283c8f5cc"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
