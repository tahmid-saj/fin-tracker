import "./insurance-summary.styles.scss"
import { Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { selectInsurancePaymentsView, selectFilterConditions, selectInsurancesSummary } from "../../../../store/signed-out/insurance/insurance.selector"

const InsuranceSummary = () => {
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)
  const filterConditions = useSelector(selectFilterConditions)
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
    <div className="insurance-summary">
      <Typography sx={{ marginBottom: "2%" }} variant="h6">{`Insurance Summary`}</Typography>
      <Typography paragraph>{`Total insurance planned: $${insurancesSummary.currentTotalInsurancePlanned ? insurancesSummary.currentTotalInsurancePlanned : '0'}`}</Typography>
      <Typography paragraph>{ `All categories: ${insurancesSummary.currentAllInsurancesCategories ? [ ...insurancesSummary.currentAllInsurancesCategories.keys() ] : '-'}` }</Typography>

      <Typography>{ `Filterd dates: ${filterConditions !== null && filterConditions.insuranceStartDate !== '' ? filterConditions.insuranceStartDate : ''} 
        - ${filterConditions !== null && filterConditions.insuranceEndDate !== '' ? filterConditions.insuranceEndDate : ''}` }</Typography>
      <Typography paragraph>{`Filtered total insurance planned: $${filteredInsurancePlanned ? filteredInsurancePlanned : '0'}`}</Typography>

      <Typography paragraph>{`Filtered categories: ${insuranceCategoryPayments ? [ ...insuranceCategoryPayments.keys() ] : '-'}`}</Typography>
    </div>
  )
}

export default InsuranceSummary