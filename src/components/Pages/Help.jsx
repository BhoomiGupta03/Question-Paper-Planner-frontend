import React from 'react';

function Help() {
  return (
    <div className="help-container">
      <h2>Help</h2>
      <p>
        Welcome to the <strong>Question Paper Planner Help & Support</strong> page! Here, you’ll find guidance on using the platform effectively and answers to commonly asked questions. If you need further assistance, please refer to the sections below or contact our support team.
      </p>
      
      <hr />

      <h3>1. Getting Started</h3>
      <ul>
        <li><strong>Creating an Account:</strong> To use the platform, start by creating an account on our signup page. Simply fill in your details, and you’ll be ready to access the platform.</li>
        <li><strong>Logging In:</strong> Once registered, log in using your credentials to access the dashboard, where you can upload questions, organize content, and generate question papers.</li>
      </ul>

      <h3>2. Uploading Questions</h3>
      <ul>
        <li><strong>Question Types:</strong> Our platform supports various question types (e.g., multiple-choice, short answer, essay). Choose the relevant type when uploading your questions.</li>
        <li><strong>Categorizing Questions:</strong> Tag questions by subject, topic to easily find and organize content within the question bank.</li>
      </ul>

      <h3>3. Generating Question Papers</h3>
      <ul>
        <li><strong>Manual Selection:</strong> Select specific questions from the question bank to create a customized paper.</li>
        <li><strong>Automated Generation:</strong> Set criteria such as subject, question type, and let the platform auto-generate a paper for you.</li>
        <li><strong>Randomization Options:</strong> Enable randomization of questions and answers to create multiple versions of the same exam.</li>
      </ul>

      <h3>4. Managing Your Question Bank</h3>
      <ul>
        <li><strong>Editing Questions:</strong> Easily edit or update questions in your bank to keep content current and accurate.</li>
        <li><strong>Deleting Questions:</strong> Remove outdated or redundant questions with a few clicks to keep your bank organized.</li>
      </ul>

      <h3>5. Frequently Asked Questions (FAQ)</h3>
      <ul>
        <li><strong>How do I reset my password?</strong><br />
          Go to the login page and click on the "Forgot Password" link. Follow the prompts to reset your password.
        </li>
        <li><strong>How do I contact support?</strong><br />
          For any technical issues or additional support, please reach out via our Contact page or email us at <a href="mailto:support@example.com">support@example.com</a>.
        </li>
      </ul>

      <h3>6. Contact Support</h3>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:support@example.com">support@example.com</a></li>
        <li><strong>Response Time:</strong> Our team aims to respond to all inquiries within 24-48 hours.</li>
      </ul>
    </div>
  );
}

export default Help;
