import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Signup({ onSignup }) {
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isChecked: false,
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      onSignup(); 
      navigate("/Header"); 
    },
  });

  return (
    <div className="signup-container">
      <form onSubmit={formik.handleSubmit}>
        <h2>Create an Account</h2>

        <div>
          <input
            type="text"
            name="firstName"
            placeholder={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : "First Name"
            }
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.firstName && formik.errors.firstName
                ? "error"
                : ""
            }
          />
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            placeholder={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : "Last Name"
            }
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.lastName && formik.errors.lastName ? "error" : ""
            }
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email"
            }
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Password"
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
          />
        </div>

        <div className="check">
          <input
            type="checkbox"
            name="isChecked"
            checked={formik.values.isChecked}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label>
            I agree to the <a href="/terms">Terms</a> &{" "}
            <a href="/privacy">Privacy Policy</a>
          </label>
          {formik.touched.isChecked && formik.errors.isChecked && (
            <p className="error-message">{formik.errors.isChecked}</p>
          )}
        </div>

        <button type="submit">Create an Account</button>
        <button type="button" onClick={() => console.log("Signup with Google")}>
          Signup with Google
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
