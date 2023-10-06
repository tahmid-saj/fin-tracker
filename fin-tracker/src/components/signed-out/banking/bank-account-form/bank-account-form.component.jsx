import React, { useState, Fragment } from "react";

import Summary from "../summary/summary.component";
import Transactions from "../transactions/transactions.component";
import ActionList from "../action-list/action-list.component";

import "./bank-account-form.styles.scss";

const BankAccountForm = ({ financeItemName }) => {
  const [closeAccount, setCloseAccount] = useState(false);

  const closeAccountHandler = () => {
    setCloseAccount(true);
  }

  return (
    <div>
      {
        !closeAccount && (
          <Fragment>
            <Summary></Summary>
            <div className="transactions-action-container">
              <Transactions></Transactions>

              <ActionList closeAccountHandler={ closeAccountHandler }></ActionList>
            </div>
          </Fragment>
        )  
      }
    </div>
  );
};

export default BankAccountForm;