import "./schedule-day-info.styles.tsx"
import { ExpensesScheduleDayInfo } from "./schedule-day-info.styles.tsx"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import { ExpensesContext } from "../../../../../contexts/signed-in/expenses/expenses.context.tsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.calendarDayInfo.width
}

const ScheduleDayInfo = () => {
  const { scheduledExpensesView } = useContext(ExpensesContext)

  if (!scheduledExpensesView?.length) return <Fragment/>

  return (
    <ExpensesScheduleDayInfo>
    {
      scheduledExpensesView.map((expense) => {
        return (
          <SimplePaper styles={ paperStyles }>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${expense.expenseFor}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`${expense.expenseDate}`}</Typography>
                
            <br/>
            <Divider/>
            <br />
                
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Cost: $${expense.expenseCost}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Category: ${expense.expenseCategory}`}</Typography>
          </SimplePaper>
        )
      })
    }
    </ExpensesScheduleDayInfo>
  )
}

export default ScheduleDayInfo