import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-out/insurance/add-insurance-form/add-insurance-form.component"
import FilterInsuranceForm from "../../../components/signed-out/insurance/filter-insurance-form/filter-insurance-form.component"
import InsurancePieChart from "../../../components/signed-out/insurance/insurance-pie-chart/insurance-pie-chart.component"
import InsuranceSummary from "../../../components/signed-out/insurance/insurance-summary/insurance-summary.component"
import InsuranceTable from "../../../components/signed-out/insurance/insurance-table/insurance-table.component"
import "./insurance.styles.scss"

const Insurance = () => {
  return (
    <div className="insurance-container">
      <div className="insurance-summary-add-form-container">
        <InsuranceSummary></InsuranceSummary>
      </div>

      <Divider/>

      <div className="insurance-summary-add-form-container">
        <AddInsuranceForm></AddInsuranceForm>
      </div>

      <Divider/>

      <div className="insurance-filter-form-container">
        <FilterInsuranceForm></FilterInsuranceForm>
      </div>

      <div className="insurance-charts-container">
        <InsurancePieChart></InsurancePieChart>
        <InsuranceTable></InsuranceTable>
      </div>
    </div>
  )
}

export default Insurance