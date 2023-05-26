import api from "../api";
import { authHeader } from "../authHeader";

export const questionService = {
  getQuestions,
  //   createQuestion,
  //   updateQuestion,
  //   deleteQuestion,
};

async function getQuestions() {
  return await api.get(`question/`, {
    headers: authHeader(),
  });
}

// async function createCategory(iData) {
//   return await api.post(`industry/create`, iData, {
//     headers: authHeader(),
//   });
// }

// async function updateCategory({ id, state }) {
//   return await api.patch(`industry/edit?industry_id=${id}`, state, {
//     headers: authHeader(),
//   });
// }

// async function deleteCategory(ID) {
//   return await api.delete(`industry/delete?industry_id=${ID}`, {
//     headers: authHeader(),
//   });
// }
