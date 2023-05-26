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
import { IndustryCategoryModal } from "../components/Common/Modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getIndustryCategoryLists } from "../redux/Actions/industryCategoryAction";

function IndustryCategory() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);

  const actions = [
    { icon: BsShareFill },
    { icon: HiEye },
    { icon: MdModeEdit },
    { icon: RiDeleteBin5Fill },
  ];
  const industryCategory = useSelector((state) => state?.industryCategory);

  const addNewIndustryCategory = () => {
    setModalShow(true);
    setType("add");
  };

  useEffect(() => {
    dispatch(getIndustryCategoryLists());
    if (industryCategory?.successMessage !== "") {
      toast(industryCategory?.successMessage, {
        hideProgressBar: false,
        autoClose: 3000,
        type: "success",
      });
    }
  }, [
    industryCategory?.isCreated,
    industryCategory?.isUpdated,
    industryCategory?.isDeleted,
  ]);

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
    <div className={styles.container}>
      {modalShow && (
        <IndustryCategoryModal
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
                placeholder="Search Industry Category"
              />
            </div>

            <FilterButton name="Filter" />
          </div>
          <div className="d-flex">
            <div className={styles.add_new_btn}>
              <CustomButton
                name="Add New Industry Category"
                bgColor="#4682E3"
                color="#FFFFFF"
                onClick={addNewIndustryCategory}
              />
            </div>

            <ExportButton name="Export List" />
          </div>
        </div>
        <div className={styles.tableBody}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Enquiry ID</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Owner Name</th>
                <th scope="col">Created Date</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industryCategory?.industryCategoryData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{data?.id}</th>
                    <td>{data?.name}</td>
                    <td>{data?.companyOwnerName}</td>
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
  );
}

export default IndustryCategory;
