import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

export const getDistrictManagementLists = createAsyncThunk(
  "district/",
  async (iData, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`district/`, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDistrictManagement = createAsyncThunk(
  "district/create",
  async (districtData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`district/create`, districtData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDistrictManagement = createAsyncThunk(
  "district/edit",
  async ({ id, editData }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/district/?district_id=${id}`,
        editData,
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

// export const deleteStateManagement = createAsyncThunk(
//   "industry/delete",
//   async (ID, { rejectWithValue }) => {
//     try {
//       console.log(ID);
//       const { data } = await api.delete(`state/delete?state_id=${ID}`, {
//         headers: authHeader(),
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
