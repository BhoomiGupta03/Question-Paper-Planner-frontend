import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Step tracker: 1 = email, 2 = code, 3 = reset
  const navigate = useNavigate();

  const generateVerificationCode = () => {
    // Generate a random 4-digit code
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email address.");
    } else {
      const code = generateVerificationCode();
      setVerificationCode(code);
      console.log(`Verification code sent to ${email}: ${code}`); // Simulate email sending
      setMessage("A verification code has been sent to your email.");
      setStep(2); // Move to the verification step
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (enteredCode !== verificationCode) {
      setMessage("Invalid verification code. Please try again.");
    } else {
      setMessage("Code verified. Please enter your new password.");
      setStep(3); // Move to the password reset step
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!newPassword) {
      setMessage("Please enter a new password.");
    } else if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
    } else {
      setMessage("Your password has been successfully reset.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000); // Delay for the success message
    }
  };

  return (
    <div className="forgot-password-container">
        <h1>Forgot Password</h1>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2> Enter Your Email</h2>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <h2> Enter Verification Code</h2>
          <div>
            <input
              type="text"
              name="code"
              placeholder="Enter the verification code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
            />
          </div>
          {message && <p className="message">{message}</p>}
          <button type="submit">Verify Code</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordReset}>
          <h2> Reset Your Password</h2>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
