import { alertActions } from "./alertAction";
import { stateManagementConstants } from "../Constants/stateManagementConstants";
import { stateManagementService } from "../Services/stateManagementService";

export const stateManagementAction = {
  getStates,
  createState,
  updateState,
  deleteState,
};
function getStates() {
  return (dispatch) => {
    dispatch(request());
    stateManagementService.getStates().then(
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
    return { type: stateManagementConstants.GET_STATE_REQUEST };
  }
  function success(data) {
    return { type: stateManagementConstants.GET_STATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: stateManagementConstants.GET_STATE_FAILURE, error };
  }
}

function createState(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    stateManagementService.createState(iData).then(
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
    return { type: stateManagementConstants.CREATE_STATE_REQUEST };
  }
  function success(data) {
    return { type: stateManagementConstants.CREATE_STATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: stateManagementConstants.CREATE_STATE_FAILURE, error };
  }
}

function updateState({ id, editData }) {
  return (dispatch) => {
    dispatch(request({ id, editData }));
    stateManagementService.updateState({ id, editData }).then(
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
    return { type: stateManagementConstants.UPDATE_STATE_REQUEST };
  }
  function success(data) {
    return { type: stateManagementConstants.UPDATE_STATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: stateManagementConstants.UPDATE_STATE_FAILURE, error };
  }
}

function deleteState(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    stateManagementService.deleteState(id).then(
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
    return { type: stateManagementConstants.DELETE_STATE_REQUEST };
  }
  function success(data) {
    return { type: stateManagementConstants.DELETE_STATE_SUCCESS, data };
  }
  function failure(error) {
    return { type: stateManagementConstants.DELETE_STATE_FAILURE, error };
  }
}
