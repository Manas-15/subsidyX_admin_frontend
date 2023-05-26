import React from "react";
import Form from "react-bootstrap/Form";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CustomButton } from "./Common/CustomButton";
import { createQuestion } from "../redux/Actions/questionsAction";

const GeneralQuestion = ({ setModalShow }) => {
  const dispatch = useDispatch();
  const [inputList, setInputList] = useState([
    { name: "", options: [""], field_type_id: "", question_type_id: 0 },
  ]);

  const handleSelectQuestionChange = (e, index) => {
    const list = [...inputList];
    list[index].field_type_id = e.target.value;
    setInputList(list);
  };

  const handleAddNewInputBox = () => {
    setInputList([
      ...inputList,
      { name: "", options: [""], field_type_id: "", question_type_id: 0 },
    ]);
  };
  const handleRemoveInputBox = (e, index) => {
    const removedInputBox = inputList?.filter((input, ind) => {
      return index !== ind;
    });
    setInputList(removedInputBox);
  };

  const handleAddOption = (index, idx) => {
    const list = [...inputList];
    list[index].options = [...list[index].options, ""];
    setInputList(list);
  };
  const handleRemoveOptionBox = (index, idx) => {
    const list = [...inputList];
    list[index].options = list[index].options?.filter((option, ind) => {
      return idx !== ind;
    });
    setInputList(list);
  };

  const handleLabelChange = (e, index, idx) => {
    const { name, value } = e.target;
    const list = [...inputList];
    if (name === "name") {
      list[index][name] = value;
    } else {
      list[index][name][idx] = value;
    }
    setInputList(list);
  };

  const addGeneralWiseQuestion = (e) => {
    e.preventDefault();
    const data = {
      questions: inputList,
    };
    dispatch(createQuestion(data));
    setModalShow(false);
  };

  const handleGeneralCancel = (e) => {
    e.preventDefault();
    setInputList([
      { name: "", options: [""], field_type_id: "", question_type_id: 0 },
    ]);
    setModalShow(false);
  };

  return (
    <div>
      <Form>
        <div className="mx-4">
          <h5 className="fw-bold mb-3">General Questions</h5>

          {inputList?.map((item, index) => {
            return (
              <>
                <div className="row mx-auto" key={index}>
                  <div
                    className="col-md-5"
                    style={{ width: "44 % !important" }}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Label"
                        autoFocus
                        defaultValue=""
                        onChange={(e) => handleLabelChange(e, index)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-5">
                    <select
                      className="form-control mb-3"
                      onChange={(e) => handleSelectQuestionChange(e, index)}
                    >
                      <option value="none">Select Category</option>
                      <option className="form-control" value="1">
                        Text Box
                      </option>
                      <option className="form-control" value="2">
                        Multi Choice
                      </option>
                      <option className="form-control" value="3">
                        Drop Down
                      </option>
                      <option className="form-control" value="4">
                        File Upload
                      </option>
                    </select>
                  </div>
                  {inputList?.length !== 1 && (
                    <div className="col-md-1">
                      <MdCancel
                        size="35px"
                        color="#FA6130"
                        onClick={(e) => handleRemoveInputBox(e, index)}
                      />
                    </div>
                  )}
                  {inputList?.length - 1 === index && (
                    <>
                      <div className="col-md-1">
                        <IoMdAddCircle
                          size="35px"
                          color="#4682E3"
                          onClick={(e) => handleAddNewInputBox(e, index)}
                        />
                      </div>
                    </>
                  )}
                </div>

                {item?.field_type_id === "1" && (
                  <div className="row mx-auto">
                    <div className="col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          name="option"
                          placeholder="Type a text"
                          autoFocus
                          defaultValue=""
                          disabled
                        />
                      </Form.Group>
                    </div>
                  </div>
                )}

                {item?.field_type_id === "2" && (
                  <>
                    {item?.options?.map((option, idx) => {
                      return (
                        <>
                          <div className="d-flex" key={idx}>
                            <input
                              type="checkbox"
                              disabled
                              style={{
                                width: "18px",
                                height: "18px",
                                marginTop: "10px",
                                marginRight: "10px",
                                marginLeft: "10px",
                              }}
                            />
                            <div className="col-md-4 me-2">
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Control
                                  type="text"
                                  name="options"
                                  placeholder="Type a text"
                                  autoFocus
                                  defaultValue=""
                                  onChange={(e) =>
                                    handleLabelChange(e, index, idx)
                                  }
                                />
                              </Form.Group>
                            </div>
                            {item?.options?.length !== 1 && (
                              <div>
                                <MdCancel
                                  size="35px"
                                  color="#FA6130"
                                  onClick={(e) =>
                                    handleRemoveOptionBox(index, idx)
                                  }
                                />
                              </div>
                            )}

                            {item?.options?.length - 1 === idx && (
                              <div>
                                <IoMdAddCircle
                                  size="35px"
                                  color="#4682E3"
                                  onClick={() => handleAddOption(index, idx)}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                )}

                {item?.field_type_id === "3" && (
                  <>
                    {item?.options?.map((option, idx) => {
                      return (
                        <>
                          <div className="d-flex" key={idx}>
                            <div className="col-md-4 ms-3 me-2">
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Control
                                  type="text"
                                  name="options"
                                  placeholder="Type a text"
                                  autoFocus
                                  defaultValue=""
                                  onChange={(e) =>
                                    handleLabelChange(e, index, idx)
                                  }
                                />
                              </Form.Group>
                            </div>
                            {item?.options?.length !== 1 && (
                              <div>
                                <MdCancel
                                  size="35px"
                                  color="#FA6130"
                                  onClick={(e) =>
                                    handleRemoveOptionBox(index, idx)
                                  }
                                />
                              </div>
                            )}

                            {item?.options?.length - 1 === idx && (
                              <div>
                                <IoMdAddCircle
                                  size="35px"
                                  color="#4682E3"
                                  onClick={() => handleAddOption(index, idx)}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </>
                )}

                {item?.field_type_id === "4" && "Fileupload"}
              </>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mx-5 mt-5">
          <CustomButton
            name="Submit"
            color="#FFFFFF"
            bgColor="#FA6130"
            onClick={(e) => addGeneralWiseQuestion(e)}
          />
          <CustomButton
            name="Cancel"
            color="#000000"
            bgColor="#FFFFFF"
            border="1px solid #000000"
            onClick={(e) => handleGeneralCancel(e)}
          />
        </div>
      </Form>
    </div>
  );
};

export default GeneralQuestion;
