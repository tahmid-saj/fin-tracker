import AddExpense from "./add-expense/add-expense.component"
import ExpensesFilter from "./expenses-filter/expense-filter.component"
import ExpensesGraph from "./expenses-graph/expenses-graph.component"
import ExpensesTable from "./expenses-table/expenses-table.component"
import "./expenses.styles.scss"

const Expenses = () => {
  return (
    <div className="expenses-container">
      <div className="expenses-add-filter-container">
        <AddExpense></AddExpense>
        <ExpensesFilter></ExpensesFilter>
      </div>

      <div className="expenses-info">
        <h1>Summary</h1>
        <ExpensesGraph></ExpensesGraph>
        <ExpensesTable></ExpensesTable>
      </div>
    </div>
  )
}

export default Expenses