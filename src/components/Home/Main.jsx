import React, { useState } from 'react';
import Header from '../Pages/Header';

export default function QuestionPaperPlanner() {
    const [subject, setSubject] = useState('');
    const [unitCount, setUnitCount] = useState(1);
    const [units, setUnits] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [academicYear, setAcademicYear] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [step, setStep] = useState(1); // Step state to manage the flow
    const [errors, setErrors] = useState({}); // To store error messages

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
        console.log('Generating random questions...');
    };

    const handleDownloadPDF = (type) => {
        console.log(`Downloading PDF as ${type}...`);
    };

    // Validate Year format (e.g., 2025-26)
    const validateYear = (year) => {
        const regex = /^\d{4}-\d{2}$/; // Matches a pattern like 2025-26
        return regex.test(year);
    };

    // Check if all fields for step 1 are filled and valid
    const validateStep1 = () => {
        const errors = {};
        if (!academicYear) errors.academicYear = "Academic Year is required.";
        if (!year) errors.year = "Year is required.";
        if (year && !validateYear(year)) errors.yearFormat = "Year must be in the format YYYY-YY.";
        if (!semester) errors.semester = "Semester is required.";
        return errors;
    };

    const handleNextStep = () => {
        const validationErrors = validateStep1();
        setErrors(validationErrors);

        // Only proceed to next step if no validation errors
        if (Object.keys(validationErrors).length === 0) {
            setStep(step + 1);
        }
    };

    return (
        <>
            <Header />
            <div id="question-paper-planner">
                <section id="main">
                    <h1>Create Your Question Paper</h1>

                    {/* Step 1: Academic Year, Year, and Semester Selection */}
                    {step === 1 && (
                        <div className='year'>
                            <label>Select Academic Year:</label>
                            <select
                                value={academicYear}
                                onChange={(e) => setAcademicYear(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="FY BCom">FY BCom</option>
                                <option value="SY BCom">SY BCom</option>
                                <option value="TY BCom">TY BCom</option>
                                <option value="IT">IT</option>
                            </select>
                            {errors.academicYear && <p className="error">{errors.academicYear}</p>}

                            <label>Enter Year (e.g., 2025-26):</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="2025-26"
                                required
                            />
                            {errors.year && <p className="error">{errors.year}</p>}
                            {errors.yearFormat && <p className="error">{errors.yearFormat}</p>}

                            <label>Select Semester:</label>
                            <select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                            >
                                <option value="">Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                            </select>
                            {errors.semester && <p className="error">{errors.semester}</p>}

                            <div className="gen-btn">
                                <button onClick={handleNextStep} disabled={Object.keys(errors).length > 0}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Subject and Unit Entry */}
                    {step === 2 && (
                        <div>
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
                                <div className='choose' key={index}>
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
                            ))}

                            <div>
                                <h3>Total Questions: {totalQuestions}</h3>
                            </div>

                            <section id="gen">
                                <div className='gen-btn'>
                                    <button onClick={handleGenerateQuestions}>Generate</button>
                                </div>

                                <div className='btn'>
                                    <button onClick={() => handleDownloadPDF('Question Bank')}>Download as Question Bank</button>
                                    <button onClick={() => handleDownloadPDF('Question Paper')}>Use as Question Paper</button>
                                </div>
                            </section>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
