import { talukaManagementConstants } from "../Constants/talukaManagementConstants";
import { talukaManagementService } from "../Services/talukaManagementService";
import { alertActions } from "./alertAction";

export const talukaManagementAction = {
  getTalukas,
  createTaluka,
  updateTaluka,
  deleteTaluka,
};
function getTalukas(ID) {
  return (dispatch) => {
    dispatch(request(ID));
    talukaManagementService.getTalukas(ID).then(
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
    return { type: talukaManagementConstants.GET_TALUKA_REQUEST };
  }
  function success(data) {
    return { type: talukaManagementConstants.GET_TALUKA_SUCCESS, data };
  }
  function failure(error) {
    return { type: talukaManagementConstants.GET_TALUKA_FAILURE, error };
  }
}

function createTaluka(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    talukaManagementService.createTaluka(iData).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Taluka Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: talukaManagementConstants.CREATE_TALUKA_REQUEST };
  }
  function success(data) {
    return { type: talukaManagementConstants.CREATE_TALUKA_SUCCESS, data };
  }
  function failure(error) {
    return { type: talukaManagementConstants.CREATE_TALUKA_FAILURE, error };
  }
}

function updateTaluka({ id, editData }) {
  return (dispatch) => {
    dispatch(request({ id, editData }));
    talukaManagementService.updateTaluka({ id, editData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Taluka Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: talukaManagementConstants.UPDATE_TALUKA_REQUEST };
  }
  function success(data) {
    return { type: talukaManagementConstants.UPDATE_TALUKA_SUCCESS, data };
  }
  function failure(error) {
    return { type: talukaManagementConstants.UPDATE_TALUKA_FAILURE, error };
  }
}

function deleteTaluka(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    talukaManagementService.deleteTaluka(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Taluka Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: talukaManagementConstants.DELETE_TALUKA_REQUEST };
  }
  function success(data) {
    return { type: talukaManagementConstants.DELETE_TALUKA_SUCCESS, data };
  }
  function failure(error) {
    return { type: talukaManagementConstants.DELETE_TALUKA_FAILURE, error };
  }
}
