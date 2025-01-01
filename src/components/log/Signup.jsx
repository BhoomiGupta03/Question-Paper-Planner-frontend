import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Signup({ onSignup }) {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    isChecked: Yup.boolean().oneOf([true], "You must agree to the Terms & Privacy Policy"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  };

  // Google Sign-Up handler
  const handleGoogleSignUp = useCallback(() => {
    console.log("Google Sign-Up initiated");
    // Trigger the sign-up logic for Google sign-up
    onSignup(); // You may replace this with an actual logic for Google authentication.
    navigate("/login"); // Redirect to login page after successful Google sign-up
  }, [onSignup, navigate]);

  // Form submission handler
  const handleSubmit = (values) => {
    // Assuming the sign-up logic (e.g., saving user data to localStorage)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    // Call the onSignup function if needed
    onSignup(); // Trigger any action related to sign-up

    // Redirect to login page after successful sign-up
    navigate("/login");
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

            {/* Name Field */}
            <div>
              <Field type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            {/* Email Field */}
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            {/* Password Field */}
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {/* Confirm Password Field */}
            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            {/* Terms & Privacy Policy Checkbox */}
            <div className="check">
              <Field type="checkbox" name="isChecked" />
              <label>
                I agree to the <a href="/terms">Terms</a> &{" "}
                <a href="/privacy">Privacy Policy</a>
              </label>
              <ErrorMessage name="isChecked" component="div" className="error" />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              Create an Account
            </button>

            {/* Google Sign-Up Button */}
            <div id="google-signup-btn">
              <button type="button" onClick={handleGoogleSignUp}>
                Sign Up with Google
              </button>
            </div>

            {/* Already have an account link */}
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
