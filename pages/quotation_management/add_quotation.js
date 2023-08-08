import React, { useRef, useState } from "react";
import styles from "../../styles/Home.module.css";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { channelPartnerSchema } from "../../components/Common/Validation";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { channelPartnerManagementActions } from "../../redux/Actions/channelPartnersAction";
import { useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { generateUploadURL } from "../../config/s3";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { stateManagementAction } from "../../redux/Actions/stateManagementAction";
import { useEffect } from "react";
import { districtManagementAction } from "../../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../../redux/Actions/talukaManagementAction";
const AddQuotation = () => {

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const channelPartners = useSelector((state) => state.channelPartners);
    const state = useSelector(state => state.state)
    const district = useSelector(state => state.district)
    const taluka = useSelector(state => state.taluka)

    const router = useRouter();



    return (
        <Form >
            <LoadingSpinner show={loading} />

            <div style={{ height: "auto", justifyContent: "space-between" }} className={styles.add}>
                <h4>Add New Quotation</h4>


                <Row>

                    <Col sm={12}>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                custom
                                as={'select'}
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}




                            >
                                <option value="" disabled>
                                    {'Select Client'}
                                </option>
                                {state?.stateManagementData?.map(s => (<><option value={s.id}>{s?.name}</option></>))}
                            </Form.Control>

                        </Form.Group>
                    </Col>
                    <Col sm={12}>
                        <Form.Group className="mb-3" controlId="district_id">
                            <Form.Control

                                custom
                                as={'select'}
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                            >
                                <option value="" disabled>
                                    {'Select Subsidy'}
                                </option>

                                {district?.districtManagementData?.district?.map(d => (<><option value={d.id}>{d?.name}</option></>))}
                            </Form.Control>

                        </Form.Group>
                    </Col>
                </Row>

                <h5 style={{ fontWeight: 700, color: "#000" }}>Payment Basis</h5>

                <Row className="mt-1">
                    <Form.Group className={`d-flex ${styles.radio_check}`} style={{ color: "black" }}>
                        <Form.Check

                            type="radio"
                            name="type"
                            value="fixed"
                            label="Fixed"
                            id="fixedRadio"

                        />
                        <Form.Check
                            style={{ marginLeft: "2rem" }}
                            type="radio"
                            name="type"
                            value="percentage"
                            label="Percentage"
                            id="percentageRadio"

                        />
                    </Form.Group>
                </Row>
                <Row className="mt-2">
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="amount">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Amount"
                                type="number"
                                name="amount"

                            />

                        </Form.Group>
                    </Col>
                </Row>



                <div style={{ marginTop: "1rem" }} className="d-flex justify-content-start ">
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
                            router.push("/quotation_management/quotations");
                        }}
                    />
                </div>
            </div>
        </Form>
    );
};

export default AddQuotation;
