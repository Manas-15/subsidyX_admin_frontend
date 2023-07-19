import { employeeConstants } from "../Constants/employeeConstants";

export const employeeManagementAction = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
function getEmployees() {
    return (dispatch) => {
        dispatch(success());

    };

    function success(data) {
        return { type: employeeConstants.GET_EMPLOYEE_SUCCESS };
    }

}

function createEmployee(body) {
    console.log(body);
    return (dispatch) => {
        dispatch(create({ body }));

    };

    function create(data) {
        return { type: employeeConstants.CREATE_EMPLOYEE_SUCCESS, data };
    }

}

function updateEmployee({ id, editData }) {
    return (dispatch) => {
        dispatch(update({ id, editData }));

    };

    function update(data) {
        return { type: employeeConstants.UPDATE_EMPLOYEE_SUCCESS, data };
    }

}

function deleteEmployee(id) {
    return (dispatch) => {
        dispatch(remove({ id }));

    };

    function remove(data) {
        return { type: employeeConstants.DELETE_EMPLOYEE_SUCCESS, data };
    }

}
