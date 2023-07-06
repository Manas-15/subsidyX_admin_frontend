import { reportManagementConstants } from "../Constants/reportManagementConstants";

const initialState = {
  isSuccess: false,
  allReports: [],
  question_answer: [],
  selected_category: "Report Management",
};

export function report(state = initialState, action) {
  switch (action.type) {
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_REQUEST:
      return { ...state, isSuccess: false };
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        allReports: action?.data?.data,
      };
    case reportManagementConstants.GET_REPORTS_BASED_ON_USER_FAILURE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
}
