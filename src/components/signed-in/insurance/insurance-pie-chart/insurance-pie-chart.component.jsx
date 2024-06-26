import "./insurance-pie-chart.styles.jsx"
import { InsuranceGraphContainer } from "./insurance-pie-chart.styles.jsx"
import ReactApexChart from "react-apexcharts"

import { useContext } from "react"
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { Typography } from "@mui/material"

const paperStyles = {
  backgroundColor: COLOR_CODES.general["1"],
  width: COMMON_SPACING.pieChart.width,
}

const InsurancePieChart = () => {
  const { insurancePaymentsView } = useContext(InsuranceContext)

  let insuranceCategoryPayments = new Map()
  const categoryCosts = insurancePaymentsView.map((insurance) => {
    if (insuranceCategoryPayments.has(String(insurance.insuranceFor))) {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insuranceCategoryPayments.get(insurance.insuranceFor)) + Number(insurance.insurancePayment))
    } else {
      insuranceCategoryPayments.set(String(insurance.insuranceFor), Number(insurance.insurancePayment))
    }
  })

  const series = [ ...insuranceCategoryPayments.values() ]
  
  const options = {
    chart: {
      type: 'donut',
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
    <InsuranceGraphContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} variant="h6">Filtered categories</Typography>
        <ReactApexChart options={ options } series={ series } type="donut" 
          height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
      </SimplePaper>
    </InsuranceGraphContainer>
  )
}

export default InsurancePieChart