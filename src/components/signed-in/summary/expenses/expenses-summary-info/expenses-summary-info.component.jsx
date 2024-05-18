import "./expenses-summary-info.styles.scss"
import { useContext } from "react"
import { ExpensesContext } from "../../../../../contexts/signed-in/expenses/expenses.context"

const ExpensesSummaryInfo = () => {
  const { expensesSummary } = useContext(ExpensesContext)

  return (
    <div className="expenses-summary-info-container">
      <h3>{ `Total spend past month - ${expensesSummary.pastMonthAllExpensesCost}` }</h3>
    </div>
  )
}

export default ExpensesSummaryInfo