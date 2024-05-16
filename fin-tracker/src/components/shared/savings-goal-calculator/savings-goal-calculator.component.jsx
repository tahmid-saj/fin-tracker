import "./savings-goal-calculator.styles.jsx"
import { DropButton } from "../drop-button/drop-button.styles.jsx"
import { ButtonsContainer } from "../button/button.styles.jsx"
import { SavingsGoalCalculatorContainer, SavingsGoalCalculatorForm,
  SavingsGoalResultContainer, SavingsGoalGraphContainer, SavingsGoalTableContainer
} from "./savings-goal-calculator.styles.jsx"

import { Fragment, useState, useContext } from "react"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import SavingsGoalResult from "./savings-goal-calculator-result/savings-goal-result.component"
import { SavingsGoalCalculatorContext } from "../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context"
import SavingsGoalGraph from "./savings-goal-calculator-result/savings-goal-graph.component"
import SavingsGoalTable from "./savings-goal-calculator-result/savings-goal-table.component"
import { SAVINGS_GOAL_COMPOUNDED } from "../../../utils/constants/savings.constants"
import { Divider, Typography } from "@mui/material"

const defaultFormFields = {
  savingsGoal: "",
  yearsToReachGoal: "",
  interestRatePerYear: "",
  compounded: SAVINGS_GOAL_COMPOUNDED.daily,
  amountFirstDeposit: "",
  dateFirstDeposit: ""
}

const SavingsGoalCalculator = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { savingsGoalResult, savingsGoalScheduleResult, 
    calculateSavingsGoal } = useContext(SavingsGoalCalculatorContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    calculateSavingsGoal(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <Fragment>
      <SavingsGoalCalculatorContainer>
        <SavingsGoalCalculatorForm onSubmit={ handleSubmit }>
          <Typography variant="h6" sx={{ paddingBottom: "2%" }}>Calculate a savings goal</Typography>

          <FormInput label="Savings goal" type="text" required onChange={ handleChange }
                      name="savingsGoal" value={ formFields.savingsGoal }/>
          <FormInput label="Years to reach goal" type="text" required onChange={ handleChange }
                      name="yearsToReachGoal" value={ formFields.yearsToReachGoal }/>
          <FormInput label="Interest rate per year" type="text" required onChange={ handleChange }
                      name="interestRatePerYear" value={ formFields.interestRatePerYear }/>

          <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Compounded</Typography>
          <DropButton required name="compounded" id="compounded" 
                  onChange={ handleChange } value={ formFields.compounded }>
            <option value={ SAVINGS_GOAL_COMPOUNDED.daily }>Daily</option>
            <option value={ SAVINGS_GOAL_COMPOUNDED.monthly }>Monthly</option>
          </DropButton>

          <FormInput label="Amount of first deposit" type="text" required onChange={ handleChange }
                      name="amountFirstDeposit" value={ formFields.amountFirstDeposit }/>

          <Typography sx={{ marginTop: "2%" }} variant="subtitle2">Date of first deposit</Typography>
          <FormInput type="date" onChange={ (e) => handleChange(e) } required
                      name="dateFirstDeposit" value={ formFields.dateFirstDeposit }></FormInput>
          
          <ButtonsContainer>
            <Button type="submit">Calculate</Button>
            <Button type="button" onClick={ resetFormFields }>Clear</Button>
          </ButtonsContainer>
        </SavingsGoalCalculatorForm>
      </SavingsGoalCalculatorContainer>

      <Divider/>

      <SavingsGoalResultContainer>
        {
          savingsGoalResult !== undefined &&
          <SavingsGoalResult></SavingsGoalResult>
        }
      </SavingsGoalResultContainer>

      <SavingsGoalGraphContainer>
        {
          savingsGoalScheduleResult !== undefined &&
            <SavingsGoalGraph></SavingsGoalGraph>
        }
      </SavingsGoalGraphContainer>
      

      <SavingsGoalTableContainer>
        {
          savingsGoalScheduleResult !== undefined &&
          <SavingsGoalTable></SavingsGoalTable>
        }
      </SavingsGoalTableContainer>
    </Fragment>
  )
}

export default SavingsGoalCalculator