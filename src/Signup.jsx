import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Signup({ onSignup }) {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(15, "First name cannot exceed 15 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(20, "Last name cannot exceed 20 characters")
      .required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    isChecked: Yup.boolean().oneOf(
      [true],
      "You must agree to the Terms & Privacy Policy"
    ),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isChecked: false,
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    onSignup(); // Trigger the signup logic
    navigate("/Header"); // Redirect after successful signup
  };

  return (
    <div className="signup-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Create an Account</h2>

            {/* First Name */}
            <div>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error-message"
              />
            </div>

            {/* Last Name */}
            <div>
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error-message"
              />
            </div>

            {/* Email */}
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            {/* Password */}
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            {/* Terms & Privacy Policy Checkbox */}
            <div className="check">
              <Field type="checkbox" name="isChecked" />
              <label>
                I agree to the <a href="/terms">Terms</a> &{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
              <ErrorMessage
                name="isChecked"
                component="div"
                className="error-message"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              Create an Account
            </button>

            {/* Google Signup Button */}
            <button type="button" onClick={() => console.log("Signup with Google")}>
              Signup with Google
            </button>

            {/* Login Link */}
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
