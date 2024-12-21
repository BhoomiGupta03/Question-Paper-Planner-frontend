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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true); // Automatically log in the user after signup
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Header />}
        
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/about" element={<Aboutus />} /> {/* About Us route */}
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
