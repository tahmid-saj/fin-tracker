import { useContext } from "react";

import "./summary.styles.scss";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Summary = ({ financeItemInfo }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccount = bankingAccounts.find(account => account.name === financeItemInfo);

  return (
    <div className="bank-account-summary">
      <h4>{`Current balance   `}<strong>{`$${bankingAccount.currentBalance}`}</strong></h4>
      <h5>{`As of ${currentDate}`}</h5>

      <h4>{`IN $${bankingAccount.totalIn}  -  OUT $${bankingAccount.totalOut}`}</h4>
    </div>
  );
};

export default Summary;