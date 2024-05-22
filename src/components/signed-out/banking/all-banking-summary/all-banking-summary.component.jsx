import "./all-banking-summary.styles.scss";

import { useContext } from "react";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingSummary } from "../../../../store/signed-out/banking/banking.selector";

const AllBankingSummary = () => {
  const bankingSummary = useSelector(selectBankingSummary);

  return (
    <div className="all-banking-summary-container">
      <h4>{`Total Banking Balance - $${bankingSummary.currentAllBankingBalance}`}</h4>
      <h4>{`Total In - $${bankingSummary.totalAllBankingIn}`}</h4>
      <h4>{`Total Out - $${bankingSummary.totalAllBankingOut}`}</h4>
    </div>
  )
};

export default AllBankingSummary;