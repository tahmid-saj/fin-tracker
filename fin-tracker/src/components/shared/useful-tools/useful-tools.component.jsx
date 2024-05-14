import CurrencyConverter from "./currency-converter/currency-converter.component"
import ExchangeRate from "./exchange-rate/exchange-rate.component"
import MortgageCalculator from "./mortgage-calculator/mortgage-calculator.component"
import "./useful-tools.component"
import { AccordionTransition } from "../accordion/accordion.component"

const UsefulTools = () => {

  return (
    <div className="useful-tools-container">
      <AccordionTransition header={ "Mortgage calculator" }>
        <MortgageCalculator></MortgageCalculator>
      </AccordionTransition>
      <hr className="useful-tools-rounded"></hr>
      <AccordionTransition header={ "Currency converter" }>
        <CurrencyConverter></CurrencyConverter>
      </AccordionTransition>
      <hr className="useful-tools-rounded"></hr>
      <AccordionTransition header={ "Find exchange rate" }>
        <ExchangeRate></ExchangeRate>
      </AccordionTransition>
    </div>
  )
}

export default UsefulTools