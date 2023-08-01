import React, { useEffect, useRef } from "react";
import styles from "../../../styles/Home.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { TrustedPartnerSchema } from "../../../components/Common/Validation";
import { CustomButton } from "../../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { trustedPartnerManagementActions } from "../../../redux/Actions/trustedPartnersAction";
import { stateManagementAction } from "../../../redux/Actions/stateManagementAction";
import { districtManagementAction } from "../../../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../../../redux/Actions/talukaManagementAction";
import { trustedpartnersService } from "../../../redux/Services/trustedPartnerService";

const EditTrustedPartner = () => {
  const fileRef = useRef(null)
  const dispatch = useDispatch();
  const trustedPartners = useSelector((state) => state.trustedPartners);
  const state = useSelector(state => state.state)
  const district = useSelector(state => state.district)
  const taluka = useSelector(state => state.taluka)
  useEffect(() => {
    dispatch(trustedPartnerManagementActions.getTrustedPartners())
    dispatch(stateManagementAction.getStates())
    trustedpartnersService.getSingleTrustedPartner(t).then(res => { dispatch(districtManagementAction.getDistricts(res?.data?.state_id)); dispatch(talukaManagementAction.getTalukas(res?.data?.district_id)); })

  }, [])
  const router = useRouter();
  const t = router.query.trustedPartner
  const formik = useFormik({
    initialValues: { ...trustedPartners?.trustedPartners?.trusted_partners.find(x => x.id === +t), phone_number: trustedPartners?.trustedPartners?.trusted_partners.find(x => x.id === +t)?.contact },
    validationSchema: TrustedPartnerSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });
  const submit = (values) => {
    dispatch(trustedPartnerManagementActions.updateTrustedPartner({ id: +t, data: values }))
    router.push("/trusted_partner_management/trusted_partners")
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <div style={{ height: "auto", justifyContent: "space-between" }} className={styles.add}>
        <h4>Edit Trusted Partner</h4>


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
                placeholder="Trusted Partner Contact Number"
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
                placeholder="Trusted Partner Email"
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

        <h5 style={{ fontWeight: 700, color: "#000" }}>Upload Agreement Documents</h5>
        <Row style={{ height: "25vh" }}>
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

export default EditTrustedPartner;
