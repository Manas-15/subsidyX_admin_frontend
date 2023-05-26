import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import industryCategorySlice from "./Slices/industryCategorySlice";
import industrySectorSlice from "./Slices/industrySectorSlice";
import stateManagementSlice from "./Slices/stateManagementSlice";
import districtManagementSlice from "./Slices/districtManagementSlice";
import sidebarSlice from "./Slices/sidebarSlice";
import talukaManagementSlice from "./Slices/talukaManagementSlice";
import adminstativeLabelSlice from "./Slices/adminstativeSlice";
import questionsSlice from "./Slices/questionsSlice";

const persistedState = loadFromLocalStorage();
export const store = configureStore({
  reducer: {
    users: userSlice,
    sidebar: sidebarSlice,
    adminstativeLabel: adminstativeLabelSlice,
    industryCategory: industryCategorySlice,
    industrySector: industrySectorSlice,
    questions: questionsSlice,
    stateManagement: stateManagementSlice,
    districtManagement: districtManagementSlice,
    talukaManagement: talukaManagementSlice,
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
