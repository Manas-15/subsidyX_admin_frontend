import { adminstativeConstants } from "../Constants/adminstativeConstants";
import { adminstativeService } from "../Services/adminstativeService";
import { alertActions } from "./alertAction";

export const adminstativeAction = {
  getAdminstative,
  updateAdminstative,
};

function getAdminstative() {
  return (dispatch) => {
    dispatch(request());
    adminstativeService.getAdminstative().then(
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
    return { type: adminstativeConstants.GET_ADMINSTATIVE_REQUEST };
  }
  function success(data) {
    return { type: adminstativeConstants.GET_ADMINSTATIVE_SUCCESS, data };
  }
  function failure(error) {
    return { type: adminstativeConstants.GET_ADMINSTATIVE_FAILURE, error };
  }
}

function updateAdminstative({ id, industrySectorData }) {
  return (dispatch) => {
    dispatch(request({ id, industrySectorData }));
    adminstativeService.updateAdminstative({ id, industrySectorData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Adminstative Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: adminstativeConstants.UPDATE_ADMINSTATIVE_REQUEST };
  }
  function success(data) {
    return { type: adminstativeConstants.UPDATE_ADMINSTATIVE_SUCCESS, data };
  }
  function failure(error) {
    return { type: adminstativeConstants.UPDATE_ADMINSTATIVE_FAILURE, error };
  }
}
