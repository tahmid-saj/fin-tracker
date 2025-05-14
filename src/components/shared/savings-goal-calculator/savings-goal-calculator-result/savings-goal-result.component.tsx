import "./savings-goal-result.styles.tsx"
import { SavingsGoalInfo } from "./savings-goal-result.styles.tsx"

import { useContext } from "react"
// import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context"
import { useSelector } from "react-redux"
import { selectSavingsGoalResult } from "../../../../store/shared/savings-goal-calculator/savings-goal-calculator.selector.ts"
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../mui/paper/paper.component.tsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"]
}

const SavingsGoalResult = () => {
  // const { savingsGoalResult } = useContext(SavingsGoalCalculatorContext)
  const savingsGoalResult = useSelector(selectSavingsGoalResult)

  return (
    <SavingsGoalInfo>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="h6">{`Monthly deposit required: $${savingsGoalResult?.monthlyDepositRequired?.toFixed(2)}`}</Typography>
        <Typography paragraph>{`Or $${savingsGoalResult?.dailyDepositRequired?.toFixed(2)} a day`}</Typography>
        <Typography paragraph>{`Or $${savingsGoalResult?.weeklyDepositRequired?.toFixed(2)} a week`}</Typography>
      </SimplePaper>
    </SavingsGoalInfo>
  )
}

export default SavingsGoalResult