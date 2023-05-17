import { createSlice } from "@reduxjs/toolkit";
import {
  getDistrictManagementLists,
  createDistrictManagement,
  editDistrictManagement,
  deleteStateManagement,
} from "../Actions/districtManagementAction";

const initialState = {
  districtManagementData: [],
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const districtManagementSlice = createSlice({
  name: "districtManagement",
  initialState,
  extraReducers: {
    [getDistrictManagementLists.pending]: (state) => {
      state.isLoading = true;
    },
    [getDistrictManagementLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.districtManagementData = payload;
    },
    [getDistrictManagementLists.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createDistrictManagement.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createDistrictManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createDistrictManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },
    [editDistrictManagement.pending]: (state) => {
      state.isLoading = true;
      state.isUpdated = false;
    },
    [editDistrictManagement.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUpdated = true;
    },
    [editDistrictManagement.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isUpdated = false;
      state.errorMessage = payload;
    },
    // [deleteStateManagement.pending]: (state) => {
    //   state.isLoading = true;
    //   state.isDeleted = false;
    // },
    // [deleteStateManagement.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isDeleted = true;
    // },
    // [deleteStateManagement.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isDeleted = false;
    //   state.errorMessage = payload;
    // },
  },
});

export default districtManagementSlice.reducer;
