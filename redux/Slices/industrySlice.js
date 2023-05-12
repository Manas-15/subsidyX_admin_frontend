import { createSlice } from "@reduxjs/toolkit";
import {
  getIndustryLists,
  createIndustryCategory,
  deleteIndustryCategory,
} from "../Actions/industryCategoryAction";

const initialState = {
  industryCategoryData: [],
  isCreated: false,
  isDeleted: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const industryCategorySlice = createSlice({
  name: "industryCategory",
  initialState,
  extraReducers: {
    [getIndustryLists.pending]: (state) => {
      state.isLoading = true;
    },
    [getIndustryLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.industryCategoryData = payload;
    },
    [getIndustryLists.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createIndustryCategory.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createIndustryCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createIndustryCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },
    [deleteIndustryCategory.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteIndustryCategory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleted = true;
    },
    [deleteIndustryCategory.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDeleted = false;
      state.errorMessage = payload;
    },
  },
});

export default industryCategorySlice.reducer;
