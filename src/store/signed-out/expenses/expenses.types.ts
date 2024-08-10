export enum EXPENSES_ACTION_TYPES {
  SET_EXPENSES = "expenses/SET_EXPENSES",
  SET_EXPENSES_TAG_LIMIT = "expenses/SET_EXPENSES_TAG_LIMIT",
  SET_FILTER_CONDITIONS = "expenses/SET_FILTER_CONDITIONS",

  SET_SELECTED_EXPENSES_DATE = "expenses/SET_SELECTED_EXPENSES_DATE",
  SET_SCHEDULED_EXPENSES_VIEW = "expenses/SET_SCHEDULED_EXPENSES_VIEW",

  SET_EXPENSES_VIEW = "expenses/SET_EXPENSES_VIEW",
  SET_EXPENSES_SUMMARY = "expenses/SET_EXPENSES_SUMMARY"
}

export type Expense = {
  expenseFor: string;
  expenseCost: number;
  expenseDate: string;
  expenseCategory: string;
  expenseId: number;
}

export type FilterConditions = {
  expenseFor: string;
  expenseCategory: string;
  expensesStartDate: string;
  expensesEndDate: string;
}

export type ExpensesSummary = {
  currentAllExpensesCost?: number;
  currentAllExpensesCategories?: string[];
  pastMonthAllExpensesCost?: number;
  pastMonthExpenses?: Expense[];
}