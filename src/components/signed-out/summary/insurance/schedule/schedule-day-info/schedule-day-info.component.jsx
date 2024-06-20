import "./schedule-day-info.styles.scss"
import { Typography, Divider } from "@mui/material"
import { Fragment, useContext } from "react"
import SimplePaper from "../../../../../shared/mui/paper/paper.component"
import { COLOR_CODES } from "../../../../../../utils/constants/shared.constants"
import { useSelector } from "react-redux"
import { selectScheduledInsurancePaymentsView } from "../../../../../../store/signed-out/insurance/insurance.selector"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: 400,
}

const ScheduleDayInfo = () => {
  const scheduledInsurancePaymentsView = useSelector(selectScheduledInsurancePaymentsView)

  if (!scheduledInsurancePaymentsView.length) return <Fragment/>

  return (
    <div className="insurance-schedule-day-info">
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
    </div>
  )
}

export default ScheduleDayInfo