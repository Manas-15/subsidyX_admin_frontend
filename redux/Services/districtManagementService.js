import api from "../api";
import { authHeader } from "../authHeader";

export const districtManagementService = {
  getDistricts,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};

async function getDistricts(ID) {
  let params = ID ? "?state_id=" + ID : "";
  return await api.get(`district/${params}`, {
    headers: authHeader(),
  });
}

async function createDistrict(districtData) {
  return await api.post(`district/create`, districtData, {
    headers: authHeader(),
  });
}

async function updateDistrict({ id, editData }) {
  return await api.patch(`/district/?district_id=${id}`, editData, {
    headers: authHeader(),
  });
}

async function deleteDistrict(ID) {
  return await api.delete(`district/?district_id=${ID}`, {
    headers: authHeader(),
  });
}
