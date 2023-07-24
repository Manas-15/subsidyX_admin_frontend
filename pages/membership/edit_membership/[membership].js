import React, { useEffect } from 'react'
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '../../../styles/Home.module.css'
import { descriptions, Form, Row } from 'react-bootstrap';
import { membershipSchema } from '../../../components/Common/Validation';
import { CustomButton } from '../../../components/Common/CustomButton';
import { useRouter } from 'next/router';
import { MdAddCircle } from 'react-icons/md';
import { BsDashCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { membershipManagementActions } from '../../../redux/Actions/membershipActions';
const EditMembership = () => {

    const memberships = useSelector(state => state.memberships)
    const router = useRouter()
    const m = router.query.membership
    useEffect(() => {
        const fetch = async () => {
            const c = await router.query.membership;
            dispatch(membershipManagementActions.getSingleMembership(+c))
        }
        fetch()
    }, [router.query]);
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        const { descriptions, ...remainingKeys } = values
        dispatch(membershipManagementActions.updateMembership({ id: +m, data: { ...remainingKeys, description: descriptions?.join(";::;") } }))
        router.push("/membership/memberships")

    }
    return (
        <Formik
            initialValues={{ pricing: memberships?.memberships?.find(x => x.id === +m)?.pricing, membership_name: memberships?.memberships?.find(x => x.id === +m)?.membership_name, descriptions: memberships?.memberships?.find(x => x.id === +m)?.description.split(";::;") }}
            validationSchema={membershipSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleSubmit, handleChange, touched, errors, handleBlur }) => (
                <Form onSubmit={handleSubmit}>
                    <div style={{ height: 'auto' }} className={styles.add}>
                        <h4>Edit Membership #{m}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: "75%" }}>
                            <Row>
                                <Form.Group className="mb-3" controlId="membership_name">
                                    <Form.Control
                                        size='sm'
                                        style={{
                                            padding: "0.5rem",
                                            border: "2px solid rgba(0,0,0,0.2)",
                                            borderRadius: "10px",
                                        }}
                                        placeholder="Membership Name"
                                        type="text"
                                        name="membership_name"
                                        value={values.membership_name}
                                        onChange={handleChange}
                                        isInvalid={touched.membership_name && errors.membership_name}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.membership_name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="pricing">
                                    <Form.Control
                                        size='sm'
                                        style={{
                                            padding: "0.5rem",
                                            border: "2px solid rgba(0,0,0,0.2)",
                                            borderRadius: "10px",
                                        }}
                                        placeholder="Price (in INR)"
                                        type="number"
                                        name="pricing"
                                        value={values.pricing}
                                        onChange={handleChange}
                                        isInvalid={touched.pricing && errors.pricing}
                                        onBlur={handleBlur}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.pricing}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <h5 style={{ color: "black" }}>Edit Descriptions</h5>

                            <FieldArray name="descriptions">
                                {({ push, remove }) => (
                                    <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', maxHeight: "40vh", overflowY: "scroll", }}>
                                        {values?.descriptions?.map((_, index) => (
                                            <Form.Group style={{ display: 'flex', flexDirection: 'column', width: "100%", justifyContent: "space-between", marginTop: '0.5rem' }} key={index}>
                                                <div style={{ justifyContent: "space-between", alignItems: "center", width: "100%" }} className='d-flex justify-content-between'>
                                                    <Form.Control
                                                        style={{
                                                            padding: "0.5rem",
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

export default EditMembership
