import React, { useEffect } from "react";
import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuthApiCall } from "../service/useApiCall";
import { useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn } = useAuthApiCall();

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      navigate("/stock");
    }
  }, [token, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginSchema = Yup.object().shape({
    identifier: Yup.string()
      .required("Username is required")
      .test("identifier", "Invalid email format or username", (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }),
    password: Yup.string().required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <div className="appLogin">
      <div className="containerLogin">
        <div className="auth">
          <Formik
            initialValues={{ identifier: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const { identifier, password, rememberMe } = values;

              const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              let payload = {};

              if (emailRegex.test(identifier)) {
                payload = {
                  email: identifier,
                  username: "",
                  password,
                  rememberMe,
                };
              } else {
                payload = {
                  email: "",
                  username: identifier,
                  password,
                  rememberMe,
                };
              }

              console.log(payload);
              signIn(payload);
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
                <h1>Login to Panel</h1>
                <Form className="formLogin">
                  <div>
                    <Field
                      type="text"
                      placeholder="username"
                      name="identifier"
                      value={values.identifier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`forminput ${
                        errors.identifier && touched.identifier ? "error" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="identifier"
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
                        placeholder="password"
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
                  <div className="remember">
                    <Field type="checkbox" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember</label>
                  </div>
                  <button
                    className="formbutton"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  <span className="account">
                    Don't have an account? <Link to="/register">Register</Link>
                  </span>
                  <span className="forget">
                    Forget your password? <Link to="/reset">Forget</Link>
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

export default Login;
