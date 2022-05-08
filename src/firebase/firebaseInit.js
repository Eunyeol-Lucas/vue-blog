import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo9ba1efcljVC4ZMsqpgdftF9Clai-w8w",
  authDomain: "fireblogs-690f2.firebaseapp.com",
  projectId: "fireblogs-690f2",
  storageBucket: "fireblogs-690f2.appspot.com",
  messagingSenderId: "759152541495",
  appId: "1:759152541495:web:7a28b269c3c3a708dda4b2",
};

initializeApp(firebaseConfig);
const timestamp = serverTimestamp;

export { timestamp };
export const dbService = getFirestore();
