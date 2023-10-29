import { Component, useContext, Fragment } from "react";

import ReactApexChart from 'react-apexcharts';
import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

import "./summary-graph.styles.scss";

import { TRANSACTION_TYPES } from "../../../../utils/constants/banking.constants";

const SummaryGraphBanking = ({ financeItemInfo }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const transactionAmounts = bankingAccounts.find(account => {
    return account.name === financeItemInfo
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
      height: 350
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
    <Fragment>
      <div className="summary-graph-banking-container">
        <ReactApexChart options={ options } series={ series } type="bar" height={ 350 } width={ 1000 }/>
      </div>
    </Fragment>
  )
}

export default SummaryGraphBanking;
