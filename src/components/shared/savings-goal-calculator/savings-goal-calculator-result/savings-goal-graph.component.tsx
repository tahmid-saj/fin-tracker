import "./savings-goal-graph.styles.jsx"
import { SavingsGoalGraphChart } from "./savings-goal-graph.styles.jsx";

import { useState, useContext } from "react";
import ReactApexChart from "react-apexcharts"

// import { SavingsGoalCalculatorContext } from "../../../../contexts/shared/savings-goal-calculator/savings-goal-calculator.context";
import { useSelector } from "react-redux";
import { selectSavingsGoalScheduleResult } from "../../../../store/shared/savings-goal-calculator/savings-goal-calculator.selector.js";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../mui/paper/paper.component.js";
import { ApexOptions } from "apexcharts";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "block",
  justifyContent: "center"
}

const SavingsGoalGraph = () => {
  // const { savingsGoalScheduleResult } = useContext(SavingsGoalCalculatorContext)
  const savingsGoalScheduleResult = useSelector(selectSavingsGoalScheduleResult)

  let monthlySavingsGoalsTimes: string[] = []
  let monthlySavingsGoalsTotalInterestEarned: number[] = []
  const monthlySavingsGoalsBalance = savingsGoalScheduleResult?.map((savingsGoal) => {
    monthlySavingsGoalsTimes.push(savingsGoal.currentDate)
    monthlySavingsGoalsTotalInterestEarned.push(Number(savingsGoal.totalInterestEarned.toFixed(2)))
    return savingsGoal.balance.toFixed(2)
  })

  const series: ApexAxisChartSeries = [
    {
      name: "Total Interest Earned",
      data: monthlySavingsGoalsTotalInterestEarned
    }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'area',
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
      type: 'category',
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
    <SimplePaper styles={ paperStyles }>
      <SavingsGoalGraphChart>
          <ReactApexChart options={ options } series={ series } type="area" 
            height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SavingsGoalGraphChart>
    </SimplePaper>
  )
}

export default SavingsGoalGraph