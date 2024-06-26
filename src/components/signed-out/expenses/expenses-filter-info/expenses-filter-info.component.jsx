import { Fragment } from "react"
import "./expenses-filter-info.styles.jsx"
import { ExpensesFilterInfoContainer } from "./expenses-filter-info.styles.jsx"

import { Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { selectExpensesView, selectFilterConditions } from "../../../../store/signed-out/expenses/expenses.selector"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  margin: "0% 2% 2% 2%",
  width: "auto",
  display: "flex",
  justifyContent: "center",
  alighItems: "center"
}

export const ExpensesFilterInfo = () => {
  const expensesView = useSelector(selectExpensesView)
  const filterConditions = useSelector(selectFilterConditions)

  const allExpensesCategories = new Set()
  const filteredSpend = expensesView.reduce((spend, expense) => {
    return spend + expense.expenseCost
  }, 0)

  return (
    <SimplePaper styles={ paperStyles }>
      <ExpensesFilterInfoContainer>
        <Typography variant="h6">{ `Filtered spend: $${filteredSpend.toFixed(2)}` }</Typography>
        <Typography variant="body1">{ `Filtered dates: ${filterConditions !== null && filterConditions.expensesStartDate !== '' ? filterConditions.expensesStartDate : ''} 
          - ${filterConditions !== null && filterConditions.expensesEndDate !== '' ? filterConditions.expensesEndDate : 'Today'}` }</Typography>
      </ExpensesFilterInfoContainer>
    </SimplePaper>
  )
}