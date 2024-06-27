import { Fragment } from "react";

import "./finance-tracker-item-info.styles.scss";

// TODO: need to move FinanceTrackerItemInfo from shared to signed-in and signed-out folders
import InvestmentInfo from "../investments/investment-info/investment-info.component";
import InvestmentSummary from "../investments/summary/summary.component";

import AccountInfo from "../savings/account-info/account-info.component";
import SavingsSummary from "../savings/summary/summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const FinanceTrackerItemInfo = ({ label, financeItemInfo }) => {
  return (
    <Fragment>
      {
        label === FINANCE_ITEM_TYPES.investments &&
        <div className="investment-info-summary">
          <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
          <InvestmentSummary financeItemInfo={ financeItemInfo }></InvestmentSummary>
        </div>
      }

      {
        label === FINANCE_ITEM_TYPES.savings &&
        <div className="savings-account-info-summary">
          <AccountInfo financeItemInfo={ financeItemInfo }></AccountInfo>
          <SavingsSummary financeItemInfo={ financeItemInfo }></SavingsSummary>
        </div>
      }
    </Fragment>
  );
};

export default FinanceTrackerItemInfo;
