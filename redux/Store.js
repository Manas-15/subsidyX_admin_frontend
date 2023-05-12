import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import industryCategorySlice from "./Slices/industrySlice";
import industrySectorSlice from "./Slices/industrySectorSlice";

const persistedState = loadFromLocalStorage();
export const store = configureStore({
  reducer: {
    users: userSlice,
    industryCategory: industryCategorySlice,
    industrySector: industrySectorSlice,
  },
  persistedState,
});

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));
