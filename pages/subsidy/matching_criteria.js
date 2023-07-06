import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { MatchingCriteriaModal } from "../../components/Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { subsidyManagementAction } from "../../redux/Actions/subsidyManagementAction";
// import { alertActions } from "../../redux/Actions/alertAction";
import { DotLoading } from "../../components/Common/Loader";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const MatchingCriteria = () => {
  const dispatch = useDispatch();
  const [conditionModalShow, setConditionModalShow] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [criteria, setCriteria] = useState({
    name: "",
    question: "",
    questionID: 0,
    condition: "",
    value: "",
  });

  const subsidyDetails = useSelector((state) => state?.subsidy);

  useEffect(() => {
    dispatch(
      subsidyManagementAction.getListOfQuestionForASubsidy(
        subsidyDetails?.subsidy_details?.id
      )
    );
    dispatch(
      subsidyManagementAction.getListOfMatchingCriteria(
        subsidyDetails?.subsidy_details?.id
      )
    );
  }, [subsidyDetails?.subsidy_details?.id]);

  // useEffect(() => {
  //   if (
  //     logic?.[0]?.userInputType === 0 ||
  //     logic?.[0]?.userInputID === 0 ||
  //     logic?.[0]?.formula === "" ||
  //     logic?.[0]?.constantID === 0 ||
  //     logic?.[0]?.condition === ""
  //   ) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // }, [logic]);

  useEffect(() => {
    if (subsidyDetails !== null) {
      setIsLoading(false);
    }
  }, [subsidyDetails]);

  useEffect(() => {
    if (type === "edit") {
      const selectedQue =
        subsidyDetails?.all_questions_for_a_subsidy?.questions?.find(
          (que) => que?.subsidy_question_id === action?.subsidy_question_id
        );

      setCriteria({
        name: action?.name,
        question: JSON.stringify(selectedQue),
        questionID: action?.subsidy_question_id,
        condition: action?.condition,
        value: action?.value,
      });
    }
  }, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let list = { ...criteria };
    if (name === "question") {
      const selectedValue = JSON.parse(value);
      setSelectedQuestion(selectedValue);
      list.name = selectedValue?.question_name;
      list.questionID = selectedValue?.subsidy_question_id;
      list.question = value; //for display in dropdown
    } else if (name === "condition") {
      list.condition = value;
    } else {
      list.value = value;
    }
    setCriteria(list);
  };

  const handleSubmitLogic = (e) => {
    e.preventDefault();
    let userInputId = "";
    // if (typeof JSON.parse(logic?.[0]?.userInputID) === "number") {
    //   userInputId = logic?.[0]?.userInputID;
    // } else {
    //   userInputId = JSON.parse(logic?.[0]?.userInputID).id;
    // }
    //For Create
    const scheme_id = subsidyDetails?.subsidy_details?.id;
    const criteriaData = {
      name: criteria?.name,
      subsidy_question_id: criteria?.questionID,
      condition: criteria?.condition,
      value: criteria?.value,
    };
    //For update
    if (type === "edit") {
      dispatch(
        subsidyManagementAction.updateMatchingCriteria({
          scheme_id,
          id,
          criteriaData,
        })
      );
    } else {
      console.log(criteriaData);
      dispatch(
        subsidyManagementAction.createMatchingCriteria({
          scheme_id,
          criteriaData,
        })
      );
    }
    setIsLoading(true);
    setType("");
    setCriteria({
      name: "",
      question: "",
      questionID: 0,
      condition: "",
      value: "",
    });
  };

  const handleAction = (name, item) => {
    const scheme_id = subsidyDetails?.subsidy_details?.id;
    const id = item?.id;
    if (name === "delete") {
      setConditionModalShow(true);
      setType("delete");
      setAction({ id, scheme_id });
    } else {
      setType("edit");
      setAction(item);
    }
  };
  const handleConditionCancel = () => {
    setType("");
    setAction({});
    setCriteria({
      name: "",
      question: "",
      questionID: 0,
      condition: "",
      value: "",
    });
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.report_tablee}>
          <div className="row my-4 mx-5">
            <div className="d-flex justify-content-between me-5 mt-3">
              <h4>Matching Criteria</h4>
            </div>
            <div className="col-sm-3">
              <select
                name="question"
                value={criteria?.question}
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                <option value="none">Select Questions</option>
                {subsidyDetails?.all_questions_for_a_subsidy?.questions?.map(
                  (input, idx) => {
                    return (
                      <option key={idx} value={JSON.stringify(input)}>
                        {input?.display_label !== null
                          ? input?.display_label
                          : input?.question_name}
                      </option>
                    );
                  }
                )}
              </select>
            </div>

            {selectedQuestion?.field !== null &&
              selectedQuestion?.field !== undefined && (
                <div className="col-sm-3">
                  <div className="form-control">{selectedQuestion?.field}</div>
                </div>
              )}

            {selectedQuestion?.field !== "text box" &&
              selectedQuestion?.field !== null && (
                <div className="col-sm-3">
                  <select
                    name="constantID"
                    // value={}
                    className="form-control"
                    // onChange={(e) => handleChange(e)}
                  >
                    <option value="none">Options</option>

                    {selectedQuestion?.options?.map((input, idx) => {
                      return (
                        <option key={idx} value={idx}>
                          {input}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            <div className="col-sm-3">
              <select
                name="condition"
                value={criteria?.condition}
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                <option value="none">Select Condition</option>
                <option value="equals">Equals</option>
                <option value="string_match">String Match</option>
                <option value="greater_than">Greator than</option>
                <option value="less_than">Less than</option>
                <option value="in_array">In Array</option>
                <option value="greater_equal">Greater Equal</option>
              </select>
            </div>
            <div
              className={`col-sm-3 ${
                selectedQuestion?.field !== "text box" &&
                selectedQuestion?.field !== null &&
                selectedQuestion?.field !== undefined
                  ? "mt-3"
                  : ""
              } `}
            >
              <input
                name="value"
                type="text"
                value={criteria?.value}
                onChange={(e) => handleChange(e)}
                placeholder="Enter value"
                className="form-control"
              />
            </div>
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
                      // disabled={buttonDisabled}
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
            <MatchingCriteriaModal
              type={type}
              setType={setType}
              setAction={setAction}
              action={action}
              modalShow={conditionModalShow}
              setModalShow={setConditionModalShow}
              onHide={() => setConditionModalShow(false)}
            />
          )}
          <div>
            <div className="d-flex justify-content-between mx-5 mt-3">
              <h4>Matching Criteria List</h4>
            </div>
            <div className={`mx-4 ${styles.tableBody}`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Question</th>
                    <th scope="col">Condition</th>
                    <th scope="col">Eligible Answer</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyDetails?.all_matching_criteria_list?.map(
                    (item, index) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{item.id !== null ? item.id : "-"}</td>
                          <td>{item.name !== null ? item.name : "-"}</td>
                          <td>
                            {item.condition !== null ? item.condition : "-"}
                          </td>
                          <td>{item.value !== null ? item.value : "-"}</td>
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
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingCriteria;
