import "./insurance-summary.styles.scss"
import InsurancesSummaryInfo from "./insurance-summary-info/insurance-summary-info.component"
import InsurancesSummaryGraph from "./insurance-summary-graph/insurance-summary-graph.component"
import { useSelector } from "react-redux"
import { selectSelectedInsurancePaymentsDate, selectScheduledInsurancePaymentsView } from "../../../../store/signed-out/insurance/insurance.selector"

import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component"
import { Divider } from "@mui/material"

const InsurancesSummary = () => {
  const selectedInsurancePaymentsDate = useSelector(selectSelectedInsurancePaymentsDate)
  const scheduledInsurancePaymentsView = useSelector(selectScheduledInsurancePaymentsView)

  return (
    <div className="insurances-summary-dashboard-container">
      <h1>Insurance</h1>
      <ScheduleCalendar></ScheduleCalendar>
      {
        selectedInsurancePaymentsDate && scheduledInsurancePaymentsView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>
      <Divider/>
      <br/>
      <div className="insurances-summary-info-graph-container">
        <InsurancesSummaryInfo></InsurancesSummaryInfo>
        <InsurancesSummaryGraph></InsurancesSummaryGraph>
      </div>
    </div>
  )
}

export default InsurancesSummary