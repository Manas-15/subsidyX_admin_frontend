import { channelPartnerData } from "../../static/channelPartnerData";
import { channelPartnersConstants } from "../Constants/channelPartnerConstants";

export function channelPartners(state = { isSuccess: false, channelPartners: channelPartnerData }, action) {
    switch (action.type) {
        case channelPartnersConstants.GET_CHANNEL_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                channelPartners: state.channelPartners,
            };

        case channelPartnersConstants.CREATE_CHANNEL_PARTNERS_SUCCESS:
            console.log(action.data.body);
            return {
                ...state,
                isSuccess: true,
                channelPartners: [...state.channelPartners, action.data.body],
            };
        case channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                channelPartners: state.channelPartners.map((c) => {
                    if (+c.id === +action.data.id) {
                        return action.data.editData;
                    }
                    return c;
                }),
            };
        case channelPartnersConstants.DELETE_CHANNEL_PARTNERS_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                channelPartners: state.channelPartners.filter((c) => c.id !== action.data.id),
            };

        default:
            return state;
    }
}
