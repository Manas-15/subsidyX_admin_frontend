import { talukaManagementConstants } from "../Constants/talukaManagementConstants";

export function taluka(
  state = { isSuccess: false, talukaManagementData: [] },
  action
) {
  switch (action.type) {
    case talukaManagementConstants.GET_TALUKA_REQUEST:
      return {
        isSuccess: false,
      };
    case talukaManagementConstants.GET_TALUKA_SUCCESS:
      return {
        isSuccess: true,
        talukaManagementData: action?.data?.data,
      };
    case talukaManagementConstants.GET_TALUKA_FAILURE:
      return { isSuccess: false };

    case talukaManagementConstants.CREATE_TALUKA_REQUEST:
      return {
        isCreated: false,
      };
    case talukaManagementConstants.CREATE_TALUKA_SUCCESS:
      return {
        isCreated: true,
      };
    case talukaManagementConstants.CREATE_TALUKA_FAILURE:
      return { isCreated: false };

    case talukaManagementConstants.UPDATE_TALUKA_REQUEST:
      return {
        isUpdated: false,
      };
    case talukaManagementConstants.UPDATE_TALUKA_SUCCESS:
      return {
        isUpdated: true,
      };
    case talukaManagementConstants.UPDATE_TALUKA_FAILURE:
      return { isUpdated: false };

    case talukaManagementConstants.DELETE_TALUKA_REQUEST:
      return {
        isDeleted: false,
      };
    case talukaManagementConstants.DELETE_TALUKA_SUCCESS:
      return {
        isDeleted: true,
      };
    case talukaManagementConstants.DELETE_TALUKA_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
