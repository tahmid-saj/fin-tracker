import "./insurance-summary.styles.jsx"
import { InsuranceSummaryInfoContainer } from "./insurance-summary.styles.jsx"
import { Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { selectInsurancePaymentsView, selectFilterConditions, selectInsurancesSummary } from "../../../../store/signed-out/insurance/insurance.selector"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const InsuranceSummary = () => {
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)
  const insurancesSummary = useSelector(selectInsurancesSummary)

  let insuranceCategoryPayments = new Map()
  let filteredInsurancePlanned = 0.0
  const categoryCosts = insurancePaymentsView.map((insurance) => {
    filteredInsurancePlanned += insurance.insurancePayment

    if (insuranceCategoryPayments.has(String(insurance.insuranceFor))) {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insuranceCategoryPayments.get(insurance.insuranceFor)) + Number(insurance.insurancePayment))
    } else {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insurance.insurancePayment))
    }
  })

  return (
    <InsuranceSummaryInfoContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ marginBottom: "2%" }} variant="h6">{`Insurance Summary`}</Typography>
        <Typography paragraph>{`Total insurance planned: $${insurancesSummary.currentTotalInsurancePlanned ? insurancesSummary.currentTotalInsurancePlanned.toFixed(2) : '0'}`}</Typography>
        <Typography paragraph>{ `All categories: ${insurancesSummary.currentAllInsurancesCategories ? [ ...insurancesSummary.currentAllInsurancesCategories.keys() ] : '-'}` }</Typography>

        {/* <Typography>{ `Filterd dates: ${filterConditions !== null && filterConditions.insuranceStartDate !== '' ? filterConditions.insuranceStartDate : ''} 
          - ${filterConditions !== null && filterConditions.insuranceEndDate !== '' ? filterConditions.insuranceEndDate : ''}` }</Typography>
        <Typography paragraph>{`Filtered total insurance planned: $${filteredInsurancePlanned ? filteredInsurancePlanned : '0'}`}</Typography>

        <Typography paragraph>{`Filtered categories: ${insuranceCategoryPayments ? [ ...insuranceCategoryPayments.keys() ] : '-'}`}</Typography> */}
      </SimplePaper>
    </InsuranceSummaryInfoContainer>
  )
}

export default InsuranceSummary