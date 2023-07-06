import { subsidyManagementService } from "../Services/subsidyManagementService";
import { subsidyManagementConstants } from "../Constants/subsidyManagementConstants";
import { alertActions } from "./alertAction";

export const subsidyManagementAction = {
  getSubsidyList,
  createSubsidy,
  deleteSubsidy,
  updateSubsidy,
  getSubsidyDetails,
  removeSubsidyDetails,
  removeSubsidyDetailsQuestion,
  createConstant,
  getConstant,
  addConstantToSubsidy,
  getAllConstantToSubsidy,
  getUserInputFieldNames,
  createUserInputs,
  getUserInputList,
  getCondition,
  createCondition,
  updateCondition,
  deleteCondition,
  getListOfMatchingCriteria,
  getListOfQuestionForASubsidy,
  createMatchingCriteria,
  deleteCriteria,
  updateMatchingCriteria,
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

function deleteSubsidy(id) {
  return (dispatch) => {
    dispatch(request());
    subsidyManagementService.deleteSubsidy(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getSubsidyList());
        dispatch(alertActions.success("Subsidy Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_FAILURE,
      error,
    };
  }
}
function updateSubsidy({ id, data }) {
  return (dispatch) => {
    dispatch(request({ id, data }));
    subsidyManagementService.updateSubsidy({ id, data }).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getSubsidyList());
        dispatch(alertActions.success("Subsidy Updated"));
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

function removeSubsidyDetails() {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return {
      type: subsidyManagementConstants.REMOVE_SUBSIDY_DETAILS_SUCCESS,
    };
  }
}

function removeSubsidyDetailsQuestion(id) {
  return (dispatch) => {
    dispatch(success(id));
  };

  function success(id) {
    return {
      type: subsidyManagementConstants.REMOVE_SUBSIDY_DETAILS_QUESTION_SUCCESS,
      id,
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

function getCondition(id) {
  return (dispatch) => {
    dispatch(request(id));
    subsidyManagementService.getCondition(id).then(
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
    return { type: subsidyManagementConstants.GET_CONDITION_REQUEST };
  }
  function success(data) {
    return { type: subsidyManagementConstants.GET_CONDITION_SUCCESS, data };
  }
  function failure(error) {
    return { type: subsidyManagementConstants.GET_CONDITION_FAILURE, error };
  }
}

function createCondition(data) {
  return (dispatch) => {
    dispatch(request({ data }));
    subsidyManagementService.createCondition(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getCondition(data?.scheme_id));
        dispatch(alertActions.success("Subsidy Condition Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.CREATE_SUBSIDY_CONDITION_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.CREATE_SUBSIDY_CONDITION_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.CREATE_SUBSIDY_CONDITION_FAILURE,
      error,
    };
  }
}

function updateCondition({ scheme_id, id, editData }) {
  return (dispatch) => {
    dispatch(request({ scheme_id, id, editData }));
    subsidyManagementService.updateCondition({ scheme_id, id, editData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getCondition(scheme_id));
        dispatch(alertActions.success("Subsidy Condition Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_FAILURE,
      error,
    };
  }
}

function deleteCondition({ id, scheme_id }) {
  return (dispatch) => {
    dispatch(request());
    subsidyManagementService.deleteCondition({ id, scheme_id }).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction.getCondition(scheme_id));
        dispatch(alertActions.success("Subsidy Condition Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_CONDITION_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_CONDITION_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.DELETE_SUBSIDY_CONDITION_FAILURE,
      error,
    };
  }
}

function getListOfMatchingCriteria(id) {
  return (dispatch) => {
    dispatch(request(id));
    subsidyManagementService.getListOfMatchingCriteria(id).then(
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
    return { type: subsidyManagementConstants.GET_MATCHING_CRITERIA_REQUEST };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_MATCHING_CRITERIA_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_MATCHING_CRITERIA_FAILURE,
      error,
    };
  }
}

function getListOfQuestionForASubsidy(id) {
  return (dispatch) => {
    dispatch(request(id));
    subsidyManagementService.getListOfQuestionForASubsidy(id).then(
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
      type: subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_FAILURE,
      error,
    };
  }
}

function createMatchingCriteria({ scheme_id, criteriaData }) {
  return (dispatch) => {
    dispatch(request({ scheme_id, criteriaData }));
    subsidyManagementService
      .createMatchingCriteria({ scheme_id, criteriaData })
      .then(
        (res) => {
          dispatch(success(res));
          dispatch(
            subsidyManagementAction.getListOfMatchingCriteria(scheme_id)
          );
          dispatch(alertActions.success("Matching Criteria Created"));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };
  function request() {
    return {
      type: subsidyManagementConstants.CREATE_MATCHING_CRITERIA_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.CREATE_MATCHING_CRITERIA_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.CREATE_MATCHING_CRITERIA_FAILURE,
      error,
    };
  }
}

function deleteCriteria({ id, scheme_id }) {
  return (dispatch) => {
    dispatch(request());
    subsidyManagementService.deleteCriteria({ id, scheme_id }).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction.getListOfMatchingCriteria(scheme_id));
        dispatch(alertActions.success("Matching Criteria Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.DELETE_MATCHING_CRITERIA_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.DELETE_MATCHING_CRITERIA_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.DELETE_MATCHING_CRITERIA_FAILURE,
      error,
    };
  }
}


function updateMatchingCriteria({ scheme_id, id, editData }) {
  return (dispatch) => {
    dispatch(request({ scheme_id, id, editData }));
    subsidyManagementService.updateMatchingCriteria({ scheme_id, id, editData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(subsidyManagementAction?.getCondition(scheme_id));
        dispatch(alertActions.success("Subsidy Condition Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_REQUEST,
    };
  }
  function success(data) {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_SUCCESS,
      data,
    };
  }
  function failure(error) {
    return {
      type: subsidyManagementConstants.UPDATE_SUBSIDY_CONDITION_FAILURE,
      error,
    };
  }
}
