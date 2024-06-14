import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-out/insurance/add-insurance-form/add-insurance-form.component"
import FilterInsuranceForm from "../../../components/signed-out/insurance/filter-insurance-form/filter-insurance-form.component"
import InsurancePieChart from "../../../components/signed-out/insurance/insurance-pie-chart/insurance-pie-chart.component"
import InsuranceSummary from "../../../components/signed-out/insurance/insurance-summary/insurance-summary.component"
import InsuranceTable from "../../../components/signed-out/insurance/insurance-table/insurance-table.component"
import "./insurance.styles.scss"

import { useEffect, Fragment, useContext } from "react"
import { InsuranceContext } from "../../../contexts/signed-in/insurance/insurance.context"

const Insurance = () => {
  const { insurances, insurancesView, insurancePaymentsView } = useContext(InsuranceContext)

  return (
    <div className="insurance-container">
      {
        insurances && insurances.length ?
        <Fragment>
          <div className="insurance-summary-add-form-container">
            <InsuranceSummary></InsuranceSummary>
          </div>

          <Divider/>
        </Fragment> : null
      }

      <div className="insurance-summary-add-form-container">
        <AddInsuranceForm></AddInsuranceForm>
      </div>

      {
        insurances && insurances.length ?
        <Fragment>
          <Divider/>

          <div className="insurance-filter-form-container">
            <FilterInsuranceForm></FilterInsuranceForm>
          </div>
        </Fragment> : null
      }

      {
        insurancePaymentsView && insurancePaymentsView.length ?
        <div className="insurance-chart-container">
          <InsurancePieChart></InsurancePieChart>
        </div> : null
      }

      {
        insurancesView && insurancesView.length ?
        <div className="insurance-chart-container">
          <InsuranceTable></InsuranceTable>
        </div> : null
      }
    </div>
  )
}

export default Insurance