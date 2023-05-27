import api from "../api";
import { authHeader } from "../authHeader";

export const questionService = {
  getQuestions,
  createQuestion,
  //   updateQuestion,
  deleteQuestion,
};

async function getQuestions() {
  return await api.get(`question/`, {
    headers: authHeader(),
  });
}

async function createQuestion(questionData) {
  return await api.post(`question/Create`, questionData, {
    headers: authHeader(),
  });
}

// async function updateCategory({ id, state }) {
//   return await api.patch(`industry/edit?industry_id=${id}`, state, {
//     headers: authHeader(),
//   });
// }

async function deleteQuestion(ID) {
  return await api.delete(`question/?question_id=${ID}`, {
    headers: authHeader(),
  });
}
