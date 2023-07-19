import React from 'react'
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/Home.module.css'
import { descriptions, Form, Row } from 'react-bootstrap';
import { membershipSchema } from '../../components/Common/Validation';
import { CustomButton } from '../../components/Common/CustomButton';
import { useRouter } from 'next/router';
import { MdAddCircle } from 'react-icons/md';
import { BsDashCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { membershipManagementActions } from '../../redux/Actions/membershipActions';
import { useRef } from 'react';
const AddMembership = () => {
    const memberships = useSelector(state => state.memberships)
    const router = useRouter()

    const dispatch = useDispatch()
    const onSubmit = (values) => {
        const id = memberships?.memberships[memberships?.memberships?.length - 1]?.id + 1 || 1;
        const createdDate = '2023-07-18'
        const createdBy = 'Pallav'
        dispatch(membershipManagementActions.createMembership({ ...values, id, createdBy, createdDate }));
        router.push("memberships");

    }
    return (
        <Formik
            initialValues={{ membershipName: '', price: Number, descriptions: [""] }}
            validationSchema={membershipSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, handleChange, touched, errors, handleBlur }) => (
                <Form onSubmit={handleSubmit}>
                    <div style={{ height: 'auto' }} className={styles.add}>
                        <h4>Add New Membership</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: "75%" }}>
                            <Row>
                                <Form.Group className="mb-3" controlId="membershipName">
                                    <Form.Control
                                        size='sm'
                                        style={{
                                            padding: "1rem",
                                            border: "2px solid rgba(0,0,0,0.2)",
                                            borderRadius: "10px",
                                        }}
                                        placeholder="Membership Name"
                                        type="text"
                                        name="membershipName"
                                        value={values.membershipName}
                                        onChange={handleChange}
                                        isInvalid={touched.membershipName && errors.membershipName}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.membershipName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Control
                                        size='sm'
                                        style={{
                                            padding: "1rem",
                                            border: "2px solid rgba(0,0,0,0.2)",
                                            borderRadius: "10px",
                                        }}
                                        placeholder="Price (in INR)"
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        isInvalid={touched.price && errors.price}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <h5 style={{ color: "black" }}>Add Descriptions</h5>

                            <FieldArray name="descriptions">
                                {({ push, remove }) => (
                                    <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', maxHeight: "40vh", overflowY: "scroll", }}>
                                        {values.descriptions.map((_, index) => (
                                            <Form.Group style={{ display: 'flex', flexDirection: 'column', width: "100%", justifyContent: "space-between", marginTop: '0.5rem' }} key={index}>
                                                <div style={{ justifyContent: "space-between", alignItems: "center", width: "100%" }} className='d-flex justify-content-between'>
                                                    <Form.Control
                                                        style={{
                                                            padding: "1rem",
                                                            // border: "2px solid rgba(0,0,0,0.2)",
                                                            borderRadius: "10px",

                                                        }}
                                                        type="text"
                                                        name={`descriptions[${index}]`}
                                                        value={values.descriptions[index]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        placeholder={`Enter description #${index + 1}`}
                                                        isInvalid={touched.descriptions?.[index] && errors.descriptions?.[index]}
                                                    />

                                                    {values.descriptions.length > 1 && <CustomButton
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        name={<> <BsDashCircleFill color='#c32929' fontSize={"2rem"}></BsDashCircleFill></>}

                                                    />}
                                                    {index === values.descriptions.length - 1 && <CustomButton
                                                        disabled={values.descriptions.length === 0 || !values.descriptions[index]}
                                                        type="button"
                                                        onClick={() => push('')}
                                                        name={<> <MdAddCircle disabled={values.descriptions.length === 0 || !values.descriptions[index]} color='green' fontSize={"2.5rem"}></MdAddCircle></>}

                                                    />}


                                                </div>

                                                <Form.Control.Feedback type="invalid">
                                                    {errors.descriptions}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        ))}

                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <div className="d-flex justify-content-start mt-4">
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
                                    router.push("/membership/memberships");
                                }}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default AddMembership
