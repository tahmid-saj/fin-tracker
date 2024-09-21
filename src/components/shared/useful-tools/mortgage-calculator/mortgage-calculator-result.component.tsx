import "./mortgage-calculator-result.styles.jsx"
import { MortgageCalculatorResultContainer, MortgageResult } from "./mortgage-calculator-result.styles.jsx"

import { Fragment, useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context.js"
import { Typography } from "@mui/material"

const MortgageCalculatorResult = () => {
  const { mortgageCalculatorResult } = useContext(UsefulToolsContext)

  return (
    <MortgageCalculatorResultContainer>
      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Monthly payment`}</Typography>
        <Typography paragraph>{`Total: $${mortgageCalculatorResult?.monthly_payment?.total}`}</Typography>
        <Typography paragraph>{`Mortgage: $${mortgageCalculatorResult?.monthly_payment?.mortgage}`}</Typography>
        <Typography paragraph>{`Property tax: $${mortgageCalculatorResult?.monthly_payment?.property_tax}`}</Typography>
        <Typography paragraph>{`Homeowner association fees: $${mortgageCalculatorResult?.monthly_payment?.hoa}`}</Typography>
        <Typography paragraph>{`Annual home insurance: $${mortgageCalculatorResult?.monthly_payment?.annual_home_ins}`}</Typography>
      </MortgageResult>

      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Annual payment`}</Typography>
        <Typography paragraph>{`Total: $${mortgageCalculatorResult?.annual_payment?.total}`}</Typography>
        <Typography paragraph>{`Mortgage: $${mortgageCalculatorResult?.annual_payment?.mortgage}`}</Typography>
        <Typography paragraph>{`Property tax: $${mortgageCalculatorResult?.annual_payment?.property_tax}`}</Typography>
        <Typography paragraph>{`Homeowner association fees: $${mortgageCalculatorResult?.annual_payment?.hoa}`}</Typography>
        <Typography paragraph>{`Home insurance: $${mortgageCalculatorResult?.annual_payment?.home_insurance}`}</Typography>
      </MortgageResult>

      <MortgageResult>
        <Typography sx={{ marginBottom: "2%" }} variant="subtitle2">{`Total interest paid`}</Typography>
        <Typography paragraph>{`$${mortgageCalculatorResult?.total_interest_paid}`}</Typography>
      </MortgageResult>
    </MortgageCalculatorResultContainer>
  )
}

export default MortgageCalculatorResult