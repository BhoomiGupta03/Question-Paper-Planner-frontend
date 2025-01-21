import React from 'react';
import { CiStar } from "react-icons/ci";

const reviews = [
  { name: "Mrs. Sharma", feedback: "This platform made my work so much easier!", rating: 5 },
  { name: "Mr. Iyer", feedback: "The randomization of questions is amazing!", rating: 4 },
  { name: "Ms. Patel", feedback: "It saves a lot of time in question paper preparation.", rating: 5 },
  { name: "Dr. Khan", feedback: "A very efficient and user-friendly tool.", rating: 4 },
];

function Review() {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <CiStar key={index} style={{ color: index < rating ? 'gold' : 'lightgray' }} />
    ));
  };

  return (
    <div className="review">
      <h1>We Hear From Our Teachers</h1>
      <div className="review-container">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <h3>{review.name}</h3>
            <p>{review.feedback}</p>
            <div className="stars">{renderStars(review.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
