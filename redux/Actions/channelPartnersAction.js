import { channelPartnersConstants } from "../Constants/channelPartnerConstants";

export const channelPartnerManagementActions = {
    getChannelPartners,
    createChannelPartner,
    updateChannelPartner,
    deleteChannelPartner,
};
function getChannelPartners() {
    return (dispatch) => {
        dispatch(success());

    };

    function success(data) {
        return { type: channelPartnersConstants.GET_CHANNEL_PARTNERS_SUCCESS };
    }

}

function createChannelPartner(body) {
    console.log(body);
    return (dispatch) => {
        dispatch(create({ body }));

    };

    function create(data) {
        return { type: channelPartnersConstants.CREATE_CHANNEL_PARTNERS_SUCCESS, data };
    }

}

function updateChannelPartner({ id, editData }) {
    return (dispatch) => {
        dispatch(update({ id, editData }));

    };

    function update(data) {
        return { type: channelPartnersConstants.UPDATE_CHANNEL_PARTNERS_SUCCESS, data };
    }

}

function deleteChannelPartner(id) {
    return (dispatch) => {
        dispatch(remove({ id }));

    };

    function remove(data) {
        return { type: channelPartnersConstants.DELETE_CHANNEL_PARTNERS_SUCCESS, data };
    }

}
