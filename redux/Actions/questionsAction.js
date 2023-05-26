import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

import { alertActions } from "./alertAction";
import { questionService } from "../Services/questionService";
import { questionConstants } from "../Constants/questionConstants";

export const questionActions = {
  getQuestions,
  // createQuestion,
  // updateQuestion,
  // deleteQuestion,
};
function getQuestions() {
  return (dispatch) => {
    dispatch(request());
    questionService.getQuestions().then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
  function request() {
    return { type: questionConstants.GET_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.GET_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.GET_QUESTION_FAILURE, error };
  }
}

export const createQuestion = createAsyncThunk(
  "questions/create",
  async (questionData, { rejectWithValue }) => {
    try {
      console.log("create Question", questionData);
      const { data } = await api.post(`question/Create`, questionData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestionManagement = createAsyncThunk(
  "question/delete",
  async (ID, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`question/?question_id=${ID}`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
