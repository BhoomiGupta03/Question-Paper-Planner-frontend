import React, { useState } from 'react';

export default function Main() {
    const [subject, setSubject] = useState('');
    const [unitCount, setUnitCount] = useState(1);
    const [units, setUnits] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const handleUnitChange = (index, value) => {
        const updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], unit: value };
        setUnits(updatedUnits);
    };

    const handleTopicChange = (index, value) => {
        const updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], topic: value };
        setUnits(updatedUnits);
    };

    const handleQuestionCountChange = (index, value) => {
        const updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], questionCount: value };
        setUnits(updatedUnits);
    };

    const handleGenerateQuestions = () => {
        // Logic for generating questions and shuffling them
        console.log('Generating random questions...');
        // You could later implement logic to prevent duplicate questions by shuffling and filtering.
    };

    const handleDownloadPDF = () => {
        // Logic for generating PDF
        console.log('Generating PDF...');
    };

    return (
        <div id="main">
            <section id="sub-name">
                <h1>Create Your Question Paper</h1>
                
                <div className="sub">
                    <label>Enter Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                <div className="academic-year">
                    <label>Academic Year:</label>
                    <input
                        type="text"
                        placeholder="Academic Year"
                        required
                    />
                </div>

                <div className="semester">
                    <label>Semester:</label>
                    <input
                        type="text"
                        placeholder="Semester"
                        required
                    />
                </div>

                {/* Unit input */}
                {[...Array(unitCount)].map((_, index) => (
                    <div key={index} className="unit">
                        <label>Enter Unit {index + 1}:</label>
                        <input
                            type="text"
                            placeholder={`Unit ${index + 1}`}
                            value={units[index]?.unit || ''}
                            onChange={(e) => handleUnitChange(index, e.target.value)}
                            required
                        />
                        
                        <label>Enter Topics for Unit {index + 1}:</label>
                        <input
                            type="text"
                            placeholder={`Topic for Unit ${index + 1}`}
                            value={units[index]?.topic || ''}
                            onChange={(e) => handleTopicChange(index, e.target.value)}
                            required
                        />
                        
                        <label>Number of Questions for Unit {index + 1}:</label>
                        <select
                            value={units[index]?.questionCount || 1}
                            onChange={(e) => handleQuestionCountChange(index, e.target.value)}
                        >
                            {[...Array(20)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                ))}
                
                <div className="unit-controls">
                    <button onClick={() => setUnitCount(Math.min(unitCount + 1, 10))}>
                        Add Unit
                    </button>
                    <button onClick={() => setUnitCount(Math.max(unitCount - 1, 1))}>
                        Remove Unit
                    </button>
                </div>
            </section>
            
            <section id="gen">
                <div className="gen-pdf">
                    <button onClick={handleDownloadPDF}>
                        Download PDF
                    </button>
                </div>
                
                <div className="gen-more-ques">
                    <button onClick={handleGenerateQuestions}>
                        Generate My Questions
                    </button>
                </div>

                <div className="total-questions">
                    <label>Total Questions: </label>
                    <span>{units.reduce((total, unit) => total + (parseInt(unit.questionCount) || 0), 0)}</span>
                </div>
            </section>
        </div>
    );
}
