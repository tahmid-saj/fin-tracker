import "./useful-tools.styles.jsx"
import { UsefulToolsContainer } from "./useful-tools.styles.jsx"

import CurrencyConverter from "../../../components/shared/useful-tools/currency-converter/currency-converter.component.jsx"
import ExchangeRate from "../../../components/shared/useful-tools/exchange-rate/exchange-rate.component.jsx"
import MortgageCalculator from "../../../components/shared/useful-tools/mortgage-calculator/mortgage-calculator.component.jsx"
import "./useful-tools.component.js"
import { AccordionTransition } from "../../../components/shared/mui/accordion/accordion.component.jsx"
import { Typography } from "@mui/material"
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const UsefulTools = () => {
  return (
    <UsefulToolsContainer>
      <Typography variant="h6" sx={{ display: "flex", justifyContent: "center", color: COLOR_CODES.general["0"] }}>Useful Tools</Typography>

      <AccordionTransition header={ "Mortgage calculator" } styles={ accordionStyles }>
        <MortgageCalculator></MortgageCalculator>
      </AccordionTransition>
      
      <AccordionTransition header={ "Currency converter" } styles={ accordionStyles }>
        <CurrencyConverter></CurrencyConverter>
      </AccordionTransition>
      
      <AccordionTransition header={ "Exchange rate" } styles={ accordionStyles }>
        <ExchangeRate></ExchangeRate>
      </AccordionTransition>
    </UsefulToolsContainer>
  )
}

export default UsefulTools