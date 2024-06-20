import "./expenses.styles.scss"
import { Fragment, useContext } from "react"
import ExpensesSummaryInfo from "./expenses-summary-info/expenses-summary-info.component"
import ExpensesSummaryGraph from "./expenses-summary-graph/expenses-summary-graph.component"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context"
import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component"

const ExpensesSummary = () => {
  const { scheduledExpensesView } = useContext(ExpensesContext)

  return (
    <div className="expenses-summary-dashboard-container">
      <h1>Expenses</h1>
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledExpensesView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }
      <div className="expenses-summary-info-graph-container">
        <ExpensesSummaryInfo></ExpensesSummaryInfo>
        <ExpensesSummaryGraph></ExpensesSummaryGraph>
      </div>
    </div>
  )
}

export default ExpensesSummary