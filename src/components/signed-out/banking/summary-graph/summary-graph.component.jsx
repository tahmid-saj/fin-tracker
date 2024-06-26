import { Component, useContext, Fragment } from "react";

import ReactApexChart from 'react-apexcharts';
// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";

import "./summary-graph.styles.jsx";
import { SummaryGraphBankingContainer } from "./summary-graph.styles.jsx";

import { TRANSACTION_TYPES } from "../../../../utils/constants/banking.constants";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  margin: "2% 0% 2% 0%"
}

const SummaryGraphBanking = ({ financeItemInfo }) => {
  const bankingAccounts = useSelector(selectBankingAccounts)

  const transactionAmounts = bankingAccounts.find(account => {
    return account.name === financeItemInfo.name
  })
  .transactions
  .map((transaction) => {
    if (transaction.type === TRANSACTION_TYPES.withdrawal || transaction.type === TRANSACTION_TYPES.withdrawalTransfer) {
      return -transaction.amount
    }

    return transaction.amount
  });

  // TODO: track dates in transactions
  const transactionIndexes = transactionAmounts.map((_, index) => String(index));

  const series = [{
    name: 'Amount ( $ )',
    data: transactionAmounts
  }];

  const options = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: Number.MAX_VALUE,
            to: 0,
            color: '#F15B46'
          }, {
            from: -(Number.MAX_VALUE + 1),
            to: 0,
            color: '#DBA800'
          }]
        },
        columnWidth: '60%',
      }
    },
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      title: {
        text: 'Transaction Amount'
      },
      labels: {
        formatter: function (y) {
          return y.toFixed(0);
        }
      }
    },
    xaxis: {
      type: 'string',
      categories: transactionIndexes,
      labels: {
        rotate: -90
      }
    }
  }

  return (
    <SimplePaper styles={ paperStyles }>
      <SummaryGraphBankingContainer>
        <ReactApexChart options={ options } series={ series } type="bar" 
          height={ COMMON_SPACING.barChart.height } width={ COMMON_SPACING.barChart.width }/>
      </SummaryGraphBankingContainer>
    </SimplePaper>
  )
}

export default SummaryGraphBanking;
