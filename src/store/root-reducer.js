import { combineReducers } from "redux";

import { userReducer } from "./shared/user/user.reducer";
import { bankingReducer } from "./signed-out/banking/banking.reducer";
import { expensesReducer } from "./signed-out/expenses/expenses.reducer";
import { investmentsReducer } from "./signed-out/investments/investments.reducer";
import { savingsReducer } from "./signed-out/savings/savings.reducer";
import { savingsGoalCalculatorReducer } from "./shared/savings-goal-calculator/savings-goal-calculator.reducer";
import { dashboardReducer } from "./signed-out/dashboard/dashboard.reducer";
import { bankingReducerSignedIn } from "./signed-in/banking/banking.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  savingsGoalCalculator: savingsGoalCalculatorReducer,

  bankingSignedIn: bankingReducerSignedIn,

  dashboard: dashboardReducer,
  expenses: expensesReducer,
  banking: bankingReducer,
  investments: investmentsReducer,
  savings: savingsReducer,
})