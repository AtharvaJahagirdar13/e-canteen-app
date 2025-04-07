// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfghmq11v19GzBWVzfoyjJOq2Yipf7CVA",
  authDomain: "e-canteen-4a1ea.firebaseapp.com",
  databaseURL: "https://e-canteen-4a1ea-default-rtdb.firebaseio.com",
  projectId: "e-canteen-4a1ea",
  storageBucket: "e-canteen-4a1ea.firebasestorage.app",
  messagingSenderId: "603875206517",
  appId: "1:603875206517:web:ab675b843173d13a155f3c",
  measurementId: "G-BGP3R07VEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Conditionally initialize analytics only in web environments.
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then((module) => {
      if (module.getAnalytics) {
        module.getAnalytics(app);
        console.log("Firebase Analytics initialized.");
      } else {
        console.warn("getAnalytics property is not available.");
      }
    })
    .catch((error) => {
      console.error("Failed to load Firebase Analytics:", error);
    });
}

export { db, auth };
