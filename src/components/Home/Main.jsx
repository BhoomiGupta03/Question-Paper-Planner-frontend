import React, { useState } from 'react';
import Header from '../Pages/Header';
import jsPDF from 'jspdf';

export default function QuestionPaperPlanner() {
    const [subject, setSubject] = useState('');
    const [units, setUnits] = useState(Array(5).fill({ questions: '', questionCount: 6 }));
    const [academicYear, setAcademicYear] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [step, setStep] = useState(1);
    const [questionPaper, setQuestionPaper] = useState([]);
    const [questionBank, setQuestionBank] = useState([]);
    // const [errors, setErrors] = useState({});

    const validateInputs = () => {
        if (!academicYear || !year || !semester || !subject) {
            return false;
        }
        return true;
    };

    const handleUnitChange = (index, field, value) => {
        let updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], [field]: value };
        setUnits(updatedUnits);
    };

    const handleGenerateQuestions = () => {
        if (!validateInputs()) return;

        let formattedQuestions = [];
        let bankQuestions = [];

        for (let i = 0; i < 5; i++) {
            let unitQuestions = units[i]?.questions?.split('\n').filter(q => q.trim()) || [];
            let shuffledQuestions = unitQuestions.sort(() => 0.5 - Math.random());
            let selectedQuestions = shuffledQuestions.slice(0, 6);
            
            formattedQuestions.push({
                mainQuestion: `Q${i + 1}. Attempt any 3 out of 6 : (15 Marks)`,
                subQuestions: selectedQuestions.sort(() => 0.5 - Math.random())
            });
            
            let unitBankQuestions = shuffledQuestions.slice(0, units[i].questionCount);
            bankQuestions.push(...unitBankQuestions);

        }

        const newPaper = {
            id: Date.now(),
            subject,
            academicYear,
            year,
            semester,
            questions: formattedQuestions,
            bank: bankQuestions
        };

        const savedPapers = JSON.parse(localStorage.getItem('questionPapers')) || [];
        savedPapers.push(newPaper);
        localStorage.setItem('questionPapers', JSON.stringify(savedPapers));

        setQuestionPaper(formattedQuestions);
        setQuestionBank(bankQuestions);
    };

    const handleDownloadPDF = (type) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`BSc IT ${type}`, 20, 20);
        doc.setFontSize(12);
        doc.text(`Academic Year: ${academicYear}`, 20, 30);
        doc.text(`Year: ${year}`, 20, 40);
        doc.text(`Semester: ${semester}`, 20, 50);
        doc.text(`Subject: ${subject}`, 20, 60);
        
        let y = 80;
        if (type === 'Question Paper') {
            doc.text("Total Marks: 75", 150, 60);
            questionPaper.forEach((q, index) => {
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
            questionBank.forEach((q, i) => {
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
        <>
            <Header />
            <div id="question-paper-planner">
                <section id="main">
                    <h1>Create Your Question Paper</h1>

                    {step === 1 && (
                        <div className='year'>
                            <label>Select Academic Year:</label>
                            <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
                                <option value="">Select</option>
                                <option value="FY BscIT">FY BscIT</option>
                                <option value="SY BscIT">SY BscIT</option>
                                <option value="TY BscIT">TY BscIT</option>
                            </select>
                            <label>Enter Year (e.g., 2025-26):</label>
                            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025-26" required />
                            <label>Select Semester:</label>
                            <select value={semester} onChange={(e) => setSemester(e.target.value)}>
                                <option value="">Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                            </select>
                            <div className="nxt-btn">
                                <button onClick={() => setStep(2)}>Next</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <label>Subject:</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />

                            {units.map((unit, index) => (
                                <div key={index}>
                                    <h3>Unit {index + 1}</h3>
                                    <label>Enter Questions (one per line):</label>
                                    <textarea placeholder={`Questions for Unit`} value={unit.questions} onChange={(e) => handleUnitChange(index, 'questions', e.target.value)} />
                                    <label>Select Number of Questions:</label>
                                    <select value={unit.questionCount} onChange={(e) => handleUnitChange(index, 'questionCount', parseInt(e.target.value))}>
                                        {[...Array(21)].map((_, i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <div className="nxt-btn">
                                <button onClick={handleGenerateQuestions}>Generate Question Paper</button>
                            </div>
                        </div>
                    )}

                    {questionPaper.length > 0 && (
                         <div id="generated-paper">
                            <h2>Generated Question Paper</h2>

                        <div className='gen-btn'>
                            <button onClick={() => handleDownloadPDF('Question Paper')}>Download Question Paper</button>
                            <button onClick={() => handleDownloadPDF('Question Bank')}>Download Question Bank</button>
                        </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
