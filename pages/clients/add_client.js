import React from "react";
import styles from "../../styles/Home.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { clientSchema } from "../../components/Common/Validation";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clientManagementAction } from "../../redux/Actions/clientManagementAction";

const AddClient = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client);
  const router = useRouter();
  const formik = useFormik({
    initialValues: { name: "", number: "", email: "", associated: "" },
    validationSchema: clientSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });
  const submit = (values) => {
    const id = clients?.clients[clients?.clients?.length - 1]?.id + 1 || 1;
    dispatch(clientManagementAction.createClient({ ...values, id }));
    router.push("client_management");
  };
  return (
    <div className={styles.add}>
      <h4>Add New Client</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                style={{
                  padding: "0.5rem",
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                }}
                placeholder="Client Name"
                type="text"
                name="name"
                value={formik?.values?.name}
                onChange={formik.handleChange}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                style={{
                  padding: "0.5rem",
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                }}
                placeholder="Client Email"
                type="text"
                name="email"
                value={formik?.values?.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="number">
              <Form.Control
                style={{
                  padding: "0.5rem",
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                }}
                placeholder="Client Contact Number"
                type="text"
                name="number"
                value={formik?.values?.number}
                onChange={formik.handleChange}
                isInvalid={formik.touched.number && formik.errors.number}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.number}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="associated">
              <Form.Control
                style={{
                  padding: "0.5rem",
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderRadius: "10px",
                }}
                placeholder="Associate With"
                type="text"
                name="associated"
                value={formik?.values?.associated}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.associated && formik.errors.associated
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.associated}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <CustomButton
            height={"3rem"}
            width={"8rem"}
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            type="submit"
          />
          <CustomButton
            height={"3rem"}
            width={"8rem"}
            name="Cancel"
            bgcolor="#FFFFFF"
            color="#000"
            border="1px solid #000"
            type={"button"}
            onClick={() => {
              router.push("/clients/client_management");
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default AddClient;
