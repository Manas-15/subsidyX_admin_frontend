import { clientData } from "../../static/clientData";
import { clientManagementConstants } from "../Constants/clientManagementConstants";

export function client(state = { isSuccess: false, clients: [] }, action) {
  switch (action.type) {
    case clientManagementConstants.GET_CLIENT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        clients: clientData,
      };

    case clientManagementConstants.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        clients: [...state.clients, action.data.body],
      };
    case clientManagementConstants.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        clients: state.clients.map((c) => {
          if (+c.id === +action.data.id) {
            return action.data.editData;
          }
          return c;
        }),
      };
    case clientManagementConstants.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        clients: state.clients.filter((c) => c.id !== action.data.id),
      };

    default:
      return state;
  }
}
