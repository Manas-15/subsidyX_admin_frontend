import { subsidyManagementService } from "../Services/subsidyManagementService";
import { subsidyManagementConstants } from "../Constants/subsidyManagementConstants";
import { alertActions } from "./alertAction";

export const subsidyManagementAction = {
  getSubsidyList,
  createSubsidy,
  // updateState,
  // deleteState,
};
function getSubsidyList() {
  return (dispatch) => {
    dispatch(request());
    subsidyManagementService.getSubsidyList().then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: subsidyManagementConstants.GET_SUBSIDY_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.GET_SUBSIDY_SUCCESS, data };
  }
  function failure(error) {
    return { type: subsidyManagementConstants.GET_SUBSIDY_FAILURE, error };
  }
}

function createSubsidy(subsidyData) {
  return (dispatch) => {
    dispatch(request({ subsidyData }));
    subsidyManagementService.createSubsidy(subsidyData).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getSubsidyList);
        dispatch(alertActions.success("Subsidy Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: subsidyManagementConstants.CREATE_SUBSIDY_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.CREATE_SUBSIDY_SUCCESS, data };
  }
  function failure(error) {
    return { type: subsidyManagementConstants.CREATE_SUBSIDY_FAILURE, error };
  }
}

// function updateState({ id, editData }) {
//   return (dispatch) => {
//     dispatch(request({ id, editData }));
//     stateManagementService.updateState({ id, editData }).then(
//       (res) => {
//         dispatch(success(res));
//         dispatch(alertActions.success("State Updated"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };
//   function request() {
//     return { type: subsidyManagementConstants.UPDATE_SUBSIDY_REQUEST };
//   }
//   function success(data) {
//     return { type: subsidyManagementConstants.UPDATE_SUBSIDY_SUCCESS, data };
//   }
//   function failure(error) {
//     return { type: subsidyManagementConstants.UPDATE_SUBSIDY_FAILURE, error };
//   }
// }

// function deleteState(id) {
//   return (dispatch) => {
//     dispatch(request({ id }));
//     stateManagementService.deleteState(id).then(
//       (res) => {
//         dispatch(success(res));
//         dispatch(alertActions.success("State Deleted"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };
//   function request() {
//     return { type: subsidyManagementConstants.DELETE_SUBSIDY_REQUEST };
//   }
//   function success(data) {
//     return { type: subsidyManagementConstants.DELETE_SUBSIDY_SUCCESS, data };
//   }
//   function failure(error) {
//     return { type: subsidyManagementConstants.DELETE_SUBSIDY_FAILURE, error };
//   }
// }
