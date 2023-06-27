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
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

function SubsidyDetailsPage({ setDetailsPage }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [calculatePage, setCalculatePage] = useState(false);

  const subsidyDetails = useSelector(
    (state) => state?.subsidy?.subsidy_details
  );
  useEffect(() => {
    dispatch(subsidyManagementAction?.getSubsidyList());
  }, [dispatch]);

  const addCalculateLogic = () => {
    // setCalculatePage(true);
    const schemeId = subsidyDetails?.id;

    dispatch(subsidyManagementAction.getUserInputList(schemeId));
    dispatch(subsidyManagementAction.getAllConstantToSubsidy(schemeId));
    router.push("/subsidy/calculate-subsidy-logic");
  };
  const handleSubsidyDetailsCancel = () => {
    setDetailsPage(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tablee}>
          <div
            className={`d-flex justify-content-end align-items-center ${styles.tableHeader}`}
          >
            <div className="d-flex">
              <div className={styles.add_new_btn}>
                <CustomButton
                  name="Add Calculate Logic"
                  bgColor="#4682E3"
                  color="#FFFFFF"
                  onClick={addCalculateLogic}
                />
              </div>
            </div>
          </div>
          {/* <div className={styles.tableBody}> */}
          <div>
            <div className="row mt-3 mx-5">
              <div className="col-sm-4  d-flex flex-column">
                <h6 className="details-page-content-head">Subsidy Name</h6>
                <p>{subsidyDetails?.name}</p>
              </div>
              <div className="col-sm-4 d-flex flex-column">
                <h6 className="details-page-content-head">Category</h6>
                <p>{subsidyDetails?.industries?.[0]?.name}</p>
              </div>
              <div className="col-sm-4 d-flex flex-column">
                <h6 className="details-page-content-head">Sector</h6>
                <p>{subsidyDetails?.sectors?.[0]?.name}</p>
              </div>
            </div>
            <div className="row mt-3 mx-5">
              <div className="col-sm-4 d-flex flex-column">
                <h6 className="details-page-content-head">State</h6>
                <p>State A</p>
              </div>
              <div className="col-sm-4 d-flex flex-column">
                <h6 className="details-page-content-head">Taluka</h6>
                <p>Taluka Name</p>
              </div>
              <div className="col-sm-4 d-flex flex-column">
                <p className="details-page-content-head">Subsidy Under</p>
                <p>
                  {subsidyDetails?.is_subscheme === true
                    ? subsidyDetails?.parent_subsidy_name
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-3 mx-5">
            <p className="details-page-content-head">Questions</p>
            <p>
              <ol>
                {subsidyDetails?.questions?.map((que, ind) => {
                  return (
                    <>
                      <li key={ind}>
                        {que?.display_name !== null
                          ? que?.display_name
                          : que?.name}
                      </li>
                    </>
                  );
                })}
              </ol>
            </p>
          </div>

          {subsidyDetails?.schemes?.length > 0 && (
            <div className="row mt-3 mx-5">
              <p className="details-page-content-head">Schemes</p>
              <p>
                <ol>
                  {subsidyDetails?.schemes?.map((sch, ind) => {
                    return (
                      <>
                        <li key={ind}>{sch?.name}</li>
                      </>
                    );
                  })}
                </ol>
              </p>
            </div>
          )}

          <div className="row mt-3 mx-5">
            <h6 className="details-page-content-head"> Notes </h6>
            <p>
              {subsidyDetails?.description !== null
                ? subsidyDetails?.description
                : "N/A"}
            </p>
          </div>
          <div className="row mt-3 mx-5 ">
            <div className="col-6">
              <h6 className="details-page-content-head">Reference Links</h6>
              {subsidyDetails?.reference_link !== undefined &&
              subsidyDetails?.reference_link !== null ? (
                <Link
                  href={subsidyDetails?.reference_link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-primary"
                >
                  {subsidyDetails?.reference_link}
                </Link>
              ) : (
                "N/A"
              )}
            </div>

            <div className="col-6">
              <h6 className="details-page-content-head">
                Start date and End date
              </h6>
              <p>
                {subsidyDetails?.start_date !== null
                  ? moment(subsidyDetails?.start_date).format("DD/MMM/YYYY")
                  : "N/A"}
                -
                {subsidyDetails?.end_date !== null
                  ? moment(subsidyDetails?.end_date).format("DD/MMM/YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="d-flex justify-content-end">
              <CustomButton
                name="Back"
                type="button"
                width="120px"
                color="#000000"
                bgColor="#FFFFFF"
                border="1px solid #000000"
                onClick={(e) => handleSubsidyDetailsCancel(e)}
              />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default SubsidyDetailsPage;
