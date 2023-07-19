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
import { subsidy } from "./Reducers/subsidyManagementReducer";
import { report } from "./Reducers/reportManagementReducers";
import { userConstants } from "./Constants/userConstants";
import { client } from "./Reducers/clientManagementReducer"
import { trustedPartners } from "./Reducers/trustedPartnersReducer";
import { channelPartners } from "./Reducers/channelPartnersReducer";
import { memberships } from "./Reducers/membershipReducer";
import { employees } from "./Reducers/employeeReducer";
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
  subsidy,
  report,
  client,
  trustedPartners,
  channelPartners,
  memberships,
  employees,
});

const rootReducer = (state, action) => {
  if (action.type === userConstants.LOGOUT) {
    state = undefined;
  }
  return MainReducer(state, action);
};

export default rootReducer;
