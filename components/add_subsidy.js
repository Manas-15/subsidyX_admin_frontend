import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { SubsidySchema } from "./Common/Validation";
import { CustomButton } from "./Common/CustomButton";
import { useEffect } from "react";
import {
  getIndustryCategoryLists,
  industryCategoryActions,
} from "../redux/Actions/industryCategoryAction";
import { useDispatch, useSelector } from "react-redux";
import {
  getIndustrySectorLists,
  industrySectorActions,
} from "../redux/Actions/industrySectorAction";
import {
  getStateManagementLists,
  stateManagementAction,
} from "../redux/Actions/stateManagementAction";
import {
  districtManagementAction,
  getDistrictManagementLists,
} from "../redux/Actions/districtManagementAction";
import {
  getTalukaManagementLists,
  talukaManagementAction,
} from "../redux/Actions/talukaManagementAction";
import {
  getQuestionLists,
  questionActions,
} from "../redux/Actions/questionsAction";
// import { DatePicker } from "rsuite";
// import "rsuite/dist/rsuite.min.css";
import DatePicker from "react-datepicker";
import * as moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { createSubsidy } from "../redux/Actions/subsidyManagementAction";

function AddSubsidy({ setModalShow }) {
  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState("1");

  const industryCategory = useSelector((state) => state?.industryCategory);
  const industrySector = useSelector((state) => state?.industrySector);
  const stateManagement = useSelector((state) => state?.state);
  const districtManagement = useSelector((state) => state?.district);
  const talukaManagement = useSelector((state) => state?.taluka);
  const questions = useSelector((state) => state?.question);

  const handleRadioClick = (e) => {
    setQuestionType(e.target.value);
  };
  useEffect(() => {
    dispatch(industryCategoryActions?.getCategories());
    dispatch(industrySectorActions?.getSectors());
    dispatch(stateManagementAction?.getStates());
    dispatch(districtManagementAction?.getDistricts());
    dispatch(talukaManagementAction?.getTalukas());
    dispatch(questionActions?.getQuestions());
  }, []);

  const handleCreateSubsidy = (values) => {
    console.log(values);
    const data = {
      subsidy_name: values?.subsidy,
      refer_link: values?.reflink,
      industry_category_id: parseInt(values?.categoryID),
      industry_sector_id: parseInt(values?.sectorID),
      question_type_id: 2,
      state_id: parseInt(values?.stateID),
      district_id: parseInt(values?.districtID),
      note: values?.notes,
      taluka_id_list: [parseInt(values?.talukaID)],
      question_id_list: [parseInt(values?.questionID)],
      start_date: values?.startDate,
      end_date: values?.endDate,
    };
    if (data) {
      dispatch(createSubsidy(data));
    }
  };

  const IndustryCategory = () => {
    const { values, setFieldValue, errors, touched } = useFormikContext();
    console.log(
      values,
      "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL"
    );

    useEffect(() => {
      // dispatch(getIndustrySectorLists(values.categoryID))
      // setFieldValue("sectorID");
    }, []);
    return (
      <>
        <Field
          name="sectorID"
          as="select"
          className={
            "form-select" +
            (errors.sectorID && touched.sectorID ? " is-invalid" : "")
          }
        >
          <option value="">Select Sector</option>
          {industrySector?.industrySectorData?.sectors?.map((sector, index) => (
            <option value={sector?.id} key={index}>
              {sector?.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="sectorID"
          component="div"
          className="invalid-feedback"
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tablee}>
        <div className="mx-4 mb-3 mt-4">
          <Formik
            enableReinitialize
            initialValues={{
              subsidy: "",
              categoryID: 0,
              sectorID: 0,
              stateID: 0,
              districtID: 0,
              talukaID: "",
              questionID: "",
              notes: "",
              reflink: "",
              startDate: "",
              endDate: "",
            }}
            validator={() => ({})}
            // validationSchema={SubsidySchema}
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
              /* and other goodies */
            }) => (
              <>
                <Form autoComplete="false">
                  <div>
                    <h5 className="fw-bold mb-3">Select Questions Type</h5>
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
                  <div className="form-group m-0 mt-3">
                    <label htmlFor="subsidy" className="has-float-label">
                      <Field
                        name="subsidy"
                        id="subsidy"
                        type="text"
                        placeholder="Enter Subsidy"
                        className={
                          "form-control" +
                          (errors.subsidy && touched.subsidy
                            ? " is-invalid"
                            : "")
                        }
                      />
                    </label>
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
                        className={
                          "form-select" +
                          (errors.categoryID && touched.categoryID
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Category</option>
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
                      <IndustryCategory />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="form-group m-0 col-md-4">
                      <Field
                        name="stateID"
                        as="select"
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
                        className={
                          "form-select" +
                          (errors.districtID && touched.districtID
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select District</option>
                        <option value="2">Manas</option>

                        {/* {districtManagement?.districtManagementData?.district?.map(
                          (district, index) => (
                            <option value={district?.id} key={index}>
                              {district?.district}manas
                            </option>
                          )
                        )} */}
                      </Field>
                      <ErrorMessage
                        name="districtID"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group m-0 col-md-4">
                      <Field
                        name="talukaID"
                        as="select"
                        className={
                          "form-select" +
                          (errors.talukaID && touched.talukaID
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option value="">Select Taluka</option>
                        {talukaManagement?.talukaManagementData?.talukas?.map(
                          (taluka, index) => (
                            <option value={taluka?.id} key={index}>
                              {taluka?.name}
                            </option>
                          )
                        )}
                      </Field>
                      <ErrorMessage
                        name="talukaID"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>

                  <div className="form-group m-0 mt-3">
                    <Field
                      name="questionID"
                      as="select"
                      className={
                        "form-select" +
                        (errors.questionID && touched.questionID
                          ? " is-invalid"
                          : "")
                      }
                    >
                      <option value="">Select Question</option>
                      {questions?.questionData?.questions?.map(
                        (question, index) => (
                          <option value={question?.id} key={index}>
                            {question?.name}
                          </option>
                        )
                      )}
                    </Field>
                    <ErrorMessage
                      name="questionID"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

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

                  <h6 className="my-3">Subsidy Start & End Date</h6>
                  <div className="row">
                    <div className="col-md-3">
                      <Field
                        name="startDate"
                        placeholder="Start Date"
                        className="ml-3"
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
                              maxDate={new Date()}
                              showMonthDropdown={true}
                              showYearDropdown={true}
                              dropdownMode="select"
                              selected={
                                (field.value && new Date(field.value)) || null
                              }
                              dateFormat="yyyy-MM-dd"
                              onChange={(val) => {
                                // setFieldValue(field.name, val);
                                setFieldValue(
                                  field.name,
                                  moment(val).format("YYYY-MM-DD")
                                );
                              }}
                            />
                          );
                        }}
                      </Field>
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
                        className="ml-3"
                      >
                        {({ field, form: { setFieldValue } }) => {
                          return (
                            <DatePicker
                              {...field}
                              className={
                                "form-control" +
                                (errors.endDate && touched.endDate
                                  ? " is-invalid"
                                  : "")
                              }
                              autoComplete="none"
                              maxDate={new Date()}
                              showMonthDropdown={true}
                              showYearDropdown={true}
                              dropdownMode="select"
                              selected={
                                (field.value && new Date(field.value)) || null
                              }
                              dateFormat="dd-MM-yyyy"
                              onChange={(val) => {
                                // setFieldValue(field.name, val);
                                setFieldValue(
                                  field.name,
                                  moment(val).format("YYYY-MM-DD")
                                );
                              }}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        name="endDate"
                        component="div"
                        className="invalid-feedback d-inline-block"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mx-5 mt-1">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      //   disabled={isSubmitting}
                    >
                      Submit
                    </button>
                    {/* <CustomButton
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
                      onClick={(e) => handleGeneralCancel(e)}
                    /> */}
                  </div>
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
