import "./insurance-summary-graph.styles.jsx"
import { InsuranceSummaryGraphContainer } from "./insurance-summary-graph.styles.jsx"
import ReactApexChart from "react-apexcharts"

import { useContext, Fragment } from "react"
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context"
import { COMMON_SPACING } from "../../../../../utils/constants/shared.constants"

const InsurancesSummaryGraph = () => {
  const { insurancesSummary } = useContext(InsuranceContext)
  const { pastMonthInsurances } = insurancesSummary
  

  let insuranceCategoryPayments = new Map()
  const categoryCosts = pastMonthInsurances.map((insurance) => {
    if (insuranceCategoryPayments.has(String(insurance.insuranceFor))) {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insuranceCategoryPayments.get(insurance.insuranceFor)) + Number(insurance.insurancePayment))
    } else {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insurance.insurancePayment))
    }
  })

  if (!insuranceCategoryPayments.size) {
    return <Fragment></Fragment>
  }

  const series = [ ...insuranceCategoryPayments.values() ]
  

  const options = {
    chart: {
      type: 'donut',
      height: COMMON_SPACING.pieChart.height,
    },
    labels: [ ...insuranceCategoryPayments.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <InsuranceSummaryGraphContainer>
      <ReactApexChart options={ options } series={ series } type="donut" 
        height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
    </InsuranceSummaryGraphContainer>
  )
}

export default InsurancesSummaryGraph