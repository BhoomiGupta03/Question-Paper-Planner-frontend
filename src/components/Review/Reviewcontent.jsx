import React, { useState } from 'react';
import Header from '../Pages/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

function ReviewPage() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Mrs. Manju Suresh", feedback: "This platform made my work so much easier!" },
    { id: 2, name: "Mr. Chirag Deora", feedback: "The randomization of questions is amazing!" },
    { id: 3, name: "Ms. Simran Solanki", feedback: "It saves a lot of time in question paper preparation." },
    { id: 4, name: "Ms. Pooja Gupta", feedback: "A very efficient and user-friendly tool." },
  ]);
  const [newReview, setNewReview] = useState({ name: "", feedback: "" });
  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleAddReview = () => {
    if (newReview.name && newReview.feedback) {
      setReviews([...reviews, { id: Date.now(), ...newReview }]);
      setNewReview({ name: "", feedback: "" });
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDeleteReview = () => {
    if (deleteId !== null) {
      setReviews(reviews.filter(review => review.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="review-page-container">
      <div className="review-header">
        <Header />
      </div>
      <div className='review-page-content'>
        <h1>Teacher Reviews</h1>
        <div className="review-form">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={newReview.name} 
            onChange={handleInputChange} 
          />
          <textarea 
            name="feedback" 
            placeholder="Your Review" 
            value={newReview.feedback} 
            onChange={handleInputChange} 
          ></textarea>
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
        <div className="review-list">
          {reviews.map(review => (
            <div className="review-card" key={review.id}>
              <h3>{review.name}</h3>
              <p>{review.feedback}</p>
              <button onClick={() => confirmDelete(review.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteId(null)}
            className="modal-overlay"
          >
            <motion.div
              initial={{ scale: 0, rotate: '12.5deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              exit={{ scale: 0, rotate: '0deg' }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content"
            >
              <FiAlertCircle className="modal-icon" />
              <h3 className="modal-title">Are you sure?</h3>
              <p className="modal-text">Do you really want to delete this review?</p>
              <div className="modal-buttons">
                <button onClick={() => setDeleteId(null)} className="cancel-btn">No</button>
                <button onClick={handleDeleteReview} className="confirm-btn">Yes, Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ReviewPage;