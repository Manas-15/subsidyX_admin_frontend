/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import styles from "../styles/Login.module.css";
import { CustomButton } from "../components/Common/CustomButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../components/Common/Validation";
import { userActions } from "../redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DotLoading } from "../components/Common/Loader";
import jwt from "jsonwebtoken";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, toggleShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state?.user);

  const accessToken = useSelector(state => state?.user?.user?.access_token)

  function decodeAccessToken(accessToken) {
    try {
      const decodedToken = jwt.decode(accessToken);
      return decodedToken;
    } catch (error) {
      console.log("Error decoding access token:", error);
      return null;
    }
  }
  const decodedData = decodeAccessToken(accessToken);
  if (decodedData) {
    console.log("Decoded data:", decodedData);
  }

  useEffect(() => {
    if (accessToken !== undefined) {
      console.log('here')
      router.push("/industry_category");
      setIsLoading(false);
    } else {
      router.push("/");
      setIsLoading(false);
    }
  }, [accessToken]);

  const submit = (values) => {
    dispatch(userActions.login(values));
    setIsLoading(true);
  };

  return (
    <div>
      <div className={styles.login}>
        <div className={styles.login_img}>
          <div className="text-light mx-auto">SubsidyX</div>
          <div className={styles.start_journey}>
            <h4 className="text-light fw-bold">
              Start your <br />
              Journey with us.
            </h4>
            <span className="text-secondary">
              The standard Lorem Ipsum passage is: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </span>
          </div>
        </div>

        <div className={styles.login_form}>
          <div className={styles.login_form_container}>
            <div className={styles.input_container}>
              <Formik
                enableReinitialize
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values, event) => {
                  submit(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <>
                    <h4 className={`fw-bold`}>Login</h4>
                    <p className={styles.login_span}>
                      Are you a part of SubsidyX family
                    </p>

                    <Form autoComplete="false">
                      <div className="form-group m-0">
                        <label htmlFor="email" className="has-float-label">
                          <Field
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            className={
                              "form-control" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                          />
                        </label>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mt-4 mb-3">
                        <label htmlFor="password" className="has-float-label">
                          <Field
                            name="password"
                            id="password"
                            type="password"
                            // type={showPassword ? "password" : "text"}
                            placeholder="Password"
                            className={
                              "form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                          />

                          {showPassword ? (
                            <div onClick={(e) => toggleShowPassword(e)}>
                              <i className="bi bi-eye-slash"></i>
                            </div>
                          ) : (
                            <div onClick={(e) => toggleShowPassword(e)}>
                              <i className="bi bi-eye"></i>
                            </div>
                          )}
                        </label>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div
                        className={`d-flex mb-4 justify-content-end ${styles.forgot_password}`}
                      >
                        <Link href="/forgotpassword">Forgot Password ?</Link>
                        {/* <Link href="/resetpassword">Reset Password </Link>
                        <Link href="/changepassword">Change Password </Link> */}
                      </div>

                      {isLoading ? (
                        <DotLoading
                          name="Loading ..."
                          type="button"
                          bgColor="#FA6130"
                          color="#FFFFFF"
                          width="140px"
                        />
                      ) : (
                        <CustomButton
                          name="Login"
                          type="submit"
                          bgColor="#FA6130"
                          color="#FFFFFF"
                          width="140px"
                        />
                      )}
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
