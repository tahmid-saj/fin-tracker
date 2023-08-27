import React, { Component } from "react";
import FinanceTrackerItems from "../finance-tracker-items/finance-tracker-items.component";
import Summary from "./summary/summary.component";
import Transactions from "./transactions/transactions.component";

import "./banking.styles.scss";

const FINANCE_ITEM_TYPE = "Bank Accounts";

class Banking extends Component {
  // constructor(props) {
  //   super(props);
  // };

  render() {
    return (
      <div className="banking-container">
        <FinanceTrackerItems label={ FINANCE_ITEM_TYPE }></FinanceTrackerItems>

        <Summary></Summary>

        <div className="transactions-action-container">
          <Transactions></Transactions>
        </div>
      </div>
    );
  };
}

export default Banking;