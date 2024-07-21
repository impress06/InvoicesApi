import React from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useAuthApiCall} from "../service/useApiCall"

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {signUp}=useAuthApiCall()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="appLogin">
      <div className="containerLogin">
        <div className="auth">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { username, email, password, rememberMe } = values;

              const payload = {
                username,
                email,
                password,
                rememberMe,
              };

              console.log(payload);

              signUp(payload); 
              setSubmitting(false);
              resetForm();
            }}
          >
            {({
              handleChange,
              values,
              isSubmitting,
              errors,
              touched,
              handleBlur,
            }) => (
              <>
                <h1>SignUp to Panel</h1>
                <Form className="formLogin">
                  <div>
                    <Field
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`forminput ${
                        errors.username && touched.username ? "error" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Email"
                      onBlur={handleBlur}
                      className={`forminput ${
                        errors.email && touched.email ? "error" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="password-field">
                    <div className="password-input-wrapper">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onBlur={handleBlur}
                        placeholder="Password"
                        className={`forminput inputeye ${
                          errors.password && touched.password ? "error" : ""
                        }`}
                      />
                      <i
                        type="button"
                        onClick={toggleShowPassword}
                        className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                  <button
                    className="formbutton"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    SignUp
                  </button>
                  <span className="account">
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
