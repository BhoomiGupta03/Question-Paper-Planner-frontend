// utils/common.js
import jsPDF from 'jspdf';

// Function to save question paper to localStorage
export const saveQuestionPaperLocally = (paper) => {
  const savedPapers = JSON.parse(localStorage.getItem('questionPapers')) || [];
  savedPapers.push({ ...paper, id: Date.now() });
  localStorage.setItem('questionPapers', JSON.stringify(savedPapers));
};

// Function to generate and download PDF
export const downloadPDF = (type, paper) => {
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

// Function to save question paper to backend
export const saveQuestionPaperToBackend = async (paper) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No authentication token found. Please log in again.');
      return { success: false, error: 'No authentication token found' };
    }
    
    const response = await fetch('https://question-paper-planner-backend-production.up.railway.app/api/questionpapers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(paper)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server response:', response.status, errorData);
      return { 
        success: false, 
        error: errorData.error || `Failed to save question paper (${response.status})` 
      };
    }
    
    const saved = await response.json();
    return { success: true, data: saved };
  } catch (err) {
    console.error('Error saving to backend:', err);
    return { success: false, error: err.message };
  }
};

// Function to update question paper on the backend
export const updateQuestionPaper = async (paperId, updatedPaper) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return { 
        success: false, 
        error: 'Authentication token not found. Please log in again.' 
      };
    }
    
    const response = await fetch(`https://question-paper-planner-backend-production.up.railway.app/api/questionpapers/${paperId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedPaper)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.message || `Failed to update paper (${response.status})` 
      };
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { 
      success: false, 
      error: err.message || 'Network error. Please check your connection.' 
    };
  }
};

// Function to delete question paper from the backend
export const deleteQuestionPaper = async (paperId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return { 
        success: false, 
        error: 'Authentication token not found. Please log in again.' 
      };
    }
    
    const response = await fetch(`https://question-paper-planner-backend-production.up.railway.app/api/questionpapers/${paperId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.message || `Failed to delete paper (${response.status})` 
      };
    }
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err.message || 'Network error. Please check your connection.' 
    };
  }
};