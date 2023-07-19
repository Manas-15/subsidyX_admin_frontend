import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { TrustedPartnerModal } from "../../components/Common/Modal";

const TrustedPartner = () => {
    const trustedPartnersData = useSelector((state) => state.trustedPartners.trustedPartners);
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const t = router.query.trustedPartner;
    const [trustedPartnerD, setTrustedPartnerD] = useState({});
    useEffect(() => {
        setTrustedPartnerD(trustedPartnersData.find((x) => x.id === +t));
    }, []);
    return (
        <div style={{ height: "60vh" }} className={styles.add}>
            {modalShow && (
                <TrustedPartnerModal
                    redirect={"/trusted_partner_management/trusted_partners"}
                    type={"delete"}
                    action={+t}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <h4>Trusted Partners Details #{t}</h4>
            <div style={{ height: "30vh", justifyContent: 'space-around' }} className={styles.view_client_body}>
                <div className={styles.view_client}>
                    <div><p>Trusted Partner Name</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.trustedPartnerName}</p></div>
                    <div><p>Email</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.email}</p></div>
                    <div><p>Contact Details</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.contact}</p></div>
                    <div><p>Clients</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.clients}</p></div>
                </div>
                <div className={styles.view_client}>
                    <div><p>District</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.district}</p></div>
                    <div><p>State</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.state}</p></div>
                    <div><p>Taluka</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.taluka}</p></div>
                    <div><p>Taluka Category</p><p style={{ fontWeight: 400 }}>{trustedPartnerD?.talukaCategory}</p></div>
                </div>
                <div className={styles.view_client}>
                    <div><p>Agreement Docs</p><p style={{ fontWeight: 400, textDecoration: 'underline', color: "#fa6130" }}>Docs1.pdf</p></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <CustomButton
                    height={"3rem"}
                    width={"8rem"}
                    name="Edit"
                    color="#FFFFFF"
                    bgColor="#FA6130"
                    onClick={() => router.push(`/trusted_partner_management/edit_trusted_partner/${t}`)}
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
    );
};

export default TrustedPartner;
