import React, { Component, useContext } from "react";
// import FinanceTrackerItems from "../../shared/finance-tracker-items/finance-tracker-items.component";

import "./savings.styles.scss";
// import UpdateAccountForm from "./update-account-form/update-account-form.component";
import CreateAccountForm from "./create-account-form/create-account-form.component";
// import AccountInfo from "./account-info/account-info.component";
// import Summary from "./summary/summary.component";

import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
import AllSavingsSummary from "./all-savings-summary/all-savings-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const financeTrackerItemNames = [
]

const Savings = () => {
  const { savingsAccounts } = useContext(SavingsContext);

  return (
    <div className="savings-acounts-container">
      {/* <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems> */}
        {
          savingsAccounts.length !== 0 && <AllSavingsSummary></AllSavingsSummary>
        }
        
        <CreateAccountForm label={ FINANCE_ITEM_TYPES.savings } 
                          // financeTrackerItemNames={ financeTrackerItemNames }
                          ></CreateAccountForm>

      <div className="savings-accounts-form-summary-container">

        <div className="savings-account-info-summary">
          {/* <AccountInfo></AccountInfo>
          <Summary></Summary> */}
        </div>
      </div>
    </div>
  );
};

// const Savings2 = () => {
//   return (
//     <div className="savings-acounts-container">
//       {/* <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems> */}
//         <CreateAccountForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></CreateAccountForm>

//       <div className="savings-accounts-form-summary-container">

//         <div className="savings-account-info-summary">
//           {/* <AccountInfo></AccountInfo>
//           <Summary></Summary> */}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Savings;