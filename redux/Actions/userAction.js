import { userConstants } from "../Constants/userConstants";
import { userService } from "../Services/userServices";
import { alertActions } from "./alertAction";

export const userActions = {
  login,
  logout,
  setCredentials,
};
function login(data, from) {
  return (dispatch) => {
    dispatch(request({ data }));
    userService.login(data).then(
      (res) => {
        dispatch(success(res));
        const result = JSON.stringify(res?.data?.access_token);
        const refreshToken = JSON.stringify(res?.data?.refresh_token);

        localStorage.setItem("accessToken", result);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("login action called");
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

function setCredentials(data) {
  const result = JSON.stringify(data?.access_token);
  const refreshToken = JSON.stringify(data?.refresh_token);

  localStorage.setItem("accessToken", result);
  localStorage.setItem("refreshToken", refreshToken);

  return { type: userConstants.USER_SET_CREDENTIALS, data }
}
function logout() {
  // toast("Logged out successfully", {
  //   hideProgressBar: true,
  //   autoClose: 4000,
  //   type: "success",
  // });
  return { type: userConstants.LOGOUT };
}
