import React from "react";
import styles from "../../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { BsShareFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  ClientManagementModal,
  IndustryCategoryModal,
} from "../../components/Common/Modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clientData } from "../../static/clientData";
import { useRouter } from "next/router";
import { clientManagementAction } from "../../redux/Actions/clientManagementAction";

const ClientManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const clients = useSelector((state) => state.client);
  const addNewClientManagement = () => {
    router.push("add_client");
  };

  const handleClick = (item, idx) => {
    console.log(item, idx);
    if (idx === 0) {
      router.push(`/clients/${item?.id}`);
    } else if (idx === 1) {
      router.push(`/clients/edit/${item?.id}`);
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
    dispatch(clientManagementAction?.getClients());
  }, []);

  return (
    <div className={styles.container}>
      {modalShow && (
        <ClientManagementModal
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
                name="Add New Client"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewClientManagement}
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
                  ID
                </th>

                <th className="p-4" scope="col">
                  Client Name
                </th>
                <th className="p-4" scope="col">
                  Client Contact
                </th>
                <th className="p-4" scope="col">
                  Client Email{" "}
                </th>
                <th className="p-4" scope="col">
                  Associate
                </th>
                <th className="p-4" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clients?.clients?.map((data, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <th scope="row">{data?.id}</th>
                    <td>{data?.name}</td>
                    <td>{data?.number}</td>
                    <td>{data?.email}</td>
                    <td>{data?.associated}</td>
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
    </div>
  );
};

export default ClientManagement;
