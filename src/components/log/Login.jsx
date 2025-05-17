import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import logsignimg from "../../img/log-signup-img.webp";
import api from "../../config/axiosConfig";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError(""); // Reset any previous error messages
      
      // Make the API request to login
      const response = await api.post(
        "/auth/login",
        { 
          email: values.email, 
          password: values.password 
        },
        { withCredentials: true }
      );
      
      console.log(response)
      // If we got here, API call was successful
      if (response.data && response.data.accessToken) {
        // Store token in localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        
        // Update auth context
        login(values.email, values.password, values.rememberMe);
        
        // Navigate to home page
        navigate("/");
      } else {
        // If we got a response but no token
        setLoginError("Login successful but no token received. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Show user-friendly error message
      if (error.response) {
        // The server responded with an error status
        setLoginError(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setLoginError(`Error: ${error.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="log-sign">
      <div className="left">
        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2>Welcome Back!</h2>
              <div className="input-field">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-field">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div className="rem-me-forgot">
                <div className="rem-me">
                  <Field type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <Link to="/ForgotPassword" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {loginError && (
                <div className="error-message">
                  {loginError}
                </div>
              )}

              <div className="btn">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                {/* <p>OR</p>
                <button type="button" className="google-login">
                  Sign in with Google
                </button> */}
              </div>

              <div className="account-exist">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </Form>
          )}
        </Formik>

        <div className="img-block">
          <img src={logsignimg} alt="log-signup" />
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
}

export default Login;