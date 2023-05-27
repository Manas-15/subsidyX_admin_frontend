import React from "react";
import Form from "react-bootstrap/Form";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getIndustrySectorLists } from "../redux/Actions/industrySectorAction";
import { CustomButton } from "./Common/CustomButton";
import {
  getIndustryCategoryLists,
  industryCategoryActions,
} from "../redux/Actions/industryCategoryAction";
import {
  createQuestion,
  questionActions,
} from "../redux/Actions/questionsAction";

const CategoryQuestion = ({ setModalShow }) => {
  const dispatch = useDispatch();
  const [industryType, setIndustryType] = useState({
    industryCategory: null,
    industrySector: null,
  });
  const [inputList, setInputList] = useState([
    {
      name: "",
      options: [""],
      field_type_id: "",
      question_type_id: 1,
      industry_category_id: null,
      industry_sector_id: null,
    },
  ]);

  const industryCategory = useSelector((state) => state?.industryCategory);
  const industrySector = useSelector((state) => state?.industrySector);

  useEffect(() => {
    dispatch(industryCategoryActions?.getCategories());
  }, []);

  const handleSelectIndustry = (e) => {
    const { name, value } = e.target;
    if (name === "industryCategory") {
      dispatch(getIndustrySectorLists(value));
    }
    setIndustryType({ ...industryType, [name]: value });
    const list = [...inputList];
    if (name === "industryCategory") {
      list[0].industry_category_id = value;
    } else {
      list[0].industry_sector_id = value;
    }
    setInputList(list);
  };

  const handleSelectQuestionChange = (e, index) => {
    const list = [...inputList];
    list[index].field_type_id = e.target.value;
    setInputList(list);
  };

  const handleAddNewInputBox = () => {
    setInputList([
      ...inputList,
      {
        name: "",
        options: [""],
        field_type_id: "",
        question_type_id: 1,
        industry_category_id: industryType?.industryCategory,
        industry_sector_id: industryType?.industrySector,
      },
    ]);
  };
  const handleRemoveInputBox = (e, index) => {
    const removedInputBox = inputList?.filter((input, ind) => {
      return index !== ind;
    });
    setInputList(removedInputBox);
  };

  const handleLabelChange = (e, index, idx) => {
    const { name, value } = e.target;
    console.log(name, value);
    const list = [...inputList];
    if (name === "name") {
      list[index][name] = value;
    } else {
      list[index][name][idx] = value;
    }
    setInputList(list);
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

  const addCategoryWiseQuestion = (e) => {
    e.preventDefault();
    const data = {
      questions: inputList,
    };
    // if (inputList[0].name === "") {
    //   console.log(inputList);
    //   dispatch(alertActionError("Question label is required!"));
    // }
    dispatch(questionActions?.createQuestion(data));
    setModalShow(false);
  };

  const handleCategoryCancel = (e) => {
    e.preventDefault();
    setInputList([
      {
        name: "",
        options: [""],
        field_type_id: "",
        question_type_id: 0,
        industry_category_id: 0,
        industry_sector_id: 0,
      },
    ]);
    setModalShow(false);
  };
  return (
    <>
      <div>
        <Form>
          <div className="mx-4 mb-4">
            <div className="row mx-auto">
              <div className="col-md-5">
                <select
                  className="form-control mb-3"
                  name="industryCategory"
                  onChange={(e) => handleSelectIndustry(e)}
                  required
                >
                  <option value="none">Select Industry Category</option>
                  {industryCategory?.industryCategoryData?.map(
                    (category, ind) => {
                      return (
                        <option
                          className="form-control"
                          key={ind}
                          value={category?.id}
                        >
                          {category?.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <div className="col-md-5">
                <select
                  className="form-control mb-3"
                  name="industrySector"
                  onChange={(e) => handleSelectIndustry(e)}
                >
                  <option value="none">Select Industry Sector</option>
                  {industrySector?.industrySectorData?.sectors?.map(
                    (sector, idx) => {
                      return (
                        <option
                          className="form-control"
                          key={idx}
                          value={sector?.id}
                        >
                          {sector?.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>
            <h5 className="fw-bold mb-3">
              Questions Based on Category ans Sector
            </h5>

            {inputList?.map((item, index) => {
              return (
                <>
                  <div className="row mx-auto">
                    <div className="col-md-5">
                      <Form.Group
                        className="mb-3"
                        controlId="validationCustom05"
                      >
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          placeholder="Enter Label"
                          autoFocus
                          defaultValue=""
                          onChange={(e) => handleLabelChange(e, index)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid zip.
                        </Form.Control.Feedback>
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
                                    required
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
                                    required
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

                  {item?.field_type_id === "4" && (
                    <div className="ms-3 mb-3">
                      <BsFileEarmarkTextFill size="20px" />
                      File Upload
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="d-flex justify-content-end mx-5">
            {/* <button type="submit">Submit</button> */}
            <CustomButton
              name="Submit"
              type="submit"
              color="#FFFFFF"
              bgColor="#FA6130"
              onClick={(e) => addCategoryWiseQuestion(e)}
            />
            <CustomButton
              name="Cancel"
              color="#000000"
              bgColor="#FFFFFF"
              border="1px solid #000000"
              onClick={(e) => handleCategoryCancel(e)}
            />
          </div>
        </Form>
      </div>
    </>
  );
};

export default CategoryQuestion;
