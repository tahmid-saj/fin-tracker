import "./expenses.styles.scss"
import ExpensesSummaryInfo from "./expenses-summary-info/expenses-summary-info.component"
import ExpensesSummaryGraph from "./expenses-summary-graph/expenses-summary-graph.component"
import { Divider } from "@mui/material"
import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component"

import { useSelector } from "react-redux"
import { selectSelectedExpensesDate, selectScheduledExpensesView } from "../../../../store/signed-out/expenses/expenses.selector"

const ExpensesSummary = () => {
  const selectedExpensesDate = useSelector(selectSelectedExpensesDate)
  const scheduledExpensesView = useSelector(selectScheduledExpensesView)

  return (
    <div className="expenses-summary-dashboard-container">
      <h1>Expenses</h1>
        <ScheduleCalendar></ScheduleCalendar>
        {
          selectedExpensesDate && scheduledExpensesView ?
          <ScheduleDayInfo></ScheduleDayInfo> : null
        }

        <br/>
        <Divider/>
        <br/>
        
        <div className="expenses-summary-info-graph-container">

          <ExpensesSummaryInfo></ExpensesSummaryInfo>
          <ExpensesSummaryGraph></ExpensesSummaryGraph>
        </div>
    </div>
  )
}

export default ExpensesSummary