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
  categoryID: Yup.string().required("CategoryID is required"),
  sectorID: Yup.string().required("SectorID is required"),
  stateID: Yup.string().required("StateID is required"),
  districtID: Yup.string().required("DistrictID is required"),
  talukaID: Yup.string().required("TalukaID is required"),
  questionID: Yup.string().required("QuestionID is required"),
  notes: Yup.string().required("Notes is required"),
  reflink: Yup.string().required("Reflink is required"),
  startDate: Yup.string().required("StartDate is required"),
  endDate: Yup.string().required("EndDate is required"),
});
