import "./insurance-summary-info.styles.scss"
import { useContext } from "react"
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context"

const InsurancesSummaryInfo = () => {
  const { insurancesSummary } = useContext(InsuranceContext)

  return (
    <div className="insurances-summary-info-container">
      <h3>{ `Total insurance paid past month - $${insurancesSummary.pastMonthAllInsurancesPayment}` }</h3>
    </div>
  )
}

export default InsurancesSummaryInfo