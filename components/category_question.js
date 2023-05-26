import React from "react";
import Form from "react-bootstrap/Form";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getIndustrySectorLists } from "../redux/Actions/industrySectorAction";
import { CustomButton } from "./Common/CustomButton";
import { getIndustryCategoryLists } from "../redux/Actions/industryCategoryAction";

const CategoryQuestion = () => {
  const dispatch = useDispatch();
  const [industryType, setIndustryType] = useState({
    industryCategory: undefined,
    industrySector: undefined,
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
  // console.log(industrySector);

  useEffect(() => {
    dispatch(getIndustryCategoryLists());
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
  // console.log(industryType);
  // console.log(inputList);

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

        //         industryType
        // industryCategory
        // industrySector
      },
    ]);
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

  const addCategoryWiseQuestion = (e) => {
    e.preventDefault();
    const data = {
      questions: inputList,
    };
    console.log(inputList);
    // dispatch(createQuestion(data));
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
              <div className="col-md-6">
                <select
                  className="form-control mb-3"
                  name="industryCategory"
                  onChange={(e) => handleSelectIndustry(e)}
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
                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          type="text"
                          name="label"
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
                        <option className="form-control" value="textbox">
                          Text Box
                        </option>
                        <option className="form-control" value="multichoice">
                          Multi Choice
                        </option>
                        <option className="form-control" value="dropdown">
                          Drop Down
                        </option>
                        <option className="form-control" value="fileupload">
                          File Upload
                        </option>
                      </select>
                    </div>
                    <div className="col-md-1">
                      <IoMdAddCircle
                        size="35px"
                        color="#4682E3"
                        onClick={(e) => handleAddNewInputBox(e, index)}
                      />
                    </div>
                    {/* {inputList.length !== 1 && (
                    <div className="col-md-1">
                      <MdCancel
                        size="35px"
                        color="#FA6130"
                        onClick={(e) => handleAddNewInputBox(e, index)}
                      />
                    </div>
                  )} */}
                    {/* {inputList.length - 1 === index && (
                    <>
                      <div className="col-md-1">
                        <IoMdAddCircle
                          size="35px"
                          color="#4682E3"
                          onClick={(e) => handleAddNewInputBox(e, index)}
                        />
                      </div>
                    </>
                  )} */}
                  </div>

                  {item?.selectOption === "textbox" && (
                    <div className="row mx-auto">
                      <div className="col-md-6">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            name="inputValue"
                            placeholder="Type a text"
                            autoFocus
                            defaultValue=""
                            onChange={(e) => handleLabelChange(e, index)}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  )}

                  {item?.selectOption === "multichoice" && "MultiChoice"}

                  {item?.selectOption === "dropdown" && (
                    <div className="col-md-5">
                      <select
                        className="form-control mb-3"
                        name="industryCategory"
                        onChange={(e) => handleSelectIndustry(e)}
                      >
                        <option value="none">Select Industry Category</option>
                        <option className="form-control" value="textbox">
                          Text Box
                        </option>
                        <option className="form-control" value="multichoice">
                          Multi Choice
                        </option>
                        <option className="form-control" value="dropdown">
                          Drop Down
                        </option>
                        <option className="form-control" value="fileupload">
                          File Upload
                        </option>
                      </select>
                    </div>
                  )}

                  {item?.selectOption === "fileupload" && "Fileupload"}
                </>
              );
            })}
          </div>
          <div className="d-flex justify-content-end mx-5">
            <CustomButton
              name="Add"
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
