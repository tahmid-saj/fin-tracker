import "./insurance-summary-info.styles.scss"
import { useContext } from "react"
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context"
import { Typography } from "@mui/material"

const InsurancesSummaryInfo = () => {
  const { insurancesSummary } = useContext(InsuranceContext)

  return (
    <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} 
      variant="h6">{ `Total insurance paid past month - $${insurancesSummary.pastMonthAllInsurancesPayment}` }</Typography>
  )
}

export default InsurancesSummaryInfo