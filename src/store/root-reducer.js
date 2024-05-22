import { combineReducers } from "redux";

import { userReducer } from "./shared/user/user.reducer";
import { bankingReducer } from "./signed-out/banking/banking.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  banking: bankingReducer
})