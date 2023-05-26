import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getQuestionLists = createAsyncThunk(
  "district/",
  async (districtData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`question/`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
