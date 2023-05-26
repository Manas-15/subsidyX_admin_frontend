import { createSlice } from "@reduxjs/toolkit";
import { createSubsidy } from "../Actions/subsidyManagementAction";

const initialState = {
  subsidyManagementData: [],
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const subsidyManagementSlice = createSlice({
  name: "subsidyManagement",
  initialState,
  extraReducers: {
    // [getTalukaManagementLists.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getTalukaManagementLists.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.talukaManagementData = payload;
    // },
    // [getTalukaManagementLists.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.errorMessage = payload;
    // },

    [createSubsidy.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createSubsidy.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createSubsidy.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },

    // [editTalukaManagement.pending]: (state) => {
    //   state.isLoading = true;
    //   state.isUpdated = false;
    // },
    // [editTalukaManagement.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isUpdated = true;
    // },
    // [editTalukaManagement.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isUpdated = false;
    //   state.errorMessage = payload;
    // },

    // [deleteTalukaManagement.pending]: (state) => {
    //   state.isLoading = true;
    //   state.isDeleted = false;
    // },
    // [deleteTalukaManagement.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.isDeleted = true;
    // },
    // [deleteTalukaManagement.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isDeleted = false;
    //   state.errorMessage = payload;
    // },
  },
});

export default subsidyManagementSlice.reducer;
