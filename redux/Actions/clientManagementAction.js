import { clientManagementConstants } from "../Constants/clientManagementConstants";

export const clientManagementAction = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
};
function getClients() {
    return (dispatch) => {
        dispatch(success());

    };

    function success(data) {
        return { type: clientManagementConstants.GET_CLIENT_SUCCESS };
    }

}

function createClient(body) {
    console.log(body);
    return (dispatch) => {
        dispatch(create({ body }));

    };

    function create(data) {
        return { type: clientManagementConstants.CREATE_CLIENT_SUCCESS, data };
    }

}

function updateClient({ id, editData }) {
    return (dispatch) => {
        dispatch(update({ id, editData }));

    };

    function update(data) {
        return { type: clientManagementConstants.UPDATE_CLIENT_SUCCESS, data };
    }

}

function deleteClient(id) {
    return (dispatch) => {
        dispatch(remove({ id }));

    };

    function remove(data) {
        return { type: clientManagementConstants.DELETE_CLIENT_SUCCESS, data };
    }

}
