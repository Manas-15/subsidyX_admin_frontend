import { membershipData } from "../../static/membershipData";
import { membershipConstants } from "../Constants/membershipConstants";

export function memberships(state = { isSuccess: false, memberships: {}, currentMembership: {}, isUpdated: false, isDeleted: false, isCreated: false }, action) {
    console.log(action);
    switch (action.type) {
        case membershipConstants.GET_MEMBERSHIP_REQUEST:
            return {
                isSuccess: false,
            };
        case membershipConstants.GET_MEMBERSHIP_SUCCESS:
            return {
                isSuccess: true,
                memberships: action?.data.data,
            };
        case membershipConstants.GET_MEMBERSHIP_FAILURE:
            return { isSuccess: false };

        case membershipConstants.GET_SINGLE_MEMBERSHIP_REQUEST:
            return {
                isSuccess: false,
            };
        case membershipConstants.GET_SINGLE_MEMBERSHIP_SUCCESS:
            return {
                isSuccess: true,
                currentMembership: action?.data?.data,
            };
        case membershipConstants.GET_SINGLE_MEMBERSHIP_FAILURE:
            return { isSuccess: false };

        case membershipConstants.CREATE_MEMBERSHIP_REQUEST:
            return {
                isCreated: false,
            };
        case membershipConstants.CREATE_MEMBERSHIP_SUCCESS:
            return {
                isCreated: true,
            };
        case membershipConstants.CREATE_MEMBERSHIP_FAILURE:
            return { isCreated: false };

        case membershipConstants.UPDATE_MEMBERSHIP_REQUEST:
            return {
                isUpdated: false,
            };
        case membershipConstants.UPDATE_MEMBERSHIP_SUCCESS:
            return {
                isUpdated: true,
            };
        case membershipConstants.UPDATE_MEMBERSHIP_FAILURE:
            return { isUpdated: false };

        case membershipConstants.DELETE_MEMBERSHIP_REQUEST:
            return {
                isDeleted: false,
            };
        case membershipConstants.DELETE_MEMBERSHIP_SUCCESS:
            return {
                isDeleted: true,
            };
        case membershipConstants.DELETE_MEMBERSHIP_FAILURE:
            return { isDeleted: false };

        default:
            return state;
    }
}
