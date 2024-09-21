import { BankingAccount, BankingSummary } from "../../contexts/signed-out/banking/banking.types"

// banking calculations

export const calculateBankingSummary = (bankingAccounts: BankingAccount[]) => {
  const newAllBankingBalance = bankingAccounts.reduce((allBankingBalance, { currentBalance }) => {
    return allBankingBalance + currentBalance;
  }, 0);

  const newAllBankingIn = bankingAccounts.reduce((allBankingIn, { totalIn }) => {
    return allBankingIn + totalIn;
  }, 0);

  const newAllBankingOut = bankingAccounts.reduce((allBankingOut, { totalOut }) => {
    return allBankingOut + totalOut;
  }, 0);

  return {
    newAllBankingBalance: newAllBankingBalance,
    newAllBankingIn: newAllBankingIn,
    newAllBankingOut: newAllBankingOut,
  };
};