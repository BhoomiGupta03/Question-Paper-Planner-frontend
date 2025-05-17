import './css/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import AboutUsContent from "./components/Aboutus/Aboutuscontent"; // Adjust the path if necessary
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
        
         {/*  Protected Home route */}
         <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* About Us route */}
          <Route path="/aboutus" element={<AboutUsContent />} />

          {/* Help route */}
          <Route path="/help" element={<Help />} />

          {/* review route */}
          <Route path="/review" element={<Reviewcontent />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Signup route */}
          <Route path="/signup" element={<Signup />} />

          {/* Forgot Password route */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />

          {/* Main route */}
          <Route path="/main" element={<Main />} /> {/* Link for "Start" */}

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
