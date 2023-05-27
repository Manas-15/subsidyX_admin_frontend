import { adminstativeConstants } from "../Constants/adminstativeConstants";

export function adminstative(
  state = { isSuccess: false, adminstativeLabelData: {} },
  action
) {
  switch (action.type) {
    case adminstativeConstants.GET_ADMINSTATIVE_REQUEST:
      return {
        isSuccess: false,
      };
    case adminstativeConstants.GET_ADMINSTATIVE_SUCCESS:
      return {
        isSuccess: true,
        adminstativeLabelData: action?.data?.data,
      };
    case adminstativeConstants.GET_ADMINSTATIVE_FAILURE:
      return { isSuccess: false };

    case adminstativeConstants.UPDATE_ADMINSTATIVE_REQUEST:
      return {
        isUpdated: false,
      };
    case adminstativeConstants.UPDATE_ADMINSTATIVE_SUCCESS:
      return {
        isUpdated: true,
      };
    case adminstativeConstants.UPDATE_ADMINSTATIVE_FAILURE:
      return { isUpdated: false };

    default:
      return state;
  }
}
