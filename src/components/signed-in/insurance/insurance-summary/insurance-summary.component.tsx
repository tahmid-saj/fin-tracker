import "./insurance-summary.styles.tsx"
import { InsuranceSummaryInfoContainer } from "./insurance-summary.styles.tsx"
import { Typography } from "@mui/material"

import { useContext } from "react"
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.summaryInfoCard.width
}

const InsuranceSummary = () => {
  const { insurancePaymentsView, filterConditions, insurancesSummary } = useContext(InsuranceContext)

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