import { useContext } from "react";

import Transaction from "../transaction/transaction.component.tsx";
import "./transactions.styles.tsx";
import { TransactionsContainer } from "./transactions.styles.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Transactions = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccount = bankingAccounts.find(account => account.name === financeItemInfo.name);
  const transactions = bankingAccount?.transactions;

  return (
    <TransactionsContainer>
      {
        transactions?.map(({ amount, type, reason, addToExpenses }, index) => {
            return bankingAccounts.length !== 0 && transactions?.length !== 0 &&
            <Transaction key={ index } date={ currentDate } 
                          amount={ amount } type={ type } reason={ reason! }
                          addToExpenses={ addToExpenses }
                          ></Transaction>
        })
      }
    </TransactionsContainer>
  );
};

export default Transactions;