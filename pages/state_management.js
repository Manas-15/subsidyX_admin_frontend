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
import { StateManagementModal } from "../components/Common/Modal";

function StateManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);

  const actions = [{ icon: MdModeEdit }, { icon: RiDeleteBin5Fill }];
  const stateManagement = useSelector((state) => state?.stateManagement);
  console.log(stateManagement);

  const addNewState = () => {
    setModalShow(true);
    setType("add");
    // toast("Wow so easy!");
  };

  useEffect(() => {
    dispatch(getStateManagementLists());
  }, [stateManagement?.isCreated, stateManagement?.isDeleted]);

  const handleClick = (e, ID, idx) => {
    console.log(e.target.value, ID, idx);
    if (idx === 0) {
      console.log("Edited");
      setModalShow(true);
      setType("edit");
        setAction(ID);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(ID);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <StateManagementModal
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
                placeholder="Search State"
              />
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New State"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewState}
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
                <th scope="col">State</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stateManagement?.stateManagementData?.map((data, index) => {
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
                              onClick={(e) => handleClick(data, idx)}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StateManagement;
