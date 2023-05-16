import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserList, createUserList } from "../Actions/userAction";

const initialState = {
  selectedItem: "Industry Category",
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    selectedCategory: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});
export const { selectedCategory } = sidebarSlice.actions;
export default sidebarSlice.reducer;
