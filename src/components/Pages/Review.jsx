import React from 'react';

const reviews = [
  { name: "Mrs. Manju Suresh", feedback: "This platform made my work so much easier!" },
  { name: "Mr. Chirag Deora", feedback: "The randomization of questions is amazing!" },
  { name: "Ms. Simran Solanki", feedback: "It saves a lot of time in question paper preparation." },
  { name: "Ms. Kanchan", feedback: "A very efficient and user-friendly tool." },
];

function Review() {
  return (
    <div className="review-container">
      <h1>We Hear From Our Teachers</h1>
      <div className="review-content">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <h3>{review.name}</h3>
            <p>{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
