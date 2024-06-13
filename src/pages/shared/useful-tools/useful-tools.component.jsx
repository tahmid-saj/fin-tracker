import "./useful-tools.styles.jsx"
import { UsefulToolsContainer } from "./useful-tools.styles"

import CurrencyConverter from "../../../components/shared/useful-tools/currency-converter/currency-converter.component.jsx"
import ExchangeRate from "../../../components/shared/useful-tools/exchange-rate/exchange-rate.component.jsx"
import MortgageCalculator from "../../../components/shared/useful-tools/mortgage-calculator/mortgage-calculator.component.jsx"
import "./useful-tools.component.jsx"
import { AccordionTransition } from "../../../components/shared/mui/accordion/accordion.component.jsx"
import { Typography } from "@mui/material"

const UsefulTools = () => {
  return (
    <UsefulToolsContainer>
      <Typography variant="h6" sx={{ display: "flex", justifyContent: "center" }}>Useful Tools</Typography>

      <AccordionTransition header={ "Mortgage calculator" }>
        <MortgageCalculator></MortgageCalculator>
      </AccordionTransition>
      
      <AccordionTransition header={ "Currency converter" }>
        <CurrencyConverter></CurrencyConverter>
      </AccordionTransition>
      
      <AccordionTransition header={ "Exchange rate" }>
        <ExchangeRate></ExchangeRate>
      </AccordionTransition>
    </UsefulToolsContainer>
  )
}

export default UsefulTools