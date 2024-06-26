import React, { useContext } from "react";
import { useSelector } from "react-redux";
import "./bank-accounts.styles.jsx";
import { BankAccountsContainer } from "./bank-accounts.styles.jsx";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import BankAccountForm from "../bank-account-form/bank-account-form.component";

const BankAccounts = () => {
  const bankingAccounts = useSelector(selectBankingAccounts)

  return (
    <BankAccountsContainer>
      {
        bankingAccounts.map((account, index) => {
          return (
            <BankAccountForm key={ index } financeItemInfo={ account }></BankAccountForm>
          )
        })
      }
    </BankAccountsContainer>
  );
};

export default BankAccounts;
