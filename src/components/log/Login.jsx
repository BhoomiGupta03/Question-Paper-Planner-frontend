 import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

 function Login({ onLogin }) {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      console.log("Login successful");
      onLogin();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
    <div className="right">
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Welcome Back!</h2>
            <p>Kindly enter your details.</p>

            <div className="input-field">
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="input"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="input-field">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="input"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="rem-me-forgot">
              <div className="rem-me">
                <Field type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="btn">
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              Login
            </button>
            <p>OR</p>

            <button type="button" className="google-login">
              Sign in with Google
            </button>

            <div className="account-exist">
              <p>
                Don’t have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>

    <div className="left">
      <h1>left side</h1>
    </div>
  </div>



//     <div className="login-container">
//       <div className="right">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <h2>Welcome Back!</h2>
//             <p>Kindly enter your details.</p>

//             <div className="input-field">
//               <Field
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="input"
//               />
//               <ErrorMessage name="email" component="div" className="error" />
//             </div>

//             <div className="input-field">
//               <Field
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 className="input"
//               />
//               <ErrorMessage name="password" component="div" className="error" />
//             </div>

//             <div className="rem-me-forgot">
//               <div className="rem-me">
//                 <Field type="checkbox" id="rememberMe" name="rememberMe" />
//                 <label htmlFor="rememberMe">Remember Me</label>
//               </div>
//               <Link to="/forgot-password" className="forgot-password">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button type="submit" disabled={isSubmitting} className="submit-btn">
//               Login
//             </button>
//             <p>OR</p>

//             <button type="button" className="google-login">
//               Sign in with Google
//             </button>

//             <div className="account-exist">
//               <p>
//                 Don’t have an account? <Link to="/signup">Sign Up</Link>
//               </p>
//             </div>
//           </Form>
//         )}
//       </Formik>
//       </div>

//       <div div className="left">
//         <h2>left side</h2></div>

      
//     </div>
 );
 }

 export default Login;
