import AddExpense from "./add-expense/add-expense.component"
import ExpensesFilter from "./expenses-filter/expense-filter.component"
import ExpensesGraph from "./expenses-graph/expenses-graph.component"
import ExpensesTable from "./expenses-table/expenses-table.component"
import ExpensesSummary from "./expenses-summary/expenses-summary.component"
import "./expenses.styles.scss"
import { useEffect, Fragment } from "react"
// import { ExpensesContext } from "../../../contexts/signed-out/expenses/expenses.context"

import { useDispatch, useSelector } from "react-redux"
import { selectExpenses, selectExpensesView, 
  selectExpensesTagLimit, selectFilterConditions
} from "../../../store/signed-out/expenses/expenses.selector"
import { setExpensesSummary, setExpensesTagLimit, setExpensesView, 
  filterExpensesHelper 
} from "../../../store/signed-out/expenses/expenses.action"

const Expenses = () => {
  // const { expenses, expensesView } = useContext(ExpensesContext)
  const expenses = useSelector(selectExpenses)
  const expensesView = useSelector(selectExpensesView)
  const expensesTagLimit = useSelector(selectExpensesTagLimit)
  const filterConditions = useSelector(selectFilterConditions)
  const dispatch = useDispatch()

  // update expensesSummary
  useEffect(() => {
    if (expenses && expenses.length) {
      // let newAllExpensesCategories = []
      // const newAllExpensesCost = expenses.reduce((allExpensesCost, { expenseCost, expenseCategory }) => {
      //   newAllExpensesCategories.push(expenseCategory)
      //   return allExpensesCost + expenseCost
      // }, 0)
      
      // setExpensesSummary({
      //   currentAllExpensesCost: newAllExpensesCost,
      //   currentAllExpensesCategories: newAllExpensesCategories
      // })
      
      Date.prototype.subtractDays = function (d) {
        this.setDate(this.getDate() - d);
        return this;
      }
      let past30Days = new Date()
      let today = new Date()
      past30Days.subtractDays(30)
      console.log(past30Days)
  
      let newAllExpensesCategories = []
      let newPastMonthExpenses = []
      let newPast30DaysAllExpensesCost = 0
  
      const newAllExpensesCost = expenses.reduce((allExpensesCost, expense) => {
        newAllExpensesCategories.push(expense.expenseCategory)
        if (Date.parse(expense.expenseDate) >= past30Days && Date.parse(expense.expenseDate) <= today) {
          newPast30DaysAllExpensesCost += expense.expenseCost
          newPastMonthExpenses.push(expense)
        }
  
        return allExpensesCost + expense.expenseCost
      }, 0)
      
      dispatch(setExpensesSummary({
        currentAllExpensesCost: newAllExpensesCost,
        currentAllExpensesCategories: newAllExpensesCategories,
        pastMonthAllExpensesCost: newPast30DaysAllExpensesCost,
        pastMonthExpenses: newPastMonthExpenses
      }))
  
      dispatch(setExpensesTagLimit(expensesTagLimit + 1))
    }
  }, [expenses, dispatch])

  // update expensesView when expenses change
  useEffect(() => {
    if (filterConditions) {
      dispatch(setExpensesView(filterExpensesHelper(expenses, filterConditions)))
    } else {
      dispatch(setExpensesView(expenses))
    }
  }, [expenses, filterConditions, dispatch])

  return (
    <div className="expenses-container">
      <div className="expenses-add-filter-container">
        <AddExpense></AddExpense>
        <ExpensesFilter></ExpensesFilter>
      </div>

      {
        expenses && expenses.length ?
        <div className="expenses-info">
          <h1>Summary</h1>
          <ExpensesSummary></ExpensesSummary>

          {
            expensesView && expensesView.length ?
              <Fragment>
                <ExpensesGraph></ExpensesGraph>
                <ExpensesTable></ExpensesTable>
              </Fragment> : null
          }
        </div> : null
      }

    </div>
  )
}

export default Expenses