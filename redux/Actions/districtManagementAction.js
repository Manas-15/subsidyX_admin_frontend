import { districtManagementConstants } from "../Constants/districtManagementConstants";
import { districtManagementService } from "../Services/districtManagementService";
import { alertActions } from "./alertAction";

export const districtManagementAction = {
  getDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};
function getDistricts(ID) {
  return (dispatch) => {
    dispatch(request(ID));
    districtManagementService.getDistricts(ID).then(
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
    return { type: districtManagementConstants.GET_DISTRICT_REQUEST };
  }
  function success(data) {
    return { type: districtManagementConstants.GET_DISTRICT_SUCCESS, data };
  }
  function failure(error) {
    return { type: districtManagementConstants.GET_DISTRICT_FAILURE, error };
  }
}

function createDistrict(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    districtManagementService.createDistrict(iData).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Industry Sector Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: districtManagementConstants.CREATE_DISTRICT_REQUEST };
  }
  function success(data) {
    return { type: districtManagementConstants.CREATE_DISTRICT_SUCCESS, data };
  }
  function failure(error) {
    return { type: districtManagementConstants.CREATE_DISTRICT_FAILURE, error };
  }
}

function updateDistrict({ id, editData }) {
  return (dispatch) => {
    dispatch(request({ id, editData }));
    districtManagementService.updateDistrict({ id, editData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("State Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: districtManagementConstants.UPDATE_DISTRICT_REQUEST };
  }
  function success(data) {
    return { type: districtManagementConstants.UPDATE_DISTRICT_SUCCESS, data };
  }
  function failure(error) {
    return { type: districtManagementConstants.UPDATE_DISTRICT_FAILURE, error };
  }
}

function deleteDistrict(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    districtManagementService.deleteDistrict(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("State Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: districtManagementConstants.DELETE_DISTRICT_REQUEST };
  }
  function success(data) {
    return { type: districtManagementConstants.DELETE_DISTRICT_SUCCESS, data };
  }
  function failure(error) {
    return { type: districtManagementConstants.DELETE_DISTRICT_FAILURE, error };
  }
}
