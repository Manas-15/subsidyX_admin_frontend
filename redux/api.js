import axios from "axios";
import { store } from "./Store"
import { userActions } from "./Actions/userAction";
const state = store.getState()
import { userConstants } from "./Constants/userConstants";
const instance = axios.create({
  baseURL: "https://staging-api.subsidyx.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});
instance.interceptors.request.use(
  async (config) => {
    console.log(state.user);
    // const token = state?.user?.user?.access_token
    const token  = JSON.parse(localStorage.getItem("accessToken"))
    config.headers['Authorization'] = `Bearer ${token}`

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(response => response, async (err) => {
  const prevRequest = err?.config;
  console.log(err?.response?.status);
  if (err?.response?.status === 403 && !prevRequest?.sent) {
    prevRequest.sent = true;
    console.log("here");
    const newAccessToken = await refresh();
    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`


    return instance(prevRequest);
  } else if (err?.response?.status === 401) {
    //console.log('here');
    store.dispatch(userActions.logout())
    //console.log('here');

  }
  return Promise.reject(err)
});

export async function refresh() {
  try {
    const resp = await instance.post("users/refresh", { refresh_token: JSON.parse(localStorage.getItem('refreshToken')) });
    store.dispatch(userActions.setCredentials(resp?.data))
    return resp.data.access_token;
  } catch (e) {
    console.log("Error", e);
  }

}

export default instance;
