import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import industryCategorySlice from "./Slices/industrySlice";
import industrySectorSlice from "./Slices/industrySectorSlice";
import stateManagementSlice from "./Slices/stateManagementSlice";
import districtManagementSlice from "./Slices/districtManagementSlice";
import sidebarSlice from "./Slices/sidebarSlice";

const persistedState = loadFromLocalStorage();
export const store = configureStore({
  reducer: {
    users: userSlice,
    sidebar: sidebarSlice,
    industryCategory: industryCategorySlice,
    industrySector: industrySectorSlice,
    stateManagement: stateManagementSlice,
    districtManagement: districtManagementSlice,
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
