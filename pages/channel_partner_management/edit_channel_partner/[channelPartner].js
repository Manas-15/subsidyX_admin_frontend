import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { channelPartnerSchema } from "../../../components/Common/Validation";
import { CustomButton } from "../../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { channelPartnerManagementActions } from "../../../redux/Actions/channelPartnersAction";
import { BiCloudUpload } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import { generateUploadURL } from "../../../config/s3";
import Link from "next/link";
import { Edit } from "@rsuite/icons";
import { MdCancel } from "react-icons/md";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { stateManagementAction } from "../../../redux/Actions/stateManagementAction";
import { channelpartnersService } from "../../../redux/Services/channelPartnerService";
import { districtManagementAction } from "../../../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../../../redux/Actions/talukaManagementAction";

const EditChannelPartner = () => {
    const [loading, setLoading] = useState(false)
    const [additionalErrorMessage, setAdditionalErrorMessage] = useState('')
    const [emptyDocs, setEmptyDocs] = useState({
        state: false,
        message: ""
    })
    const { acceptedFiles: additionalAcceptedFiles, getRootProps: additionalGetRootProps, getInputProps: additionalGetInputProps } = useDropzone({
        accept: {
            "application/pdf": ['.pdf'],
            "application/msword": ['.doc'],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ['.docx'],
        },
        onDropRejected: () => {
            setAdditionalErrorMessage('Invalid file type. Please upload .png, .jpg, .jpeg, .pdf, .doc, or .docx files.');
        },
        onDropAccepted: () => {
            setAdditionalErrorMessage('');
            setIsDocumentAvailable(additionalAcceptedFiles[0])
        },
    });
    const additionalFiles = additionalAcceptedFiles.map(file => (
        <li key={file.path}>
            {file.path}
        </li>
    ));
    const dispatch = useDispatch();
    const channelPartners = useSelector((state) => state.channelPartners);
    const router = useRouter();
    const t = router.query.channelPartner
    const formik = useFormik({
        initialValues: { ...channelPartners.channelPartners?.channel_partners?.find(x => x.id === +t), phone_number: channelPartners.channelPartners?.channel_partners?.find(x => x.id === +t)?.contact },
        validationSchema: channelPartnerSchema,
        onSubmit: (values) => {
            submit(values);
        },
    });
    const [isDocumentAvailable, setIsDocumentAvailable] = useState()
    const [editDoc, setEditDoc] = useState(false)
    const state = useSelector(state => state.state)
    const district = useSelector(state => state.district)
    const taluka = useSelector(state => state.taluka)

    useEffect(() => {
        setIsDocumentAvailable(additionalAcceptedFiles[0] || channelPartners?.channelPartners?.channel_partners?.find(x => x.id === +t)?.agreementDoc)
        dispatch(channelPartnerManagementActions.getChannelPartners())
        dispatch(stateManagementAction.getStates())
        channelpartnersService.getSingleChannelPartner(t).then(res => { dispatch(districtManagementAction.getDistricts(res?.data?.state_id)); dispatch(talukaManagementAction.getTalukas(res?.data?.district_id)); })

    }, []);
    const submit = async (values) => {
        if (!additionalAcceptedFiles[0] && !channelPartners?.channelPartners?.channel_partners?.find(x => x.id === +t)?.agreementDoc) {
            setEmptyDocs({
                state: true,
                message: "Agreement Document is required!!"
            })
            setEditDoc(true)
            return
        }
        setLoading(true)
        if (typeof isDocumentAvailable !== 'string') {
            const uploadURL = await generateUploadURL({ fileName: additionalAcceptedFiles[0].path })
            console.log(uploadURL);
            await fetch(uploadURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: additionalAcceptedFiles[0],
            }).then(res => {
                const fileURL = uploadURL.split('?')[0]
                console.log(fileURL);
                dispatch(channelPartnerManagementActions.updateChannelPartner({ id: +t, data: { ...values } }))
            }).catch(err => console.log('An error occurred')).finally(x => { router.push("/channel_partner_management/channel_partners"); setLoading(false) }
            )
        }
        else {
            dispatch(channelPartnerManagementActions.updateChannelPartner({ id: +t, editData: values }))
            setLoading(false)
            router.push("/channel_partner_management/channel_partners")
        }
        setLoading(false)

    };
    return (
        <Form onSubmit={formik.handleSubmit}>
            <LoadingSpinner show={loading} />
            <div style={{ height: "auto" }} className={styles.add}>
                <h4>Edit Channel Partner</h4>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="first_name">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="First Name"
                                type="text"
                                name="first_name"
                                value={formik?.values?.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.first_name && formik.errors.first_name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.first_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="last_name">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Last Name"
                                type="text"
                                name="last_name"
                                value={formik?.values?.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.last_name && formik.errors.last_name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="phone_number">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Channel Partner Contact Number"
                                type="tel"
                                name="phone_number"
                                value={formik?.values?.phone_number}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.phone_number && formik.errors.phone_number}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.phone_number}
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
                                placeholder="Channel Partner Email"
                                type="email"
                                name="email"
                                value={formik?.values?.email}
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
                        <Form.Group className="mb-3" controlId="state_id">
                            <Form.Control
                                custom
                                as={'select'}
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                name="state_id"
                                value={formik?.values?.state_id}
                                onChange={async (e) => { formik.handleChange(e); dispatch(districtManagementAction.getDistricts(e.target.value)); formik.values.district_id = ''; formik.values.taluka_id = "" }}
                                isInvalid={formik.touched.state_id && formik.errors.state_id}
                            >
                                <option value="" disabled>
                                    {'Select a state...'}
                                </option>
                                {state?.stateManagementData?.map(s => (<><option value={s.id}>{s?.name}</option></>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.state_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="district_id">
                            <Form.Control
                                disabled={!formik?.values?.state_id || !district?.districtManagementData?.district}
                                custom
                                as={'select'}
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                name="district_id"
                                value={formik?.values?.district_id}
                                onChange={async (e) => { formik.handleChange(e); dispatch(talukaManagementAction.getTalukas(e.target.value)); formik.values.taluka_id = "" }}
                                isInvalid={formik.touched.district_id && formik.errors.district_id}
                            >
                                <option value="" disabled>
                                    {'Select a district...'}
                                </option>

                                {district?.districtManagementData?.district?.map(d => (<><option value={d.id}>{d?.name}</option></>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.district_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="taluka_id">
                            <Form.Control
                                disabled={!formik?.values?.district_id || !taluka?.talukaManagementData?.talukas}
                                custom
                                as={'select'}
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                name="taluka_id"
                                value={formik?.values?.taluka_id}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.taluka_id && formik.errors.taluka_id}
                            >
                                <option value="" disabled>
                                    {'Select a taluka...'}
                                </option>
                                {taluka?.talukaManagementData?.talukas?.map(d => (<><option value={d.id}>{d?.name}</option></>))}

                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.taluka_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Control
                                style={{
                                    padding: "0.5rem",
                                    border: "2px solid rgba(0,0,0,0.2)",
                                    borderRadius: "10px",
                                }}
                                placeholder="Address"
                                type="text"
                                name="address"
                                value={formik?.values?.address}
                                onChange={formik.handleChange}
                                isInvalid={
                                    formik.touched.address && formik.errors.address
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.address}
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
                            disabled={!formik?.values?.type}
                            style={{
                                padding: "0.5rem",
                                border: "2px solid rgba(0,0,0,0.2)",
                                borderRadius: "10px",
                            }}
                            placeholder={!formik?.values?.type ? "Select a payment basis first" : formik?.values?.type === "fixed" ? "Enter the fixed amount" : "Enter Percentage (don't include %)"}
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
                <h5 style={{ fontWeight: 700, color: "#000" }}>Update Agreement Documents</h5>
                <Row className="mb-2 mt-2"><Col style={{ color: "black" }}><Link onMouseOver={(e) => e.target.style.backgroundColor = 'white'} href={`${channelPartners?.channelPartners?.channel_partners?.find(x => x.id === +t)?.agreementDoc}`} style={{ fontWeight: 400, textDecoration: 'underline', color: "#fa6130" }}>{(additionalAcceptedFiles[0]?.path || channelPartners?.channelPartners?.channel_partners?.find(x => x.id === +t)?.agreementDoc?.split(".com/")[1]?.slice(32)) ?? "NA"}</Link > </Col> <Col className="d-flex justify-content-end"><CustomButton type={'button'} color={'black'} bgColor={'white'} name={!editDoc ? <Edit style={{ fontSize: "1.5rem" }} /> : <MdCancel style={{ fontSize: "1.5rem" }} />} onClick={() => setEditDoc(!editDoc)} /></Col> </Row>
                {editDoc && <Row >
                    <Col style={{ width: "100%", padding: "0.8rem" }}>
                        <div {...additionalGetRootProps({ className: 'dropzone' })} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", border: '2px dashed rgba(0,0,0,0.6)', borderColor: (emptyDocs?.state === true && (!isDocumentAvailable)) || additionalErrorMessage ? 'red' : 'black', borderRadius: "10px", backgroundColor: "rgba(0,0,0,0.1)", height: "10rem" }}>
                            <input  {...additionalGetInputProps()} />
                            {additionalFiles[0]?.key ? (
                                <div className="d-flex text-black">
                                    <p style={{ fontWeight: "bold", marginRight: "5px" }}>Files:</p>
                                    <ul>{additionalFiles}</ul>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "black" }}>
                                    <BiCloudUpload fontSize={"3.5rem"} color="rgba(0,0,0,0.7)" />
                                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>Drop files here or click to upload.</p>
                                    <span style={{ fontSize: "12px", marginTop: "-15px", fontStyle: "italic" }}>(Only *.pdf, *.doc, *.docx files will be accepted)</span>
                                    {additionalErrorMessage && <p style={{ color: 'red' }}>{additionalErrorMessage}</p>}
                                </div>)}
                        </div>
                        <div style={{ color: 'red' }}  >{emptyDocs?.state === true && (!isDocumentAvailable) && emptyDocs?.message}</div>

                    </Col>

                </Row>}



                <div className="d-flex justify-content-start mt-2">
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
