import api from "../api";
import { authHeader } from "../authHeader";

export const subsidyManagementService = {
  getSubsidyList,
  createSubsidy,
  getSubsidyDetails,
  createConstant,
  getConstant,
  addConstantToSubsidy,
  getAllConstantToSubsidy,
  getUserInputFieldNames,
  createUserInputs,
  getUserInputList,
};

async function getSubsidyList() {
  return await api.get(`subsidy/subsidies?page=1&paze_size=100`, {
    headers: authHeader(),
  });
}

async function createSubsidy(subsidyData) {
  return await api.post(`subsidy/create_subsidy`, subsidyData, {
    headers: authHeader(),
  });
}

async function getSubsidyDetails(item) {
  return await api.get(
    `subsidy/subsidies/${item?.id}?is_subscheme=${item?.is_subscheme}`,
    {
      headers: authHeader(),
    }
  );
}

async function createConstant(constantData) {
  return await api.post(`subsidy/constants/create`, constantData, {
    headers: authHeader(),
  });
}
async function getConstant() {
  return await api.get(`subsidy/constants`, {
    headers: authHeader(),
  });
}

async function addConstantToSubsidy(data) {
  return await api.post(`subsidy/add_constants`, data, {
    headers: authHeader(),
  });
}

async function getUserInputFieldNames(ID) {
  return await api.get(
    `subsidy/subsidy_user_input_field_names?scheme_id=${ID}`,
    {
      headers: authHeader(),
    }
  );
}

async function createUserInputs(data) {
 
  return await api.post(`subsidy/create_user_inputs`, data, {
    headers: authHeader(),
  });
}

async function getUserInputList(id) {
  return await api.get(`subsidy/subsidy_user_inputs?scheme_id=${id}`, {
    headers: authHeader(),
  });
}

async function getAllConstantToSubsidy(id) {
  return await api.get(`subsidy/subsidy_constants?scheme_id=${id}`, {
    headers: authHeader(),
  });
}
