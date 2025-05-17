import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const API_URL = 'https://question-paper-planner-backend-production.up.railway.app/api';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step tracker: 1 = email, 2 = code, 3 = reset
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }
  
    try {
      await axios.post(`${API_URL}/forgot-password/send-code`, { email });
      setMessage("A verification code has been sent to your email.");
      setStep(2);
    } catch (err) {
      console.error("Error sending code:", err);
      setMessage(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };
  
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${API_URL}/forgot-password/verify-code`, { 
        email, 
        code: enteredCode 
      });
      
      setMessage("Code verified. Please enter your new password.");
      setStep(3); // Move to the password reset step
    } catch (err) {
      console.error("Verification Error:", err);
      setMessage(err.response?.data?.message || "Invalid verification code. Please try again.");
    }
  };
  
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
  
    try {
      await axios.post(`${API_URL}/forgot-password/reset-password`, {
        email,
        newPassword
      });
      setMessage("Your password has been reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset Error:", err);
      setMessage(err.response?.data?.message || "Error resetting password. Try again.");
    }
  };
  
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Enter Your Email</h2>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <h2>Enter Verification Code</h2>
          <div>
            <input
              type="text"
              name="code"
              placeholder="Enter the verification code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordReset}>
          <h2>Reset Your Password</h2>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}

      <p>
        Remember your password? <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;