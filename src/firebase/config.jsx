import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-0BVPYwHagaVhJxpZcz4-pGJEFCVriBg",
  authDomain: "olx-clone-b6a45.firebaseapp.com",
  projectId: "olx-clone-b6a45",
  storageBucket: "olx-clone-b6a45.appspot.com",
  messagingSenderId: "554067733601",
  appId: "1:554067733601:web:b8094af48ae05d4a3ace20",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
