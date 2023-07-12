import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css"
import { CustomButton } from '../../components/Common/CustomButton'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ClientManagementModal } from '../../components/Common/Modal'
const Client = () => {
    const clientData = useSelector(state => state.client.clients)
    const [modalShow, setModalShow] = useState(false)
    const router = useRouter()
    const c = router.query.client
    const [clientD, setClientD] = useState({})
    useEffect(() => {
        setClientD(clientData.find(x => x.id === +c))
    }, [])
    return (
        <div className={styles.add}>
            {modalShow && (
                <ClientManagementModal
                    type={"delete"}
                    action={c}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <h4>Client Details {c}</h4>
            <div className={styles.view_client_body}>
                <div className={styles.view_client} >
                    <p>Name</p>
                    <p>Email</p>
                    <p>Contact</p>
                    <p>Associate With</p>
                </div>
                <div className={styles.view_client_content}  >
                    <p >{clientD?.name}</p>
                    <p>{clientD?.email}</p>
                    <p>{clientD?.number}</p>
                    <p>{clientD?.associated}</p>
                </div>
            </div>
            <div>
                <CustomButton height={"3rem"} width={"8rem"} name="Edit" color="#FFFFFF" bgColor="#FA6130" onClick={() => router.push(`/clients/edit/${c}`)} />
                <CustomButton height={"3rem"} width={"8rem"} name="Delete" bgcolor="#FFFFFF" color="#000" border="1px solid #000" type={"button"} onClick={() => setModalShow(true)} />
            </div>
        </div>
    )
}

export default Client
