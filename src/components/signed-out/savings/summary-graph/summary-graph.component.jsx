import { useState, Component, useContext, Fragment } from "react";
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import "./summary-graph.styles.jsx";
import { SummaryGraphSavingsContainer } from "./summary-graph.styles.jsx";

// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { SAVINGS_CONTRIBUTION_INTERVALS } from "../../../../utils/constants/savings.constants";

import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector";
import { getSavingsAccountInfo } from "../../../../store/signed-out/savings/savings.action";

import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const SummaryGraphSavingsAccount = ({ financeItemInfo }) => {
  // const { savingsAccounts, getSavingsAccountInfo } = useContext(SavingsContext)
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
    <SummaryGraphSavingsContainer>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </SummaryGraphSavingsContainer>
  )
}

const SummaryGraphSavingsAccountOld = ({ financeItemInfo }) => {
  // const { savingsAccounts, getSavingsAccountInfo } = useContext(SavingsContext);
  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName);

  // TODO: manage dates on graph better
  const startDate = new Date(savingsAccountInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const startDateStr = year + "-" + month + "-" + day;
  let endDate;

  if (savingsAccountInfo.contributionInterval === SAVINGS_CONTRIBUTION_INTERVALS.months) {
    if (Number(savingsAccountInfo.contributionPeriod) % 12 < 1) {
      endDate = `${Number(year)}-${Number(month) + Number(savingsAccountInfo.contributionPeriod)}-${day}`;
    } else if (Number(savingsAccountInfo.contributionPeriod) % 12 >= 1) {
      const remainderMonths = Number(savingsAccountInfo.contributionPeriod) % 12;
      const years = Math.trunc(Number(savingsAccountInfo.contributionPeriod) / 12);
      endDate = `${Number(year) + years}-${Number(month) + remainderMonths}-${day}`
    }
  } else if (savingsAccountInfo.contributionInterval === SAVINGS_CONTRIBUTION_INTERVALS.years) {
    endDate = `${Number(year) + Number(savingsAccountInfo.contributionPeriod)}-${month}-${day}`
  }

  const previousDay = day === 1 ? 28 : startDate.getDate();
  const previousDate = `${Number(year)}-${month - 1}-${previousDay}`

  // TODO: need to keep track of savings timeline by amount in calculations
  const series = [{
    name: financeItemInfo.savingsAccountName,
    data: [ 0, savingsAccountInfo.initialDeposit, savingsAccountInfo.totalSavings ]
  }];

  const options = {
    chart: {
      type: 'area',
      height: 350,
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
      text: 'Savings Timeline',
      align: 'left'
    },
    labels: [ previousDate, startDateStr, endDate ],
    xaxis: {
      type: 'string',
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  };
    
  return (
    <div className="summary-graph-savings-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 350 } width={ "100%" }/>
    </div>
  )
}

export default SummaryGraphSavingsAccount;
