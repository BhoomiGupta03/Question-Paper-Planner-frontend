import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation

function Login({ onLogin }) {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // Form submission handler
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    onLogin(); // Trigger the login
  };

  return (
    <div className="login-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Welcome Back!</h2>
            <p>Kindly Enter your details.</p>

            <div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="rem-me-forgot">
              <div className="rem-me">
                <Field type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>


            <button type="submit" disabled={isSubmitting}>
              Login
            </button>

            <button type="button" className="google-login">
              Sign in with Google
            </button>

            <div className="account-exist">
            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
