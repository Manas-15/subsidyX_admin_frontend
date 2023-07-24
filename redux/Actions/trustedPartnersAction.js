import { alertActions } from "./alertAction";
import { trustedpartnersService } from "../Services/trustedPartnerService";
import { trustedPartnersConstants } from "../Constants/trustedPartnersConstant";

export const trustedPartnerManagementActions = {
    getTrustedPartners,
    createTrustedPartner,
    updateTrustedPartner,
    deleteTrustedPartner,
    getSingleTrustedPartner
};
function getTrustedPartners(data) {
    return (dispatch) => {
        dispatch(request(data));
        trustedpartnersService.getTrustedPartners(data).then(
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
        return { type: trustedPartnersConstants.GET_TRUSTED_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: trustedPartnersConstants.GET_TRUSTED_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: trustedPartnersConstants.GET_TRUSTED_PARTNERS_FAILURE, error };
    }
}
function getSingleTrustedPartner(id) {
    return (dispatch) => {
        dispatch(request(id));
        trustedpartnersService.getSingleTrustedPartner(id).then(
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
        return { type: trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_REQUEST };
    }
    function success(data) {
        return { type: trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_SUCCESS, data };
    }
    function failure(error) {
        return { type: trustedPartnersConstants.GET_SINGLE_TRUSTED_PARTNER_FAILURE, error };
    }
}
function createTrustedPartner(iData) {
    return (dispatch) => {
        dispatch(request({ iData }));
        trustedpartnersService.createTrustedPartner(iData).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("TrustedPartner Created"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: trustedPartnersConstants.CREATE_TRUSTED_PARTNERS_FAILURE, error };
    }
}

function updateTrustedPartner({ id, data }) {
    return (dispatch) => {
        dispatch(request({ id, data }));
        trustedpartnersService.updateTrustedPartner({ id, data }).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("TrustedPartner Updated"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: trustedPartnersConstants.UPDATE_TRUSTED_PARTNERS_FAILURE, error };
    }
}

function deleteTrustedPartner(id) {
    return (dispatch) => {
        dispatch(request({ id }));
        trustedpartnersService.deleteTrustedPartner(id).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("TrustedPartner Deleted"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_REQUEST };
    }
    function success(data) {
        return { type: trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_SUCCESS, data };
    }
    function failure(error) {
        return { type: trustedPartnersConstants.DELETE_TRUSTED_PARTNERS_FAILURE, error };
    }
}
