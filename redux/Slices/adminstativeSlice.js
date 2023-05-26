import { createSlice } from "@reduxjs/toolkit";
import {
  editAdminstativeLable,
  getAdminstativeLable,
} from "../Actions/adminstativeAction";

const initialState = {
  adminstativeLabelData: {},
  isUpdated: false,
  isDeleted: false,
  isSuccess: false,
  successMessage: "",
  errorMessage: "",
};

const adminstativeLabelSlice = createSlice({
  name: "adminstativeLabel",
  initialState,
  extraReducers: {
    [getAdminstativeLable.pending]: (state) => {
      state.isSuccess = false;
    },
    [getAdminstativeLable.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.adminstativeLabelData = payload;
    },
    [getAdminstativeLable.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [editAdminstativeLable.pending]: (state) => {
      state.isSuccess = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    [editAdminstativeLable.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isUpdated = true;
      state.successMessage = "Adminstative label updated";
    },
    [editAdminstativeLable.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = payload;
    },

    // [deleteIndustryCategory.pending]: (state) => {
    //   state.isSuccess = false;
    //   state.isCreated = false;
    //   state.isDeleted = false;
    //   state.isUpdated = false;
    //   state.successMessage = "";
    //   state.errorMessage = "";
    // },
    // [deleteIndustryCategory.fulfilled]: (state, { payload }) => {
    //   state.isSuccess = true;
    //   state.isDeleted = true;
    //   state.successMessage = "Industry category deleted";
    // },
    // [deleteIndustryCategory.rejected]: (state, { payload }) => {
    //   state.isSuccess = false;
    //   state.isDeleted = false;
    //   state.errorMessage = payload;
    // },
  },
});

export default adminstativeLabelSlice.reducer;
