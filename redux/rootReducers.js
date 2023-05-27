import { combineReducers } from "redux";
import { user } from "./Reducers/userReducer";
import { alert } from "./Reducers/alertReducer";
import { sidebar } from "./Reducers/sidebarReducer";
import { industryCategory } from "./Reducers/industryCategoryReducer";
import { industrySector } from "./Reducers/industrySectorReducer";
import { question } from "./Reducers/questionReducer";
import { state } from "./Reducers/stateManagementReducer";
import { district } from "./Reducers/districtManagementReducer";
import { taluka } from "./Reducers/talukaManagementReducer";
import { adminstative } from "./Reducers/adminstativeReducer";

import { userConstants } from "./Constants/userConstants";

const MainReducer = combineReducers({
  user,
  adminstative,
  alert,
  sidebar,
  industryCategory,
  industrySector,
  question,
  state,
  district,
  taluka,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOG_OUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
