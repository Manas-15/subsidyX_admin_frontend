import React, { useRef } from "react";
import styles from "../../../styles/Home.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { channelPartnerSchema } from "../../../components/Common/Validation";
import { CustomButton } from "../../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { channelPartnerManagementActions } from "../../../redux/Actions/channelPartnersAction";

const EditChannelPartner = () => {
    const fileRef = useRef(null)
    const dispatch = useDispatch();
    const channelPartners = useSelector((state) => state.channelPartners);
    const router = useRouter();
    const t = router.query.channelPartner
    const formik = useFormik({
        initialValues: channelPartners.channelPartners.find(x => x.id === +t),
        validationSchema: channelPartnerSchema,
        onSubmit: (values) => {
            submit(values);
        },
    });
    const submit = (values) => {
        dispatch(channelPartnerManagementActions.updateChannelPartner({ id: +t, editData: values }))
        router.push("/channel_partner_management/channel_partners")
    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <div style={{ height: "85vh", justifyContent: "space-between" }} className={styles.add}>
                <h4>Edit Channel Partner</h4>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="channelPartnerName">
                            <Form.Control
                                style={{
                                    padding: "1rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Channel Partner Name"
                                type="text"
                                name="channelPartnerName"
                                value={formik.values.channelPartnerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.channelPartnerName && formik.errors.channelPartnerName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.channelPartnerName}
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
                                placeholder="Channel Partner Email"
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
                                placeholder="Channel Partner Contact Number"
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
                <h5 style={{ fontWeight: 700, color: "#000" }}>Payment Basis</h5>

                <Row className="mt-1">
                    <Form.Group className={`d-flex ${styles.radio_check}`} style={{ color: "black" }}>
                        <Form.Check
                            checked={formik?.values?.type === "fixed"}
                            type="radio"
                            name="type"
                            value="fixed"
                            label="Fixed"
                            id="fixedRadio"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        <Form.Check
                            checked={formik?.values?.type === "percentage"}
                            style={{ marginLeft: "2rem" }}
                            type="radio"
                            name="type"
                            value="percentage"
                            label="Percentage"
                            id="percentageRadio"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.type}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mt-2">
                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Control
                            disabled={!formik.values.type}
                            style={{
                                padding: "1rem",
                                border: "2px solid rgba(0,0,0,0.2)",
                                borderRadius: "10px",
                            }}
                            placeholder={!formik.values.type ? "Select a payment basis first" : formik.values.type === "fixed" ? "Enter the fixed amount" : "Enter Percentage (don't include %)"}
                            type="number"
                            name="amount"
                            value={+formik?.values?.amount}
                            onChange={formik.handleChange}
                            isInvalid={
                                formik.touched.amount && formik.errors.amount
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.amount}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                {/* <h5 style={{ fontWeight: 700, color: "#000" }}>Upload Agreement Documents</h5>
                <Row style={{ height: "15vh" }}>
                    <Col style={{ height: "100%", width: "100%", padding: "0.8rem" }}>
                        <div style={{ border: "2px dashed rgba(0,0,0,0.5)", height: "100%", width: "100%", borderRadius: "0.3rem", backgroundColor: "rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <p style={{ color: "black" }}>Drag & drop your files here or <span onClick={() => { fileRef.current.click() }} style={{ textDecoration: "underline", fontWeight: "700", cursor: "pointer" }}>browse</span> <input ref={fileRef} type="file" style={{ display: "none" }}></input> </p>
                        </div>
                    </Col>

                </Row> */}



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
                            router.push("/channel_partner_management/channel_partners");
                        }}
                    />
                </div>
            </div>
        </Form>
    );
};

export default EditChannelPartner;
