import React, { useContext } from "react";

import "./bank-accounts.styles.tsx";
import { BankAccountsContainer } from "./bank-accounts.styles.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import BankAccountForm from "../bank-account-form/bank-account-form.component.tsx";

const BankAccounts = () => {
  const { bankingAccounts } = useContext(BankingContext)

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