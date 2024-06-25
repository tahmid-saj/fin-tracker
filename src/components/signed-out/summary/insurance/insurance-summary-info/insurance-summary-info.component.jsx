import "./insurance-summary-info.styles.scss"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { selectInsurancesSummary } from "../../../../../store/signed-out/insurance/insurance.selector"
import { Typography } from "@mui/material"

const InsurancesSummaryInfo = () => {
  const insurancesSummary = useSelector(selectInsurancesSummary)

  return (
    <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} 
      variant="h6">{ `Total insurance paid past month - $${insurancesSummary.pastMonthAllInsurancesPayment}` }</Typography>
  )
}

export default InsurancesSummaryInfo