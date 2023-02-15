import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "momonie-store.firebaseapp.com",
  projectId: "momonie-store",
  storageBucket: "momonie-store.appspot.com",
  messagingSenderId: "888616686928",
  appId: "1:888616686928:web:7602d2d07e20d50cb44855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
