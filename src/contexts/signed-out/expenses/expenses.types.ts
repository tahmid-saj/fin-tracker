import { ReactNode } from "react";

// expenses types

export interface ExpensesContextType {
  expenses: Expense[];
  expenseLength: number;
  filterConditions: FilterConditions | null;
  selectedExpensesDate: string | null;
  expensesView: Expense[] | null;
  scheduledExpensesView: Expense[] | null;

  addExpense: (expense: Expense) => void;
  filterExpenses: (filterConditions: FilterConditions) => void;
  removeExpense: (expenseId: number) => void;
  selectScheduledExpenses: (expenseDate: string) => void;
  
  expensesSummary: ExpensesSummary;
}

export interface ExpensesProviderProps {
  children: ReactNode
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