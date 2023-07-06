import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { IoMdAddCircle } from "react-icons/io";
import {
  ConstantManagementModal,
  SubsidyManagementModal,
  UserInputManagementModal,
} from "../../components/Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
import { DotLoading } from "../../components/Common/Loader";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const CalculateSubsidyLogic = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [userInputModalShow, setUserInputModalShow] = useState(false);
  const [conditionModalShow, setConditionModalShow] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [logic, setLogic] = useState([
    {
      userInputType: 0,
      userInputID: 0,
      constantID: 0,
      condition: "",
      formula: "",
      parentConditionId: 0,
    },
  ]);

  const subsidyDetails = useSelector((state) => state?.subsidy);
  const firstThreeIndexOfUserInput = subsidyDetails?.user_input_list?.slice(
    1,
    4
  );
  const firstThreeIndexOfUserConstant =
    subsidyDetails?.constant_list_of_a_subsidy?.slice(0, 3);

  useEffect(() => {
    dispatch(
      subsidyManagementAction.getCondition(subsidyDetails?.subsidy_details?.id)
    );
  }, [subsidyDetails?.subsidy_details?.id]);

  useEffect(() => {
    if (
      logic?.[0]?.userInputType === 0 ||
      logic?.[0]?.userInputID === 0 ||
      logic?.[0]?.formula === "" ||
      logic?.[0]?.constantID === 0 ||
      logic?.[0]?.condition === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [logic]);

  useEffect(() => {
    if (subsidyDetails !== null) {
      setIsLoading(false);
    }
  }, [subsidyDetails]);

  // const addNewLogic = (e) => {
  //   setLogic([
  //     ...logic,
  //     {
  //       userInputType: 0,
  //       userInputID: 0,
  //       constantID: 0,
  //       condition: "",
  //       formula: "",
  //       parentConditionId: 0,
  //     },
  //   ]);
  // };

  useEffect(() => {
    if (type === "edit") {
      const selectedInput = subsidyDetails?.user_input_list?.find(
        (input) => input.id === action.user_input_id
      );
      // console.log(JSON.stringify(selectedInput));
      setLogic([
        {
          userInputType: selectedInput?.filed_type_id,
          userInputID: JSON.stringify(selectedInput),
          constantID: action?.constant_id,
          condition: action?.logical_condition,
          formula: action?.formula,
          parentConditionId: action?.parent_condition_id,
        },
      ]);
    }
  }, [action]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...logic];
    if (name === "userInputType") {
      // const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = JSON.parse(value);
      console.log(selectedValue);
      list[index].userInputID = selectedValue?.id; //object main id
      list[index].userInputType = selectedValue?.filed_type_id; //input type id
    } else if (name === "formula") {
      list[index][name] = value;
    } else {
      list[index][name] = value;
    }
    setLogic(list);
  };

  const handleSubmitLogic = (e) => {
    e.preventDefault();
    let userInputId = "";
    if (typeof JSON.parse(logic?.[0]?.userInputID) === "number") {
      userInputId = logic?.[0]?.userInputID;
    } else {
      userInputId = JSON.parse(logic?.[0]?.userInputID).id;
    }
    //For Create
    const createData = {
      scheme_id: subsidyDetails?.subsidy_details?.id,
      conditions: [
        {
          subsidy_user_input_id: parseInt(userInputId),
          subsidy_user_input_type: parseInt(logic?.[0]?.userInputType),
          condition: logic?.[0]?.condition,
          constant_id: parseInt(logic?.[0]?.constantID),
          subsidy_variable_id: null,
          parent_condition_id:
            logic?.[0]?.parentConditionId !== 0
              ? parseInt(logic?.[0]?.parentConditionId)
              : null,
          matching_criteria: logic?.[0]?.formula,
        },
      ],
    };
    //For update
    const id = action?.id;
    const scheme_id = subsidyDetails?.subsidy_details?.id;
    const editData = {
      conditions: [
        {
          subsidy_user_input_id: parseInt(userInputId),
          subsidy_user_input_type: parseInt(logic?.[0]?.userInputType),
          condition: logic?.[0]?.condition,
          constant_id: parseInt(logic?.[0]?.constantID),
          subsidy_variable_id: null,
          parent_condition_id:
            logic?.[0]?.parentConditionId !== 0
              ? parseInt(logic?.[0]?.parentConditionId)
              : null,
          matching_criteria: logic?.[0]?.formula,
        },
      ],
    };
    if (type === "edit") {
      console.log(editData);
      dispatch(
        subsidyManagementAction.updateCondition({ scheme_id, id, editData })
      );
    } else {
      console.log(createData);
      dispatch(subsidyManagementAction.createCondition(createData));
    }
    setIsLoading(true);
    setType("");
    setLogic([
      {
        userInputType: 0,
        userInputID: 0,
        constantID: 0,
        condition: "",
        formula: "",
        parentConditionId: 0,
      },
    ]);
  };

  const handleAction = (name, item) => {
    const scheme_id = subsidyDetails?.subsidy_details?.id;
    const id = item?.id;
    if (name === "delete") {
      setConditionModalShow(true);
      setType("constantDelete");
      setAction({ id, scheme_id });
    } else {
      setType("edit");
      setAction(item);
    }
  };
  const handleConditionCancel = () => {
    setType("");
    setAction({});
    setLogic([
      {
        userInputType: 0,
        userInputID: 0,
        constantID: 0,
        condition: "",
        formula: "",
        parentConditionId: 0,
      },
    ]);
  };

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
                          key={index}
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
                          key={index}
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

        <div className={styles.report_tablee}>
          <div className="row my-4 mx-5">
            {logic?.map((logiclist, index) => {
              return (
                <>
                  <div className="d-flex justify-content-between me-5 mt-3">
                    <h4>Create Condition</h4>
                  </div>

                  <span className="mt-3 mb-1">Step {index + 1}</span>
                  <div className="col-sm-3">
                    <select
                      name="userInputID"
                      value={logic?.[0]?.userInputID}
                      className="form-control"
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="none">Select User Input</option>
                      {subsidyDetails?.user_input_list?.map((input, idx) => {
                        return (
                          <option key={idx} value={JSON.stringify(input)}>
                            {input?.display_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <select
                      name="constantID"
                      value={logic?.[0]?.constantID}
                      className="form-control"
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="none">Select Constant</option>

                      {subsidyDetails?.constant_list_of_a_subsidy?.map(
                        (input, idx) => {
                          return (
                            <option key={idx} value={input?.id}>
                              {input?.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <select
                      name="condition"
                      value={logic?.[0]?.condition}
                      className="form-control"
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="none">Select Condition</option>
                      <option value="equals">Equals</option>
                      <option value="greator_than">Greator than</option>
                      <option value="less_than">Less than</option>
                      <option value="greator_than_equals_to">
                        Greator than equals to
                      </option>
                      <option value="less_than_equals_to">
                        Less than equals to
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <input
                      name="formula"
                      type="text"
                      value={logic?.[0]?.formula}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Ex- term_loan * 0.25"
                      className="form-control"
                    />
                  </div>
                  {/* <div className="col-sm-1">
                    <IoMdAddCircle
                      size="35px"
                      color="#4682E3"
                      className="ms-3"
                      onClick={(e) => addNewLogic(e)}
                    />
                  </div> */}
                  <div className="col-sm-3 mt-3">
                    <select
                      name="parentConditionId"
                      className="form-control"
                      value={logic?.[0]?.parentConditionId}
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option value="none">Parent Condition</option>
                      {subsidyDetails?.all_conditions?.map(
                        (condition, index) => {
                          return (
                            <>
                              <option key={index} value={condition?.id}>
                                {condition?.user_input_name !== null
                                  ? condition?.user_input_name
                                  : "-"}
                              </option>
                            </>
                          );
                        }
                      )}
                    </select>
                  </div>
                </>
              );
            })}
            <div className="d-flex justify-content-end mt-4">
              {false ? (
                <DotLoading
                  name="Loading ..."
                  type="button"
                  bgColor="#4682e3"
                  color="#FFFFFF"
                  width="140px"
                />
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    // disabled={buttonDisabled}
                    onClick={(e) => handleSubmitLogic(e)}
                  >
                    {type === "edit" ? "Update" : "Submit"}
                  </button>
                  {type === "edit" && (
                    <button
                      className="btn btn-secondary ms-3"
                      type="submit"
                      disabled={buttonDisabled}
                      onClick={(e) => handleConditionCancel(e)}
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.report_tablee}>
          {conditionModalShow && (
            <SubsidyManagementModal
              type={type}
              setType={setType}
              setAction={setAction}
              action={action}
              modalShow={conditionModalShow}
              setModalShow={setConditionModalShow}
              onHide={() => setConditionModalShow(false)}
            />
          )}
          {subsidyDetails?.all_conditions?.length > 0 && (
            <div>
              <div className="d-flex justify-content-between mx-5 mt-3">
                <h4>Calculation Logic</h4>
              </div>
              <div className={`mx-4 ${styles.tableBody}`}>
                <table className="table table-hover">
                  <thead>
                    <tr className="tr_border">
                      <th scope="col">ID</th>
                      <th scope="col">Parent ID</th>
                      <th scope="col">User Input</th>
                      <th scope="col">Condition</th>
                      <th scope="col">Constant Name</th>
                      <th scope="col">Constant Value</th>
                      <th scope="col">Formula</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subsidyDetails?.all_conditions?.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{item.id !== null ? item.id : "-"}</td>
                          <td>
                            {item.parent_condition_id !== null
                              ? item.parent_condition_id
                              : "-"}
                          </td>
                          <td>
                            {item.user_input_name !== null
                              ? item.user_input_name
                              : "-"}
                          </td>
                          <td>
                            {item.logical_condition !== null
                              ? item.logical_condition
                              : "-"}
                          </td>
                          <td>
                            {item.constant_name !== null
                              ? item.constant_name
                              : "-"}
                          </td>
                          <td>
                            {item.constant_value !== null
                              ? item.constant_value
                              : "-"}
                          </td>
                          <td>
                            {item.formula !== null ? item.formula : "N/A"}
                          </td>
                          <td>
                            <MdModeEdit
                              color="#FA6130"
                              size="18px"
                              className="action_icon me-3"
                              onClick={(e) => handleAction("edit", item)}
                            />
                            <RiDeleteBin5Fill
                              color="#FA6130"
                              size="18px"
                              className="action_icon"
                              onClick={(e) => handleAction("delete", item)}
                            />
                          </td>
                        </tr>
                        {/* {item.nested_conditions.length > 0 && (
                        <tr>
                          <td colSpan="9">
                            <table>
                              <tbody>
                                {item.nested_conditions.map((nestedItem) => (
                                  <tr key={nestedItem.id}>
                                    <td>
                                      {nestedItem.user_input_name !== null
                                        ? nestedItem.user_input_name
                                        : "N/A"}
                                    </td>
                                    <td>{nestedItem.logical_condition}</td>
                                    <td>{nestedItem.constant_name}</td>
                                    <td>{nestedItem.constant_value}</td>
                                    <td>{nestedItem.formula}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )} */}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculateSubsidyLogic;
