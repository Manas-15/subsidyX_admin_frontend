import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getIndustryLists = createAsyncThunk(
  "industry/industries",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`industry/industries`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createIndustryCategory = createAsyncThunk(
  "industry/create",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`industry/create`, iData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIndustryCategory = createAsyncThunk(
  "industry/delete",
  async (ID, { rejectWithValue }) => {
    try {
      console.log(ID);
      const { data } = await api.delete(`industry/delete?industry_id=${ID}`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
