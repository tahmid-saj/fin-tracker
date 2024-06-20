import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-in/insurance/add-insurance-form/add-insurance-form.component"
import FilterInsuranceForm from "../../../components/signed-in/insurance/filter-insurance-form/filter-insurance-form.component"
import InsurancePieChart from "../../../components/signed-in/insurance/insurance-pie-chart/insurance-pie-chart.component"
import InsuranceSummary from "../../../components/signed-in/insurance/insurance-summary/insurance-summary.component"
import InsuranceTable from "../../../components/signed-in/insurance/insurance-table/insurance-table.component"
import "./insurance.styles.scss"
import ScheduleCalendar from "../../../components/signed-in/insurance/schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "../../../components/signed-in/insurance/schedule/schedule-day-info/schedule-day-info.component"

import { useEffect, Fragment, useContext } from "react"
import { InsuranceContext } from "../../../contexts/signed-in/insurance/insurance.context"

const Insurance = () => {
  const { insurances, insurancesView, insurancePaymentsView, 
    selectedInsurancePaymentsDate, scheduledInsurancePaymentsView
  } = useContext(InsuranceContext)

  console.log(selectedInsurancePaymentsDate, scheduledInsurancePaymentsView)

  return (
    <div className="insurance-container">
      <ScheduleCalendar></ScheduleCalendar>
      {
        selectedInsurancePaymentsDate && scheduledInsurancePaymentsView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>
      <Divider/>
      <br/>

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