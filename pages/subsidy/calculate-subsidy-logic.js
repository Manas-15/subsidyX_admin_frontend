import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { CustomButton } from "../../components/Common/CustomButton";
import { IoMdAddCircle } from "react-icons/io";
import {
  ConstantManagementModal,
  UserInputManagementModal,
} from "../../components/Common/Modal";
import { useSelector } from "react-redux";

const CalculateSubsidyLogic = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userInputModalShow, setUserInputModalShow] = useState(false);

  const subsidyDetails = useSelector((state) => state?.subsidy);
  const firstThreeIndexOfUserInput = subsidyDetails?.user_input_list?.slice(
    1,
    4
  );
  const firstThreeIndexOfUserConstant =
    subsidyDetails?.constant_list_of_a_subsidy?.slice(1, 4);

  return (
    <div>
      <div className={styles.container}>
        {userInputModalShow && (
          <UserInputManagementModal
            // type={type}
            // action={action}
            show={userInputModalShow}
            setModalShow={setUserInputModalShow}
            onHide={() => setUserInputModalShow(false)}
          />
        )}
        {modalShow && (
          <ConstantManagementModal
            // type={type}
            // action={action}
            show={modalShow}
            setModalShow={setModalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        <div className={styles.report_tablee}>
          <div className="my-4">
            <div className="d-flex justify-content-between mx-5">
              <h4>{subsidyDetails?.subsidy_details?.name}</h4>
            </div>
            <div className="row mt-4 mx-5">
              <div className="d-flex">
                <div className="col-sm-2">
                  <p>User Input</p>
                </div>
                <div className="col-sm-8">
                  <div className="form-control d-flex">
                    {firstThreeIndexOfUserInput?.map((input, index) => {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "10px",
                            color: "#fa6130",
                            fontWeight: "bold",
                          }}
                        >
                          {input?.display_name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="col-sm-2">
                  <IoMdAddCircle
                    size="35px"
                    color="#4682E3"
                    className="ms-3"
                    onClick={(e) => setUserInputModalShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 mx-5">
              <div className="d-flex">
                <div className="col-sm-2">
                  <p>Constants</p>
                </div>
                <div className="col-sm-8">
                  <div className="form-control d-flex">
                    {firstThreeIndexOfUserConstant?.map((constant, index) => {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "10px",
                            color: "#4682e3",
                            fontWeight: "bold",
                          }}
                        >
                          {constant?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="col-sm-2">
                  <IoMdAddCircle
                    size="35px"
                    color="#4682E3"
                    className="ms-3"
                    onClick={(e) => setModalShow(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.report_tablee}>
          <div>
            <div className="d-flex justify-content-between mx-5 mt-3">
              <h4>General Information</h4>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>InquireID</h6>
                <p>#{viewReport?.info?.report_id}</p>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Category</h6>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Sector</h6>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created Date</h6>
              </div>
            </div>
            <div className="row mt-4 mx-5">
              <div className="col-sm-3 d-flex flex-column">
                <h6>State</h6>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Taluka</h6>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Company Name</h6>
              </div>
              <div className="col-sm-3 d-flex flex-column">
                <h6>Created By</h6>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CalculateSubsidyLogic;
