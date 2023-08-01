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
    ChannelPartnerModal,
} from "../../components/Common/Modal";
import Pagination from "../../components/Common/Pagination";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { channelPartnerManagementActions } from "../../redux/Actions/channelPartnersAction";
const ChannelPartners = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [pageSize, setPageSize] = useState(5)
    const [page, setPage] = useState(1)
    const [modalShow, setModalShow] = useState(false);
    const [type, setType] = useState("");
    const [action, setAction] = useState(0);
    const channelPartners = useSelector((state) => state.channelPartners);
    const addNewChannelPartner = () => {
        router.push("add_channel_partner");
    };

    const handleClick = (item, idx) => {
        console.log(item, idx);
        if (idx === 0) {
            router.push(`/channel_partner_management/${item?.id}`);
        } else if (idx === 1) {
            router.push(`/channel_partner_management/edit_channel_partner/${item?.id}`);
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
        dispatch(channelPartnerManagementActions.getChannelPartners());
    }, []);

    return (
        <div className={styles.container}>
            {modalShow && (
                <ChannelPartnerModal
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
                                name="Add New Channel Partner"
                                bgColor="#4682E3"
                                color="#FFFFFF"
                                onClick={addNewChannelPartner}
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
                                    Channel Partner Name
                                </th>
                                <th className="p-4" scope="col">
                                    Channel Partner Email
                                </th>
                                <th className="p-4" scope="col">
                                    Contact Details{" "}
                                </th>
                                <th className="p-4" scope="col">
                                    Report Count
                                </th>
                                <th className="p-4" scope="col">
                                    Client ID
                                </th>
                                <th className="p-4" scope="col">
                                    Address
                                </th>
                                <th className="p-4" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {channelPartners.channelPartners?.channel_partners.map((data, index) => {
                                return (
                                    <tr className="text-center" key={index}>

                                        <td>{data?.first_name}{" "}{data?.last_name}</td>
                                        <td>{data?.email}</td>
                                        <td>{data?.contact}</td>
                                        <td>{data?.report_count}</td>
                                        <td>{data?.client_id || 'NA'}</td>
                                        <td>{data?.address}</td>
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
            <Pagination pageSizeOptions={[5, 10, 20, 50]} pageSize={pageSize} setPageSize={setPageSize} page={page} setPage={setPage} totalItems={channelPartners?.channelPartners?.total} />
        </div>
    );
};

export default ChannelPartners;
