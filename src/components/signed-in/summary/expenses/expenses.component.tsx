import "./expenses.styles.tsx"
import { ExpensesSummaryDashboardContainer,
  ExpensesSummaryInfoGraphContainer
} from "./expenses.styles.tsx"

import { Fragment, useContext } from "react"
import ExpensesSummaryInfo from "./expenses-summary-info/expenses-summary-info.component.tsx"
import ExpensesSummaryGraph from "./expenses-summary-graph/expenses-summary-graph.component.tsx"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.tsx"
import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component.tsx"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component.tsx"
import { Divider } from "@mui/material"

import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const ExpensesSummary = () => {
  const { scheduledExpensesView, selectedExpensesDate } = useContext(ExpensesContext)

  return (
    <ExpensesSummaryDashboardContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
        scheduledExpensesView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>
      <Divider/>
      <br/>
      
      <ExpensesSummaryInfoGraphContainer>
        <SimplePaper styles={ paperStyles }>
          <ExpensesSummaryInfo></ExpensesSummaryInfo>
          <ExpensesSummaryGraph></ExpensesSummaryGraph>
        </SimplePaper>
      </ExpensesSummaryInfoGraphContainer>
    </ExpensesSummaryDashboardContainer>
  )
}

export default ExpensesSummary