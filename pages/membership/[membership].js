import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { MembershipModal } from "../../components/Common/Modal";
import { FaRupeeSign } from 'react-icons/fa';
import { membershipManagementActions } from "../../redux/Actions/membershipActions";

const Membership = () => {
    const membershipD = useSelector((state) => state.memberships.currentMembership);

    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const c = router.query.membership;
    useEffect(() => {
        const fetch = async () => {
            const c = await router.query.membership;
            dispatch(membershipManagementActions.getSingleMembership(+c))
        }
        fetch()
    }, []);
    return (
        <div style={{ height: "60vh" }} className={styles.add}>
            {modalShow && (
                <MembershipModal
                    redirect={"/membership/memberships"}
                    type={"delete"}
                    action={+c}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <h4>Membership Details #{c}</h4>
            <div style={{ height: "30vh", justifyContent: 'space-around' }} className={styles.view_client_body}>
                <div className={styles.view_client}>
                    <div><p>Membership</p><p style={{ fontWeight: 400 }}>{membershipD?.membership_name}</p></div>
                    <div><p>Price</p><p style={{ fontWeight: 400 }}><FaRupeeSign />{membershipD?.pricing}</p></div>
                    <div ></div>
                    <div ></div>

                </div>
                <div className={styles.view_client}>
                    <div><p style={{ color: "black", fontWeight: 700 }}>Descriptions</p>
                        <p><ul style={{ listStyle: 'disc', color: 'red' }}>
                            {membershipD?.description?.split(";::;").map(m => (<><li className={styles.marker} style={{ color: "black", fontWeight: 400 }}>{m}</li></>))}
                        </ul></p></div>
                    <div ></div>
                    <div ></div>
                    <div ></div>
                </div>

            </div>
            <div className="d-flex justify-content-end">
                <CustomButton
                    height={"3rem"}
                    width={"8rem"}
                    name="Edit"
                    color="#FFFFFF"
                    bgColor="#FA6130"
                    onClick={() => router.push(`/membership/edit_membership/${c}`)}
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

export default Membership;
