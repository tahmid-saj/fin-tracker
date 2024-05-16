import "./mortgage-calculator.styles.jsx"
import { MortgageCalculatorContainer, MortgageCalculatorForm } from "./mortgage-calculator.styles.jsx"

import { useState, useContext, Fragment } from "react"
import FormInput from "../../form-input/form-input.component"
import Button from "../../button/button.component"
import { DOWNPAYMENT_FLAG_OPTIONS } from "../../../../utils/constants/useful-tools.constants"
import MortgageCalculatorResult from "./mortgage-calculator-result.component"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"
import { Typography } from "@mui/material"
import { DropButton } from "../../drop-button/drop-button.styles.jsx"
import { ButtonsContainer } from "../../button/button.styles.jsx"

const defaultFormFields = {
  downpaymentFlag: "Yes",
  loanAmount: "",
  homeValue: "",
  downpayment: "",
  interestRate: "",
  durationYears: "",
  monthlyHoa: "",
  annualPropertyTax: "",
  annualHomeInsurance: ""
}

const MortgageCalculator = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { calculateMortgage, mortgageCalculatorResult } = useContext(UsefulToolsContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await calculateMortgage(formFields)
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <MortgageCalculatorContainer>
      <MortgageCalculatorForm onSubmit={ handleSubmit }>
        <Typography sx={{ paddingBottom: "2%" }} variant="h6">Estimate your mortgage</Typography>

        <Typography sx={{ display: "inline-block", position: "relative", marginRight: "2%" }} paragraph>Is there a downpayment?</Typography>
        <DropButton required name="downpaymentFlag" id="downpaymentFlag" 
                onChange={ handleChange } value={ formFields.downpaymentFlag }>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </DropButton>

        {
          formFields.downpaymentFlag === DOWNPAYMENT_FLAG_OPTIONS.no ?
          (
            <FormInput label="Loan amount" type="text" required onChange={ handleChange }
                    name="loanAmount" value={ formFields.loanAmount }/>
          )
          : (
            <Fragment>
              <FormInput label="Home value" type="text" required onChange={ handleChange }
                      name="homeValue" value={ formFields.homeValue }/>
              <FormInput label="Downpayment" type="text" required onChange={ handleChange }
                name="downpayment" value={ formFields.downpayment }/>
            </Fragment>
          )
        }

        <FormInput label="Interest rate" type="text" required onChange={ handleChange }
                    name="interestRate" value={ formFields.interestRate }/>
        <FormInput label="Duration in years" type="text" required onChange={ handleChange }
                    name="durationYears" value={ formFields.durationYears }/>
        
        <Typography paragraph>Optional:</Typography>
        <FormInput label="Monthly homeowner association fees " type="text" onChange={ handleChange }
            name="monthlyHoa" value={ formFields.monthlyHoa }/>
        <FormInput label="Annual property tax" type="text" onChange={ handleChange }
            name="annualPropertyTax" value={ formFields.annualPropertyTax }/>
        <FormInput label="Annual home insurance" type="text" onChange={ handleChange }
            name="annualHomeInsurance" value={ formFields.annualHomeInsurance }/>

        <ButtonsContainer>
          <Button type="submit">Calculate</Button>
          <Button type="button" onClick={ resetFormFields }>Clear</Button>
        </ButtonsContainer>
      </MortgageCalculatorForm>

      {
        mortgageCalculatorResult &&
        <MortgageCalculatorResult></MortgageCalculatorResult>
      }
    </MortgageCalculatorContainer>
  )
}

export default MortgageCalculator