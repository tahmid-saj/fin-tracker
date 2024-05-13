import CurrencyConverter from "./currency-converter/currency-converter.component"
import ExchangeRate from "./exchange-rate/exchange-rate.component"
import MortgageCalculator from "./mortgage-calculator/mortgage-calculator.component"
import "./useful-tools.component"

const UsefulTools = () => {
  return (
    <div className="useful-tools-container">
      <MortgageCalculator></MortgageCalculator>
      <hr className="useful-tools-rounded"></hr>
      <CurrencyConverter></CurrencyConverter>
      <hr className="useful-tools-rounded"></hr>
      <ExchangeRate></ExchangeRate>
    </div>
  )
}

export default UsefulTools