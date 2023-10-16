import { useContext } from "react";

import "./summary.styles.scss";

import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

export const Summary = ({ financeItemInfo }) => {
  
  const { getSavingsAccountInfo } = useContext(SavingsContext);

  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName);

  return (
    <div className="summary-container">
      <h5>{`Total savings $${savingsAccountInfo.totalSavings}`}</h5>
      <h5>{`Initial deposit $${savingsAccountInfo.initialDeposit}`}</h5>
      <h5>{`Total contribution $${savingsAccountInfo.totalContribution}`}</h5>
      <h5>{`Total interest $${savingsAccountInfo.totalInterest}`}</h5>
    </div>
  );
};

// export default Summary;