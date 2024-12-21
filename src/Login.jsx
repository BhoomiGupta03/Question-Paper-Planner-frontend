import React, { useState } from "react";
import { Link } from "react-router-dom";
//import logo from "./img/logo.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(); // Trigger the login
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <p>Kindly Enter your details.</p>

        <div>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="rem-me">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label> Remember Me</label>
        </div>
        
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button type="submit">Login</button>

        <button type="button" className="google-login">
          Sign in with Google
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
