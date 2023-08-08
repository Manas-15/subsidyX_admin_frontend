import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { QuotationModal } from "../../components/Common/Modal";
import { quotationData } from "../../static/quotationData";

const Quotation = () => {
    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const t = router.query.quotation;
    const quotation = quotationData.find(q => q.id === +t)

    return (
        <div>
            <div style={{ height: "auto" }} className={styles.add}>
                {modalShow && (
                    <QuotationModal
                        redirect={"/quotation_management/quotations"}
                        type={"delete"}
                        action={+t}
                        show={modalShow}
                        setModalShow={setModalShow}
                        onHide={() => setModalShow(false)}
                    />
                )}
                <h4 className="mb-3">Client Details</h4>
                <div style={{ height: "auto", justifyContent: 'space-around' }} className={styles.view_client_body}>
                    <div className={styles.view_client}>
                        <div><p>Client Name</p><p style={{ fontWeight: 400 }}>{quotation?.clientName}</p></div>
                        <div><p>Category</p><p style={{ fontWeight: 400 }}>{quotation?.category}</p></div>
                        <div><p>Sector</p><p style={{ fontWeight: 400 }}>{quotation?.sector}</p></div>
                        <div><p>Created Date</p><p style={{ fontWeight: 400 }}>{quotation?.createdDate}</p></div>
                    </div>
                    <div className={styles.view_client}>
                        <div><p>State</p><p style={{ fontWeight: 400 }}>{quotation?.state}</p></div>
                        <div><p>Taluka</p><p style={{ fontWeight: 400 }}>{quotation?.taluka}</p></div>
                        <div><p>Company Name</p><p style={{ fontWeight: 400 }}>{quotation?.companyName}</p></div>
                        <div><p>Created By</p><p style={{ fontWeight: 400 }}>{quotation.createdBy}</p></div>
                    </div>

                </div>

            </div>
            <div style={{ height: "auto" }} className={styles.add}>
                {modalShow && (
                    <QuotationModal
                        redirect={"/quotation_management/quotations"}
                        type={"delete"}
                        action={+t}
                        show={modalShow}
                        setModalShow={setModalShow}
                        onHide={() => setModalShow(false)}
                    />
                )}
                <h4 className="mb-3">Quotation</h4>
                <div style={{ height: "auto", justifyContent: 'space-around' }} className={styles.view_client_body}>
                    <div className={styles.view_client}>
                        <div><p>Subsidy Name</p><p style={{ fontWeight: 400 }}>{quotation?.clientName}</p></div>
                        <div><p>{capitalizeFirstLetter(quotation?.quotation?.paymentBasis)}{" "}Based</p><p style={{ fontWeight: 400 }}>{quotation?.rate}</p></div>

                        <div>
                            <p>Status</p>
                            <p style={{ fontWeight: 400, display: 'flex', alignItems: 'center', gap: "10px" }}>
                                <div style={{ height: "1rem", width: "1rem", background: (quotation.quotation.status === "pending") ? "#5f9afa" : "#2fa302", borderRadius: "50%" }}>
                                </div>{capitalizeFirstLetter(quotation?.quotation?.status)}
                            </p>
                        </div>

                    </div>


                </div>

            </div>
            <div style={{ height: 'auto', background: 'transparent' }} className={styles.add}>

                <div className="d-flex justify-content-end">
                    <CustomButton
                        height={"3rem"}
                        width={"8rem"}
                        name="Edit"
                        color="#FFFFFF"
                        bgColor="#FA6130"
                        onClick={() => router.push(`/quotation_management/edit_quotation/${t}`)}
                    />
                    <CustomButton
                        height={"3rem"}
                        width={"8rem"}
                        name="Delete"
                        bgcolor="#FFFFFF"
                        color="#000"
                        border="1px solid #000"
                        type={"button"}
                        onClick={() => setModalShow(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Quotation;
