import { store } from "./Store"
export async function authHeader() {
  // return authorization header with jwt token
  const state =  store.getState()
  let accessToken = await state.user?.user?.access_token
  console.log(state.user);
  if (accessToken) {
    return {
      // Authorization: `Bearer ${state.user?.user?.access_token}`
    };
  } else {
    return {};
  }
}
