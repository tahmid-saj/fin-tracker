import { useState, Component, useContext, Fragment } from "react";

import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import "./summary-graph.styles.jsx";
import { SummaryGraphInvestmentContainer } from "./summary-graph.styles.jsx";

// import { InvestmentsContext } from "../../../../contexts/signed-out/investments/investments.context";
import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector";
import { getInvestmentInfo } from "../../../../store/signed-out/investments/investments.action";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"]
}

const SummaryGraphInvestment = ({ financeItemInfo }) => {
  // const { investments, getInvestmentInfo } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)

  const investmentInfo = getInvestmentInfo(investments, financeItemInfo.investmentName);

  // TODO: manage dates on graph better
  const startDate = new Date(investmentInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const startDateStr = year + '-' + month + '-' + day;
  const previousDay = day === 1 ? 28 : startDate.getDate();
  const endDate = `${Number(year) + Number(investmentInfo.afterYears)}-${month}-${day}`;
  const previousDate = `${Number(year)}-${month - 1}-${previousDay}`

  const { investments: investmentsSchedule } = investmentInfo

  

  let investmentTimes = []
  let monthlyInvestmentTotalInterestEarned = []
  let monthlyInvestmentEndBalance = []

  const monthlyInvestmentBalance = investmentsSchedule.map((investmentMonth) => {
    investmentTimes.push(investmentMonth.currentDate)

    monthlyInvestmentTotalInterestEarned.push(Number(investmentMonth.interestAccumulated).toFixed(2))
    monthlyInvestmentEndBalance.push(Number(investmentMonth.endingBalance).toFixed(2))

    return investmentMonth.endingBalance.toFixed(2)
  })

  // TODO: need to keep track of investments timeline by amount in calculations
  const series = [{
    name: financeItemInfo.investmentName,
    data: monthlyInvestmentEndBalance
  }];

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
      text: 'Investment Value',
      align: 'left'
    },
    labels: investmentTimes,
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
    <SummaryGraphInvestmentContainer>
      <SimplePaper styles={ paperStyles }>
        <ReactApexChart options={ options } series={ series } type="area" 
          height={ COMMON_SPACING.lineChart.height } width={ COMMON_SPACING.lineChart.width }/>
      </SimplePaper>
    </SummaryGraphInvestmentContainer>
  )
}

export default SummaryGraphInvestment;
