import "./summary-graph.styles"
import { SummaryGraphContainer } from "./summary-graph.styles";
import { Fragment } from "react"
import ReactApexChart from 'react-apexcharts';

import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../../store/signed-out/savings/savings.selector";
import { getSavingsAccountInfo } from "../../../../../store/signed-out/savings/savings.action";

import { COLOR_CODES, COMMON_SPACING } from "../../../../../utils/constants/shared.constants";
import SimplePaper from "../../../../shared/mui/paper/paper.component";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const SummaryGraph = ({ financeItemInfo }) => {
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const savingsAccountInfo = getSavingsAccountInfo(savingsAccounts, financeItemInfo.savingsAccountName)
  const { savings } = savingsAccountInfo

  let savingsTimes = []
  let monthlySavingsTotalInterestEarned = []
  const monthlySavingsBalance = savings.map((savingMonth) => {
    savingsTimes.push(savingMonth.currentDate)
    monthlySavingsTotalInterestEarned.push(Number(savingMonth.totalInterestEarned).toFixed(2))
    return savingMonth.balance.toFixed(2)
  })

  const series = [
    // {
    //   name: "Balance",
    //   data: monthlySavingsGoalsBalance
    // },
    {
      name: "Total Interest Earned",
      data: monthlySavingsTotalInterestEarned
    }
  ]

  const options = {
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
    labels: savingsTimes,
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
    <SummaryGraphContainer>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </SummaryGraphContainer>
  )
}

export default SummaryGraph