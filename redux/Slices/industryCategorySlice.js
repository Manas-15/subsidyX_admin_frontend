import { createSlice } from "@reduxjs/toolkit";
import {
  createIndustryCategory,
  deleteIndustryCategory,
  editIndustryCategory,
  getIndustryCategoryLists,
} from "../Actions/industryCategoryAction";

const initialState = {
  industryCategoryData: [],
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  isSuccess: false,
  successMessage: "",
  errorMessage: "",
};

const industryCategorySlice = createSlice({
  name: "industryCategory",
  initialState,
  extraReducers: {
    [getIndustryCategoryLists.pending]: (state) => {
      state.isSuccess = false;
    },
    [getIndustryCategoryLists.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.industryCategoryData = payload;
    },
    [getIndustryCategoryLists.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createIndustryCategory.pending]: (state) => {
      state.isSuccess = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    [createIndustryCategory.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isCreated = true;
      state.successMessage = "Industry category created";
    },
    [createIndustryCategory.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isCreated = false;
      state.successMessage = "";
      state.errorMessage = payload;
    },

    [editIndustryCategory.pending]: (state) => {
      state.isSuccess = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    [editIndustryCategory.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isUpdated = true;
      state.successMessage = "Industry category updated";
    },
    [editIndustryCategory.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = payload;
    },

    [deleteIndustryCategory.pending]: (state) => {
      state.isSuccess = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    [deleteIndustryCategory.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isDeleted = true;
      state.successMessage = "Industry category deleted";
    },
    [deleteIndustryCategory.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isDeleted = false;
      state.errorMessage = payload;
    },
  },
});

export default industryCategorySlice.reducer;
