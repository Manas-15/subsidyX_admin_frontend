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
  // industry: Yup.array(
  //   Yup.object({
  //     categoryID: Yup.number().required("Category ID is required"),
  //     sectorID: Yup.number().required("Category ID is required"),
  //   })
  // ),
  categoryID: Yup.number().required("Category Id is required"),
  // sectorID: Yup.number().required("Sector Id is required"),
  // stateID: Yup.number().required("State Id is required"),
  // districtID: Yup.number().required("District Id is required"),
  // talukaID: Yup.array(
  //   Yup.object({ name: Yup.string().required("Taluka Id is required") })
  // ),
  // questionID: Yup.number().required("QuestionID is required"),
  // questions: Yup.array(
  //   Yup.object({
  //     questionID: Yup.number().required("Question Id is required"),
  //   })
  // ),
  notes: Yup.string().required("Notes is required"),
  reflink: Yup.string().required("Reflink is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  // parentSubsidyID: Yup.number().required("Parent subsidy is required"),
});

export const clientSchema = Yup.object().shape({
  name: Yup.string().required("Client Name is  required").min(3, "Client name must be atleast 3 characters!"),
  email: Yup.string().email("Invalid email address").required('Email address is required'),
  number: Yup.string().required("Contact number is required!").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid Phone number!"),
  associated: Yup.string().required('Associated With is required'),
})