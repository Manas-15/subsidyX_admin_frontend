import api from "../api";
import { authHeader } from "../authHeader";

export const talukaManagementService = {
  getTalukas,
  createTaluka,
  updateTaluka,
  deleteTaluka,
};

async function getTalukas() {
  return await api.get(`taluka/`, {
    headers: authHeader(),
  });
}

async function createTaluka(talukaData) {
  return await api.post(`taluka/create`, talukaData, {
    headers: authHeader(),
  });
}

async function updateTaluka({ id, editData }) {
  return await api.patch(`taluka/?taluka_id=${id}`, editData, {
    headers: authHeader(),
  });
}

async function deleteTaluka(ID) {
  return await api.delete(`taluka/?taluka_id=${ID}`, {
    headers: authHeader(),
  });
}