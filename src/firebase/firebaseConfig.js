import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJvNkWqzVOFcZ9PGBoR5FzwU-hBVKEo4A",
  authDomain: "lets-chat-571f8.firebaseapp.com",
  projectId: "lets-chat-571f8",
  storageBucket: "lets-chat-571f8.appspot.com",
  messagingSenderId: "573914749713",
  appId: "1:573914749713:web:93b96259503123c37e4ab0",
  measurementId: "G-MSG0WZ9Q6R"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);// Get the Auth instance associated with the app

// Function to handle Google sign-in
async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider(); // Create an instance of the Google provider object
    
        // Show a popup to select a Google account for sign-in
        const { user } = await signInWithPopup(auth, provider);

        // Return an object containing the user's UID and display name
        return { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL  };
    } catch (error) {
        if (error.code !== 'auth/cancelled-popup-request') {
            console.error(error);
        }

        return null;
    }
}

// Get the Firestore instance associated with the app
const db = getFirestore(app);

export { loginWithGoogle, db, auth, signOut };