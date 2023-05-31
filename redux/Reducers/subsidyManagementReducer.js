import { subsidyManagementConstants } from "../Constants/subsidyManagementConstants";

export function subsidy(
  state = { isSuccess: false, subsidyManagementData: [] },
  action
) {
  switch (action.type) {
    case subsidyManagementConstants.GET_SUBSIDY_REQUEST:
      return {
        ...state,
        isSuccess: false,
      };
    case subsidyManagementConstants.GET_SUBSIDY_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        subsidyManagementData: action?.data?.data?.subsidy_list,
      };
    case subsidyManagementConstants.GET_SUBSIDY_FAILURE:
      return { ...state, isSuccess: false };

    case subsidyManagementConstants.CREATE_SUBSIDY_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.CREATE_SUBSIDY_SUCCESS:
      return { ...state, isCreated: true };
    case subsidyManagementConstants.CREATE_SUBSIDY_FAILURE:redux / Constants / subsidyManagementConstants.js;
      return { ...state, isCreated: false };

    // case subsidyManagementConstants.UPDATE_SUBSIDY_REQUEST:
    //   return {
    //     isUpdated: false,
    //   };
    // case subsidyManagementConstants.UPDATE_SUBSIDY_SUCCESS:
    //   return {
    //     isUpdated: true,
    //   };
    // case subsidyManagementConstants.UPDATE_SUBSIDY_FAILURE:
    //   return { isUpdated: false };

    // case subsidyManagementConstants.DELETE_SUBSIDY_REQUEST:
    //   return {
    //     isDeleted: false,
    //   };
    // case subsidyManagementConstants.DELETE_SUBSIDY_SUCCESS:
    //   return {
    //     isDeleted: true,
    //   };
    // case subsidyManagementConstants.DELETE_SUBSIDY_FAILURE:
    //   return { isDeleted: false };

    default:
      return state;
  }
}
