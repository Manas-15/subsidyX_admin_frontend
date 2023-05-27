import { districtManagementConstants } from "../Constants/districtManagementConstants";

export function district(
  state = { isSuccess: false, districtManagementData: [] },
  action
) {
  switch (action.type) {
    case districtManagementConstants.GET_DISTRICT_REQUEST:
      return {
        isSuccess: false,
      };
    case districtManagementConstants.GET_DISTRICT_SUCCESS:
      return {
        isSuccess: true,
        districtManagementData: action?.data?.data,
      };
    case districtManagementConstants.GET_DISTRICT_FAILURE:
      return { isSuccess: false };

    case districtManagementConstants.CREATE_DISTRICT_REQUEST:
      return {
        isCreated: false,
      };
    case districtManagementConstants.CREATE_DISTRICT_SUCCESS:
      return {
        isCreated: true,
      };
    case districtManagementConstants.CREATE_DISTRICT_FAILURE:
      return { isCreated: false };

    case districtManagementConstants.UPDATE_DISTRICT_REQUEST:
      return {
        isUpdated: false,
      };
    case districtManagementConstants.UPDATE_DISTRICT_SUCCESS:
      return {
        isUpdated: true,
      };
    case districtManagementConstants.UPDATE_DISTRICT_FAILURE:
      return { isUpdated: false };

    case districtManagementConstants.DELETE_DISTRICT_REQUEST:
      return {
        isDeleted: false,
      };
    case districtManagementConstants.DELETE_DISTRICT_SUCCESS:
      return {
        isDeleted: true,
      };
    case districtManagementConstants.DELETE_DISTRICT_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
