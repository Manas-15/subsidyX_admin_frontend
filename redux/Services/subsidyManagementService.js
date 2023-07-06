import api from "../api";
import { authHeader } from "../authHeader";

export const subsidyManagementService = {
  getSubsidyList,
  createSubsidy,
  deleteSubsidy,
  updateSubsidy,
  getSubsidyDetails,
  createConstant,
  getConstant,
  addConstantToSubsidy,
  getAllConstantToSubsidy,
  getUserInputFieldNames,
  createUserInputs,
  getUserInputList,
  getCondition,
  createCondition,
  updateCondition,
  deleteCondition,
  getListOfMatchingCriteria,
  getListOfQuestionForASubsidy,
  createMatchingCriteria,
  deleteCriteria,
  updateMatchingCriteria,
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

async function deleteSubsidy(id) {
  return await api.delete(`subsidy/delete?scheme_id=${id}`, {
    headers: authHeader(),
  });
}

async function updateSubsidy({ id, data }) {
  console.log({ id, data });
  return await api.patch(`subsidy/update/${id}`, data, {
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

async function getCondition(id) {
  return await api.get(`subsidy/conditions?scheme_id=${id}`, {
    headers: authHeader(),
  });
}

async function createCondition(data) {
  return await api.post(`subsidy/create_condition`, data, {
    headers: authHeader(),
  });
}

async function updateCondition({ scheme_id, id, editData }) {
  console.log({ id, editData });
  return await api.patch(
    `subsidy/update_condition?condition_id=${id}`,
    editData,
    {
      headers: authHeader(),
    }
  );
}

async function deleteCondition({ id }) {
  return await api.delete(`subsidy/delete_condition?condition_id=${id}`, {
    headers: authHeader(),
  });
}

async function getListOfMatchingCriteria(id) {
  return await api.get(`subsidy/match_criterias/${id}`, {
    headers: authHeader(),
  });
}

async function getListOfQuestionForASubsidy(id) {
  return await api.get(`subsidy/questions/${id}`, {
    headers: authHeader(),
  });
}
async function createMatchingCriteria({ scheme_id, criteriaData }) {
  return await api.post(
    `subsidy/add_matching_criteria?scheme_id=${scheme_id}`,
    criteriaData,
    {
      headers: authHeader(),
    }
  );
}

async function deleteCriteria({ id }) {
  return await api.delete(
    `subsidy/delete_matching_criteria?criteria_id=${id}`,
    {
      headers: authHeader(),
    }
  );
}

async function updateMatchingCriteria({ scheme_id, id, editData }) {
  return await api.patch(
    `subsidy/update_condition?condition_id=${id}`,
    editData,
    {
      headers: authHeader(),
    }
  );
}
