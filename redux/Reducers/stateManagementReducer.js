import { stateManagementConstants } from "../Constants/stateManagementConstants";

export function state(
  state = { isSuccess: false, stateManagementData: [] },
  action
) {
  switch (action.type) {
    case stateManagementConstants.GET_STATE_REQUEST:
      return {
        isSuccess: false,
      };
    case stateManagementConstants.GET_STATE_SUCCESS:
      return {
        isSuccess: true,
        stateManagementData: action?.data?.data,
      };
    case stateManagementConstants.GET_STATE_FAILURE:
      return { isSuccess: false };

    case stateManagementConstants.CREATE_STATE_REQUEST:
      return {
        isCreated: false,
      };
    case stateManagementConstants.CREATE_STATE_SUCCESS:
      return {
        isCreated: true,
      };
    case stateManagementConstants.CREATE_STATE_FAILURE:
      return { isCreated: false };

    case stateManagementConstants.UPDATE_STATE_REQUEST:
      return {
        isUpdated: false,
      };
    case stateManagementConstants.UPDATE_STATE_SUCCESS:
      return {
        isUpdated: true,
      };
    case stateManagementConstants.UPDATE_STATE_FAILURE:
      return { isUpdated: false };

    case stateManagementConstants.DELETE_STATE_REQUEST:
      return {
        isDeleted: false,
      };
    case stateManagementConstants.DELETE_STATE_SUCCESS:
      return {
        isDeleted: true,
      };
    case stateManagementConstants.DELETE_STATE_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
