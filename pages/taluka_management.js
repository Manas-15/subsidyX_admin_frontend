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
import {
  getTalukaManagementLists,
  talukaManagementAction,
} from "../redux/Actions/talukaManagementAction";
import { TalukaManagementModal } from "../components/Common/Modal";

function TalukaManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const actions = [{ icon: MdModeEdit }, { icon: RiDeleteBin5Fill }];
  const talukaManagement = useSelector((state) => state?.taluka);

  const addNewTaluka = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(talukaManagementAction?.getTalukas());
  }, [
    talukaManagement?.isCreated,
    talukaManagement?.isUpdated,
    talukaManagement?.isDeleted,
  ]);

  const handleClick = (item, idx) => {
    if (idx === 0) {
      setModalShow(true);
      setType("edit");
      setAction(item);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(item?.id);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <TalukaManagementModal
          type={type}
          action={action}
          show={modalShow}
          toggleModalshow={setModalShow}
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
                placeholder="Search Taluka"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New Taluka"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewTaluka}
              />
            </div>

            <ExportButton name="Export List" />
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Taluka ID</th>
                <th scope="col">Taluka Name</th>
                <th scope="col">District</th>
                <th scope="col">State</th>
                <th scope="col"> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {talukaManagement?.talukaManagementData?.talukas?.map(
                (data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{data?.id}</th>
                      <td>{data?.name}</td>
                      <td>{data?.district}</td>
                      <td>{data?.state}</td>
                      <td></td>
                      <td>
                        <ul className="d-flex justify-content-end">
                          {actions?.map(({ icon: Icon }, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={() => handleClick(data, idx)}
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

export default TalukaManagement;
