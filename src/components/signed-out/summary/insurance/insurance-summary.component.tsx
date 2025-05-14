import "./insurance-summary.styles.tsx"
import { InsuranceSummaryDashboardContainer,
  InsuranceSummaryInfoGraphContainer
} from "./insurance-summary.styles.tsx"

import InsurancesSummaryInfo from "./insurance-summary-info/insurance-summary-info.component.tsx"
import InsurancesSummaryGraph from "./insurance-summary-graph/insurance-summary-graph.component.tsx"
import { useSelector } from "react-redux"
import { selectSelectedInsurancePaymentsDate, selectScheduledInsurancePaymentsView } from "../../../../store/signed-out/insurance/insurance.selector.ts"

import ScheduleCalendar from "./schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfo from "./schedule/schedule-day-info/schedule-day-info.component.jsx"
import { Divider } from "@mui/material"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const InsurancesSummary = () => {
  const selectedInsurancePaymentsDate = useSelector(selectSelectedInsurancePaymentsDate)
  const scheduledInsurancePaymentsView = useSelector(selectScheduledInsurancePaymentsView)

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