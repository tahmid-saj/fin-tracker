import "./expenses-summary-info.styles.scss"
import { useContext } from "react"
// import { ExpensesContext } from "../../../../../contexts/signed-out/expenses/expenses.context"
import { useSelector } from "react-redux"
import { selectExpensesSummary } from "../../../../../store/signed-out/expenses/expenses.selector"
import { Typography } from "@mui/material"

const ExpensesSummaryInfo = () => {
  // const { expensesSummary } = useContext(ExpensesContext)
  const expensesSummary = useSelector(selectExpensesSummary)

  return (
    <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} 
      variant="h6">{ `Total spending past month - $${expensesSummary.pastMonthAllExpensesCost}` }</Typography>
  )
}

export default ExpensesSummaryInfo