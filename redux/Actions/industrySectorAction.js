import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getIndustrySectorLists = createAsyncThunk(
  "industry/industry_sector",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`industry_sector/?page=1&page_size=10`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createIndustrySector = createAsyncThunk(
  "industry_sector/create",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`industry_sector/create`, iData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIndustrySector = createAsyncThunk(
  "industry_sector/delete",
  async (ID, { rejectWithValue }) => {
    try {
      console.log(ID);
      const { data } = await api.delete(
        `industry_sector/delete?sector_id=${ID}`,
        {
          headers: authHeader(),
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
