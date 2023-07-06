import api from "../api";
import { authHeader } from "../authHeader";

export const questionService = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

async function getQuestions(data) {
  let params = data
    ? "&indsutry_sector_id=" +
      data.indsutry_sector_id +
      "&industry_category_id=" +
      data.industry_category_id
    : "";

  return await api.get(`question/?page=1&page_size=300${params}`, {
    headers: authHeader(),
  });
}

async function createQuestion(questionData) {
  return await api.post(`question/Create`, questionData, {
    headers: authHeader(),
  });
}

async function updateQuestion({ id, data }) {
  return await api.patch(`question/update?question_id=${id}`, data, {
    headers: authHeader(),
  });
}

async function deleteQuestion(ID) {
  return await api.delete(`question/?question_id=${ID}`, {
    headers: authHeader(),
  });
}
