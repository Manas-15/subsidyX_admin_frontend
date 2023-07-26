import { membershipConstants } from "../Constants/membershipConstants";
import { membershipService } from "../Services/membershipManagementService";
import { alertActions } from "./alertAction";
export const membershipManagementActions = {
    getMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
    getSingleMembership
};
function getMemberships(data) {
    return (dispatch) => {
        dispatch(request());
        membershipService.getMemberships(data).then(
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
        return { type: membershipConstants.GET_MEMBERSHIP_REQUEST };
    }
    function success(data) {
        return { type: membershipConstants.GET_MEMBERSHIP_SUCCESS, data };
    }
    function failure(error) {
        return { type: membershipConstants.GET_MEMBERSHIP_FAILURE, error };
    }
}

function createMembership(iData) {
    return (dispatch) => {
        dispatch(request({ iData }));
        membershipService.createMembership(iData).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("Membership Created"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: membershipConstants.CREATE_MEMBERSHIP_REQUEST };
    }
    function success(data) {
        return { type: membershipConstants.CREATE_MEMBERSHIP_SUCCESS, data };
    }
    function failure(error) {
        return { type: membershipConstants.CREATE_MEMBERSHIP_FAILURE, error };
    }

}

function updateMembership({ id, data }) {
    return (dispatch) => {
        dispatch(request({ id, data }));
        membershipService.updateMembership({ id, data }).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("Membership Updated"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: membershipConstants.UPDATE_MEMBERSHIP_REQUEST };
    }
    function success(data) {
        return { type: membershipConstants.UPDATE_MEMBERSHIP_SUCCESS, data };
    }
    function failure(error) {
        return { type: membershipConstants.UPDATE_MEMBERSHIP_FAILURE, error };
    }

}

function deleteMembership(id) {
    return (dispatch) => {
        dispatch(request({ id }));
        membershipService.deleteMembership(id).then(
            (res) => {
                dispatch(success(res));
                dispatch(alertActions.success("Membership Deleted"));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };
    function request() {
        return { type: membershipConstants.DELETE_MEMBERSHIP_REQUEST };
    }
    function success(data) {
        return { type: membershipConstants.DELETE_MEMBERSHIP_SUCCESS, data };
    }
    function failure(error) {
        return { type: membershipConstants.DELETE_MEMBERSHIP_FAILURE, error };
    }

}
function getSingleMembership(id) {
    return (dispatch) => {
        dispatch(request());
        membershipService.getSingleMembership(id).then(
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
        return { type: membershipConstants.GET_SINGLE_MEMBERSHIP_REQUEST };
    }
    function success(data) {
        return { type: membershipConstants.GET_SINGLE_MEMBERSHIP_SUCCESS, data };
    }
    function failure(error) {
        return { type: membershipConstants.GET_SINGLE_MEMBERSHIP_FAILURE, error };
    }
}