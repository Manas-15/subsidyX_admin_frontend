import { alertActions } from "./alertAction";
import { channelpartnersService} from "../Services/channelPartnerService";
import { channelPartnersConstants} from "../Constants/channelPartnerConstants";

export const channelPartnerManagementActions = {
    getChannelPartners,
    createChannelPartner,
    updateChannelPartner,
    deleteChannelPartner,
    getSingleChannelPartner
};
function getChannelPartners(data) {
    return (dispatch) => {
        dispatch(request(data));
        channelpartnersService.getChannelPartners(data).then(
            (res) => {
                dispatch(success(res));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: channelPartnersConstants.GET_CHANNEL_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: channelPartnersConstants.GET_CHANNEL_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: channelPartnersConstants.GET_CHANNEL_PARTNERS_FAILURE, error };
    }
}
function getSingleChannelPartner(id) {
    return (dispatch) => {
        dispatch (request(id));
        channelpartnersService.getSingleChannelPartner(id).then(
            (res) => {
                dispatch(success(res));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_REQUEST };
    }
    function success(data) {
        return { type: channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_SUCCESS, data };
    }
    function failure(error) {
        return { type: channelPartnersConstants.GET_SINGLE_CHANNEL_PARTNER_FAILURE, error };
    }
}
function createChannelPartner(iData) {
    return (dispatch) => {
        dispatch(request({ iData }));
        channelpartnersService.createChannelPartner(iData).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("ChannelPartner Created"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: channelPartnersConstants.CREATE_CHANNEL_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: channelPartnersConstants.CREATE_CHANNEL_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: channelPartnersConstants.CREATE_CHANNEL_PARTNERS_FAILURE, error };
    }
}

function updateChannelPartner({ id, data }) {
    return (dispatch) => {
        dispatch(request({ id, data }));
        channelpartnersService.updateChannelPartner({ id, data }).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("ChannelPartner Updated"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_FAILURE, error };
    }
}

function deleteChannelPartner(id) {
    return (dispatch) => {
        dispatch(request({ id }));
        channelpartnersService.deleteChannelPartner(id).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("ChannelPartner Deleted"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: channelPartnersConstants.DELETE_CHANNEL_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: channelPartnersConstants.DELETE_CHANNEL_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: channelPartnersConstants.DELETE_CHANNEL_PARTNERS_FAILURE, error };
    }
}
