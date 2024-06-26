import "./insurance-summary.styles.jsx"
import { InsuranceSummaryDashboardContainer,
  InsuranceSummaryInfoGraphContainer
} from "./insurance-summary.styles.jsx"

import InsurancesSummaryInfo from "./insurance-summary-info/insurance-summary-info.component"
import InsurancesSummaryGraph from "./insurance-summary-graph/insurance-summary-graph.component"
import { useContext } from "react"
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context"

import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component"
import { Divider } from "@mui/material"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const InsurancesSummary = () => {
  const { selectedInsurancePaymentsDate, scheduledInsurancePaymentsView } = useContext(InsuranceContext)

  return (
    <InsuranceSummaryDashboardContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
        selectedInsurancePaymentsDate && scheduledInsurancePaymentsView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>
      <Divider/>
      <br/>

      <InsuranceSummaryInfoGraphContainer>
        <SimplePaper styles={ paperStyles }>
          <InsurancesSummaryInfo></InsurancesSummaryInfo>
          <InsurancesSummaryGraph></InsurancesSummaryGraph>
        </SimplePaper>
      </InsuranceSummaryInfoGraphContainer>
    </InsuranceSummaryDashboardContainer>
  )
}

export default InsurancesSummary