import React from "react";
import styles from "../../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
    CustomButton,
    ExportButton,
    FilterButton,
} from "../../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
    EmployeeModal
} from "../../components/Common/Modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "../../components/Common/Pagination";
import { FaRupeeSign } from "react-icons/fa";
import { employeeManagementAction } from "../../redux/Actions/employeeActions";

const Employees = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [modalShow, setModalShow] = useState(false);
    const [type, setType] = useState("");
    const [action, setAction] = useState(0);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const employees = useSelector((state) => state.employees);
    const addNewEmployee = () => {
        router.push("add_employee");
    };

    const handleClick = (item, idx) => {
        console.log(item, idx);
        if (idx === 0) {
            router.push(`/employee/${item?.id}`);
        } else if (idx === 1) {
            router.push(`/employee/edit_employee/${item?.id}`);
        } else if (idx === 2) {
            setModalShow(true);
            setType("delete");
            setAction(+item?.id);
        }
    };
    const actions = [
        { icon: HiEye },
        { icon: MdModeEdit },
        { icon: RiDeleteBin5Fill },
    ];

    useEffect(() => {
        dispatch(employeeManagementAction.getEmployees());
    }, []);

    return (
        <div className={styles.container}>
            {modalShow && (
                <EmployeeModal
                    type={type}
                    action={action}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                />
            )}
            <div className={styles.tablee}>
                <div
                    className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
                >
                    <div className="d-flex justify-content-evenly">
                        {/* <div className={`mx-2 ${styles.search_box}`}>
              <div className={styles.search_icon}>
                <CiSearch />
              </div>
              <input
                type="text"
                className={styles.search_bar}
                placeholder="Search Client Associate"
              />
            </div> */}

                        <FilterButton name="Filter" />
                    </div>
                    <div className="d-flex">
                        <div className={styles.add_new_btn}>
                            <CustomButton
                                name="Add New Employee"
                                bgColor="#4682E3"
                                color="#FFFFFF"
                                onClick={addNewEmployee}
                            />
                        </div>

                        {/* <ExportButton name="Export List" /> */}
                    </div>
                </div>
                <div className={styles.tableBody}>
                    <table className="table table-hover">
                        <thead>
                            <tr className="text-center">

                                <th className="p-4" scope="col">
                                    Employee Name
                                </th>
                                <th className="p-4" scope="col">
                                    Email address
                                </th>
                                <th className="p-4" scope="col">
                                    Contact{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Reports{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Clients{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Role{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Associated With{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Created By
                                </th>

                                <th className="p-4" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.employees?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((data, index) => {
                                return (
                                    <tr className="text-center" key={index}>

                                        <td>{data?.name}</td>
                                        <td>{data?.email}</td>
                                        <td>{data?.contact}</td>
                                        <td>{data?.reports}</td>
                                        <td>{data?.clients}</td>
                                        <td>{data.role}</td>
                                        <td>{data?.associatedWith ? data?.associatedWith : "_"}</td>
                                        <td>{data?.createdBy}</td>
                                        <td>
                                            <ul className="d-flex justify-content-center">
                                                {actions?.map(({ icon: Icon }, idx) => {
                                                    return (
                                                        <li
                                                            key={idx}
                                                            onClick={() => handleClick(data, idx)}
                                                        >
                                                            <Icon
                                                                color="#FA6130"
                                                                size="18px"
                                                                className="action_icon m-2"
                                                            />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination pageSizeOptions={[5, 10, 20, 50]} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} totalItems={employees?.employees?.length} />

        </div>
    );
};

export default Employees;
