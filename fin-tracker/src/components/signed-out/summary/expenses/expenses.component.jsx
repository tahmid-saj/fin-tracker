import "./expenses.styles.scss"
import ExpensesSummaryInfo from "./expenses-summary-info/expenses-summary-info.component"
import ExpensesSummaryGraph from "./expenses-summary-graph/expenses-summary-graph.component"

const ExpensesSummary = () => {
  return (
    <div className="expenses-summary-dashboard-container">
      <h1>Expenses</h1>
      <div className="expenses-summary-info-graph-container">
        <ExpensesSummaryInfo></ExpensesSummaryInfo>
        <ExpensesSummaryGraph></ExpensesSummaryGraph>
      </div>
    </div>
  )
}

export default ExpensesSummary