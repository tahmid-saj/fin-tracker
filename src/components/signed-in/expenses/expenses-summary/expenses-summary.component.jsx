import "./expenses-summary.styles.jsx"
import { ExpensesSummaryInfoContainer } from "./expenses-summary.styles.jsx"
import { useContext } from "react"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context"
import { Typography } from "@mui/material"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const ExpensesSummary = () => {
  const { expensesView, expensesSummary } = useContext(ExpensesContext)

  const allExpensesCategories = new Set()
  const _ = expensesView.reduce((spend, expense) => {
    allExpensesCategories.add(expense.expenseCategory)
    return spend + expense.expenseCost
  }, 0)

  return (
    <ExpensesSummaryInfoContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{ `Total spend: $${expensesSummary.currentAllExpensesCost}` }</Typography>
        {/* <Typography variant="h6">{ `Filtered spend: ${filteredSpend}` }</Typography>
        <Typography variant="h6">{ `Filterd dates: ${filterConditions !== null && filterConditions.expensesStartDate !== '' ? filterConditions.expensesStartDate : ''} 
          - ${filterConditions !== null && filterConditions.expensesEndDate !== '' ? filterConditions.expensesEndDate : 'Today'}` }</Typography> */}
        <Typography variant="body2">{ `All categories: ${expensesSummary.currentAllExpensesCategories ? [ ...allExpensesCategories.keys() ] : ''}` }</Typography>
      </SimplePaper>
    </ExpensesSummaryInfoContainer>
  )
}

export default ExpensesSummary