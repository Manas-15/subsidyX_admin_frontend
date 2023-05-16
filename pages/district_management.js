import styles from "../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getStateManagementLists } from "../redux/Actions/stateManagementAction";
import { DistrictManagementModal } from "../components/Common/Modal";
import { getDistrictManagementLists } from "../redux/Actions/districtManagementAction";

function DistrictManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);

  const actions = [{ icon: MdModeEdit }, { icon: RiDeleteBin5Fill }];
  const districtManagement = useSelector((state) => state?.districtManagement);
  console.log(districtManagement);

  const addNewDistrict = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(getDistrictManagementLists());
  }, [districtManagement?.isCreated, districtManagement?.isDeleted]);

  const handleClick = (e, ID, idx) => {
    console.log(e.target.value, ID, idx);
    if (idx === 0) {
      console.log("Edited");
    } else {
      setModalShow(true);
      setType("delete");
      setAction(ID);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <DistrictManagementModal
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
          <div className="d-flex justify-content-evenly ">
            <div className={`mx-2 ${styles.search_box}`}>
              <div className={styles.search_icon}>
                <CiSearch />
              </div>
              <input
                type="text"
                className={styles.search_bar}
                placeholder="Search District"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New District"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewDistrict}
              />
            </div>

            <ExportButton name="Export List" />
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">District</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districtManagement?.districtManagementData?.district?.map(
                (data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{data?.id}</th>
                      <td>{data?.name}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <ul className="d-flex justify-content-end">
                          {actions?.map(({ icon: Icon }, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={(e) => handleClick(e, data?.id, idx)}
                              >
                                <Icon
                                  color="#FA6130"
                                  size="18px"
                                  className="ms-2"
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DistrictManagement;
