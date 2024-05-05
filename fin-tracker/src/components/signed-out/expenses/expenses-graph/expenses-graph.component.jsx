import { Fragment } from "react"
import "./expenses-graph.styles.scss"
import ReactApexChart from "react-apexcharts"

const ExpensesGraph = () => {
  const series = [44, 55, 41, 17, 15]

  const options = {
    chart: {
      type: 'donut',
      height: 600,
    },
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
    <div className="expenses-graph-container">
      <ReactApexChart options={ options } series={ series } type="donut" height={ 600 } width={ 650 }/>
    </div>
  )
}

export default ExpensesGraph