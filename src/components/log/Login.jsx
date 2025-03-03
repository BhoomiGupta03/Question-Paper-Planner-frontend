import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import logsignimg from "../../img/log-signup-img.webp";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

  const handleSubmit = (values) => {
    const success = login(values.email, values.password, values.rememberMe);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="log-sign">
      <div className="left">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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

              <div className="btn">
                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
                <p>OR</p>
                <button type="button" className="google-login">
                  Sign in with Google
                </button>
              </div>

              <div className="account-exist">
                Don’t have an account? <Link to="/signup">Sign Up</Link>
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
