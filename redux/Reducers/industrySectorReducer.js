import { industrySectorConstants } from "../Constants/industrySectorConstants";

export function industrySector(
  state = { isSuccess: false, industrySectorData: [] },
  action
) {
  switch (action.type) {
    case industrySectorConstants.GET_SECTOR_REQUEST:
      return {
        isSuccess: false,
      };
    case industrySectorConstants.GET_SECTOR_SUCCESS:
      return {
        isSuccess: true,
        industrySectorData: action?.data?.data,
      };
    case industrySectorConstants.GET_SECTOR_FAILURE:
      return { isSuccess: false };

    case industrySectorConstants.CREATE_SECTOR_REQUEST:
      return {
        isCreated: false,
      };
    case industrySectorConstants.CREATE_SECTOR_SUCCESS:
      return {
        isCreated: true,
      };
    case industrySectorConstants.CREATE_SECTOR_FAILURE:
      return { isCreated: false };

    // case industrySectorConstants.UPDATE_SECTOR_REQUEST:
    //   return {
    //     isUpdated: false,
    //   };
    // case industrySectorConstants.UPDATE_SECTOR_SUCCESS:
    //   return {
    //     isUpdated: true,
    //   };
    // case industrySectorConstants.UPDATE_SECTOR_FAILURE:
    //   return { isUpdated: false };

    case industrySectorConstants.DELETE_SECTOR_REQUEST:
      return {
        isDeleted: false,
      };
    case industrySectorConstants.DELETE_SECTOR_SUCCESS:
      return {
        isDeleted: true,
      };
    case industrySectorConstants.DELETE_SECTOR_FAILURE:
      return { isDeleted: false };

    default:
      return state;
  }
}
