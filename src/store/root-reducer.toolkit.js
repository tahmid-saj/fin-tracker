import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./shared/user/user.reducer.toolkit";
import { bankingReducer } from "./signed-out/banking/banking.reducer.toolkit";
import { expensesReducer } from "./signed-out/expenses/expenses.reducer.toolkit";
import { investmentsReducer } from "./signed-out/investments/investments.reducer.toolkit";
import { savingsReducer } from "./signed-out/savings/savings.reducer.toolkit";
import { savingsGoalCalculatorReducer } from "./shared/savings-goal-calculator/savings-goal-calculator.reducer.toolkit";
import { dashboardReducer } from "./signed-out/dashboard/dashboard.reducer.toolkit";

export const rootReducer = combineReducers({
  user: userReducer,
  savingsGoalCalculator: savingsGoalCalculatorReducer,

  dashboard: dashboardReducer,
  banking: bankingReducer,
  expenses: expensesReducer,
  investments: investmentsReducer,
  savings: savingsReducer
})