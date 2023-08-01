import { authHeader } from "../authHeader";
import api from "../api";

export const reportManagementService = {
  getAllReportBasedOnUser,
};

async function getAllReportBasedOnUser() {
  //   let params = ID ? "?state_id=" + ID : "";
  return await api.get(`subsidy/reports?page=1&page_size=200`, {
    // headers: authHeader(),
  });
}
