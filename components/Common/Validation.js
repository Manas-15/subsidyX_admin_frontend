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
export const TrustedPartnerSchema = Yup.object().shape({
  trustedPartnerName: Yup.string().required("Trusted Partner Name is required!"),
  email: Yup.string().required("Email is required!").email("Invalid Email Address"),
  contact: Yup.string().required("Contact number is required!").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid Contact number!"),
  district: Yup.string().required("District is required!"),
  state: Yup.string().required("State is required!"),
  taluka: Yup.string().required("Taluka is required!"),
  talukaCategory: Yup.number("Taluka Category must be a number").required("Taluka Category is required!").positive("Taluka Category must be positive!").typeError('Taluka Category must be a number'),
  clients: Yup.number("Clients must be a number").required("Clients is required!").positive("Clients must be positive!").typeError('Clients must be a number'),
})

export const channelPartnerSchema = Yup.object().shape({
  type: Yup.string().required('Payment Basis is required field'),
  amount: Yup.number()
    .when('type', {
      is: (type) => type === 'percentage',
      then: () => Yup.number()
        .max(100, 'Amount must be at most 100')
        .required('Amount and Payment Basis are required').positive().typeError("Enter Valid Amount"),
      otherwise: () => Yup.number().required('Amount and Payment Basis are required').positive().typeError("Enter Valid Amount")
    }),
  channelPartnerName: Yup.string().required("Trusted Partner Name is required!"),
  email: Yup.string().required("Email is required!").email("Invalid Email Address"),
  contact: Yup.string().required("Contact number is required!").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid Contact number!"),
  district: Yup.string().required("District is required!"),
  state: Yup.string().required("State is required!"),
  taluka: Yup.string().required("Taluka is required!"),
  talukaCategory: Yup.number("Taluka Category must be a number").required("Taluka Category is required!").positive("Taluka Category must be positive!").typeError('Taluka Category must be a number'),
  clients: Yup.number("Clients must be a number").required("Clients is required!").positive("Clients must be positive!").typeError('Clients must be a number'),
})

export const membershipSchema = Yup.object().shape({
  descriptions: Yup.array().of(Yup.string().required('Fill the description!')).required('Description is required!'),
  membershipName: Yup.string().required("Membership Name is required!"),
  price: Yup.number().typeError('Price is required and must be a number').required('Price is required!').positive('Price must be more than 0')
})
export const employeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  password: Yup.string().required('Password is required!'),
  email: Yup.string().required('Email is required!'),
  role: Yup.string().required('Role  is required!'),
  contact: Yup.string().required('Contact is required!'),
  isAssociated: Yup.string().required('Association is a required field'),
  associatedWith: Yup.string()
    .when('isAssociated', {
      is: (isAssociated) => isAssociated === 'yes',
      then: () => Yup.string().required('Association is Required!'),
      otherwise: () => Yup.string().notRequired()
    }),
})