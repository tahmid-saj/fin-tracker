import "./mortgage-calculator-result.styles.scss"
import { Fragment, useContext } from "react"
import { UsefulToolsContext } from "../../../../contexts/shared/useful-tools/useful-tools.context"

const MortgageCalculatorResult = () => {
  const { mortgageCalculatorResult } = useContext(UsefulToolsContext)

  return (
    <div className="mortgage-calculator-result-container">
      <div className="mortgage-calculator-result">
        <h5>{`Monthly payment`}</h5>
        <p>{`Total: ${mortgageCalculatorResult.monthlyPayment.total}`}</p>
        <p>{`Mortgage: ${mortgageCalculatorResult.monthlyPayment.mortgage}`}</p>
        <p>{`Property tax: ${mortgageCalculatorResult.monthlyPayment.propertyTax}`}</p>
        <p>{`Homeowner association fees: ${mortgageCalculatorResult.monthlyPayment.hoa}`}</p>
        <p>{`Annual home insurance: ${mortgageCalculatorResult.monthlyPayment.annualHomeInsurance}`}</p>
      </div>

      <div className="mortgage-calculator-result">
        <h5>{`Annual payment`}</h5>
        <p>{`Total: ${mortgageCalculatorResult.annualPayment.total}`}</p>
        <p>{`Mortgage: ${mortgageCalculatorResult.annualPayment.mortgage}`}</p>
        <p>{`Property tax: ${mortgageCalculatorResult.annualPayment.propertyTax}`}</p>
        <p>{`Homeowner association fees: ${mortgageCalculatorResult.annualPayment.hoa}`}</p>
        <p>{`Home insurance: ${mortgageCalculatorResult.annualPayment.homeInsurance}`}</p>
      </div>

      <div className="mortgage-calculator-result">
        <h5>{`Total interest paid`}</h5>
        <p>{`${mortgageCalculatorResult.totalInterestPaid}`}</p>
      </div>
    </div>
  )
}

export default MortgageCalculatorResult