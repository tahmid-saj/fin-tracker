import "./insurance-pie-chart.styles.scss"
import ReactApexChart from "react-apexcharts"

const InsurancePieChart = () => {
  const series = []
  
  const options = {
    chart: {
      type: 'donut',
      height: 600,
    },
    labels: [  ],
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