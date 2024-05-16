import "./mortgage-calculator-result.styles.jsx"
import { MortgageCalculatorResultContainer, MortgageResult } from "./mortgage-calculator-result.styles.jsx"

import { Fragment, useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"
import { Typography } from "@mui/material"

const MortgageCalculatorResult = () => {
  const { mortgageCalculatorResult } = useContext(UsefulToolsContext)

  return (
    <MortgageCalculatorResultContainer>
      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Monthly payment`}</Typography>
        <Typography paragraph>{`Total: $${mortgageCalculatorResult.monthlyPayment.total}`}</Typography>
        <Typography paragraph>{`Mortgage: $${mortgageCalculatorResult.monthlyPayment.mortgage}`}</Typography>
        <Typography paragraph>{`Property tax: $${mortgageCalculatorResult.monthlyPayment.propertyTax}`}</Typography>
        <Typography paragraph>{`Homeowner association fees: $${mortgageCalculatorResult.monthlyPayment.hoa}`}</Typography>
        <Typography paragraph>{`Annual home insurance: $${mortgageCalculatorResult.monthlyPayment.annualHomeInsurance}`}</Typography>
      </MortgageResult>

      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Annual payment`}</Typography>
        <Typography paragraph>{`Total: $${mortgageCalculatorResult.annualPayment.total}`}</Typography>
        <Typography paragraph>{`Mortgage: $${mortgageCalculatorResult.annualPayment.mortgage}`}</Typography>
        <Typography paragraph>{`Property tax: $${mortgageCalculatorResult.annualPayment.propertyTax}`}</Typography>
        <Typography paragraph>{`Homeowner association fees: $${mortgageCalculatorResult.annualPayment.hoa}`}</Typography>
        <Typography paragraph>{`Home insurance: $${mortgageCalculatorResult.annualPayment.homeInsurance}`}</Typography>
      </MortgageResult>

      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Total interest paid`}</Typography>
        <Typography paragraph>{`$${mortgageCalculatorResult.totalInterestPaid}`}</Typography>
      </MortgageResult>
    </MortgageCalculatorResultContainer>
  )
}

export default MortgageCalculatorResult