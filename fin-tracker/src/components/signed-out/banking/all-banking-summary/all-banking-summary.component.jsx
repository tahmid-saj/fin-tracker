import "./all-banking-summary.styles.scss";

import { useContext } from "react";

import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

const AllBankingSummary = () => {
  const { bankingSummary } = useContext(BankingContext);

  return (
    <div className="all-banking-summary-container">
      <h4>{`Total Balance - ${bankingSummary.currentAllBankingBalance}`}</h4>
      <h4>{`Total In - ${bankingSummary.totalAllBankingIn}`}</h4>
      <h4>{`Total Out - ${bankingSummary.totalAllBankingOut}`}</h4>
    </div>
  )
};

export default AllBankingSummary;