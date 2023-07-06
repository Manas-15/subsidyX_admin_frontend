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
    case subsidyManagementConstants.CREATE_SUBSIDY_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.GET_SUBSIDY_DETAILS_REQUEST:
      return {
        ...state,
      };
    case subsidyManagementConstants.GET_SUBSIDY_DETAILS_SUCCESS:
      return {
        ...state,
        subsidy_details: action?.data?.data,
      };
    case subsidyManagementConstants.GET_SUBSIDY_DETAILS_FAILURE:
      return { ...state };

    case subsidyManagementConstants.REMOVE_SUBSIDY_DETAILS_SUCCESS:
      return {
        ...state,
        subsidy_details: undefined,
      };

    case subsidyManagementConstants.REMOVE_SUBSIDY_DETAILS_QUESTION_SUCCESS:
      console.log(state.subsidy_details, action);
      return {
        ...state,
        subsidy_details: {
          ...state.subsidy_details,
          questions: state?.subsidy_details?.questions?.filter(
            (que) => que?.id !== action?.id
          ),
        },
      };

    case subsidyManagementConstants.CREATE_CONSTANT_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.CREATE_CONSTANT_SUCCESS:
      return { ...state, isCreated: true };
    case subsidyManagementConstants.CREATE_CONSTANT_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.GET_CONSTANT_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.GET_CONSTANT_SUCCESS:
      return {
        ...state,
        isCreated: true,
        constant_list: action?.data?.data?.constant_list,
      };
    case subsidyManagementConstants.GET_CONSTANT_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_SUCCESS:
      return { ...state, isCreated: true };
    case subsidyManagementConstants.ADD_CONSTANT_TO_SUBSIDY_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_SUCCESS:
      return {
        ...state,
        isCreated: true,
        user_input_field_names: action?.data?.data,
      };
    case subsidyManagementConstants.GET_USER_INPUT_FIELD_NAME_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.CREATE_USER_INPUT_REQUEST:
      return { ...state, isCreated: false };
    case subsidyManagementConstants.CREATE_USER_INPUT_SUCCESS:
      return { ...state, isCreated: true };
    case subsidyManagementConstants.CREATE_USER_INPUT_FAILURE:
      return { ...state, isCreated: false };

    case subsidyManagementConstants.GET_USER_INPUT_REQUEST:
      return { ...state, isFetched: false };
    case subsidyManagementConstants.GET_USER_INPUT_SUCCESS:
      return {
        ...state,
        isFetched: true,
        user_input_list: action?.data?.data?.user_input_list,
      };
    case subsidyManagementConstants.GET_USER_INPUT_FAILURE:
      return { ...state, isFetched: false };

    case subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_REQUEST:
      return { ...state, isFetched: false };
    case subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_SUCCESS:
      return {
        ...state,
        isFetched: true,
        constant_list_of_a_subsidy: action?.data?.data?.subsidy_constant_list,
      };
    case subsidyManagementConstants.GET_CONSTANT_TO_A_SUBSIDY_FAILURE:
      return { ...state, isFetched: false };

    case subsidyManagementConstants.GET_CONDITION_REQUEST:
      return { ...state, isFetched: false };
    case subsidyManagementConstants.GET_CONDITION_SUCCESS:
      return {
        ...state,
        isFetched: true,
        all_conditions: action?.data?.data?.subsidy_condition_list,
      };
    case subsidyManagementConstants.GET_CONDITION_FAILURE:
      return { ...state, isFetched: false };

    case subsidyManagementConstants.GET_MATCHING_CRITERIA_REQUEST:
      return { ...state, isFetched: false };
    case subsidyManagementConstants.GET_MATCHING_CRITERIA_SUCCESS:
      return {
        ...state,
        isFetched: true,
        all_matching_criteria_list: action?.data?.data?.criterias,
      };
    case subsidyManagementConstants.GET_MATCHING_CRITERIA_FAILURE:
      return { ...state, isFetched: false };

    case subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_REQUEST:
      return { ...state, isFetched: false };
    case subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_SUCCESS:
      return {
        ...state,
        isFetched: true,
        all_questions_for_a_subsidy: action?.data?.data,
      };
    case subsidyManagementConstants.GET_QUESTION_FOR_A_SUBSIDY_FAILURE:
      return { ...state, isFetched: false };

    default:
      return state;
  }
}
