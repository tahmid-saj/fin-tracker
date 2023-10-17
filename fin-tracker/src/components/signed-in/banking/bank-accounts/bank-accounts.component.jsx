import React, { useContext } from "react";

import "./bank-accounts.styles.scss";

import CreateAccount from "../create-account/create-account.component";
// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

const BankAccounts = ({ label, 
  // financeTrackerItemNames 
}) => {

  // const { bankingAccounts, createBankingAccount } = useContext(BankingContext);

  // const financeTrackerItemNames = bankingAccounts.map((account) => {
  //   return account.name;
  // });

  // const handleCreateBankAccount = (bankingAccountName) => {
  //   if (bankingAccounts.find(account => account.name === bankingAccountName)) return false;

  //   createBankingAccount(bankingAccountName);
  //   console.log(bankingAccounts);
  //   return true;
  // };

  return (
    <div>
      <CreateAccount label={ label } 
                    // financeTrackerItemNames={ financeTrackerItemNames }
                    // handleCreateBankAccount={ handleCreateBankAccount }
                    ></CreateAccount>
    </div>
  );
};

export default BankAccounts;
