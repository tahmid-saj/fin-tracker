import "./insurance-pie-chart.styles.ts"
import { InsuranceGraphContainer } from "./insurance-pie-chart.styles.ts"
import ReactApexChart from "react-apexcharts"

import { useContext } from "react"
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context.ts"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import SimplePaper from "../../../shared/mui/paper/paper.component.ts"
import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts"

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

  const series: ApexAxisChartSeries = [ ...insuranceCategoryPayments.values() ]
  
  const options: ApexOptions = {
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
        <Typography sx={{ display: "flex", justifyContent: "center", marginBottom: "6%" }} 
          variant="h6">Filtered categories</Typography>
        <ReactApexChart options={ options } series={ series } type="donut" 
          height={ COMMON_SPACING.pieChart.height } width={ COMMON_SPACING.pieChart.width }/>
      </SimplePaper>
    </InsuranceGraphContainer>
  )
}

export default InsurancePieChart