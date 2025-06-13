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

          {/* Protected Home route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Protected About Us route */}
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUsContent />
              </ProtectedRoute>
            }
          />

          {/* Protected Help route */}
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />

          {/* Protected Review route */}
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <Reviewcontent />
              </ProtectedRoute>
            }
          />

          {/* Protected Profile route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Protected Main route */}
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
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
