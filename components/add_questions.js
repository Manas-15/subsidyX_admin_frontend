import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import GeneralQuestion from "./general_question";
import CategoryQuestion from "./category_question";

function AddQuestion({
  type,
  action,
  setType,
  setAction,
  setModalShow,
  setAddQuestion,
}) {
  // console.log(type, action);
  // console.log(action?.question_type_id);

  const [questionType, setQuestionType] = useState(1);

  useEffect(() => {
    if (type === "edit") {
      setQuestionType(parseInt(action?.question_type_id));
    }
  }, [type]);

  const handleRadioClick = (e) => {
    setQuestionType(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.tablee}>
        <div className="mx-4 mb-3 mt-4">
          <h5 className="fw-bold mb-3">Select Questions Type</h5>
          <div className="d-flex justify-content-space">
            <div className="d-flex mx-3">
              <input
                type="radio"
                name="questiontype"
                value="1"
                checked={questionType === 1 ? true : false}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "10px",
                }}
                onChange={(e) => handleRadioClick(e)}
              />
              <h6>General Questions</h6>
            </div>
            <div className="d-flex">
              <input
                type="radio"
                name="questiontype"
                value="2"
                checked={questionType === 2 ? true : false}
                style={{
                  width: "18px",
                  height: "18px",
                  marginRight: "10px",
                }}
                onChange={(e) => handleRadioClick(e)}
              />
              <h6>Question Based On Category and Sector</h6>
            </div>
          </div>
        </div>
        {questionType === 1 ? (
          <GeneralQuestion
            type={type}
            action={action}
            setType={setType}
            setAction={setAction}
            setModalShow={setModalShow}
            setAddQuestion={setAddQuestion}
          />
        ) : (
          <CategoryQuestion
            type={type}
            action={action}
            setType={setType}
            setAction={setAction}
            setModalShow={setModalShow}
            setAddQuestion={setAddQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default AddQuestion;
