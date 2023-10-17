import { Fragment } from "react";

import "./finance-tracker-item-info.styles.scss";

// TODO: need to move FinanceTrackerItemInfo from shared to signed-in and signed-out folders
import InvestmentInfo from "../investments/investment-info/investment-info.component";
import { Summary as InvestmentSummary} from "../investments/summary/summary.component";

import AccountInfo from "../savings/account-info/account-info.component";
import { Summary as SavingsSummary} from "../savings/summary/summary.component";

const FinanceTrackerItemInfo = ({ label, financeItemInfo }) => {
  return (
    <Fragment>
      {
        label === "Investments" &&
        <div className="investment-info-summary">
          <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
          <InvestmentSummary financeItemInfo={ financeItemInfo }></InvestmentSummary>
        </div>
      }

      {
        label === "Savings Accounts" &&
        <div className="savings-account-info-summary">
          <AccountInfo financeItemInfo={ financeItemInfo }></AccountInfo>
          <SavingsSummary financeItemInfo={ financeItemInfo }></SavingsSummary>
        </div>
      }
    </Fragment>
  );
};

export default FinanceTrackerItemInfo;
