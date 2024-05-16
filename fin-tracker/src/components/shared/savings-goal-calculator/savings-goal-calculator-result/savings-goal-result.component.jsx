import "./savings-goal-result.styles.jsx"
import { SavingsGoalInfo } from "./savings-goal-result.styles"

import { useContext } from "react"
import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context"
import { Typography } from "@mui/material"

const SavingsGoalResult = () => {
  const { savingsGoalResult } = useContext(SavingsGoalCalculatorContext)
  console.log(savingsGoalResult)

  return (
    <SavingsGoalInfo>
      <Typography variant="h6">{`Monthly deposit required: $${savingsGoalResult.monthlyDepositRequired.toFixed(2)}`}</Typography>
      <Typography paragraph>{`Or $${savingsGoalResult.dailyDepositRequired.toFixed(2)} a day`}</Typography>
      <Typography paragraph>{`Or $${savingsGoalResult.weeklyDepositRequired.toFixed(2)} a week`}</Typography>
    </SavingsGoalInfo>
  )
}

export default SavingsGoalResult