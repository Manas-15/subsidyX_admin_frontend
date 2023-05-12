import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`users/login`, userData);
      console.log(data);
      const result = JSON.stringify(data?.access_token);
      localStorage.setItem("accessToken", result);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
