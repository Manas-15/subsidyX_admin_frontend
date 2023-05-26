import { industryCategoryConstants } from "../Constants/industryCategoryConstants";

export function industryCategory(
  state = { isSuccess: false, industryCategoryData: [] },
  action
) {
  switch (action.type) {
    case industryCategoryConstants.GET_CATEGORY_REQUEST:
      return {
        isSuccess: false,
      };
    case industryCategoryConstants.GET_CATEGORY_SUCCESS:
      return {
        isSuccess: true,
        industryCategoryData: action?.data?.data,
      };
    case industryCategoryConstants.GET_CATEGORY_FAILURE:
      return { isSuccess: false };

    case industryCategoryConstants.CREATE_CATEGORY_REQUEST:
      return {
        isCreated: false,
      };
    case industryCategoryConstants.CREATE_CATEGORY_SUCCESS:
      return {
        isCreated: true,
      };
    case industryCategoryConstants.CREATE_CATEGORY_FAILURE:
      return { isCreated: false };

    case industryCategoryConstants.UPDATE_CATEGORY_REQUEST:
      return {
        isUpdated: false,
      };
    case industryCategoryConstants.UPDATE_CATEGORY_SUCCESS:
      return {
        isUpdated: true,
      };
    case industryCategoryConstants.UPDATE_CATEGORY_FAILURE:
      return { isUpdated: false };

    case industryCategoryConstants.DELETE_CATEGORY_REQUEST:
      return {
        isDeleted: false,
      };
    case industryCategoryConstants.DELETE_CATEGORY_SUCCESS:
      return {
        isDeleted: true,
      };
    case industryCategoryConstants.DELETE_CATEGORY_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
