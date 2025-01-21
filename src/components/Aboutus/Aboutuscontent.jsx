import React, { useState } from "react";
import Header from '../Header'


const AboutUsContent = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Function to toggle the visibility of feature descriptions
  const toggleFeature = (feature) => {
    setSelectedFeature((prevFeature) => (prevFeature === feature ? null : feature));
  };

  return (
    <div className="Aboutus-main">
    <div className="about-us-header">
      <Header/>
    </div>

      <div className="about-us-container">

      {/* <h1>About Us</h1> */}
      <p>
        <strong>Welcome to Question Paper Planner – Empowering Teachers, One Question Paper at a Time!</strong>
      </p>
      <p>
        At Question Paper Planner, we understand the challenges teachers face when it comes to creating effective and well-structured question papers. Our goal is to simplify this process, allowing teachers to focus on what truly matters – educating and inspiring students.
      </p>
      <p>
        Our platform provides an intuitive approach to generating question papers. Teachers can input their academic year, semester, and subject, add topics or directly enter questions, and our system organizes them to create balanced, randomized question papers.
      </p>
      <h3>Why Choose Question Paper Planner?</h3>
      <ul className="features-list">
        {[
          { key: "simplicity", label: "Simplicity", description: "A seamless and intuitive interface designed to make question paper creation quick and easy." },
          { key: "efficiency", label: "Efficiency", description: "Save time by automating the randomization and organization of questions while avoiding repetitions." },
          { key: "flexibility", label: "Flexibility", description: "Customize question papers by choosing the number of questions per unit and inputting topics or questions directly." },
          { key: "support", label: "Support for Teachers", description: "We are committed to helping teachers focus on teaching by streamlining administrative tasks." },
        ].map((feature) => (
          <li
            key={feature.key}
            onClick={() => toggleFeature(feature.key)}
            className="feature-item"
          >
            <strong>{feature.label}</strong>
            {selectedFeature === feature.key && (
              <p className="feature-description">{feature.description}</p>
            )}
          </li>
        ))}
      </ul>
      <p>
        Our mission is to provide a reliable and efficient tool for teachers to craft personalized and high-quality question papers. Whether you're a teacher in a primary school, secondary school, or college, Question Paper Planner is here to support your teaching journey.
      </p>
      <p>
        <strong>Thank you for choosing us – together, we’re shaping the future of education!</strong>
      </p>
    </div>
    </div>
  );
};

export default AboutUsContent;
