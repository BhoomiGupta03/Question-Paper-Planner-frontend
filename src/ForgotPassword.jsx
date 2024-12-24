import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (email === "") { 
      setMessage("Please enter a valid email address.");
    } else {
      // Simulate a password reset process
      setMessage("A reset link has been sent to your email.");
      setTimeout(() => {
        navigate("/login"); // Redirect to Login page after reset
      }, 2000); // Delay to simulate email sent
    }
  };

  return (
    <div className="forgot-password-container">
      <header className="header">
        <h1>Forgot Password</h1>
      </header>

      <form onSubmit={handleReset}>
        <h2>Reset Your Password</h2>

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

        <button type="submit">Reset Password</button>
      </form>

      <p>
        Remember your password? <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
