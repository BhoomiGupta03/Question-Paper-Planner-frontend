import React, { useState, useEffect } from 'react';
import Header from '../Pages/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { downloadPDF, saveQuestionPaperLocally, saveQuestionPaperToBackend } from '../utils/common';

export default function QuestionPaperPlanner() {
    const [subject, setSubject] = useState('');
    const [units, setUnits] = useState(Array(5).fill({ questions: '', questionCount: 6 }));
    const [academicYear, setAcademicYear] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [step, setStep] = useState(1);
    const [questionPaper, setQuestionPaper] = useState([]);
    const [questionBank, setQuestionBank] = useState([]);
    const [error, setError] = useState(null);
    const [unitsValid, setUnitsValid] = useState(Array(5).fill(false));
    const [unitTouched, setUnitTouched] = useState(Array(5).fill(false));
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const newUnitsValid = units.map(unit => {
            const questions = unit.questions?.split('\n').filter(q => q.trim()) || [];
            return questions.length >= 6;
        });

        setUnitsValid(newUnitsValid);
        setFormValid(newUnitsValid.every(valid => valid) && subject.trim() !== '');
    }, [units, subject]);

    const handleUnitChange = (index, field, value) => {
        let updatedUnits = [...units];
        updatedUnits[index] = { ...updatedUnits[index], [field]: value };

        if (field === 'questionCount' && value < 6) {
            updatedUnits[index].questionCount = 6;
        }

        setUnits(updatedUnits);

        if (field === 'questions') {
            let updatedTouched = [...unitTouched];
            updatedTouched[index] = true;
            setUnitTouched(updatedTouched);
        }
    };

    const handleGenerateQuestions = async () => {
        const allUnitsValid = units.every(unit => {
            const questions = unit.questions?.split('\n').filter(q => q.trim()) || [];
            return questions.length >= 6;
        });

        if (!allUnitsValid || subject.trim() === '') {
            setError("Please ensure all units have at least 6 questions and subject is provided.");
            return;
        }

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
            subject,
            academicYear,
            year,
            semester,
            questions: formattedQuestions,
            bank: bankQuestions
        };

        console.log(newPaper);

        saveQuestionPaperLocally(newPaper);
        setQuestionPaper(formattedQuestions);
        setQuestionBank(bankQuestions);

        const result = await saveQuestionPaperToBackend(newPaper);
        if (!result.success) {
            setError(result.error);
        } else {
            setError(null);
        }
    };

    const handleDownloadPaperPDF = () => {
        const paperData = {
            academicYear,
            year,
            semester,
            subject,
            questions: questionPaper,
            bank: questionBank
        };
        downloadPDF('Question Paper', paperData);
    };

    const handleDownloadBankPDF = () => {
        const paperData = {
            academicYear,
            year,
            semester,
            subject,
            questions: questionPaper,
            bank: questionBank
        };
        downloadPDF('Question Bank', paperData);
    };

    return (
        <>
            <Header />
            <div id="question-paper-planner">
                <section id="main">
                    <h1>Create Your Question Paper</h1>

                    {step === 1 && (
                        <Formik
                            initialValues={{
                                academicYear: academicYear,
                                year: year,
                                semester: semester
                            }}
                            validationSchema={Yup.object({
                                academicYear: Yup.string().required('Academic Year is required'),
                                year: Yup.string()
                                    .required('Year is required')
                                    .matches(/^\d{4}-\d{2}$/, 'Year should be in format YYYY-YY (e.g., 2025-26)'),
                                semester: Yup.string().required('Semester is required')
                            })}
                            onSubmit={(values) => {
                                setAcademicYear(values.academicYear);
                                setYear(values.year);
                                setSemester(values.semester);
                                setStep(2);
                            }}
                            validateOnBlur={true}
                            validateOnChange={true}
                        >
                            {({ isValid, handleSubmit }) => (
                                <Form className='year'>
                                    <label htmlFor="academicYear">Select Academic Year:</label>
                                    <Field as="select" name="academicYear" id="academicYear">
                                        <option value="">Select</option>
                                        <option value="FY BscIT">FY BscIT</option>
                                        <option value="SY BscIT">SY BscIT</option>
                                        <option value="TY BscIT">TY BscIT</option>
                                    </Field>
                                    <div className="error-message">
                                        <ErrorMessage name="academicYear" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <label htmlFor="year">Enter Year (e.g., 2025-26):</label>
                                    <Field type="text" name="year" id="year" placeholder="2025-26" />
                                    <div className="error-message">
                                        <ErrorMessage name="year" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <label htmlFor="semester">Select Semester:</label>
                                    <Field as="select" name="semester" id="semester">
                                        <option value="">Select Semester</option>
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                        <option value="3">Semester 3</option>
                                        <option value="4">Semester 4</option>
                                        <option value="5">Semester 5</option>
                                        <option value="6">Semester 6</option>
                                    </Field>
                                    <div className="error-message">
                                        <ErrorMessage name="semester" component="div" style={{ color: 'red' }} />
                                    </div>

                                    <div className="nxt-btn">
                                        <button type="button" onClick={handleSubmit} disabled={!isValid}>
                                            Next
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {step === 2 && (
                        <Formik
                            initialValues={{ subject: subject }}
                            validationSchema={Yup.object({
                                subject: Yup.string().required('Subject is required')
                            })}
                            onSubmit={(values) => {
                                setSubject(values.subject);
                                handleGenerateQuestions();
                            }}
                            validateOnBlur={true}
                            validateOnChange={true}
                        >
                            {({ isValid, handleSubmit, setFieldValue }) => (
                                <Form>
                                    <label htmlFor="subject">Subject:</label>
                                    <Field
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        placeholder="Subject"
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setFieldValue('subject', newValue);
                                            setSubject(newValue);
                                        }}
                                    />
                                    <div className="error-message">
                                        <ErrorMessage name="subject" component="div" style={{ color: 'red' }} />
                                    </div>
                                    {units.map((unit, index) => (
                                        <div key={index}>
                                            <h3>Unit {index + 1}</h3>
                                            <label>Enter Questions (one per line):</label>
                                            <textarea
                                                placeholder={`Questions for Unit ${index + 1} (minimum 6 required)`}
                                                value={unit.questions}
                                                onChange={(e) => handleUnitChange(index, 'questions', e.target.value)}
                                            />

                                            {/* Error if no input at all */}
                                            {unitTouched[index] && !unit.questions.trim() && (
                                                <div className="error-message" style={{ color: 'red' }}>
                                                    Please enter questions for this unit
                                                </div>
                                            )}

                                            {/* Error if fewer than 6 but not empty */}
                                            {unitTouched[index] && !unitsValid[index] && unit.questions.trim() && (
                                                <div className="error-message" style={{ color: 'red' }}>
                                                    At least 6 questions are required for this unit
                                                </div>
                                            )}

                                            <label>Select Number of Questions for Question Bank:</label>
                                            <select
                                                value={unit.questionCount}
                                                onChange={(e) => handleUnitChange(index, 'questionCount', parseInt(e.target.value))}
                                            >
                                                {[...Array(15)].map((_, i) => (
                                                    <option key={i + 6} value={i + 6}>{i + 6}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}

                                    <div className="nxt-btn">
                                        <button
                                            type="button"
                                            onClick={() => handleSubmit()}
                                            disabled={!formValid || !isValid}
                                        >
                                            Generate Question Paper
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}

                    {questionPaper.length > 0 && (
                        <div id="generated-paper">
                            <h2>Generated Question Paper</h2>

                            <div className='gen-btn'>
                                <button onClick={handleDownloadPaperPDF}>Download Question Paper</button>
                                <button onClick={handleDownloadBankPDF}>Download Question Bank</button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

