import React, { useState } from 'react';

const AboutUs = () => {
  // State to toggle visibility of each section
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Function to handle the click on a feature
  const toggleFeature = (feature) => {
    setSelectedFeature(selectedFeature === feature ? null : feature); // Toggle the visibility
  };

  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        <strong>Welcome to Question Paper Planner – Empowering Teachers, One Question Paper at a Time!</strong>
      </p>
      <p>
        At Question Paper Planner, we understand the challenges teachers face when it comes to creating effective and well-structured question papers. Our goal is to make this process easier, faster, and more efficient, allowing teachers to focus on what truly matters – educating and inspiring students.
      </p>
      <p>
        Our platform offers an innovative and user-friendly approach to generating question papers. Teachers can easily input their academic year, semester, and subject. From there, they can add topics or directly enter questions, and our system will automatically organize and randomize them, ensuring no repetitions and a balanced question paper. Teachers also have the flexibility to select how many questions they want from each unit, giving them full control over the content.
      </p>
      <h3>Why Choose Question Paper Planner?</h3>
      <ul>
        <li onClick={() => toggleFeature('simplicity')} className="feature-item">
          <strong>Simplicity</strong>
        </li>
        {selectedFeature === 'simplicity' && (
          <p className="feature-description">
            A seamless and intuitive interface designed to make question paper creation quick and easy.
          </p>
        )}

        <li onClick={() => toggleFeature('efficiency')} className="feature-item">
          <strong>Efficiency</strong>
        </li>
        {selectedFeature === 'efficiency' && (
          <p className="feature-description">
            Save time by automating the randomization and organization of questions without worrying about repetitions.
          </p>
        )}

        <li onClick={() => toggleFeature('flexibility')} className="feature-item">
          <strong>Flexibility</strong>
        </li>
        {selectedFeature === 'flexibility' && (
          <p className="feature-description">
            Customize your question papers by selecting the number of questions per unit and choosing topics or entering questions directly.
          </p>
        )}

        <li onClick={() => toggleFeature('support')} className="feature-item">
          <strong>Support for Teachers</strong>
        </li>
        {selectedFeature === 'support' && (
          <p className="feature-description">
            We are committed to helping teachers focus on what they do best – teaching – by streamlining administrative tasks.
          </p>
        )}
      </ul>
      <p>
        Our mission is to provide a reliable and efficient tool for teachers to craft personalized and high-quality question papers. Whether you're a teacher in a primary school, secondary school, or college, Question Paper Planner is here to support your teaching journey.
      </p>
      <p>Thank you for choosing us – together, we’re shaping the future of education!</p>
    </div>
  );
};

export default AboutUs;
