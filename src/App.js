import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Main from './components/Home/Main';
import AboutUs from "./components/Aboutus/Aboutusbanner"; // Adjust the path if necessary
import Aboutuscontent from "./components/Aboutus/Aboutuscontent"; // Adjust the path if necessary
import Help from './components/Pages/Help';
import Login from './components/log/Login';
import Signup from './components/log/Signup';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/log/ForgotPassword'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Main />} />

          {/* About Us routes */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/aboutuscontent" element={<Aboutuscontent />} />

          {/* Help route */}
          <Route path="/help" element={<Help />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* Forgot Password route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
