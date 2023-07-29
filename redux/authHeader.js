import { store } from "./Store"
export function authHeader() {
  // return authorization header with jwt token
  const state = store.getState()
  let accessToken = state.user.access_token

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`
    };
  } else {
    return {};
  }
}
