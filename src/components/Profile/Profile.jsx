import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [teacherName, setTeacherName] = useState(localStorage.getItem('teacherName') || 'John Doe');
  const [bio, setBio] = useState('Experienced teacher in Mathematics and Computer Science.');
  const [isEditing, setIsEditing] = useState(false);
  const [questionPapers, setQuestionPapers] = useState([]);

  useEffect(() => {
    setQuestionPapers([
      { id: 1, subject: 'Mathematics', title: 'Algebra Final Exam' },
      { id: 2, subject: 'Computer Science', title: 'Data Structures Mid-Term' },
    ]);
  }, []);

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile updated:', { teacherName, bio });
  };

  const handleDeleteQuestionPaper = (id) => {
    setQuestionPapers((prev) => prev.filter((paper) => paper.id !== id));
    console.log(`Question paper with ID ${id} deleted.`);
  };

  const handleEditQuestionPaper = (id) => {
    console.log(`Editing question paper with ID ${id}.`);
  };

  return (
    <div className="profile-container">
      <div className='header'>
      <Header/>
      </div>
      <div className='profile-content'>
      <div className="profile-header">
        <div className="profile-details">
          {isEditing ? (
            <div className="profile-edit-form">
              <input
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Enter teacher's name"
                className="input-field"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter teacher's bio"
                className="input-field"
              />
              <div className="edit-save-btn">
              <button onClick={handleSaveProfile}>
                <FontAwesomeIcon icon={faSave} className="icon" /> Save
              </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="profile-name">{teacherName}</h2>
              <p className="profile-bio">{bio}</p>
              <div className="edit-save-btn">        
                  <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} className="icon" /> Edit Profile
              </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="question-paper-section">
        <h2 className="section-title">Question Papers</h2>
        <div className="question-paper-list">
          {questionPapers.length > 0 ? (
            <div>
              {questionPapers.map((paper) => (
                <div key={paper.id} className="question-paper">
                  <div>
                    <h3 className="question-title">{paper.title}</h3>
                    <p className="question-subject">Subject: {paper.subject}</p>
                  </div>
                  <div className="button-group">
                    <button onClick={() => handleEditQuestionPaper(paper.id)} className="edit-btn">
                      <FontAwesomeIcon icon={faEdit} className="icon" /> Edit
                    </button>
                    <button onClick={() => handleDeleteQuestionPaper(paper.id)} className="delete-btn">
                      <FontAwesomeIcon icon={faTrash} className="icon" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-question-papers">No question papers created yet.</p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
