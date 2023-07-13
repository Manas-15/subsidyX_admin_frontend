import axios from "axios";

const instance = axios.create({
  baseURL: "https://staging-api.subsidyx.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});
export default instance;
