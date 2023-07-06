import { reportManagementConstants } from "../Constants/reportManagementConstants";
import { reportManagementService } from "../Services/reportManagementService";
import { alertActions } from "./alertAction";

export const reportManagementAction = {
  getAllReportBasedOnUser,
};

function getAllReportBasedOnUser() {
  return (dispatch) => {
    dispatch(request());
    reportManagementService.getAllReportBasedOnUser().then(
      (res) => {
        console.log(res);
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_REQUEST,
    };
  }
  function success(data) {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: reportManagementConstants.GET_REPORTS_BASED_ON_USER_FAILURE,
      error,
    };
  }
}
