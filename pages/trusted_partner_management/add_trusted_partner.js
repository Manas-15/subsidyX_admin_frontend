import React, { useRef } from "react";
import styles from "../../styles/Home.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { TrustedPartnerSchema } from "../../components/Common/Validation";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { trustedPartnerManagementActions } from "../../redux/Actions/trustedPartnersAction";

const AddTrustedPartner = () => {
    const fileRef = useRef(null)
    const dispatch = useDispatch();
    const trustedPartners = useSelector((state) => state.trustedPartners);
    const router = useRouter();
    const formik = useFormik({
        initialValues: { trustedPartnerName: "", email: "", contact: "", clients: Number, district: "", state: "", taluka: "", talukaCategory: Number },
        validationSchema: TrustedPartnerSchema,
        onSubmit: (values) => {
            submit(values);
        },
    });
    const submit = (values) => {
        console.log(values);
        const id = trustedPartners?.trustedPartners[trustedPartners?.trustedPartners?.length - 1]?.id + 1 || 1;
        dispatch(trustedPartnerManagementActions.createTrustedPartner({ ...values, id }));
        router.push("trusted_partners");
    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <div style={{ height: "85vh", justifyContent: "space-between" }} className={styles.add}>
                <h4>Add New Trusted Partner</h4>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="trustedPartnerName">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Trusted Partner Name"
                                type="text"
                                name="trustedPartnerName"
                                value={formik.values.trustedPartnerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.trustedPartnerName && formik.errors.trustedPartnerName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.trustedPartnerName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Trusted Partner Email"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
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
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Trusted Partner Contact Number"
                                type="tel"
                                name="contact"
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.contact && formik.errors.contact}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.contact}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="clients">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Clients"
                                type="number"
                                name="clients"
                                value={+formik.values.clients}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.clients && formik.errors.clients
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.clients}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="district">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="District"
                                type="text"
                                name="district"
                                value={formik.values.district}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.district && formik.errors.district}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.district}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="state">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="State"
                                type="text"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.state && formik.errors.state
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="taluka">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Taluka"
                                type="text"
                                name="taluka"
                                value={formik.values.taluka}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.taluka && formik.errors.taluka}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.taluka}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="talukaCategory">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Taluka Category"
                                type="number"
                                name="talukaCategory"
                                value={+formik?.values?.talukaCategory}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.talukaCategory && formik.errors.talukaCategory
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.talukaCategory}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <h5 style={{ fontWeight: 700, color: "#000" }}>Upload Agreement Documents</h5>
                <Row style={{ height: "15vh" }}>
                    <Col style={{ height: "100%", width: "100%", padding: "0.8rem" }}>
                        <div style={{ border: "2px dashed rgba(0,0,0,0.5)", height: "100%", width: "100%", borderRadius: "0.3rem", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <p style={{ color: "black" }}>Drag & drop your files here or <span onClick={() => { fileRef.current.click() }} style={{ textDecoration: "underline", fontWeight: "700", cursor: "pointer" }}>browse</span> <input ref={fileRef} type="file" style={{ display: "none" }}></input> </p>
                        </div>
                    </Col>

                </Row>



                <div className="d-flex justify-content-start">
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
                            router.push("/trusted_partner_management/trusted_partners");
                        }}
                    />
                </div>
            </div>
        </Form>
    );
};

export default AddTrustedPartner;
