import "./insurance-pie-chart.styles.scss"
import ReactApexChart from "react-apexcharts"

import { useSelector } from "react-redux"
import { selectInsurancePaymentsView } from "../../../../store/signed-out/insurance/insurance.selector"

const InsurancePieChart = () => {
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)

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
    <div className="insurance-pie-chart">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 600 } width={ 650 }/>
    </div>
  )
}

export default InsurancePieChart