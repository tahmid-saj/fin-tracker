import { Fragment } from "react"
import "./insurance-filter-info.styles.jsx"
import { InsuranceFilterInfoContainer } from "./insurance-filter-info.styles.jsx"

import { Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { selectInsurancePaymentsView, selectFilterConditions } from "../../../../store/signed-out/insurance/insurance.selector.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  margin: "0% 2% 2% 2%",
  width: "auto",
  display: "flex",
  justifyContent: "center",
  alighItems: "center"
}

export const InsuranceFilterInfo = () => {
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)
  const filterConditions = useSelector(selectFilterConditions)

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
    <SimplePaper styles={ paperStyles }>
      <InsuranceFilterInfoContainer>
        <Typography variant="h6">{`Filtered total insurance planned: $${filteredInsurancePlanned ? filteredInsurancePlanned.toFixed(2) : '0'}`}</Typography>
        <Typography variant="body1">{ `Filterd dates: ${filterConditions !== null && filterConditions.insuranceStartDate !== '' ? filterConditions.insuranceStartDate : ''} 
          - ${filterConditions !== null && filterConditions.insuranceEndDate !== '' ? filterConditions.insuranceEndDate : 'Today'}` }</Typography>

        <Typography variant="body1">{`Filtered categories: ${insuranceCategoryPayments ? [ ...insuranceCategoryPayments.keys() ] : '-'}`}</Typography>
      </InsuranceFilterInfoContainer>
    </SimplePaper>
  )
}