import { createSlice } from "@reduxjs/toolkit";
import {
  getTalukaManagementLists,
  createTalukaManagement,
  deleteTalukaManagement,
  editTalukaManagement,
} from "../Actions/talukaManagementAction";

const initialState = {
  talukaManagementData: [],
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const talukaManagementSlice = createSlice({
  name: "talukaManagement",
  initialState,
  extraReducers: {
    [getTalukaManagementLists.pending]: (state) => {
      state.isLoading = true;
    },
    [getTalukaManagementLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.talukaManagementData = payload;
    },
    [getTalukaManagementLists.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createTalukaManagement.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createTalukaManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createTalukaManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },

    [editTalukaManagement.pending]: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [editTalukaManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUpdated = true;
    },
    [editTalukaManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.errorMessage = payload;
    },

    [deleteTalukaManagement.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteTalukaManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleted = true;
    },
    [deleteTalukaManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDeleted = false;
      state.errorMessage = payload;
    },
  },
});

export default talukaManagementSlice.reducer;
