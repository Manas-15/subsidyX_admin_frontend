import { createSlice } from "@reduxjs/toolkit";
import {
  getStateManagementLists,
  createStateManagement,
  deleteStateManagement,
} from "../Actions/stateManagementAction";

const initialState = {
  stateManagementData: [],
  isCreated: false,
  isDeleted: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const stateManagementSlice = createSlice({
  name: "stateManagement",
  initialState,
  extraReducers: {
    [getStateManagementLists.pending]: (state) => {
      state.isLoading = true;
    },
    [getStateManagementLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.stateManagementData = payload;
    },
    [getStateManagementLists.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createStateManagement.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createStateManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createStateManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },
    [deleteStateManagement.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteStateManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleted = true;
    },
    [deleteStateManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDeleted = false;
      state.errorMessage = payload;
    },
  },
});

export default stateManagementSlice.reducer;
