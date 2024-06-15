import "./insurance-summary.styles.scss"
import InsurancesSummaryInfo from "./insurance-summary-info/insurance-summary-info.component"
import InsurancesSummaryGraph from "./insurance-summary-graph/insurance-summary-graph.component"

const InsurancesSummary = () => {
  return (
    <div className="insurances-summary-dashboard-container">
      <h1>Insurance</h1>
      <div className="insurances-summary-info-graph-container">
        <InsurancesSummaryInfo></InsurancesSummaryInfo>
        <InsurancesSummaryGraph></InsurancesSummaryGraph>
      </div>
    </div>
  )
}

export default InsurancesSummary