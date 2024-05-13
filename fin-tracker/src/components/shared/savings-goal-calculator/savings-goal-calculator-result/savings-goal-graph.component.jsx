import "./savings-goal-graph.styles.scss"
import { useState, useContext } from "react";
import ReactApexChart from "react-apexcharts"

import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context";

const SavingsGoalGraph = () => {
  const { savingsGoalScheduleResult } = useContext(SavingsGoalCalculatorContext)

  let monthlySavingsGoalsTimes = []
  let monthlySavingsGoalsTotalInterestEarned = []
  const monthlySavingsGoalsBalance = savingsGoalScheduleResult.map((savingsGoal) => {
    monthlySavingsGoalsTimes.push(savingsGoal.currentDate)
    monthlySavingsGoalsTotalInterestEarned.push(Number(savingsGoal.totalInterestEarned).toFixed())
    return savingsGoal.balance.toFixed(2)
  })

  const series = [
    // {
    //   name: "Balance",
    //   data: monthlySavingsGoalsBalance
    // },
    {
      name: "Total Interest Earned",
      data: monthlySavingsGoalsTotalInterestEarned
    }
  ]

  const options = {
    chart: {
      type: 'area',
      height: 1000,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    
    title: {
      text: `Savings Goal`,
      align: 'left'
    },
    labels: monthlySavingsGoalsTimes,
    xaxis: {
      type: 'string',
      labels: {
        show: false
      }
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  };

  return (
    <div className="savings-goal-graph-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 500 } width={ "100%" }/>
    </div>
  )
}

export default SavingsGoalGraph