import { trustedPartnerData } from "../../static/trustedPartnerData";
import { trustedPartnersConstants } from "../Constants/trustedPartnersConstant";

export function trustedPartners(state = { isSuccess: false, trustedPartners: trustedPartnerData }, action) {
    switch (action.type) {
        case trustedPartnersConstants.GET_TRUSTED_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                trustedPartners: state.trustedPartners,
            };

        case trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_SUCCESS:
            console.log(action.data.body);
            return {
                ...state,
                isSuccess: true,
                trustedPartners: [...state.trustedPartners, action.data.body],
            };
        case trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                trustedPartners: state.trustedPartners.map((c) => {
                    if (+c.id === +action.data.id) {
                        return action.data.editData;
                    }
                    return c;
                }),
            };
        case trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                trustedPartners: state.trustedPartners.filter((c) => c.id !== action.data.id),
            };

        default:
            return state;
    }
}
