import "./expenses-summary.styles.scss"
import { useContext } from "react"
import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"

const ExpensesSummary = () => {
  const { expensesView, filterConditions, expensesSummary } = useContext(ExpensesContext)

  const filteredSpend = expensesView.reduce((spend, { expenseCost }) => {
    return spend + expenseCost
  }, 0)

  return (
    <div className="expenses-summary-container">
      <h3>{ `Total spend: ${expensesSummary.currentAllExpensesCost}` }</h3>
      <h3>{ `Filtered spend: ${filteredSpend}` }</h3>
      <h3>{ `Filterd dates: ${filterConditions !== null && filterConditions.expensesStartDate !== '' ? filterConditions.expensesStartDate : ''} 
        - ${filterConditions !== null && filterConditions.expensesEndDate !== '' ? filterConditions.expensesEndDate : 'Today'}` }</h3>
      <h3>{ `All categories: ${expensesSummary.currentAllExpensesCategories ? expensesSummary.currentAllExpensesCategories : ''}` }</h3>
    </div>
  )
}

export default ExpensesSummary