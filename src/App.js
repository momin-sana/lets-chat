import React, { useState, useContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeContext } from "./ThemeContext";
import { loginWithGoogle, auth } from './firebase/firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";
import googleLogo from './assets/img/google.png';
import Chat from "../src/components/Chat/Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // State to hold the current user information
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // State to manage loading
  const { mode } = useContext(ThemeContext);


  useEffect(() => {
    // Monitor authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsCheckingAuth(false); // Stop showing the loader after auth state is determined
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const userData = await loginWithGoogle();
    if (userData) {
      setUser(userData);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="loading-container">
        <h1>Checking authentication...</h1>
      </div>
    );
  }
  
  return (
    <div className={`App ${mode}`}>
      <Header user={user} handleLogout={handleLogout} />


      {user ? (
        // If the user is logged in, display the Chat component
        <Chat user={user} />
      ) : (
        // If the user is not logged in, display the login screen
        <div className="login-container">
          <h1>Welcome to Let's Chat</h1>
          <button onClick={handleLogin} className="login-button">
            <img src={googleLogo} alt="Google logo" className="google-logo" />
            <span>Sign in with Google</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
