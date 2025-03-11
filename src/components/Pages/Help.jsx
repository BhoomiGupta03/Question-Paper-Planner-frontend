import React from 'react';
import Header from '../Pages/Header';

function Help() {
  return (
    <div className="help-container">
      <div className="help-header">
        <Header />
      </div>
      <div className="help-content">
        <p>
          Welcome to the <strong>Question Paper Planner Help & Support</strong> page! We are committed to empowering teachers by simplifying the process of creating high-quality question papers. Below, you'll find helpful information to get started and troubleshoot any issues.
        </p>

        <hr />

        <h3>1. Getting Started</h3>
        <ul>
          <li>
            <strong>Creating an Account:</strong> Start by signing up on our platform. Enter your details to create an account and gain access to all features.
          </li>
          <li>
            <strong>Logging In:</strong> After registration, log in with your credentials to access the dashboard and begin crafting question papers.
          </li>
        </ul>

        <h3>2. Uploading Questions</h3>
        <ul>
          <li>
            <strong>Add Questions Easily:</strong> Enter questions directly and upoad them by selecting your academic year, semester, and subject.
          </li>
         
        </ul>

        <h3>3. Generating Question Papers</h3>
        <ul>
          <li>
            <strong>Automatic Generation:</strong> Let the platform randomize and organize your questions to create a balanced paper without repetitions.
          </li>
          <li>
            <strong>Randomization Options:</strong> Enable randomization for different versions of the same exam.
          </li>
        </ul>

        <h3>4. Platform Features</h3>
        <ul>
          <li>
            <strong>Simplicity:</strong> Enjoy a seamless and intuitive interface designed for quick and easy question paper creation.
          </li>
          
          <li>
            <strong>Flexibility:</strong> Customize your question papers by choosing how many questions you want from each unit.
          </li>
          <li>
            <strong>Teacher Support:</strong> We streamline administrative tasks so teachers can focus on teaching.
          </li>
        </ul>

        {/* <h3>5. Managing Your Question Bank</h3>
        <ul>
          <li>
            <strong>Editing Questions:</strong> Easily update questions in your bank to keep content accurate and relevant.
          </li>
          <li>
            <strong>Deleting Questions:</strong> Remove outdated questions with just a few clicks to keep your bank clean and organized.
          </li>
        </ul> */}

        <h3>6. Frequently Asked Questions (FAQ)</h3>
        <ul>
          <li>
            <strong>How do I reset my password?</strong><br />
            Go to the login page and click on the "Forgot Password" link. Follow the prompts to reset your password.
          </li>
          <li>
            <strong>How do I contact support?</strong><br />
            For technical issues or support, please email us at <a href="mailto:support@example.com">support@example.com</a>.
          </li>
        </ul>

        <h3>7. Contact Support</h3>
        <ul>
          <li>
            <strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a>
          </li>
          <li>
            <strong>Response Time:</strong> Our team aims to respond to all inquiries within 24-48 hours.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
