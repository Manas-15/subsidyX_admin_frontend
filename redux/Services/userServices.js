import api from "../api";

export const userService = {
  login,
};

async function login(userData) {
  return await api.post(`users/login`, userData);
}
