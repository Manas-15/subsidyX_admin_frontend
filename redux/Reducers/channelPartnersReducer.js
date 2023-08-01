import { channelPartnersConstants} from "../Constants/channelPartnerConstants";

export function channelPartners(state = { isSuccess: false, channelPartners: [], singleChannelPartner: {} }, action) {
    switch (action.type) {
        case channelPartnersConstants.GET_CHANNEL_PARTNERS_REQUEST:
            return {
                isSuccess: false,
            };
        case channelPartnersConstants.GET_CHANNEL_PARTNERS_SUCCESS:
            return {
                isSuccess: true,
                channelPartners: action?.data?.data,
            };
        case channelPartnersConstants.GET_CHANNEL_PARTNERS_FAILURE:
            return { isSuccess: false };

        case channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_REQUEST:
            return {
                isSuccess: false,
            };
        case channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_SUCCESS:
            console.log(action?.data);
            return {
                isSuccess: true,
                singleChannelPartner: action?.data?.data,
            };
        case channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_FAILURE:
            return { isSuccess: false };



        case channelPartnersConstants.CREATE_CHANNEL_PARTNERS_REQUEST:
            return {
                isCreated: false,
            };
        case channelPartnersConstants.CREATE_CHANNEL_PARTNERS_SUCCESS:
            return {
                isCreated: true,
            };
        case channelPartnersConstants.CREATE_CHANNEL_PARTNERS_FAILURE:
            return { isCreated: false };

        case channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_REQUEST:
            return {
                isUpdated: false,
            };
        case channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_SUCCESS:
            return {
                isUpdated: true,
            };
        case channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_FAILURE:
            return { isUpdated: false };

        case channelPartnersConstants.DELETE_CHANNEL_PARTNERS_REQUEST:
            return {
                isDeleted: false,
            };
        case channelPartnersConstants.DELETE_CHANNEL_PARTNERS_SUCCESS:
            return {
                isDeleted: true,
            };
        case channelPartnersConstants.DELETE_CHANNEL_PARTNERS_FAILURE:
            return { isDeleted: false };

        default:
            return state;
    }
}
