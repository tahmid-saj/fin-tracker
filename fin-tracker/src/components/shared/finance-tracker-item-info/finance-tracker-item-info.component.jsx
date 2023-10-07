import { Fragment } from "react";

import "./finance-tracker-item-info.styles.scss";

import InvestmentInfo from "../../signed-out/investments/investment-info/investment-info.component";
import Summary from "../../signed-out/investments/summary/summary.component";

const FinanceTrackerItemInfo = ({ label, financeItemInfo }) => {
  return (
    <Fragment>
      {
        label === "Investments" &&
        <div className="investment-info-summary">
          <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
          <Summary financeItemInfo={ financeItemInfo }></Summary>
        </div>
      }
    </Fragment>
  );
};

export default FinanceTrackerItemInfo;
