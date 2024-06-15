import "./expenses-summary-info.styles.scss"
import { useContext } from "react"
// import { ExpensesContext } from "../../../../../contexts/signed-out/expenses/expenses.context"
import { useSelector } from "react-redux"
import { selectExpensesSummary } from "../../../../../store/signed-out/expenses/expenses.selector"

const ExpensesSummaryInfo = () => {
  // const { expensesSummary } = useContext(ExpensesContext)
  const expensesSummary = useSelector(selectExpensesSummary)

  return (
    <div className="expenses-summary-info-container">
      <h3>{ `Total spend past month - $${expensesSummary.pastMonthAllExpensesCost}` }</h3>
    </div>
  )
}

export default ExpensesSummaryInfo