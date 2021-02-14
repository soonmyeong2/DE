import { combineReducers } from "redux";
import route from "./route";
import info from "./info";
const rootReducer = combineReducers({ route, info });

export default rootReducer;
