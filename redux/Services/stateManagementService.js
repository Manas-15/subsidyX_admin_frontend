import api from "../api";
import { authHeader } from "../authHeader";

export const stateManagementService = {
  getStates,
  createState,
  updateState,
  deleteState,
};

async function getStates() {
  return await api.get(`state/`, {
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
