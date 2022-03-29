import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "your_firebase_apiKey",
  authDomain: "your_firebase_authDomain",
  projectId: "your_firebase_projectId",
  storageBucket: "your_firebase_storageBucket",
  messagingSenderId: "your_firebase_messagingSenderId",
  appId: "your_firebase_appId"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage