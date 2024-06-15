import "./insurance-summary-graph.styles.scss"
import ReactApexChart from "react-apexcharts"

import { useContext, Fragment } from "react"
import { InsuranceContext } from "../../../../../contexts/signed-in/insurance/insurance.context"

const InsurancesSummaryGraph = () => {
  const { insurancesSummary } = useContext(InsuranceContext)
  const { pastMonthInsurances } = insurancesSummary
  console.log(insurancesSummary)

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
  console.log(series)

  const options = {
    chart: {
      type: 'donut',
      height: 600,
    },
    labels: [ ...insuranceCategoryPayments.keys() ],
    responsive: [{
      breakpoint: 50,
      options: {
        chart: {
          height: 600
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <div className="insurances-summary-graph-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 400 } width={ 450 }/>
    </div>
  )
}

export default InsurancesSummaryGraph