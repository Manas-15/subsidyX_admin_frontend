import { alertActions } from "./alertAction";
import { questionService } from "../Services/questionService";
import { questionConstants } from "../Constants/questionConstants";

export const questionActions = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
function getQuestions(data) {
  return (dispatch) => {
    dispatch(request(data));
    questionService.getQuestions(data).then(
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
    return { type: questionConstants.GET_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.GET_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.GET_QUESTION_FAILURE, error };
  }
}

function createQuestion(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    questionService.createQuestion(iData).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Question Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: questionConstants.CREATE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.CREATE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.CREATE_QUESTION_FAILURE, error };
  }
}

function updateQuestion({ id, data }) {
  return (dispatch) => {
    dispatch(request({ id, data }));
    questionService.updateQuestion({ id, data }).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Question Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: questionConstants.UPDATE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.UPDATE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.UPDATE_QUESTION_FAILURE, error };
  }
}

function deleteQuestion(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    questionService.deleteQuestion(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(alertActions.success("Question Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: questionConstants.DELETE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.DELETE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.DELETE_QUESTION_FAILURE, error };
  }
}
