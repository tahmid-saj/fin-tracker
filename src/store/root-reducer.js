import { combineReducers } from "redux";
import { userReducer } from "./shared/user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer
})