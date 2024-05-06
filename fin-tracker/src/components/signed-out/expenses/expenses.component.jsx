import AddExpense from "./add-expense/add-expense.component"
import ExpensesFilter from "./expenses-filter/expense-filter.component"
import ExpensesGraph from "./expenses-graph/expenses-graph.component"
import ExpensesTable from "./expenses-table/expenses-table.component"
import ExpensesSummary from "./expenses-summary/expenses-summary.component"
import "./expenses.styles.scss"
import { useContext, Fragment } from "react"
import { ExpensesContext } from "../../../contexts/signed-out/expenses/expenses.context"

const Expenses = () => {
  const { expenses, expensesView } = useContext(ExpensesContext)

  return (
    <div className="expenses-container">
      <div className="expenses-add-filter-container">
        <AddExpense></AddExpense>
        <ExpensesFilter></ExpensesFilter>
      </div>

      {
        expenses.length ?
        <div className="expenses-info">
          <h1>Summary</h1>
          <ExpensesSummary></ExpensesSummary>

          {
            expensesView.length ?
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