import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import log from "../../img/aboutus.webp"; // Ensure this path is correct

const AboutUs = () => {
  return (
    <div className="about-us-banner">
      <div className="img-block">
        <img src={log} alt="About Us" />
      </div>
      <div className="banner-container">
        <h1>About Us</h1>
        <h3>Getting to know us a little bit more</h3>
        <p>
          Discover why our platform is the best choice for creating personalized and efficient question papers.
        </p>
        <div className="know-more">
          {/* Use Link to navigate to the Aboutuscontent page */}
          <Link to="/aboutuscontent" className="know-more-link">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
