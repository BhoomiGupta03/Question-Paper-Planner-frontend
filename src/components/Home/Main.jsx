import React, { useState } from 'react';

export default function QuestionPaperPlanner() {
    const [subject, setSubject] = useState('');
    const [unitCount, setUnitCount] = useState(1);
    const [units, setUnits] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);

    const handleUnitChange = (index, key, value) => {
        const updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], [key]: value };
        setUnits(updatedUnits);
        calculateTotalQuestions(updatedUnits);
    };

    const calculateTotalQuestions = (units) => {
        const total = units.reduce((sum, unit) => sum + (parseInt(unit.questionCount) || 0), 0);
        setTotalQuestions(total);
    };

    const handleGenerateQuestions = () => {
        // Logic to generate random questions from topics/questions entered
        console.log('Generating random questions...');
    };

    const handleDownloadPDF = (type) => {
        // Logic for downloading a PDF (as Question Bank or Question Paper)
        console.log(`Downloading PDF as ${type}...`);
    };

    return (
        <div id="question-paper-planner">
            <section id="main">
                <h1>Create Your Question Paper</h1>

                <div className='sub'>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        required
                    />
                </div>

                <div className='unit'>
                    <label>Select Number of Units (1-10):</label>
                    <select
                        value={unitCount}
                        onChange={(e) => {
                            setUnitCount(Number(e.target.value));
                            setUnits(new Array(Number(e.target.value)).fill({}));
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {[...Array(unitCount)].map((_, index) => (
                    < div className='choose'>
                    <div key={index}>
                        <h3>Unit {index + 1}</h3>

                        <label>Enter Topics:</label>
                        <textarea
                            placeholder={`Topics for Unit`}
                            value={units[index]?.topics || ''}
                            onChange={(e) => handleUnitChange(index, 'topics', e.target.value)}
                        />

                        <h3>OR</h3>

                        <label>Enter Questions:</label>
                        <textarea
                            placeholder={`Questions for Unit`}
                            value={units[index]?.questions || ''}
                            onChange={(e) => handleUnitChange(index, 'questions', e.target.value)}
                        />

                        <label>Number of Questions to Generate from Unit {index + 1}:</label>
                        <select
                            value={units[index]?.questionCount || 0}
                            onChange={(e) => handleUnitChange(index, 'questionCount', e.target.value)}
                        >
                            {[...Array(21)].map((_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>
                ))}

                <div>
                    <h3>Total Questions: {totalQuestions}</h3>
                </div>
            </section>

            <section id="gen">
                <div className='gen-btn'>
                <button onClick={handleGenerateQuestions}>
                    Generate
                </button>
                </div>

                <div className='btn'>
                    <button onClick={() => handleDownloadPDF('Question Bank')}>
                        Download as Question Bank
                    </button>
                    <button onClick={() => handleDownloadPDF('Question Paper')}>
                        Use as Question Paper
                    </button>
                </div>
            </section>
        </div>
    );
}
