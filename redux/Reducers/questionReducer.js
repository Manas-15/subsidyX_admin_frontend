import { questionConstants } from "../Constants/questionConstants";

export function question(
  state = { isSuccess: false, questionData: [] },
  action
) {
  switch (action.type) {
    case questionConstants.GET_QUESTION_REQUEST:
      return {
        isSuccess: false,
      };
    case questionConstants.GET_QUESTION_SUCCESS:
      return {
        isSuccess: true,
        questionData: action?.data?.data,
      };
    case questionConstants.GET_QUESTION_FAILURE:
      return { isSuccess: false };

    case questionConstants.CREATE_QUESTION_REQUEST:
      return {
        isCreated: false,
      };
    case questionConstants.CREATE_QUESTION_SUCCESS:
      return {
        isCreated: true,
      };
    case questionConstants.CREATE_QUESTION_FAILURE:
      return { isCreated: false };

    // case questionConstants.UPDATE_QUESTION_REQUEST:
    //   return {
    //     isUpdated: false,
    //   };
    // case questionConstants.UPDATE_QUESTION_SUCCESS:
    //   return {
    //     isUpdated: true,
    //   };
    // case questionConstants.UPDATE_QUESTION_FAILURE:
    //   return { isUpdated: false };

    case questionConstants.DELETE_QUESTION_REQUEST:
      return {
        isDeleted: false,
      };
    case questionConstants.DELETE_QUESTION_SUCCESS:
      return {
        isDeleted: true,
      };
    case questionConstants.DELETE_QUESTION_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
