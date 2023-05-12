import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserList, createUserList } from "../Actions/userAction";

const initialState = {
  user: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
