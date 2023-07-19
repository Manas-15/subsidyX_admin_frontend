import { membershipData } from "../../static/membershipData";
import { membershipConstants } from "../Constants/membershipConstants";

export function memberships(state = { isSuccess: false, memberships: membershipData }, action) {
    switch (action.type) {
        case membershipConstants.GET_MEMBERSHIP_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                memberships: state.memberships,
            };

        case membershipConstants.CREATE_MEMBERSHIP_SUCCESS:
            console.log(action.data.body);
            return {
                ...state,
                isSuccess: true,
                memberships: [...state.memberships, action.data.body],
            };
        case membershipConstants.UPDATE_MEMBERSHIP_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                memberships: state.memberships.map((c) => {
                    if (+c.id === +action.data.id) {
                        return action.data.editData;
                    }
                    return c;
                }),
            };
        case membershipConstants.DELETE_MEMBERSHIP_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                memberships: state.memberships.filter((c) => c.id !== action.data.id),
            };

        default:
            return state;
    }
}
