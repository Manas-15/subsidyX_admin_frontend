import { createSlice } from "@reduxjs/toolkit";
import {
  getIndustrySectorLists,
  createIndustrySector,
  deleteIndustrySector,
} from "../Actions/industrySectorAction";

const initialState = {
  industrySectorData: [],
  isCreated: false,
  isDeleted: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const industrySectorSlice = createSlice({
  name: "industrySector",
  initialState,
  extraReducers: {
    [getIndustrySectorLists.pending]: (state) => {
      state.isLoading = true;
    },
    [getIndustrySectorLists.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.industrySectorData = payload;
    },
    [getIndustrySectorLists.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },

    [createIndustrySector.pending]: (state) => {
      state.isLoading = true;
      state.isCreated = false;
    },
    [createIndustrySector.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isCreated = true;
    },
    [createIndustrySector.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isCreated = false;
      state.errorMessage = payload;
    },
    [deleteIndustrySector.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteIndustrySector.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDeleted = true;
    },
    [deleteIndustrySector.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isDeleted = false;
      state.errorMessage = payload;
    },
  },
});

export default industrySectorSlice.reducer;
