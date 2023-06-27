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
import { useSelector, useDispatch } from "react-redux";
import AddSubsidy from "../../components/add_subsidy";
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
import SubsidyDetailsPage from "./subsidy-details";

function SubsidyManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const [updatedData, setUpdatedData] = useState();

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
      setDetailsPage(true);
      dispatch(subsidyManagementAction.getSubsidyDetails(item));
    } else if (idx === 1) {
      setModalShow(true);
      setType("edit");
      setAction(item);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(item?.id);
    }
  };

  useEffect(() => {
    const extractedSubSchemes = subsidyList?.subsidyManagementData?.reduce(
      (result, item) => {
        if (item.sub_scheme.length > 0) {
          result.push(...item.sub_scheme);
          item.sub_scheme = [];
        }
        return result;
      },
      []
    );
    // Concatenate the extracted sub_scheme objects with the original data
    const modifiedData =
      subsidyList?.subsidyManagementData.concat(extractedSubSchemes);

    setUpdatedData(modifiedData);
  }, [subsidyList?.subsidyManagementData]);

  return (
    <>
      {modalShow ? (
        <AddSubsidy setModalShow={setModalShow} />
      ) : detailsPage ? (
        <SubsidyDetailsPage setDetailsPage={setDetailsPage} />
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
                    {/* <th scope="col">Category</th> */}
                    <th scope="col">State</th>
                    <th scope="col">District</th>

                    {/* <th scope="col">Taluka</th>
                    <th scope="col">Question</th> */}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">
                          {data?.subsidy_name !== undefined
                            ? data?.subsidy_name
                            : data?.name}
                        </td>
                        {/* <td>{data?.industry_sector}</td> */}
                        <td>{data?.state}</td>
                        <td>{data?.district}</td>

                        {/* <td>{data?.taluka}</td> */}

                        {/* <td>{data?.questions[0].question_name}</td> */}
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
