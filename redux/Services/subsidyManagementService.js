import api from "../api";
import { authHeader } from "../authHeader";

export const subsidyManagementService = {
  getSubsidyList,
  createSubsidy,
};

async function getSubsidyList() {
  return await api.get(`subsidy/subsidies?page=1&paze_size=10`, {
    headers: authHeader(),
  });
}

async function createSubsidy(subsidyData) {
  return await api.post(`subsidy/create_subsidy`, subsidyData, {
    headers: authHeader(),
  });
}

// async function updateState({ id, editData }) {
//   return await api.patch(`state/update?state_id=${id}`, editData, {
//     headers: authHeader(),
//   });
// }

// async function deleteState(ID) {
//   return await api.delete(`state/delete?state_id=${ID}`, {
//     headers: authHeader(),
//   });
// }
