import { trustedPartnersConstants } from "../Constants/trustedPartnersConstant";

export const trustedPartnerManagementActions = {
    getTrustedPartners,
    createTrustedPartner,
    updateTrustedPartner,
    deleteTrustedPartner,
};
function getTrustedPartners() {
    return (dispatch) => {
        dispatch(success());

    };

    function success(data) {
        return { type: trustedPartnersConstants.GET_TRUSTED_PARTNERS_SUCCESS };
    }

}

function createTrustedPartner(body) {
    console.log(body);
    return (dispatch) => {
        dispatch(create({ body }));

    };

    function create(data) {
        return { type: trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_SUCCESS, data };
    }

}

function updateTrustedPartner({ id, editData }) {
    return (dispatch) => {
        dispatch(update({ id, editData }));

    };

    function update(data) {
        return { type: trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_SUCCESS, data };
    }

}

function deleteTrustedPartner(id) {
    return (dispatch) => {
        dispatch(remove({ id }));

    };

    function remove(data) {
        return { type: trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_SUCCESS, data };
    }

}
