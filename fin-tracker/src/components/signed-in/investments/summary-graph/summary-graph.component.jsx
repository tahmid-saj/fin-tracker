import { useState, Component, useContext, Fragment } from "react";

import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

import "./summary-graph.styles.scss";

import { InvestmentsContext } from "../../../../contexts/signed-in/investments/investments.context";

const SummaryGraphInvestment = ({ financeItemInfo }) => {
  const { investments, getInvestmentInfo } = useContext(InvestmentsContext);
  const investmentInfo = getInvestmentInfo(financeItemInfo.investmentName);

  // TODO: manage dates on graph better
  const startDate = new Date(investmentInfo.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();
  const previousDay = day === 1 ? 28 : startDate.getDate();
  const endDate = `${Number(year) + Number(investmentInfo.afterYears)}-${month}-${day}`;
  const previousDate = `${Number(year)}-${month - 1}-${previousDay}`

  // TODO: need to keep track of investments timeline by amount in calculations
  const series = [{
    name: financeItemInfo.investmentName,
    data: [ 0, financeItemInfo.startingAmount, financeItemInfo.endBalance ]
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
      text: 'Investment Value',
      align: 'left'
    },
    labels: [ previousDate, investmentInfo.startDate, endDate ],
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
    <div className="summary-graph-investment-container">
      <ReactApexChart options={ options } series={ series } type="area" height={ 350 } width={ 1000 }/>
    </div>
  )
}

export default SummaryGraphInvestment;
