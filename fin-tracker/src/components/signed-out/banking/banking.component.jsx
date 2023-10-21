import React, { Component, useContext } from "react";

// import FinanceTrackerItems from "../../shared/finance-tracker-items/finance-tracker-items.component";
// import CreateAccount from "./create-account/create-account.component";
// import Summary from "./summary/summary.component";
// import Transactions from "./transactions/transactions.component";
// import ActionList from "./action-list/action-list.component";
import BankAccounts from "./bank-accounts/bank-accounts.component";

// import FormView from "../form-view/form-view.component";

import "./banking.styles.scss";
// import BankAccountForm from "./bank-account-form/bank-account-form.component";

// import { activeFormView } from "../../shared/finance-tracker-item/finance-tracker-item.component";

import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
import AllBankingSummary from "./all-banking-summary/all-banking-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/banking.constants";

// const financeTrackerItemNames = [
// ];

const Banking = () => {
  // constructor(props) {
  //   super(props);
  // };

  const { bankingAccounts } = useContext(BankingContext);

  // render() {
  return (
    <div className="banking-container">
      {/* <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems> */}
      {/* <CreateAccount></CreateAccount> */}
      
      {
        bankingAccounts.length !== 0 && <AllBankingSummary></AllBankingSummary>
      }

      <BankAccounts label={ FINANCE_ITEM_TYPES.banking } 
                    // financeTrackerItemNames={ financeTrackerItemNames }
                    ></BankAccounts>

      {/* <BankAccountForm></BankAccountForm> */}
      {/* <FormView childrenComponents={  } financeItemLabel={ activeFormView.label } 
                financeItemName={ activeFormView.name }></FormView> */}
    </div>
  );
  // };
};

export default Banking;