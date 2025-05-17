import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { downloadPDF, deleteQuestionPaper, updateQuestionPaper } from '../utils/common';
import axios from 'axios'; // Add axios for API calls

const API_URL = 'http://localhost:5000/api'; // Define API_URL

const ProfilePage = () => {
  const [teacherName, setTeacherName] = useState(localStorage.getItem('teacherName') || 'John Doe');
  const [bio, setBio] = useState(localStorage.getItem('bio') || 'Experienced teacher in Mathematics and Computer Science.');
  const [isEditing, setIsEditing] = useState(false);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [removing, setRemoving] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editedContent, setEditedContent] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [error, setError] = useState(null);
  const accountCreationDate = localStorage.getItem('accountCreationDate') || new Date().toLocaleDateString();

  useEffect(() => {
    // Fetch profile data
    axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(response => {
        
        setTeacherName(response.data.teacherName);
        setBio(response.data.bio || 'Experienced teacher in Mathematics and Computer Science.');

        // Save to localStorage as fallback
        localStorage.setItem('teacherName', response.data.teacherName);
        localStorage.setItem('bio', response.data.bio || 'Experienced teacher in Mathematics and Computer Science.');
        localStorage.setItem('accountCreationDate', new Date(response.data.createdAt).toLocaleDateString());
      })
      .catch(error => {
        setError("Error fetching profile.");
        console.error("Error fetching profile:", error);
      });

    // Fetch question papers
    axios.get(`${API_URL}/profile/question-papers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    
      .then(response => {
        setQuestionPapers(response.data);
      })
      .catch(error => {
        setError("Error fetching question papers.");
        console.error("Error fetching question papers:", error);
      });
  }, []);

  useEffect(() => {
    if (activeModal) {
      setEditedContent(
        activeModal.type === 'paper'
          ? activeModal.paper.questions.map(q => `${q.mainQuestion}\n${q.subQuestions.join('\n')}`)
          : activeModal.paper.bank
      );
    }
  }, [activeModal]);

  const handleSaveProfile = async () => {
    try {
      await axios.put(`${API_URL}/profile`, {
        teacherName,
        bio
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      
      // Update localStorage with the new values
      localStorage.setItem('teacherName', teacherName);
      localStorage.setItem('bio', bio);

      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
      console.error('Error updating profile:', err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDeleteQuestionPaper = async () => {
    if (deleteId !== null) {
      setRemoving(deleteId);
      
      const result = await deleteQuestionPaper(deleteId);
      
      if (result.success) {
        const updatedPapers = questionPapers.filter((paper) => paper._id !== deleteId);
        setQuestionPapers(updatedPapers);
      } else {
        setError(result.error || 'Failed to delete question paper.');
      }
      
      setRemoving(null);
      setDeleteId(null);
    }
  };
  const handleSaveModal = async () => {
    if (activeModal) {
      try {
        const paperId = activeModal.paper._id;
        const updatedPaper = { ...activeModal.paper };
  
        if (activeModal.type === 'paper') {
          updatedPaper.questions = editedContent.map(q => {
            const lines = q.split('\n');
            return { mainQuestion: lines[0], subQuestions: lines.slice(1).filter(line => line.trim() !== '') };
          });
        } else {
          updatedPaper.bank = editedContent.filter(q => q.trim() !== '');
        }
  
        const result = await updateQuestionPaper(paperId, updatedPaper);
  
        if (result.success) {
          const updatedPapers = questionPapers.map((paper) => {
            if (paper._id === paperId) {
              return { ...paper, ...updatedPaper };
            }
            return paper;
          });
    
          setQuestionPapers(updatedPapers);
          setIsEditingModal(false);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Network error. Please check your connection.');
      }
    }
  };

  const handleRemoveQuestion = (paper, type, index, subIndex = null) => {
    setConfirmDeleteIndex({ paper, type, index, subIndex });
  };

  const confirmRemoveQuestion = () => {
    const { paper, type, index, subIndex } = confirmDeleteIndex;
    
    // Create a deep copy of the paper we're modifying
    const paperToUpdate = questionPapers.find(p => p._id === paper._id);
    
    if (!paperToUpdate) {
      setError("Could not find the paper to update");
      setConfirmDeleteIndex(null);
      return;
    }
    
    let updatedPaper = {...paperToUpdate};
    
    // Update the correct part based on type
    if (type === 'paper') {
      const updatedQuestions = [...updatedPaper.questions];
      if (subIndex !== null) {
        updatedQuestions[index].subQuestions = updatedQuestions[index].subQuestions.filter((_, i) => i !== subIndex);
      } else {
        updatedQuestions.splice(index, 1);
      }
      updatedPaper.questions = updatedQuestions;
    } else {
      updatedPaper.bank = updatedPaper.bank.filter((_, i) => i !== index);
    }
    
    // Update local state
    const updatedPapers = questionPapers.map(p => 
      p._id === paper._id ? updatedPaper : p
    );
    
    // Send to server using the utility function
    updateQuestionPaper(paper._id, updatedPaper)
      .then(result => {
        if (result.success) {
          setQuestionPapers(updatedPapers);
          
          // Sync modal with latest data
          setActiveModal((prev) => ({
            ...prev,
            paper: updatedPapers.find((p) => p._id === paper._id),
          }));
        } else {
          setError(result.error);
        }
        setConfirmDeleteIndex(null);
      });
  };

  const handleDownloadPaperPDF = (paper) => {
    downloadPDF('Question Paper', paper);
  };

  const handleDownloadBankPDF = (paper) => {
    downloadPDF('Question Bank', paper);
  };

 

  const handleEditQuestion = (paper, type, index, subIndex = null, newValue) => {
    const updatedPapers = questionPapers.map((p) => {
      if (p._id === paper._id) { //  Use _id instead of id
        if (type === 'paper') {
          const updatedQuestions = [...p.questions];
          if (subIndex !== null) {
            updatedQuestions[index].subQuestions[subIndex] = newValue;
          } else {
            updatedQuestions[index].mainQuestion = newValue;
          }
          return { ...p, questions: updatedQuestions };
        } else {
          const updatedBank = [...p.bank];
          updatedBank[index] = newValue;
          return { ...p, bank: updatedBank };
        }
      }
      return p;
    });
  
    setQuestionPapers(updatedPapers);
 
   //  Sync modal with latest data
   setActiveModal((prev) => ({
    ...prev,
    paper: updatedPapers.find((p) => p._id === paper._id),
  }));
};
  
return (
  <>
    <div className="profile-container">
      <div className="profile-header">
        <Header />
      </div>

      <div className="profile-content">
        <div className="profile-details">
          {isEditing ? (
            <div className="profile-edit-form">
              <input value={teacherName} onChange={(e) => setTeacherName(e.target.value)} placeholder="Enter teacher's name" className="input-field" />
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter teacher's bio" className="input-field" />
              <div className='edit-save-btn'>
                <button onClick={handleSaveProfile}><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>
            </div>
          ) : (
            <div>
              <h2>{teacherName}</h2>
              <p>{bio}</p>
              <p><strong>Account Created On:</strong> {accountCreationDate}</p>
              <div className='edit-save-btn'>
                <button onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faEdit} /> Edit Profile</button>
              </div>
            </div>
          )}
        </div>

        <div className="question-paper-section">
          <h2>Question Papers</h2>
          <div className="question-paper-list">
            {questionPapers.length > 0 ? (
              questionPapers.map((paper) => (
                <div key={paper._id} className={`question-paper ${removing === paper._id ? 'fade-out' : ''}`}>
                  <h3>{paper.subject}</h3>
                  <div className="button-group">
                    <button onClick={() => setActiveModal({ type: 'paper', paper })}>Open Question Paper</button>
                    <button onClick={() => setActiveModal({ type: 'bank', paper })}>Open Question Bank</button>

                    <button className="dlt-btn" onClick={() => confirmDelete(paper._id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No question papers created yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL FOR QUESTION PAPER OR QUESTION BANK */}
      <AnimatePresence>
        {activeModal && (
          <motion.div className="question-modal-overlay" onClick={() => setActiveModal(null)}>
            <motion.div className="question-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <button onClick={() => setIsEditingModal(true)} className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>

                <button onClick={() => setActiveModal(null)} className="close-btn">
                  <FontAwesomeIcon icon={faTimes} /> Close
                </button>
              </div>
              <h3>{activeModal.type === 'paper' ? 'Question Paper' : 'Question Bank'}</h3>
              {activeModal.type === 'paper' ? (
                <ol>
                  {activeModal.paper.questions.map((q, index) => (
                    <ul key={index}>
                      <input
                        type="text"
                        value={q.mainQuestion}
                        onChange={(e) => handleEditQuestion(activeModal.paper, 'paper', index, null, e.target.value)}
                      />

                      <ol>
                        {q.subQuestions.map((subQ, subIndex) => (
                          <li key={subIndex}>
                            <input
                              type="text"
                              value={subQ}
                              onChange={(e) => handleEditQuestion(activeModal.paper, 'paper', index, subIndex, e.target.value)}
                            />
                            <button onClick={() => handleRemoveQuestion(activeModal.paper, 'paper', index, subIndex)} className="remove-btn">
                              <FontAwesomeIcon icon={faTimes} /> Remove</button>
                          </li>
                        ))}
                      </ol>
                    </ul>
                  ))}
                </ol>
              ) : (
                <ul>
                  {activeModal.paper.bank.map((q, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={q}
                        onChange={(e) => handleEditQuestion(activeModal.paper, 'bank', index, null, e.target.value)}
                      />
                      <button onClick={() => handleRemoveQuestion(activeModal.paper, 'bank', index)} className="remove-btn">
                        <FontAwesomeIcon icon={faTimes} /> Remove</button>
                    </li>
                  ))}
                </ul>
              )}

              <div className='button-group'>
                {isEditingModal ? (
                  <button onClick={handleSaveModal}>
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                ) : (
                  <button onClick={() => activeModal.type === 'paper' ? 
                    handleDownloadPaperPDF(activeModal.paper) : 
                    handleDownloadBankPDF(activeModal.paper)}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Confirm Delete Question Modal */}
        <AnimatePresence>
          {confirmDeleteIndex !== null && (
            <motion.div className="modal-overlay" onClick={() => setConfirmDeleteIndex(null)}>
              <motion.div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <FiAlertCircle className="modal-icon" />
                <h3 className="modal-title">Are you sure?</h3>
                <p className="modal-text">Do you really want to delete this question?</p>
                <div className="modal-buttons">
                  <button onClick={() => setConfirmDeleteIndex(null)} className="cancel-btn">No</button>
                  <button onClick={confirmRemoveQuestion} className="confirm-btn">Yes, Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirm Delete Paper Modal */}
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
                <p className="modal-text">Do you really want to delete this question paper?</p>
                <div className="modal-buttons">
                  <button onClick={() => setDeleteId(null)} className="cancel-btn">No</button>
                  <button onClick={handleDeleteQuestionPaper} className="confirm-btn">Yes, Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Modal */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setError(null)}
              className="modal-overlay"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="modal-content error-modal"
              >
                <FiAlertCircle className="modal-icon error-icon" />
                <h3 className="modal-title">Error</h3>
                <p className="modal-text">{error}</p>
                <div className="modal-buttons">
                  <button onClick={() => setError(null)} className="confirm-btn">OK</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProfilePage;
