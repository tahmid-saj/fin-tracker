import "./schedule-day-info.styles.tsx"
import { InsuranceScheduleDayInfo } from "./schedule-day-info.styles.tsx"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants.ts"
import { useSelector } from "react-redux"
import { selectScheduledInsurancePaymentsView } from "../../../../../store/signed-out/insurance/insurance.selector.ts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.calendarDayInfo.width
}

const ScheduleDayInfo = () => {
  const scheduledInsurancePaymentsView = useSelector(selectScheduledInsurancePaymentsView)

  if (!scheduledInsurancePaymentsView?.length) return <Fragment/>

  return (
    <InsuranceScheduleDayInfo>
    {
      scheduledInsurancePaymentsView.map((insurancePayment) => {
        return (
          <SimplePaper styles={ paperStyles }>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h6">{`${insurancePayment.insuranceFor}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Payment: $${insurancePayment.insurancePayment}`}</Typography>
                
            <br/>
            <Divider/>
            <br />
                
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`${insurancePayment.insuranceDate}`}</Typography>
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="body1">{`Interval: ${insurancePayment.insuranceInterval}`}</Typography>
          </SimplePaper>
        )
      })
    }
    </InsuranceScheduleDayInfo>
  )
}

export default ScheduleDayInfo