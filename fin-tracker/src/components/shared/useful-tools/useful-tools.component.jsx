import "./useful-tools.styles.jsx"
import { UsefulToolsContainer } from "./useful-tools.styles"

import CurrencyConverter from "./currency-converter/currency-converter.component"
import ExchangeRate from "./exchange-rate/exchange-rate.component"
import MortgageCalculator from "./mortgage-calculator/mortgage-calculator.component"
import "./useful-tools.component"
import { AccordionTransition } from "../mui/accordion/accordion.component"
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