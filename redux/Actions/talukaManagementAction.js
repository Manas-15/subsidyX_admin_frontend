import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getTalukaManagementLists = createAsyncThunk(
  "state/get",
  async (tData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`taluka/`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTalukaManagement = createAsyncThunk(
  "taluka/create",
  async (talukaData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`taluka/create`, talukaData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTalukaManagement = createAsyncThunk(
  "taluka/edit",
  async ({ id, editData }, { rejectWithValue }) => {
    try {
      console.log(id, editData);
      const { data } = await api.patch(`taluka/?taluka_id=${id}`, editData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTalukaManagement = createAsyncThunk(
  "taluka/delete",
  async (ID, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`taluka/?taluka_id=${ID}`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
