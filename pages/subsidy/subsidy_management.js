import styles from "../../styles/Home.module.css";
import { CiSearch } from "react-icons/ci";
import { CustomButton } from "../../components/Common/CustomButton";
import { HiEye } from "react-icons/hi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
import SubsidyDetailsPage from "./subsidy_details";
import { Spinner } from "../../components/Common/Loader";
import AddEditSubsidy from "../../components/add_subsidy";
import { SubsidyManagementModal } from "../../components/Common/Modal";



function SubsidyManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState(0);
  const [updatedData, setUpdatedData] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (subsidyList !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [subsidyList]);

  const handleClick = (item, idx) => {
    console.log(item, idx);
    if (idx === 0) {
      setDetailsPage(true);
      dispatch(subsidyManagementAction.getSubsidyDetails(item));
    } else if (idx === 1) {
      setModalShow(true);
      setType("edit");
      dispatch(subsidyManagementAction.getSubsidyDetails(item));
    } else {
      setDeleteModalShow(true);
      setType("subsidyDelete");
      setAction(item);
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
        <AddEditSubsidy
          setModalShow={setModalShow}
          type={type}
          setType={setType}
        />
      ) : detailsPage ? (
        <SubsidyDetailsPage setDetailsPage={setDetailsPage} />
      ) : (
        <div className={`${styles.container}`}>
          {isLoading && (
            <div className={styles.overlay}>
              <Spinner />
            </div>
          )}
          {deleteModalShow && (
            <SubsidyManagementModal
              type={type}
              setType={setType}
              action={action}
              setAction={setAction}
              modalShow={deleteModalShow}
              setModalShow={setDeleteModalShow}
              onHide={() => setDeleteModalShow(false)}
            />
          )}
          <div className={`${styles.tablee} `}>
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
                    placeholder="Search Subsidy"
                  />
                </div> */}

                {/* <FilterButton name="Filter" /> */}
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

                {/* <ExportButton name="Export List" /> */}
              </div>
            </div>

            <div className={styles.tableBody}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th colSpan="2">Subsidy Name</th>
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
                        <td colSpan="2">
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
                          <ul className="d-flex">
                            {actions?.map(({ icon: Icon }, idx) => {
                              return (
                                <li
                                  key={idx}
                                  className=" ms-4"
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
