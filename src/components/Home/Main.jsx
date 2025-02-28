import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from '../Pages/Header';

const StepOneSchema = Yup.object().shape({
  academicYear: Yup.string().required('Academic Year is required'),
  year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, 'Year must be in the format YYYY-YY')
    .required('Year is required'),
  semester: Yup.string().required('Semester is required'),
});

const StepTwoSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  units: Yup.array()
    .of(
      Yup.object().shape({
        topics: Yup.string(),
        questions: Yup.string(),
        questionCount: Yup.number().min(0).required('Question count is required'),
      })
    )
    .required(),
});

export default function QuestionPaperPlanner() {
  const [step, setStep] = useState(1);
  const initialStepOneValues = { academicYear: '', year: '', semester: '' };
  const initialStepTwoValues = { subject: '', units: Array(1).fill({ topics: '', questions: '', questionCount: 0 }) };

  const calculateTotalQuestions = (units) => {
    return units.reduce((sum, unit) => sum + (parseInt(unit.questionCount) || 0), 0);
  };

  const handleNextStep = (values) => {
    setStep(step + 1);
  };

  const handleGenerateQuestions = () => {
    console.log('Generating random questions...');
  };

  const handleDownloadPDF = (type) => {
    console.log(`Downloading PDF as ${type}...`);
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
                                <option value="FY BCom">FY BscIT</option>
                                <option value="SY BCom">SY BscIT</option>
                                <option value="TY BCom">TY BscIT</option>
                                {/* <option value="IT">IT</option> */}
                            </select>
                            {errors.academicYear && <p className="error">{errors.academicYear}</p>}

                  <label>Enter Year (e.g., 2025-26):</label>
                  <Field type="text" name="year" placeholder="2025-26" />
                  <ErrorMessage name="year" component="p" className="error" />

                  <label>Select Semester:</label>
                  <Field as="select" name="semester">
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6].map((sem) => (
                      <option key={sem} value={sem}>{`Semester ${sem}`}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="semester" component="p" className="error" />

                            <div className="nxt-btn">
                                <button onClick={handleNextStep} disabled={Object.keys(errors).length > 0}>Next</button>
                            </div>
                        </div>
                    )}

          {step === 2 && (
            <Formik
              initialValues={initialStepTwoValues}
              validationSchema={StepTwoSchema}
              onSubmit={handleGenerateQuestions}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="sub">
                    <label>Subject:</label>
                    <Field type="text" name="subject" placeholder="Subject" />
                    <ErrorMessage name="subject" component="p" className="error" />
                  </div>

                            <div className='unit'>
                                <label>Select Number of Units (1-5):</label>
                                <select
                                    value={unitCount}
                                    onChange={(e) => {
                                        setUnitCount(Number(e.target.value));
                                        setUnits(new Array(Number(e.target.value)).fill({}));
                                    }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                  {values.units.map((unit, index) => (
                    <div className="choose" key={index}>
                      <h3>Unit {index + 1}</h3>

                      <label>Enter Topics:</label>
                      <Field as="textarea" name={`units.${index}.topics`} placeholder={`Topics for Unit`} />

                      <h3>OR</h3>

                      <label>Enter Questions:</label>
                      <Field as="textarea" name={`units.${index}.questions`} placeholder={`Questions for Unit`} />

                      <label>Number of Questions to Generate from Unit {index + 1}:</label>
                      <Field as="select" name={`units.${index}.questionCount`}>
                        {[...Array(21)].map((_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Field>
                    </div>
                  ))}

                  <div>
                    <h3>Total Questions: {calculateTotalQuestions(values.units)}</h3>
                  </div>

                  <section id="gen">
                    <div className="gen-btn">
                      <button type="submit">Generate</button>
                    </div>
                    <div className="btn">
                      <button type="button" onClick={() => handleDownloadPDF('Question Bank')}>Download as Question Bank</button>
                      <button type="button" onClick={() => handleDownloadPDF('Question Paper')}>Use as Question Paper</button>
                    </div>
                  </section>
                </Form>
              )}
            </Formik>
          )}
        </section>
      </div>
    </>
  );
}