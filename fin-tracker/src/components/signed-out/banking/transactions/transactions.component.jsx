import { useContext } from "react";

import Transaction from "../transaction/transaction.component";
import "./transactions.styles.scss";

import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Transactions = ({ financeItemInfo
  // newTransaction, newTransactionAmount, transactions, transactionType 
}) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccount = bankingAccounts.find(account => account.name === financeItemInfo);
  const transactions = bankingAccount.transactions;

  return (
    <div className="transactions-container">

      <div className="transactions-scroll-container">
        {
          transactions.map(({ amount, type }, index) => {
              return bankingAccounts.length !== 0 && transactions.length !== 0 &&
              <Transaction key={ index } date={ currentDate } 
                            amount={ amount } type={ type }
                            ></Transaction>
          })
        }
      </div>
    </div>
  );
};

const Transactions2 = ({ newTransaction, newTransactionAmount, transactions, transactionType }) => {
  return (
    <div className="transactions-container">

      <div className="transactions-scroll-container">
        {
          transactions.map(({ amount, type }, index) => {
            return newTransaction && 
            <Transaction date={ currentDate } amount={ amount } type={ type }></Transaction>
          })
        }
      </div>
    </div>
  );
};

export default Transactions;