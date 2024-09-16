// expenses types
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