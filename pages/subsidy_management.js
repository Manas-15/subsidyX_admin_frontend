import styles from "../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddSubsidy from "../components/add_subsidy";
import { subsidyManagementAction } from "../redux/Actions/subsidyManagementAction";

function SubsidyManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);

  const actions = [
    { icon: HiEye },
    { icon: MdModeEdit },
    { icon: RiDeleteBin5Fill },
  ];
  const subsidyList = useSelector((state) => state?.subsidy);

  const addNewSubsidyManagement = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(subsidyManagementAction?.getSubsidyList());
  }, [dispatch]);

  const handleClick = (item, idx) => {
    console.log(item, idx);
    if (idx === 0) {
      console.log("Shared");
    } else if (idx === 1) {
      console.log("viewed");
    } else if (idx === 2) {
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
    <>
      {true ? (
        <AddSubsidy setModalShow={setModalShow} />
      ) : (
        <div className={styles.container}>
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
                    placeholder="Search Subsidy"
                  />
                </div>

                <FilterButton name="Filter" />
              </div>
              <div className="d-flex">
                <div className={styles.add_new_btn}>
                  <CustomButton
                    name="Add New Subsidy"
                    bgColor="#4682E3"
                    color="#FFFFFF"
                    onClick={addNewSubsidyManagement}
                  />
                </div>

                <ExportButton name="Export List" />
              </div>
            </div>
            <div className={styles.tableBody}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Subsidy Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Sector</th>
                    <th scope="col">State</th>
                    <th scope="col">Taluka</th>
                    <th scope="col">Question</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyList?.subsidyManagementData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">{data?.subsidy_name}</td>
                        <td>{data?.industry_category}</td>
                        <td>{data?.industry_sector}</td>
                        <td>{data?.state}</td>
                        <td>{data?.taluka}</td>

                        <td>{data?.questions[0].question_name}</td>
                        <td>
                          <ul className="d-flex justify-content-between">
                            {actions?.map(({ icon: Icon }, idx) => {
                              return (
                                <li
                                  key={idx}
                                  onClick={() => handleClick(data, idx)}
                                >
                                  <Icon color="#FA6130" size="18px" />
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
      )}
    </>
  );
}

export default SubsidyManagement;
