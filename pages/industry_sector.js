import styles from "../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import {
  CustomButton,
  ExportButton,
  FilterButton,
} from "../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { BsShareFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { IndustrySectorModal } from "../components/Common/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getIndustrySectorLists,
  industryCategoryActions,
  industrySectorActions,
} from "../redux/Actions/industrySectorAction";

function IndustrySector() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const actions = [
    { icon: BsShareFill },
    { icon: HiEye },
    { icon: MdModeEdit },
    { icon: RiDeleteBin5Fill },
  ];
  const industrySector = useSelector((state) => state?.industrySector);

  const addNewIndustrySector = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(industrySectorActions?.getSectors());
  }, []);

  const handleClick = (data, idx) => {
    console.log(data, idx);
    if (idx === 0) {
      console.log("Shared");
    } else if (idx === 1) {
      console.log("viewed");
    } else if (idx === 2) {
      setModalShow(true);
      setType("edit");
      setAction(data);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(data?.id);
    }
  };

  return (
    <div className={styles.container}>
      {modalShow && (
        <IndustrySectorModal
          type={type}
          action={action}
          show={modalShow}
          setmodalshow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      <div className={styles.tablee}>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.tableHeader}`}
        >
          <div className="d-flex justify-content-evenly ">
            {/* <div className={`mx-2 ${styles.search_box}`}>
              <div className={styles.search_icon}>
                <CiSearch />
              </div>
              <input
                type="text"
                className={styles.search_bar}
                placeholder="Search Industry Sector"
              />
            </div>
            <FilterButton name="Filter" /> */}
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New Industry Sector"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewIndustrySector}
              />
            </div>

            {/* <ExportButton name="Export List" /> */}
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Sector</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
                <th scope="col"> </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industrySector?.industrySectorData?.sectors?.map(
                (data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{data?.id}</th>
                      <td>{data?.name}</td>
                      <td>{data?.industry}</td>
                      <td>{data?.createdDt}</td>
                      <td>{data?.category}</td>
                      <td>
                        <ul className="d-flex justify-content-between">
                          {actions?.map(({ icon: Icon }, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={() => handleClick(data, idx)}
                              >
                                <Icon
                                  color="#FA6130"
                                  size="18px"
                                  className="action_icon"
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

export default IndustrySector;
