import { userConstants } from "../Constants/userConstants";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case userConstants.USER_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action?.data?.data,
      };
    case userConstants.USER_LOGIN_FAILURE:
      return { loggingIn: false };
    case userConstants.USER_SET_CREDENTIALS:

      return {
        loggedIn: true,
        user: action?.data?.data,
      };

    default:
      return state;
  }
}
