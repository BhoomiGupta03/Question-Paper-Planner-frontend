import React from "react";
import { Link } from "react-router-dom";
import log from "../../img/aboutus.webp"; // Ensure the path to the image is correct

const AboutUsBanner = () => {
  return (
    <div className="about-us-banner">
      <div className="img-block">
        <img src={log} alt="About Us" />
      </div>
      <div className="about-banner-container">
        <h1>About Us</h1>
        <h3>Get to Know Us Better</h3>
        <p>
          Discover why our platform is the best choice for creating personalized and efficient question papers.
        </p>
        <div className="know-more">
          <Link to="/aboutuscontent" className="know-more-link">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;
