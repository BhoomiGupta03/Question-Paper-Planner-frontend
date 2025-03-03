import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }
  }, []);

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const login = (email, password, rememberMe) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(storedUser));
        }
        setUser(storedUser);
        setIsLoggedIn(true);
        return true;
      } else {
        alert("Invalid email or password.");
        return false;
      }
    } catch (error) {
      console.error("Error during login", error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
