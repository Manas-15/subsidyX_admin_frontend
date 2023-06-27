import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FieldArray,
  useFormikContext,
} from "formik";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { SubsidySchema } from "./Common/Validation";
import { CustomButton } from "./Common/CustomButton";
import { useEffect } from "react";
import { industryCategoryActions } from "../redux/Actions/industryCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import { industrySectorActions } from "../redux/Actions/industrySectorAction";
import { stateManagementAction } from "../redux/Actions/stateManagementAction";
import { districtManagementAction } from "../redux/Actions/districtManagementAction";
import { talukaManagementAction } from "../redux/Actions/talukaManagementAction";
import { questionActions } from "../redux/Actions/questionsAction";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { addMonths } from "date-fns";
import Multiselect from "multiselect-react-dropdown";
import { MdCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import { subsidyManagementAction } from "../redux/Actions/subsidyManagementAction";

function AddSubsidy({ setModalShow }) {
  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState("1");
  const [isState, setIsState] = useState("1");
  const [stateStatus, setStateStatus] = useState(true);
  const [selectedCategoryID, setSelectedCategoryID] = useState(0);
  const [isSubscheme, setIsSubscheme] = useState(false);

  const industryCategory = useSelector((state) => state?.industryCategory);
  const industrySector = useSelector((state) => state?.industrySector);
  const stateManagement = useSelector((state) => state?.state);
  const districtManagement = useSelector((state) => state?.district);
  const talukaManagement = useSelector((state) => state?.taluka);
  const questions = useSelector((state) => state?.question);
  const subsidyList = useSelector(
    (state) => state?.subsidy?.subsidyManagementData
  );

  console.log(subsidyList);

  const handleRadioClick = (e) => {
    setQuestionType(e.target.value);
  };

  const handleStateClick = (e) => {
    setIsState(e.target.value);
    setStateStatus(!stateStatus);
  };
  useEffect(() => {
    dispatch(industryCategoryActions?.getCategories());
    dispatch(stateManagementAction?.getStates());
    // dispatch(questionActions?.getQuestions());
  }, []);
  const handleAddNewIndustryBox = (e, index) => {
    console.log(e, index);
  };

  const handleSelectedCategory = (id) => {
    setSelectedCategoryID(id);
    dispatch(industrySectorActions?.getSectors(id));
  };
  const handleSelectedSector = (id) => {
    const data = {
      industry_category_id: selectedCategoryID,
      indsutry_sector_id: id,
    };
    dispatch(questionActions?.getQuestions(data));
  };
  const handleSelectedState = (id) => {
    dispatch(districtManagementAction?.getDistricts(id));
  };
  const handleSelectedDistrict = (id) => {
    dispatch(talukaManagementAction?.getTalukas(id));
  };
  const handleSubsidyCancel = () => {
    setModalShow(false);
  };

  const handleCreateSubsidy = (values) => {
    console.log(values);
    const data = {
      subsidy_name: values?.subsidy,
      refer_link: values?.reflink,
      industry_category_id: parseInt(values?.categoryID),
      industry_sector_id: parseInt(values?.sectorID),
      question_type_id: parseInt(questionType),
      state_id: parseInt(values?.stateID),
      district_id: parseInt(values?.districtID),
      note: values?.notes,
      taluka_id_list: values?.talukaID?.map((taluka) => taluka?.id),
      question_id_list: values?.questions?.map((que) =>
        parseInt(que?.questionID)
      ),
      start_date: values?.startDate,
      end_date: values?.endDate,
      is_subscheme: values?.isSubscheme,
      parent_id: values?.isSubscheme ? parseInt(values?.parentSubsidyID) : 0,
    };
    if (data) {
      console.log(data);
      dispatch(subsidyManagementAction?.createSubsidy(data));
      setModalShow(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tablee}>
        <div className="mx-4 mb-3 mt-4">
          <Formik
            enableReinitialize
            initialValues={{
              subsidy: "",
              categoryID: null,
              sectorID: null,
              // industry: [{ categoryID: null, sectorID: null }],
              stateID: null,
              districtID: null,
              talukaID: [],
              questions: [{ questionID: null }],
              notes: "",
              reflink: "",
              startDate: "",
              endDate: "",
              isSubscheme: false,
              parentSubsidyID: 0,
            }}
            validationSchema={SubsidySchema}
            onSubmit={(values, event) => {
              handleCreateSubsidy(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              /* and other goodies */
            }) => (
              <>
                <Form autoComplete="false">
                  <div className="form-group m-0 mt-3">
                    <Field
                      name="subsidy"
                      id="subsidy"
                      type="text"
                      placeholder="Enter Subsidy"
                      className={
                        "form-control" +
                        (errors.subsidy && touched.subsidy ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="subsidy"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="row mt-3">
                    <div className="form-group m-0 col-md-6">
                      <Field
                        name="categoryID"
                        as="select"
                        onChange={(e) => {
                          handleSelectedCategory(e.target.value);
                          setFieldValue("categoryID", e.target.value);
                        }}
                        className={
                          "form-select" +
                          (errors.categoryID && touched.categoryID
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Industry Category</option>
                        {industryCategory?.industryCategoryData?.map(
                          (category, index) => (
                            <option value={category?.id} key={index}>
                              {category?.name}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name="categoryID"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group m-0 col-md-6">
                      <>
                        <Field
                          name="sectorID"
                          as="select"
                          onChange={(e) => {
                            handleSelectedSector(e.target.value);
                            setFieldValue("sectorID", e.target.value);
                          }}
                          className={
                            "form-select" +
                            (errors.sectorID && touched.sectorID
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <>
                            <option value="1">Industry Sector</option>

                            {industrySector?.industrySectorData?.sectors?.map(
                              (sector, index) => (
                                <option value={sector?.id} key={index}>
                                  {sector?.name}
                                </option>
                              )
                            )}
                          </>
                        </Field>
                        <ErrorMessage
                          name="sectorID"
                          component="div"
                          className="invalid-feedback"
                        />
                      </>
                    </div>
                    {/* {values?.industry?.length !== 1 && (
                      <div className="col-md-1">
                        <MdCancel
                          size="35px"
                          color="#FA6130"
                          onClick={(e) => remove(index)}
                        />
                      </div>
                    )}
                    {values?.industry?.length - 1 === index && (
                      <>
                        <div className="col-md-1">
                          <IoMdAddCircle
                            size="35px"
                            color="#4682E3"
                            onClick={(e) =>
                              push({
                                categoryID: null,
                                sectorID: null,
                              })
                            }
                          />
                        </div>
                      </>
                    )} */}
                  </div>
                  {/* <FieldArray name="industry">
                    {({ push, remove }) => (
                      <>
                        {values?.industry?.map((_, index) => (
                          <div key={index} className="row mt-3">
                            <div className="form-group m-0 col-md-5">
                              <Field
                                name={`industry[${index}].categoryID`}
                                as="select"
                                onChange={(e) => {
                                  handleSelectedCategory(e.target.value);
                                  setFieldValue(
                                    `industry[${index}].categoryID`,
                                    e.target.value
                                  );
                                }}
                                className={
                                  "form-select" +
                                  (errors.categoryID && touched.categoryID
                                    ? " is-invalid"
                                    : "")
                                }
                              >
                                <option value="">Industry Category</option>
                                {industryCategory?.industryCategoryData?.map(
                                  (category, index) => (
                                    <option value={category?.id} key={index}>
                                      {category?.name}
                                    </option>
                                  )
                                )}
                              </Field>
                              <ErrorMessage
                                name={`industry[${index}].categoryID`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>
                            <div className="form-group m-0 col-md-5">
                              <>
                                <Field
                                  name={`industry[${index}].sectorID`}
                                  as="select"
                                  onChange={(e) => {
                                    handleSelectedSector(e.target.value);
                                    setFieldValue(
                                      `industry[${index}].sectorID`,
                                      e.target.value
                                    );
                                  }}
                                  className={
                                    "form-select" +
                                    (errors.sectorID && touched.sectorID
                                      ? " is-invalid"
                                      : "")
                                  }
                                >
                                  <>
                                    <option value="1">Industry Sector</option>

                                    {industrySector?.industrySectorData?.sectors?.map(
                                      (sector, index) => (
                                        <option value={sector?.id} key={index}>
                                          {sector?.name}
                                        </option>
                                      )
                                    )}
                                  </>
                                </Field>
                                <ErrorMessage
                                  name={`industry[${index}].sectorID`}
                                  component="div"
                                  className="invalid-feedback"
                                />
                                <Field name="talukaID" className={`ml-3`}>
                                  {({ field, form: { setFieldValue } }) => {
                                    return (
                                      <Multiselect
                                        {...field}
                                        showCheckbox
                                        placeholder="Industry Sector"
                                        className={
                                          errors.talukaID && touched.talukaID
                                            ? " is-invalid"
                                            : ""
                                        }
                                        options={industrysector}
                                        onSelect={(event) => {
                                          setFieldValue(field.name, event);
                                        }}
                                        onRemove={(event) =>
                                          setFieldValue(field.name, event)
                                        }
                                        displayValue="name"
                                      />
                                    );
                                  }}
                                </Field>
                              </>
                            </div>
                            {values?.industry?.length !== 1 && (
                              <div className="col-md-1">
                                <MdCancel
                                  size="35px"
                                  color="#FA6130"
                                  onClick={(e) => remove(index)}
                                />
                              </div>
                            )}
                            {values?.industry?.length - 1 === index && (
                              <>
                                <div className="col-md-1">
                                  <IoMdAddCircle
                                    size="35px"
                                    color="#4682E3"
                                    onClick={(e) =>
                                      push({
                                        categoryID: null,
                                        sectorID: null,
                                      })
                                    }
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray> */}

                  <div className="d-flex justify-content-space mt-4">
                    <div className="d-flex me-3">
                      <input
                        type="radio"
                        name="state"
                        value="1"
                        checked={isState === "1" ? true : false}
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "10px",
                        }}
                        onChange={(e) => handleStateClick(e)}
                      />
                      <h6>State</h6>
                    </div>
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="state"
                        value="2"
                        style={{
                          width: "18px",
                          height: "18px",
                          marginRight: "10px",
                        }}
                        onChange={(e) => handleStateClick(e)}
                      />
                      <h6>Central</h6>
                    </div>
                  </div>

                  {stateStatus && (
                    <div className="row mt-3">
                      <div className="form-group m-0 col-md-4">
                        <Field
                          name="stateID"
                          as="select"
                          // disabled={isState === "2" ? true : false}
                          onChange={(e) => {
                            handleSelectedState(e.target.value);
                            setFieldValue("stateID", e.target.value);
                          }}
                          className={
                            "form-select" +
                            (errors.stateID && touched.stateID
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select State</option>
                          {stateManagement?.stateManagementData?.map(
                            (state, index) => (
                              <option value={state?.id} key={index}>
                                {state?.name}
                              </option>
                            )
                          )}
                        </Field>
                        <ErrorMessage
                          name="stateID"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group m-0 col-md-4">
                        <Field
                          name="districtID"
                          as="select"
                          // disabled={isState === "2" ? true : false}
                          onChange={(e) => {
                            handleSelectedDistrict(e.target.value);
                            setFieldValue("districtID", e.target.value);
                          }}
                          className={
                            "form-select" +
                            (errors.districtID && touched.districtID
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="">Select District</option>
                          {districtManagement?.districtManagementData?.district?.map(
                            (district, index) => (
                              <option value={district?.id} key={index}>
                                {district?.name}
                              </option>
                            )
                          )}
                        </Field>
                        <ErrorMessage
                          name="districtID"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group m-0 col-md-4">
                        <Field name="talukaID" className={`ml-3`}>
                          {({ field, form: { setFieldValue } }) => {
                            return (
                              <Multiselect
                                {...field}
                                // disable={isState === "2" ? true : false}
                                // showCheckbox
                                placeholder="Select Taluks"
                                className={
                                  errors.talukaID && touched.talukaID
                                    ? " is-invalid"
                                    : ""
                                }
                                options={
                                  talukaManagement?.talukaManagementData
                                    ?.talukas
                                }
                                onSelect={(event) => {
                                  setFieldValue(field.name, event);
                                }}
                                onRemove={(event) =>
                                  setFieldValue(field.name, event)
                                }
                                displayValue="name"
                              />
                            );
                          }}
                        </Field>

                        <ErrorMessage
                          name="talukaID"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                  )}

                  {/* <FieldArray name="questions">
                    {({ push, remove }) => (
                      <>
                        {values.questions.map((_, index) => {
                          return (
                            <div key={index} className="row mt-3">
                              {console.log(`questions[${index}].questionID`)}
                              <div className="form-group m-0 col-md-10">
                                <Field
                                  // name="questionID"
                                  name={`questions[${index}].questionID`}
                                  as="select"
                                  onChange={(e) => {
                                    // handleSelectedQuestion(e.target.value);
                                    setFieldValue(
                                      `questions[${index}].questionID`,
                                      e.target.value
                                    );
                                  }}
                                  className={
                                    "form-select" +
                                    (errors.questionID && touched.questionID
                                      ? " is-invalid"
                                      : "")
                                  }
                                >
                                  <option value="">Select Question</option>
                                  {questions?.questionData?.questions?.map(
                                    (question, idx) => (
                                      <option value={question?.id} key={idx}>
                                        {question?.name}
                                      </option>
                                    )
                                  )}
                                </Field>
                                <ErrorMessage
                                  name={`questions[${index}].questionID`}
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>

                              {values?.questionID?.length !== 1 && (
                                <div className="col-md-1">
                                  <MdCancel
                                    size="35px"
                                    color="#FA6130"
                                    onClick={(e) => remove(index)}
                                  />
                                </div>
                              )}
                              {values?.questionID?.length - 1 === index && (
                                <>
                                  <div className="col-md-1">
                                    <IoMdAddCircle
                                      size="35px"
                                      color="#4682E3"
                                      onClick={(e) => push({})}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </FieldArray> */}

                  <div className="form-group m-0 mt-3">
                    <Field
                      as="textarea"
                      name="notes"
                      id="notes"
                      cols="110"
                      rows="3"
                      placeholder="Enter notes"
                      className={
                        "form-control bg-gray-100 p-1 px-3 placeholder-black w-4/12  mb-6" +
                        (errors.subsidy && touched.subsidy ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="notes"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group m-0 mt-3">
                    <Field
                      name="reflink"
                      id="reflink"
                      type="text"
                      placeholder="Reference Link"
                      className={
                        "form-control" +
                        (errors.reflink && touched.reflink ? " is-invalid" : "")
                      }
                    />

                    <ErrorMessage
                      name="reflink"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div>
                    <h6 className="fw-bold mt-3">Subsidy Under</h6>
                    <div className="d-flex justify-content-space">
                      <div className="d-flex mx-3">
                        <input
                          type="radio"
                          name="questiontype"
                          value="1"
                          checked={questionType === "1" ? true : false}
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

                  <FieldArray name="questions">
                    {({ push, remove }) => (
                      <>
                        {values?.questions?.map((_, index) => (
                          <div key={index} className="row mt-3">
                            <div className="form-group m-0 col-md-10">
                              <Field
                                name={`questions[${index}].questionID`}
                                as="select"
                                onChange={(e) => {
                                  // handleSelectedCategory(e.target.value);
                                  setFieldValue(
                                    `questions[${index}].questionID`,
                                    e.target.value
                                  );
                                }}
                                className={
                                  "form-select" +
                                  (errors.questions &&
                                  errors.questions[index] &&
                                  errors.questions[index].questionID &&
                                  touched.questions &&
                                  touched.questions[index] &&
                                  touched.questions[index].questionID
                                    ? " is-invalid"
                                    : "")
                                }
                              >
                                <option value="">Select Question</option>
                                {questions?.questionData?.questions?.map(
                                  (category, index) => (
                                    <option value={category?.id} key={index}>
                                      {category?.name}
                                    </option>
                                  )
                                )}
                              </Field>
                              <ErrorMessage
                                name={`questions[${index}].questionID`}
                                component="div"
                                className="invalid-feedback"
                              />
                            </div>

                            {values?.questions?.length !== 1 && (
                              <div className="col-md-1">
                                <MdCancel
                                  size="35px"
                                  color="#FA6130"
                                  onClick={(e) => remove(index)}
                                />
                              </div>
                            )}
                            {values?.questions?.length - 1 === index && (
                              <>
                                <div className="col-md-1">
                                  <IoMdAddCircle
                                    size="35px"
                                    color="#4682E3"
                                    onClick={(e) =>
                                      push({
                                        questionID: null,
                                      })
                                    }
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>

                  <div>
                    <h6 className="my-3 d-flex">
                      <input
                        name="isSubscheme"
                        type="checkbox"
                        onChange={(e) => {
                          setIsSubscheme(e.target.checked);
                          setFieldValue("isSubscheme", e.target.checked);
                        }}
                      />
                      &nbsp; <span>Is Subscheme</span>
                    </h6>
                    {isSubscheme && (
                      <>
                        <Field
                          name="parentSubsidyID"
                          as="select"
                          onChange={(e) => {
                            setFieldValue("parentSubsidyID", e.target.value);
                          }}
                          className={
                            "form-select" +
                            (errors.parentSubsidyID && touched.parentSubsidyID
                              ? " is-invalid"
                              : "")
                          }
                        >
                          <option value="none">Select Subsidy</option>
                          {subsidyList?.map((sub, idx) => {
                            return (
                              <option value={sub?.id}>
                                {sub?.subsidy_name}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage
                          name="parentSubsidyID"
                          component="div"
                          className="invalid-feedback"
                        />
                      </>
                    )}
                  </div>

                  <div>
                    <h6 className="my-3">Subsidy Start & End Date</h6>
                    <div className="row">
                      <div className="col-md-3">
                        <Field
                          name="startDate"
                          placeholder="Start Date"
                          className={`ml-3 ${styles.startDate}`}
                        >
                          {({ field, form: { setFieldValue } }) => {
                            return (
                              <DatePicker
                                {...field}
                                className={
                                  "form-control" +
                                  (errors.startDate && touched.startDate
                                    ? " is-invalid"
                                    : "")
                                }
                                autoComplete="none"
                                minDate={new Date()}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                dropdownMode="select"
                                placeholderText="Start Date"
                                selected={
                                  (field.value && new Date(field.value)) || null
                                }
                                dateFormat="yyyy-MM-dd"
                                onChange={(val) => {
                                  setFieldValue(
                                    field.name,
                                    moment(val).format("YYYY-MM-DD")
                                  );
                                }}
                              />
                            );
                          }}
                        </Field>
                        <AiOutlineCalendar
                          className={`${styles.startDateIcon}`}
                        />
                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="invalid-feedback d-inline-block"
                        />
                      </div>
                      <div className="col-md-3">
                        <Field
                          name="endDate"
                          placeholder="End Date"
                          className={`ml-3 ${styles.endDate}`}
                        >
                          {({ field, form: { setFieldValue } }) => {
                            return (
                              <DatePicker
                                {...field}
                                showIcon
                                className={
                                  "form-control" +
                                  (errors.endDate && touched.endDate
                                    ? " is-invalid"
                                    : "")
                                }
                                autoComplete="none"
                                minDate={new Date()}
                                maxDate={addMonths(new Date(), 5)}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                dropdownMode="select"
                                placeholderText="End Date"
                                selected={
                                  (field.value && new Date(field.value)) || null
                                }
                                dateFormat="dd-MM-yyyy"
                                onChange={(val) => {
                                  setFieldValue(
                                    field.name,
                                    moment(val).format("YYYY-MM-DD")
                                  );
                                }}
                              />
                            );
                          }}
                        </Field>
                        <AiOutlineCalendar
                          className={`${styles.endDateIcon}`}
                        />

                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="invalid-feedback d-inline-block"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mx-5 mt-1">
                    <CustomButton
                      name="Submit"
                      type="submit"
                      color="#FFFFFF"
                      bgColor="#FA6130"
                    />
                    <CustomButton
                      name="Cancel"
                      type="button"
                      color="#000000"
                      bgColor="#FFFFFF"
                      border="1px solid #000000"
                      onClick={(e) => handleSubsidyCancel(e)}
                    />
                  </div>
                  {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddSubsidy;
