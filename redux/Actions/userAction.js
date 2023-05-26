import { userConstants } from "../Constants/userConstants";
import { userService } from "../Services/userServices";
import { alertActions } from "./alertAction";

export const userActions = {
  login,
  logout,
};
function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        console.log(res);
        dispatch(success(res));
        const result = JSON.stringify(res?.data?.access_token);
        localStorage.setItem("accessToken", result);
        dispatch(alertActions.success("User loggedin successfully"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request(data) {
    return { type: userConstants.USER_LOGIN_REQUEST, data };
  }
  function success(data) {
    return { type: userConstants.USER_LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.USER_LOGIN_FAILURE, error };
  }
}

function logout() {
  toast("Logged out successfully", {
    hideProgressBar: true,
    autoClose: 4000,
    type: "success",
  });
  return { type: userConstants.LOGOUT };
}
