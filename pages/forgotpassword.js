import React from "react";
import styles from "../styles/Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomButton } from "../components/Common/CustomButton";
import Link from "next/link";

function ForgotPassword() {
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
              <h4 className={`fw-bold`}>Forgot Password</h4>
              <p className={styles.login_span}>Don't remember your password ?</p>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <div
                  className={`d-flex justify-content-end ${styles.forgot_password}`}
                >
                  <Link href="/login">Back to login</Link>
                </div>

                <CustomButton
                  name="Submit"
                  bgColor="#FA6130"
                  color="#FFFFFF"
                  width="140px"
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
