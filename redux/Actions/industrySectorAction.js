import { industrySectorConstants } from "../Constants/industrySectorConstants";
import { industrySectorService } from "../Services/industrySectorService";
import { alertActions } from "./alertAction";

export const industrySectorActions = {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
};
function getSectors(id) {
  return (dispatch) => {
    dispatch(request(id));
    industrySectorService.getSectors(id).then(
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
    return { type: industrySectorConstants.GET_SECTOR_REQUEST };
  }
  function success(data) {
    return { type: industrySectorConstants.GET_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: industrySectorConstants.GET_SECTOR_FAILURE, error };
  }
}

function createSector(iData) {
  return (dispatch) => {
    dispatch(request({ iData }));
    industrySectorService.createSector(iData).then(
      (res) => {
        dispatch(success(res));
        dispatch(industrySectorActions?.getSectors());
        dispatch(alertActions.success("Industry Sector Created"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industrySectorConstants.CREATE_SECTOR_REQUEST };
  }
  function success(data) {
    return { type: industrySectorConstants.CREATE_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: industrySectorConstants.CREATE_SECTOR_FAILURE, error };
  }
}

function updateSector({ id, industrySectorData }) {
  return (dispatch) => {
    dispatch(request({ id, industrySectorData }));
    industrySectorService.updateSector({ id, industrySectorData }).then(
      (res) => {
        dispatch(success(res));
        dispatch(industrySectorActions?.getSectors());

        dispatch(alertActions.success("Industry Category Updated"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industrySectorConstants.UPDATE_SECTOR_REQUEST };
  }
  function success(data) {
    return { type: industrySectorConstants.UPDATE_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: industrySectorConstants.UPDATE_SECTOR_FAILURE, error };
  }
}

function deleteSector(id) {
  return (dispatch) => {
    dispatch(request({ id }));
    industrySectorService.deleteSector(id).then(
      (res) => {
        dispatch(success(res));
        dispatch(industrySectorActions?.getSectors());

        dispatch(alertActions.success("Industry Sector Deleted"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: industrySectorConstants.DELETE_SECTOR_REQUEST };
  }
  function success(data) {
    return { type: industrySectorConstants.DELETE_SECTOR_SUCCESS, data };
  }
  function failure(error) {
    return { type: industrySectorConstants.DELETE_SECTOR_FAILURE, error };
  }
}
