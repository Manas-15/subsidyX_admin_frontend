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
import { useSelector, useDispatch } from "react-redux";
import AddQuestion from "../components/add_questions";
import {
  getQuestionLists,
  questionActions,
} from "../redux/Actions/questionsAction";
import { QuestionManagementModal } from "../components/Common/Modal";

function Questions() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState({});

  const actions = [
    // { icon: BsShareFill },
    { icon: HiEye },
    { icon: MdModeEdit },
    { icon: RiDeleteBin5Fill },
  ];
  const questions = useSelector((state) => state?.question);

  const addNewQuestionList = () => {
    setAddQuestion(true);
    setType("add");
    setModalShow(true);
  };

  useEffect(() => {
    dispatch(questionActions?.getQuestions());
  }, [questions?.isCreated, questions?.isDeleted]);

  const handleClick = (data, idx) => {
    console.log(data, idx);
    // if (idx === 0) {
    //   console.log("Shared");
    // } else
    if (idx === 0) {
      console.log("viewed");
    } else if (idx === 1) {
      setAddQuestion(true);
      setModalShow(true);
      setType("edit");
      setAction(data);
    } else {
      setModalShow(true);
      setType("delete");
      setAction(data?.id);
    }
  };

  console.log(type, action);

  return (
    <>
      {addQuestion ? (
        <AddQuestion
          type={type}
          action={action}
          setType={setType}
          setAction={setAction}
          setModalShow={setModalShow}
          setAddQuestion={setAddQuestion}
        />
      ) : (
        <div className={styles.container}>
          {type === "delete" && (
            <QuestionManagementModal
              type={type}
              setType={setType}
              setAction={setAction}
              action={action}
              modalShow={modalShow}
              setModalShow={setModalShow}
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
                    placeholder="Search Industry Category"
                  />
                </div>

                <FilterButton name="Filter" /> */}
              </div>
              <div className="d-flex">
                <div className={styles.add_new_btn}>
                  <CustomButton
                    name="Add New Question List"
                    bgColor="#4682E3"
                    color="#FFFFFF"
                    onClick={addNewQuestionList}
                  />
                </div>

                {/* <ExportButton name="Export List" /> */}
              </div>
            </div>
            <div className={styles.tableBody}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Industry Category</th>
                    <th scope="col">Industry Sector</th>
                    <th scope="col">Question</th>
                    <th scope="col">Field</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {/* {console.log(questions?.questionData?.questions)} */}
                <tbody>
                  {questions?.questionData?.questions?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {data?.industry_category === " "
                            ? "-"
                            : data?.industry_category}
                        </td>
                        <td>
                          {data?.industry_sector === " "
                            ? "-"
                            : data?.industry_sector}
                        </td>
                        <td>{data?.name}</td>
                        <td>{data?.field}</td>
                        {console.log(data)}
                        <td>
                          {data?.question_type_id === 1
                            ? "General"
                            : "Industry"}
                        </td>
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

export default Questions;
