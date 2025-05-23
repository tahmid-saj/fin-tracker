import { useContext } from "react";

import Transaction from "../transaction/transaction.component.tsx";
import "./transactions.styles.tsx";
import { TransactionsContainer } from "./transactions.styles.tsx";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector.ts";
import { BankingAccount } from "../../../../store/signed-out/banking/banking.types.ts";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth() + 1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Transactions = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const bankingAccounts = useSelector(selectBankingAccounts)

  const bankingAccount = bankingAccounts?.find(account => account.name === financeItemInfo.name);
  const transactions = bankingAccount?.transactions;

  return (
    <TransactionsContainer>
      {
        transactions?.map(({ amount, type, reason, addToExpenses }, index) => {
            return bankingAccounts?.length !== 0 && transactions.length !== 0 &&
            <Transaction key={ index } date={ currentDate } 
                          amount={ String(amount) } type={ type } reason={ String(reason) }
                          addToExpenses={ Boolean(addToExpenses) }
                          ></Transaction>
        })
      }
    </TransactionsContainer>
  );
};

export default Transactions;