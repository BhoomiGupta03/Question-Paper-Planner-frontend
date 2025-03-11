import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
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

  useEffect(() => {
    const storedPapers = JSON.parse(localStorage.getItem('questionPapers')) || [];
    setQuestionPapers(storedPapers);
  }, []);

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

  return (
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
                    <button onClick={() => confirmDelete(paper.id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
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
              <button onClick={() => setActiveModal(null)} className="close-btn">
                <FontAwesomeIcon icon={faTimes} /> Close
              </button>
              <h3>{activeModal.type === 'paper' ? 'Question Paper' : 'Question Bank'}</h3>

              <ol>
                {activeModal.type === 'paper'
                  ? activeModal.paper.questions.map((q, index) => (
                    <ul key={index}>{q.mainQuestion}
                      <ol>{q.subQuestions.map((subQ, i) => <li key={i}>{subQ}</li>)}</ol>
                    </ul>
                  ))
                  : activeModal.paper.bank.map((q, i) => <li key={i}>{q}</li>)
                }
              </ol>
              <div className='button-group'>
                <button onClick={() => handleDownloadPDF(activeModal.paper, activeModal.type === 'paper' ? 'Question Paper' : 'Question Bank')}>
                  <FontAwesomeIcon icon={faDownload} /> Download
                </button>
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
  );
};

export default ProfilePage;
