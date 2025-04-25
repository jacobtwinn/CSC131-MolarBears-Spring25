import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { isTokenValid } from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const refreshUserInfo = () => {
    const token = localStorage.getItem("jwtToken");
    if (token && isTokenValid(token)) {
      axios
        .get("http://localhost:5001/api/auth/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Fetched user info from backend:", res.data);
          setUserInfo(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          setIsLoggedIn(false);
          setUserInfo(null);
        });
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  // Call it on first load automatically
  useEffect(() => {
    refreshUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, refreshUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
