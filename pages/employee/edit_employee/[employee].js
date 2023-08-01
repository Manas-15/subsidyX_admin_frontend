import React, { useState } from "react";
import styles from "../../../styles/Home.module.css";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { employeeSchema } from "../../../components/Common/Validation";
import { CustomButton } from "../../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { employeeManagementAction } from "../../../redux/Actions/employeeActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { companies } from "../../../static/employeeData";
import { useEffect } from "react";

const EditEmployee = () => {

    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);
    const router = useRouter();
    const t = router.query.employee
    const formik = useFormik({
        initialValues: { ...employees.employees.find(e => +e.id === +t), isAssociated: employees.employees.find(e => +e.id === +t).associatedWith ? "yes" : "no" },
        validationSchema: employeeSchema,
        onSubmit: (values) => {
            submit(values);
        },
    });
    const submit = (values) => {
        dispatch(employeeManagementAction.updateEmployee({ id: +t, editData: values }))
        router.push("/employee/employees")
    };
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div style={{ height: 'auto' }} className={styles.add}>
            <h4 className="mb-5">Edit Employee</h4>

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
                                placeholder="Employee Name"
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
                                autoComplete="off"
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Employee Email"
                                type="email"
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
                        <Form.Group className="mb-3" controlId="contact">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Contact Number"
                                type="text"
                                name="contact"
                                value={formik?.values?.contact}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.contact && formik.errors.contact}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.contact}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <InputGroup>
                                <Form.Control
                                    autoComplete="off"
                                    style={{
                                        padding: "0.5rem",
                                        border: "2px solid rgba(0,0,0,0.2)",
                                        borderRadius: "10px",
                                        borderTopRightRadius: "0px",
                                        borderBottomRightRadius: "0px",
                                        borderRight: "none"
                                    }}
                                    placeholder="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formik?.values?.password}
                                    onChange={formik.handleChange}
                                    isInvalid={
                                        formik.touched.password && formik.errors.password
                                    }
                                />
                                <Button style={{
                                    color: "black", background: "white", borderColor: "white", borderTopRightRadius: "10px",
                                    borderBottomRightRadius: "10px", border: "2px solid rgba(0,0,0,0.2)", borderLeft: "none"
                                }} onClick={() => setShowPassword(!showPassword)}  >{showPassword ? <FaEyeSlash /> : <FaEye />} </Button>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>


                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Role"
                                type="text"
                                name="role"
                                value={formik?.values?.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.role && formik.errors.role}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.role}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <h5 style={{ fontWeight: 700, color: "#000" }}>Is the employee a part of any association?</h5>

                <Row className="mt-3">
                    <Form.Group className={`d-flex ${styles.radio_check}`} style={{ color: "black" }}>
                        <Form.Check

                            type="radio"
                            name="isAssociated"
                            value="yes"
                            label="Yes"
                            id="yesRadio"
                            onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value === "no") {
                                    formik.setFieldValue("associatedWith", "");
                                }
                            }}
                            onBlur={formik.handleBlur}
                            checked={formik?.values?.associatedWith || formik?.values?.isAssociated === 'yes'}
                        />
                        <Form.Check
                            style={{ marginLeft: "2rem" }}
                            type="radio"
                            name="isAssociated"
                            value="no"
                            label="No"
                            id="noRadio"
                            onChange={(e) => {
                                formik.handleChange(e);
                                if (e.target.value === "no") {
                                    formik.setFieldValue("associatedWith", "");
                                }
                            }}
                            onBlur={formik.handleBlur}
                            checked={!formik?.values?.associatedWith || formik?.values?.isAssociated === 'no'}

                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.isAssociated}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3 mt-3" controlId="associatedWith">
                            <Form.Label style={{ color: "black", fontSize: "1.25rem", fontWeight: 600 }}>Associated With</Form.Label>
                            <Form.Control
                                disabled={formik?.values?.isAssociated === 'no'}
                                style={{
                                    padding: "0.8rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                    cursor: formik?.values?.isAssociated === 'no' ? "not-allowed" : "pointer"
                                }}
                                as="select"
                                name="associatedWith"
                                value={formik?.values?.associatedWith}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik?.values?.isAssociated === 'yes' && formik.touched.associatedWith && formik.errors.associatedWith}
                            ><option key={0} value={""}>{"Select an Option"}</option>
                                {companies.map(c => (<><option key={c.id} value={c.name}>{c.name}</option></>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik?.values?.isAssociated === 'yes' && formik.errors.associatedWith}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Col>
                </Row>

                <div className="d-flex justify-content-end mt-4">
                    <CustomButton
                        height={"3rem"}
                        width={"8rem"}
                        name="Save"
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
                            router.push("/employee/employees");
                        }}
                    />
                </div>
            </Form>
        </div>
    );
};

export default EditEmployee;
