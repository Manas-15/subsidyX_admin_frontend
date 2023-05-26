import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getAdminstativeLable = createAsyncThunk(
  "adminstative/get",
  async (tData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`adminstrative/adminstativelable`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editAdminstativeLable = createAsyncThunk(
  "adminstative/update",
  async (adminstative, { rejectWithValue }) => {
    try {
      console.log(adminstative);
      const { data } = await api.patch(
        `adminstrative/adminstativelable/update/`,
        adminstative
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
