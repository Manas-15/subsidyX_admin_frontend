import { membershipConstants } from "../Constants/membershipConstants";

export const membershipManagementActions = {
    getMemberships,
    createMembership,
    updateMembership,
    deleteMembership,
};
function getMemberships() {
    return (dispatch) => {
        dispatch(success());

    };

    function success(data) {
        return { type: membershipConstants.GET_MEMBERSHIP_SUCCESS };
    }

}

function createMembership(body) {
    console.log(body);
    return (dispatch) => {
        dispatch(create({ body }));

    };

    function create(data) {
        return { type: membershipConstants.CREATE_MEMBERSHIP_SUCCESS, data };
    }

}

function updateMembership({ id, editData }) {
    return (dispatch) => {
        dispatch(update({ id, editData }));

    };

    function update(data) {
        return { type: membershipConstants.UPDATE_MEMBERSHIP_SUCCESS, data };
    }

}

function deleteMembership(id) {
    return (dispatch) => {
        dispatch(remove({ id }));

    };

    function remove(data) {
        return { type: membershipConstants.DELETE_MEMBERSHIP_SUCCESS, data };
    }

}
