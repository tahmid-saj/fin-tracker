import React, { useContext } from "react";
import { useSelector } from "react-redux";
import "./bank-accounts.styles.tsx";
import { BankAccountsContainer } from "./bank-accounts.styles.tsx";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector.ts";
import BankAccountForm from "../bank-account-form/bank-account-form.component.tsx";

const BankAccounts = () => {
  const bankingAccounts = useSelector(selectBankingAccounts)

  return (
    <BankAccountsContainer>
      {
        bankingAccounts?.map((account, index) => {
          return (
            <BankAccountForm key={ index } financeItemInfo={ account }></BankAccountForm>
          )
        })
      }
    </BankAccountsContainer>
  );
};

export default BankAccounts;
