import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ChannelPartnerModal } from "../../components/Common/Modal";
import Link from "next/link";

const ChannelPartner = () => {
    const channelPartnersData = useSelector((state) => state.channelPartners.channelPartners);
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const c = router.query.channelPartner;
    const [channelPartnerD, setChannelPartnerD] = useState({});
    useEffect(() => {
        setChannelPartnerD(channelPartnersData.find((x) => x.id === +c));
    }, []);
    return (
        <div style={{ height: "60vh" }} className={styles.add}>
            {modalShow && (
                <ChannelPartnerModal
                    redirect={"/channel_partner_management/channel_partners"}
                    type={"delete"}
                    action={+c}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <h4>Channel Partners Details #{c}</h4>
            <div style={{ height: "30vh", justifyContent: 'space-around' }} className={styles.view_client_body}>
                <div className={styles.view_client}>
                    <div><p>Channel Partner Name</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.channelPartnerName}</p></div>
                    <div><p>Email</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.email}</p></div>
                    <div><p>Contact Details</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.contact}</p></div>
                    <div><p>Clients</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.clients}</p></div>
                </div>
                <div className={styles.view_client}>
                    <div><p>District</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.district}</p></div>
                    <div><p>State</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.state}</p></div>
                    <div><p>Taluka</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.taluka}</p></div>
                    <div><p>Taluka Category</p><p style={{ fontWeight: 400 }}>{channelPartnerD?.talukaCategory}</p></div>
                </div>
                <div className={styles.view_client}>
                    <div >
                        <p>Agreement Docs</p><Link onClick={(e) => e.target.style.backgroundColor = 'white'} onMouseOver={(e) => e.target.style.backgroundColor = 'white'} href={`${channelPartnerD?.agreementDoc}`} style={{ fontWeight: 400, textDecoration: 'underline', color: "#fa6130" }}>{channelPartnerD?.agreementDoc?.split(".com/")[1]?.slice(32) ?? "NA"}</Link >
                    </div>
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
                    onClick={() => router.push(`/channel_partner_management/edit_channel_partner/${c}`)}
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

export default ChannelPartner;
