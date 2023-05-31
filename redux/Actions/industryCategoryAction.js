import { alertActions } from "./alertAction";
import { industryCategoryConstants } from "../Constants/industryCategoryConstants";
import { industryCategoryService } from "../Services/industryCategoryService";

export const industryCategoryActions = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
function getCategories() {
  return (dispatch) => {
    dispatch(request());
    industryCategoryService.getCategories().then(
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
    return { type: industryCategoryConstants.GET_CATEGORY_REQUEST };
  }
  function success(data) {
    return { type: industryCategoryConstants.GET_CATEGORY_SUCCESS, data };
  }
  function failure(error) {
    return { type: industryCategoryConstants.GET_CATEGORY_FAILURE, error };
  }
}

function createCategory(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    industryCategoryService.createCategory(iData).then(
      (res) => {
        dispatch(success(res));
        dispatch(industryCategoryActions?.getCategories());
        dispatch(alertActions.success("Industry Category Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industryCategoryConstants.CREATE_CATEGORY_REQUEST };
  }
  function success(data) {
    return { type: industryCategoryConstants.CREATE_CATEGORY_SUCCESS, data };
  }
  function failure(error) {
    return { type: industryCategoryConstants.CREATE_CATEGORY_FAILURE, error };
  }
}

function updateCategory({ id, state }) {
  return (dispatch) => {
    dispatch(request({ id, state }));
    industryCategoryService.updateCategory({ id, state }).then(
      (res) => {
        dispatch(success(res));
        dispatch(industryCategoryActions?.getCategories());
        dispatch(alertActions.success("Industry Category Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industryCategoryConstants.UPDATE_CATEGORY_REQUEST };
  }
  function success(data) {
    return { type: industryCategoryConstants.UPDATE_CATEGORY_SUCCESS, data };
  }
  function failure(error) {
    return { type: industryCategoryConstants.UPDATE_CATEGORY_FAILURE, error };
  }
}

function deleteCategory(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    industryCategoryService.deleteCategory(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(industryCategoryActions?.getCategories());
        dispatch(alertActions.success("Industry Category Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industryCategoryConstants.DELETE_CATEGORY_REQUEST };
  }
  function success(data) {
    return { type: industryCategoryConstants.DELETE_CATEGORY_SUCCESS, data };
  }
  function failure(error) {
    return { type: industryCategoryConstants.DELETE_CATEGORY_FAILURE, error };
  }
}
