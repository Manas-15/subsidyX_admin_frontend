import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});

export const SubsidySchema = Yup.object().shape({
  subsidy: Yup.string().required("Subsidy is required"),
  industry: Yup.array(
    Yup.object({
      categoryID: Yup.number().required("Category ID is required"),
      sectorID: Yup.number().required("Category ID is required"),
    })
  ),
  stateID: Yup.number().required("StateID is required"),
  districtID: Yup.number().required("DistrictID is required"),
  talukaID: Yup.array(
    Yup.object({ name: Yup.string().required("TalukaID is required") })
  ),
  questionID: Yup.string().required("QuestionID is required"),
  notes: Yup.string().required("Notes is required"),
  reflink: Yup.string().required("Reflink is required"),
  startDate: Yup.string().required("StartDate is required"),
  endDate: Yup.string().required("EndDate is required"),
});
