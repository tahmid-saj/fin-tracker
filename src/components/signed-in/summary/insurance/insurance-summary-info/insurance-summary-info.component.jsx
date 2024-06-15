import "./insurance-summary-info.styles.scss"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { selectInsurancesSummary } from "../../../../../store/signed-out/insurance/insurance.selector"

const InsurancesSummaryInfo = () => {
  const insurancesSummary = useSelector(selectInsurancesSummary)

  return (
    <div className="insurances-summary-info-container">
      <h3>{ `Total insurance paid past month - $${insurancesSummary.pastMonthAllInsurancesPayment}` }</h3>
    </div>
  )
}

export default InsurancesSummaryInfo