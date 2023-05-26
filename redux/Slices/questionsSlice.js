import { createSlice } from "@reduxjs/toolkit";
import { createQuestion, getQuestionLists } from "../Actions/questionsAction";

const initialState = {
  questionData: [],
  isUpdated: false,
  isDeleted: false,
  isSuccess: false,
  successMessage: "",
  errorMessage: "",
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  extraReducers: {
    [getQuestionLists.pending]: (state) => {
      state.isSuccess = false;
    },
    [getQuestionLists.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.questionData = payload;
    },
    [getQuestionLists.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    [createQuestion.pending]: (state) => {
      state.isSuccess = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    [createQuestion.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isUpdated = true;
      state.successMessage = "Question created successfully";
    },
    [createQuestion.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isUpdated = false;
      state.successMessage = "";
      state.errorMessage = payload;
    },

    // [editAdminstativeLable.pending]: (state) => {
    //   state.isSuccess = false;
    //   state.isDeleted = false;
    //   state.isUpdated = false;
    //   state.successMessage = "";
    //   state.errorMessage = "";
    // },
    // [editAdminstativeLable.fulfilled]: (state, { payload }) => {
    //   state.isSuccess = true;
    //   state.isUpdated = true;
    //   state.successMessage = "Adminstative label updated";
    // },
    // [editAdminstativeLable.rejected]: (state, { payload }) => {
    //   state.isSuccess = false;
    //   state.isUpdated = false;
    //   state.successMessage = "";
    //   state.errorMessage = payload;
    // },

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

export default questionsSlice.reducer;
