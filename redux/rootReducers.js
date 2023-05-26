import { combineReducers } from "redux";
import { user } from "./Reducers/userReducer";
import { alert } from "./Reducers/alertReducer";
import { sidebar } from "./Reducers/sidebarReducer";
import { industryCategory } from "./Reducers/industryCategoryReducer";
import { question } from "./Reducers/questionReducer";

import { userConstants } from "./Constants/userConstants";

const MainReducer = combineReducers({
  user,
  alert,
  sidebar,
  industryCategory,
  question,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOG_OUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
