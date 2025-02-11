import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthContext";
import logsignimg from "../../img/log-signup-img.webp";


function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes"
      )
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    isChecked: Yup.boolean().oneOf([true], "You must agree to the Terms & Privacy Policy"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  };
  const handleSubmit = (values) => {
    signup(values.name, values.email, values.password);
    localStorage.setItem('teacherName', values.name); // Store teacher's name in localStorage
    navigate("/login");
  };
  

  return (
    <div className="log-sign">
      <div className="left">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <h2>Create an Account</h2>
              <div className="input-field">
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" /></div>

              <div className="input-field">
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" /></div>

              <div className="input-field">
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" /></div>

              <div className="input-field">
                <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>

              <div className="check">
                <Field type="checkbox" name="isChecked" />
                <label htmlFor="isChecked">
                  I agree to the <a href="/terms">Terms</a> & <a href="/privacy">Privacy Policy</a>
                </label>
                <ErrorMessage name="isChecked" component="div" className="error" />
              </div>

              <div className="btn">
                <button type="submit" disabled={isSubmitting}>
                  Create an Account
                </button>
                
                <p>OR</p>

                <button type="button" className="google-login">
                  Sign in with Google
                </button>
              </div>

              <div className="account-exist">
                Already have an account? <a href="/login"> Login </a>
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

export default Signup;
