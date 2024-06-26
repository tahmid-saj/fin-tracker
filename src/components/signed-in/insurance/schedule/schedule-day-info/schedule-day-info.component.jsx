import "./schedule-day-info.styles.jsx"
import { InsuranceScheduleDayInfo } from "./schedule-day-info.styles.jsx"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../shared/mui/paper/paper.component"
import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants"
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.calendarDayInfo.width
}

const ScheduleDayInfo = () => {
  const { scheduledInsurancePaymentsView } = useContext(InsuranceContext)
  
  if (!scheduledInsurancePaymentsView.length) return <Fragment/>
  
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