import React, { Component } from "react";

import FinanceTrackerItems from "../../shared/finance-tracker-items/finance-tracker-items.component";
import CreateAccount from "./create-account/create-account.component";
import Summary from "./summary/summary.component";
import Transactions from "./transactions/transactions.component";
import ActionList from "./action-list/action-list.component";
import BankAccounts from "./bank-accounts/bank-accounts.component";

import FormView from "../form-view/form-view.component";

import "./banking.styles.scss";
import BankAccountForm from "./bank-account-form/bank-account-form.component";

import { activeFormView } from "../../shared/finance-tracker-item/finance-tracker-item.component";

const FINANCE_ITEM_TYPE = "Bank Accounts";

const financeTrackerItemNames = [
];

class Banking extends Component {
  // constructor(props) {
  //   super(props);
  // };

  render() {
    return (
      <div className="banking-container">
        {/* <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems> */}
        {/* <CreateAccount></CreateAccount> */}

        <BankAccounts label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></BankAccounts>

        {/* <BankAccountForm></BankAccountForm> */}
        {/* <FormView childrenComponents={  } financeItemLabel={ activeFormView.label } 
                  financeItemName={ activeFormView.name }></FormView> */}
      </div>
    );
  };
};

export default Banking;