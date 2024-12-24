import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Aboutus from './Aboutus';
import Help from './Help';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks user login state

  // Handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle user signup (auto-login after signup)
  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Show Header only if the user is logged in */}
        {isLoggedIn && <Header onLogout={handleLogout} />}

        <Routes>
          {/* Home route */}
          <Route
            path="/home"
            element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
          />

          {/* About Us route */}
          <Route
            path="/about"
            element={<Aboutus />}
          />

          {/* Help route */}
          <Route
            path="/help"
            element={<Help />}
          />

          {/* Login route */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Signup route */}
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Signup onSignup={handleSignup} />
              )
            }
          />

          {/* Profile route */}
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/login" />
            }
          />

          {/* Forgot Password route */}
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Default route (Redirect based on login state) */}
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
