import { trustedPartnerData } from "../../static/trustedPartnerData";
import { trustedPartnersConstants } from "../Constants/trustedPartnersConstant";

export function trustedPartners(state = { isSuccess: false, trustedPartners: [], singleTrustedPartner: {} }, action) {
    switch (action.type) {
        case trustedPartnersConstants.GET_TRUSTED_PARTNERS_REQUEST:
            return {
                isSuccess: false,
            };
        case trustedPartnersConstants.GET_TRUSTED_PARTNERS_SUCCESS:
            return {
                isSuccess: true,
                trustedPartners: action?.data?.data,
            };
        case trustedPartnersConstants.GET_TRUSTED_PARTNERS_FAILURE:
            return { isSuccess: false };

        case trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_REQUEST:
            return {
                isSuccess: false,
            };
        case trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_SUCCESS:
            console.log(action?.data);
            return {
                isSuccess: true,
                singleTrustedPartner: action?.data?.data,
            };
        case trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_FAILURE:
            return { isSuccess: false };



        case trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_REQUEST:
            return {
                isCreated: false,
            };
        case trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_SUCCESS:
            return {
                isCreated: true,
            };
        case trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_FAILURE:
            return { isCreated: false };

        case trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_REQUEST:
            return {
                isUpdated: false,
            };
        case trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_SUCCESS:
            return {
                isUpdated: true,
            };
        case trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_FAILURE:
            return { isUpdated: false };

        case trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_REQUEST:
            return {
                isDeleted: false,
            };
        case trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_SUCCESS:
            return {
                isDeleted: true,
            };
        case trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_FAILURE:
            return { isDeleted: false };

        default:
            return state;
    }
}
