import { subsidyManagementService } from "../Services/subsidyManagementService";
import { subsidyManagementConstants } from "../Constants/subsidyManagementConstants";
import { alertActions } from "./alertAction";

export const subsidyManagementAction = {
  getSubsidyList,
  createSubsidy,
  getSubsidyDetails,
  createConstant,
  getConstant,
  addConstantToSubsidy,
  getAllConstantToSubsidy,
  getUserInputFieldNames,
  createUserInputs,
  getUserInputList,
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
        dispatch(subsidyManagementAction?.getSubsidyList());
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

function getSubsidyDetails(item) {
  return (dispatch) => {
    dispatch(request(item));
    subsidyManagementService.getSubsidyDetails(item).then(
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
    return { type: subsidyManagementConstants.GET_SUBSIDY_DETAILS_REQUEST };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_SUBSIDY_DETAILS_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_SUBSIDY_DETAILS_FAILURE,
      error,
    };
  }
}

function createConstant(constantData) {
  return (dispatch) => {
    dispatch(request({ constantData }));
    subsidyManagementService.createConstant(constantData).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction.getConstant());
        dispatch(alertActions.success("Constant Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: subsidyManagementConstants.CREATE_CONSTANT_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.CREATE_CONSTANT_SUCCESS, data };
  }
  function failure(error) {
    return { type: subsidyManagementConstants.CREATE_CONSTANT_FAILURE, error };
  }
}

function getConstant() {
  return (dispatch) => {
    dispatch(request());
    subsidyManagementService.getConstant().then(
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
    return { type: subsidyManagementConstants.GET_CONSTANT_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.GET_CONSTANT_SUCCESS, data };
  }
  function failure(error) {
    return { type: subsidyManagementConstants.GET_CONSTANT_FAILURE, error };
  }
}

function addConstantToSubsidy(data) {
  return (dispatch) => {
    dispatch(request(data));
    subsidyManagementService.addConstantToSubsidy(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Constant added to subsidy"));
        dispatch(
          subsidyManagementAction.getAllConstantToSubsidy(data?.scheme_id)
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_REQUEST };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_FAILURE,
      error,
    };
  }
}

function getUserInputFieldNames(ID) {
  return (dispatch) => {
    dispatch(request(ID));
    subsidyManagementService.getUserInputFieldNames(ID).then(
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
    return {
      type: subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_FAILURE,
      error,
    };
  }
}

function createUserInputs(data) {
  return (dispatch) => {
    dispatch(request(data));
    subsidyManagementService.createUserInputs(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction.getUserInputList(data?.scheme_id));
        dispatch(alertActions.success("User Input Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: subsidyManagementConstants.CREATE_USER_INPUT_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.CREATE_USER_INPUT_SUCCESS, data };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.CREATE_USER_INPUT_FAILURE,
      error,
    };
  }
}

function getUserInputList(id) {
  return (dispatch) => {
    dispatch(request(id));
    subsidyManagementService.getUserInputList(id).then(
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
    return { type: subsidyManagementConstants.GET_USER_INPUT_REQUEST };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_USER_INPUT_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_USER_INPUT_FAILURE,
      error,
    };
  }
}

function getAllConstantToSubsidy(id) {
  return (dispatch) => {
    dispatch(request(id));
    subsidyManagementService.getAllConstantToSubsidy(id).then(
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
    return {
      type: subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_FAILURE,
      error,
    };
  }
}
