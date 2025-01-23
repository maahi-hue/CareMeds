import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import auth from "../firebase/firebase.config";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const GoogleProvider = new GoogleAuthProvider();

  const handleRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      // console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authInfo = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    user,
    loading,
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
