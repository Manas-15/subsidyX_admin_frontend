import api from "../api";
import { authHeader } from "../authHeader";

export const stateManagementService = {
  getStates,
  createState,
  updateState,
  deleteState,
};

async function getStates(data) {
  let pagination = data?.pagination ? `?page=${data?.pagination?.page}&page_size=${data?.pagination?.page_size}` : "?page=1&page_size=100"
  return await api.get(`state/${pagination}`, {
    headers: authHeader(),
  });
}

async function createState(sData) {
  return await api.post(`state/create`, sData, {
    headers: authHeader(),
  });
}

async function updateState({ id, editData }) {
  return await api.patch(`state/update?state_id=${id}`, editData, {
    headers: authHeader(),
  });
}

async function deleteState(ID) {
  return await api.delete(`state/delete?state_id=${ID}`, {
    headers: authHeader(),
  });
}
