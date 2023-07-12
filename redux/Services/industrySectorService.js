import api from "../api";
import { authHeader } from "../authHeader";

export const industrySectorService = {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
};

async function getSectors(ID) {
  let params = ID ? "&industry_category_id=" + ID : "";
  return await api.get(`industry_sector/?page=1&page_size=100${params}`, {
    headers: authHeader(),
  });
}

async function createSector(iData) {
  return await api.post(`industry_sector/create`, iData, {
    headers: authHeader(),
  });
}

async function updateSector({ id, industrySectorData }) {
  return await api.patch(
    `industry_sector/update?sector_id=${id}`,
    industrySectorData,
    {
      headers: authHeader(),
    }
  );
}

async function deleteSector(ID) {
  return await api.delete(`industry_sector/delete?sector_id=${ID}`, {
    headers: authHeader(),
  });
}
