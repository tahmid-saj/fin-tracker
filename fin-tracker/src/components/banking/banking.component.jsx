import React, { Component } from "react";

import FinanceTrackerItems from "../finance-tracker-items/finance-tracker-items.component";
import Summary from "./summary/summary.component";
import Transactions from "./transactions/transactions.component";
import ActionList from "./action-list/action-list.component";

import "./banking.styles.scss";

const FINANCE_ITEM_TYPE = "Bank Accounts";

const financeTrackerItemNames = [
  "TD Account"
];

class Banking extends Component {
  // constructor(props) {
  //   super(props);
  // };

  render() {
    return (
      <div className="banking-container">
        <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems>

        <Summary></Summary>

        <div className="transactions-action-container">
          <Transactions></Transactions>

          <ActionList></ActionList>
        </div>
      </div>
    );
  };
};

export default Banking;