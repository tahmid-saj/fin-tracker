import "./expenses-summary-info.styles.scss"
import { useContext } from "react"
import { ExpensesContext } from "../../../../../contexts/signed-in/expenses/expenses.context"
import { Typography } from "@mui/material"

const ExpensesSummaryInfo = () => {
  const { expensesSummary } = useContext(ExpensesContext)

  return (
    <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} 
      variant="h6">{ `Total spending past month - $${expensesSummary.pastMonthAllExpensesCost}` }</Typography>
  )
}

export default ExpensesSummaryInfo