import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faDownload, faTimes} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import jsPDF from 'jspdf';

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

  const accountCreationDate = localStorage.getItem('accountCreationDate') || new Date().toLocaleDateString();

  useEffect(() => {
    if (!localStorage.getItem('accountCreationDate')) {
      localStorage.setItem('accountCreationDate', accountCreationDate);
    }
    const storedPapers = JSON.parse(localStorage.getItem('questionPapers')) || [];
    setQuestionPapers(storedPapers);
  }, [accountCreationDate]);

  useEffect(() => {
    if (activeModal) {
      setEditedContent(
        activeModal.type === 'paper'
          ? activeModal.paper.questions.map(q => `${q.mainQuestion}\n${q.subQuestions.join('\n')}`)
          : activeModal.paper.bank
      );
    }
  }, [activeModal]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem('teacherName', teacherName);
    localStorage.setItem('bio', bio);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDeleteQuestionPaper = () => {
    if (deleteId !== null) {
  
      setRemoving(deleteId);
      setTimeout(() => {
        const updatedPapers = questionPapers.filter((paper) => paper.id !== deleteId);
        setQuestionPapers(updatedPapers);
        localStorage.setItem('questionPapers', JSON.stringify(updatedPapers));
        setRemoving(null);
        setDeleteId(null);
      }, 500);
    }
  };

  const handleSaveModal = () => {
    if (activeModal) {
      const updatedPapers = questionPapers.map((paper) => {
        if (paper.id === activeModal.paper.id) {
          return activeModal.type === 'paper' ? 
            { ...paper, questions: editedContent.map(q => {
                const lines = q.split('\n');
                return { mainQuestion: lines[0], subQuestions: lines.slice(1) };
              })
            } : 
            { ...paper, bank: editedContent };
        }
        return paper;
      });
      setQuestionPapers(updatedPapers);
      localStorage.setItem('questionPapers', JSON.stringify(updatedPapers));
      setIsEditingModal(false);
    }
  };

  const handleRemoveQuestion = (paper, type, index, subIndex = null) => {
    setConfirmDeleteIndex({ paper, type, index, subIndex });
  };

  const confirmRemoveQuestion = () => {
    const { paper, type, index, subIndex } = confirmDeleteIndex;
    const updatedPapers = questionPapers.map((p) => {
      if (p.id === paper.id) {
        if (type === 'paper') {
          const updatedQuestions = [...p.questions];
          if (subIndex !== null) {
            updatedQuestions[index].subQuestions.splice(subIndex, 1);
          } else {
            updatedQuestions.splice(index, 1);
          }
          return { ...p, questions: updatedQuestions };
        } else {
          const updatedBank = [...p.bank];
          updatedBank.splice(index, 1);
          return { ...p, bank: updatedBank };
        }
      }
      return p;
    });
    setQuestionPapers(updatedPapers);
    localStorage.setItem('questionPapers', JSON.stringify(updatedPapers));
    setConfirmDeleteIndex(null);
  };
  

  const handleDownloadPDF = (paper, type) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`BSc IT ${type}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Academic Year: ${paper.academicYear}`, 20, 30);
    doc.text(`Year: ${paper.year}`, 20, 40);
    doc.text(`Semester: ${paper.semester}`, 20, 50);
    doc.text(`Subject: ${paper.subject}`, 20, 60);

    let y = 80;
    if (type === 'Question Paper') {
      doc.text("Total Marks: 75", 150, 60);
      paper.questions.forEach((q, index) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        doc.text(`${q.mainQuestion}`, 20, y);
        y += 10;
        q.subQuestions.forEach((subQ, i) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(`${i + 1}. ${subQ}`, 30, y);
          y += 8;
        });
        y += 10;
      });
    } else {
      doc.text("Question Bank", 20, y);
      y += 10;
      paper.bank.forEach((q, i) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(`${i + 1}. ${q}`, 30, y);
        y += 8;
      });
    }

    doc.save(type === 'Question Bank' ? "QuestionBank.pdf" : "QuestionPaper.pdf");
  };

  const handleEditQuestion = (paper, type, index, subIndex = null, newValue) => {
    const updatedPapers = questionPapers.map((p) => {
      if (p.id === paper.id) {
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
    localStorage.setItem('questionPapers', JSON.stringify(updatedPapers));
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
                <div key={paper.id} className={`question-paper ${removing === paper.id ? 'fade-out' : ''}`}>
                  <h3>{paper.subject}</h3>
                  <div className="button-group">
                    <button onClick={() => setActiveModal({ type: 'paper', paper })}>Open Question Paper</button>
                    <button onClick={() => setActiveModal({ type: 'bank', paper })}>Open Question Bank</button>
                
                    <button className="dlt-btn" onClick={() => confirmDelete(paper.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
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
                      <FontAwesomeIcon icon={faTimes} />Remove</button>
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
                <button onClick={() => handleDownloadPDF(activeModal.paper, activeModal.type === 'paper' ? 'Question Paper' : 'Question Bank')}>
                  <FontAwesomeIcon icon={faDownload} /> Download
                </button>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

    </div>
    </>
  );
};

export default ProfilePage;
