import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { authHeader } from "../authHeader";

// export const getQuestionLists = createAsyncThunk(
//   "district/",
//   async (districtData, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get(`question/`, {
//         headers: authHeader(),
//       });
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const createSubsidy = createAsyncThunk(
  "subsidy/create",
  async (subsidyData, { rejectWithValue }) => {
    try {
      console.log("create subsidy", subsidyData);
      const { data } = await api.post(`subsidy/create_subsidy`, subsidyData, {
        headers: authHeader(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
