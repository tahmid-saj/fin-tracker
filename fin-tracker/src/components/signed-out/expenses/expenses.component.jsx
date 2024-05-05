import AddExpense from "./add-expense/add-expense.component"
import ExpensesFilter from "./expenses-filter/expense-filter.component"
import "./expenses.styles.scss"

const Expenses = () => {
  return (
    <div className="expenses-container">
      <div className="expenses-add-filter-container">
        <AddExpense></AddExpense>
        <ExpensesFilter></ExpensesFilter>
      </div>
      <div className="expenses-info">
        
      </div>
    </div>
  )
}

export default Expenses