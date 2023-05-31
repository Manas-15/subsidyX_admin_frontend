import { industryCategoryConstants } from "../Constants/industryCategoryConstants";

export function industryCategory(
  state = { isSuccess: false, industryCategoryData: [] },
  action
) {
  switch (action.type) {
    case industryCategoryConstants.GET_CATEGORY_REQUEST:
      return {
        ...state,
        isSuccess: false,
      };
    case industryCategoryConstants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        industryCategoryData: action?.data?.data,
      };
    case industryCategoryConstants.GET_CATEGORY_FAILURE:
      return { ...state, isSuccess: false };

    case industryCategoryConstants.CREATE_CATEGORY_REQUEST:
      return { ...state, isSuccess: false };
    case industryCategoryConstants.CREATE_CATEGORY_SUCCESS:
      return { ...state, isSuccess: true };
    case industryCategoryConstants.CREATE_CATEGORY_FAILURE:
      return { ...state, isSuccess: false };

    case industryCategoryConstants.UPDATE_CATEGORY_REQUEST:
      return { ...state, isSuccess: false };
    case industryCategoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { ...state, isSuccess: true };
    case industryCategoryConstants.UPDATE_CATEGORY_FAILURE:
      return { ...state, isSuccess: false };

    case industryCategoryConstants.DELETE_CATEGORY_REQUEST:
      return { ...state, isSuccess: false };
    case industryCategoryConstants.DELETE_CATEGORY_SUCCESS:
      return { ...state, isSuccess: true };
    case industryCategoryConstants.DELETE_CATEGORY_FAILURE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
}
