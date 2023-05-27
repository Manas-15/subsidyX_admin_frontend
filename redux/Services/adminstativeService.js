import api from "../api";

export const adminstativeService = {
  getAdminstative,
  updateAdminstative,
};

async function getAdminstative() {
  return await api.get(`adminstrative/adminstativelable`);
}

async function updateAdminstative(adminstative) {
  return await api.patch(
    `adminstrative/adminstativelable/update/`,
    adminstative
  );
}
