import "./schedule-day-info.styles.scss"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants"
import { useSelector } from "react-redux"
import { selectScheduledExpensesView } from "../../../../../../store/signed-out/expenses/expenses.selector"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: 400,
}

const ScheduleDayInfo = () => {
  const scheduledExpensesView = useSelector(selectScheduledExpensesView)

  console.log(scheduledExpensesView)

  if (!scheduledExpensesView.length) return <Fragment/>

  return (
    <div className="expenses-schedule-day-info">
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
    </div>
  )
}

export default ScheduleDayInfo