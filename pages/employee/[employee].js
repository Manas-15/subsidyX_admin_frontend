import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { EmployeeModal } from "../../components/Common/Modal";

const Employee = () => {
    const employeesData = useSelector((state) => state.employees.employees);
    const [modalShow, setModalShow] = useState(false);
    const router = useRouter();
    const c = router.query.employee;
    const [employeeD, setEmployeeD] = useState({});
    useEffect(() => {
        setEmployeeD(employeesData.find((x) => x.id === +c));
    }, []);
    return (
        <div style={{ height: "60vh" }} className={styles.add}>
            {modalShow && (
                <EmployeeModal
                    redirect={"/employee/employees"}
                    type={"delete"}
                    action={+c}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <h4>Employee Details #{c}</h4>
            <div style={{ height: "30vh", justifyContent: 'space-around' }} className={styles.view_client_body}>
                <div className={styles.view_client}>
                    <div><p>Employee Name</p><p style={{ fontWeight: 400 }}>{employeeD?.name}</p></div>
                    <div><p>Email</p><p style={{ fontWeight: 400 }}>{employeeD?.email}</p></div>
                    <div><p>Contact Details</p><p style={{ fontWeight: 400 }}>{employeeD?.contact}</p></div>
                    <div><p>Associated With</p><p style={{ fontWeight: 400 }}>{employeeD?.associatedWith ? employeeD?.associatedWith : "_"}</p></div>
                </div>
                <div className={styles.view_client}>
                    <div><p>Reports</p><p style={{ fontWeight: 400 }}>{employeeD?.reports}</p></div>
                    <div><p>Clients</p><p style={{ fontWeight: 400 }}>{employeeD?.clients}</p></div>
                    <div><p>Application</p><p style={{ fontWeight: 400 }}>{employeeD?.applications}</p></div>
                    <div><p>Created By</p><p style={{ fontWeight: 400 }}>{employeeD?.createdBy}</p></div>
                </div>

            </div>
            <div className="d-flex justify-content-end">
                <CustomButton
                    height={"3rem"}
                    width={"8rem"}
                    name="Edit"
                    color="#FFFFFF"
                    bgColor="#FA6130"
                    onClick={() => router.push(`/employee/edit_employee/${c}`)}
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

export default Employee;
