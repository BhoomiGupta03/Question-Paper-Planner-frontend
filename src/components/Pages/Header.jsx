import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../img/logo1.webp";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication token (adjust according to your auth system)
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <section id="header">
        <div className="logo">
          <img src={logo1} alt="logo" />
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/help">Help</Link>
        </nav>
        <div className="user-options">
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </section>
    </div>
  );
}
