import { useContext } from "react";

import "./summary.styles.scss";

import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";

export const Summary = ({ financeItemInfo }) => {
  
  const { getSavingsAccountInfo } = useContext(SavingsContext);

  const savingsAccountInfo = getSavingsAccountInfo(financeItemInfo.savingsAccountName);

  return (
    <div className="summary-container">
      <p>{`Total savings $${Number(savingsAccountInfo.totalSavings).toFixed(2)}`}</p>
      <p>{`Initial deposit $${Number(savingsAccountInfo.initialDeposit).toFixed(2)}`}</p>
      <p>{`Total contribution $${Number(savingsAccountInfo.totalContribution).toFixed(2)}`}</p>
      <p>{`Total interest $${Number(savingsAccountInfo.totalInterest).toFixed(2)}`}</p>
    </div>
  );
};

// export default Summary;