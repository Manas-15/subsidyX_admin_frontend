import { employeeData } from "../../static/employeeData";
import { employeeConstants } from "../Constants/employeeConstants";

export function employees(state = { isSuccess: false, employees: employeeData }, action) {
    switch (action.type) {
        case employeeConstants.GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                employees: state.employees,
            };

        case employeeConstants.CREATE_EMPLOYEE_SUCCESS:
            console.log(action.data.body);
            return {
                ...state,
                isSuccess: true,
                employees: [...state.employees, action.data.body],
            };
        case employeeConstants.UPDATE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                employees: state.employees.map((c) => {
                    if (+c.id === +action.data.id) {
                        return action.data.editData;
                    }
                    return c;
                }),
            };
        case employeeConstants.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                employees: state.employees.filter((c) => c.id !== action.data.id),
            };

        default:
            return state;
    }
}
