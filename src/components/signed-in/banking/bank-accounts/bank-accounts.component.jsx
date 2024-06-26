import React, { useContext } from "react";

import "./bank-accounts.styles.jsx";
import { BankAccountsContainer } from "./bank-accounts.styles.jsx";

import CreateAccount from "../create-account/create-account.component";
import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.js";
import BankAccountForm from "../bank-account-form/bank-account-form.component";

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