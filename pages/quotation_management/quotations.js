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
    QuotationModal
} from "../../components/Common/Modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Pagination from "../../components/Common/Pagination";
import { IoIosArrowDown } from "react-icons/io";
import { quotationData } from "../../static/quotationData";
import { MdOutlineDone } from "react-icons/md";
const Quotations = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [modalShow, setModalShow] = useState(false);
    const [type, setType] = useState("");
    const [action, setAction] = useState(0);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const addQuotation = () => {
        router.push("add_quotation");
    };

    const handleClick = (item, idx) => {
        console.log(item, idx);
        if (idx === 0) {
            router.push(`/quotation_management/${item?.id}`);
        } else if (idx === 1) {
            router.push(`/quotation_management/edit_quotation/${item?.id}`);
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

    function capitalizeFirstLetter(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    return (
        <div className={styles.container}>
            {modalShow && (
                <QuotationModal
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
                                name="Add New Quotation"
                                bgColor="#4682E3"
                                color="#FFFFFF"
                                onClick={addQuotation}
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
                                    Client Name
                                </th>
                                <th className="p-4" scope="col">
                                    Client Email
                                </th>
                                <th className="p-4" scope="col">
                                    Subsidy Type
                                </th>
                                <th className="p-4" scope="col">
                                    Quotation
                                </th>
                                <th className="p-4" scope="col">
                                    Status
                                </th>
                                <th className="p-4" scope="col">
                                    Document
                                </th>
                                <th className="p-4" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotationData?.map((data, index) => {
                                return (
                                    <tr className="text-center" key={index}>

                                        <td>{data?.clientName}</td>
                                        <td>{data?.clientName}</td>
                                        <td>{data?.subsidyType}</td>
                                        <td>{data?.rate}%</td>
                                        <td >
                                            <p style={{ fontWeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-around', background: data.quotation.status === 'pending' ? 'rgba(95, 154, 250,0.2)' : 'rgba(48,163,2,0.2)', padding: '4px', borderRadius: '0.4rem' }}>
                                                <div style={{ height: "0.6rem", width: "0.6rem", background: (data.quotation.status === "pending") ? "#5f9afa" : "#2fa302", borderRadius: "50%" }}>
                                                </div>{capitalizeFirstLetter(data?.quotation?.status)} {data.quotation.status === 'pending' ? <IoIosArrowDown /> : <MdOutlineDone />}
                                            </p></td>
                                        <td style={{ textDecoration: 'underline', color: '#fa6130' }}>{data?.documentName}.pdf</td>
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
            <Pagination pageSizeOptions={[5, 10, 20, 50]} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} totalItems={quotationData?.length} />

        </div>
    );
};

export default Quotations;
