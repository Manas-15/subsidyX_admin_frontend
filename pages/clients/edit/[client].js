import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Home.module.css';
import { Col, Form, Row } from 'react-bootstrap';
import { Formik, useFormik } from 'formik';
import { clientSchema } from '../../../components/Common/Validation';
import { CustomButton } from '../../../components/Common/CustomButton';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { clientManagementAction } from '../../../redux/Actions/clientManagementAction';
const EditClient = () => {
    const clientData = useSelector(state => state.client.clients)
    const dispatch = useDispatch()
    const router = useRouter()
    const clientId = router.query.client
    const formik = useFormik({
        initialValues: clientData.find(c => c.id === +(clientId)),
        validationSchema: clientSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const handleSubmit = (values) => {
        dispatch(clientManagementAction.updateClient({ id: clientId, editData: values }))
        router.push("/clients/client_management")
    }
    return (
        <div className={styles.add}>
            <h4>Edit Client {" "} {`#${clientId}`}</h4>

            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                                style={{ padding: "1rem", border: "2px solid rgba(0,0,0,0.2)", borderRadius: '10px' }}
                                placeholder="Client Name"
                                type="text"
                                name="name"
                                value={formik.values.name}

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
                                style={{ padding: "1rem", border: "2px solid rgba(0,0,0,0.2)", borderRadius: '10px' }}
                                placeholder="Client Email"
                                type="text"
                                name="email"
                                value={formik.values.email}
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
                                style={{ padding: "1rem", border: "2px solid rgba(0,0,0,0.2)", borderRadius: '10px' }}
                                placeholder="Client Contact Number"
                                type="text"
                                name="number"
                                value={formik.values.number}
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
                                style={{ padding: "1rem", border: "2px solid rgba(0,0,0,0.2)", borderRadius: '10px' }}
                                placeholder="Associate With"
                                type="text"
                                name="associated"
                                value={formik.values.associated}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.associated && formik.errors.associated}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.associated}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <div>
                    <CustomButton height={"3rem"} width={"8rem"} name="Submit" color="#FFFFFF" bgColor="#FA6130" type="submit" />
                    <CustomButton type={'button'} onClick={() => router.push("/clients/client_management")} height={"3rem"} width={"8rem"} name="Cancel" bgcolor="#FFFFFF" color="#000" border="1px solid #000" />
                </div>
            </Form>
        </div>
    );
};

export default EditClient;
