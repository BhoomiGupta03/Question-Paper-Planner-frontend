import React from 'react';
import { Link } from "react-router-dom";
import logo from "./img/logo.png";


export default function Header() {
  return (
    <div>
      <section id="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help</Link>
        </nav>
        <div className="login-id">
        <Link to="/profile">Profile</Link>

        </div>
      </section>
    </div>
  );
}
