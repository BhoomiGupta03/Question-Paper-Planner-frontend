import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import AboutUsContent from "./components/Aboutus/Aboutuscontent";
import Help from './components/Pages/Help';
import Reviewcontent from './components/Review/Reviewcontent';
import Login from './components/log/Login';
import Signup from './components/log/Signup';
import Profile from './components/Profile/Profile';
import ForgotPassword from './components/log/ForgotPassword';
import Main from './components/Home/Main';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* These pages are PUBLIC now */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUsContent />} />
          <Route path="/help" element={<Help />} />
          <Route path="/review" element={<Reviewcontent />} />

          {/* Only Main and Profile are Protected */}
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
