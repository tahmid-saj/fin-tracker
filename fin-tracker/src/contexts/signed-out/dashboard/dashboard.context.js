import { createContext, useState, useEffect, useContext } from "react";

import { BankingContext } from "../banking/banking.context";
import { InvestmentsContext } from "../investments/investments.context";
import { SavingsContext } from "../savings/savings.context";

export const DashboardContext = createContext({
  summaries: {},
  // summaries structure:
  // {
  //   bankingSummary: bankingSummary -> from useContext,
  //   investmentsSummary: investmentsSummary -> from useContext,
  //   savingsAccountsSummary: savingsAccountsSummary -> from useContext
  // }

  userSummary: {},
  // useSummary structure:
  // {
  //   bankAccounts: bankingAccounts,
  //   investments: investments,
  //   savingsAccounts: savingsAccounts.
  // }
});

export const DashboardProvider = ({ children }) => {
  const [summaries, setSummaries] = useState({});
  const [userSummary, setUserSummary] = useState({});

  const value = { summaries, userSummary }

  const { bankingAccounts, bankingSummary } = useContext(BankingContext);
  const { investments, investmentsSummary } = useContext(InvestmentsContext);
  const { savingsAccounts, savingsAccountsSummary } = useContext(SavingsContext);

  useEffect(() => {
    // updating summaries
    setSummaries({
      bankingSummary: bankingSummary,
      investmentsSummary: investmentsSummary,
      savingsAccountsSummary: savingsAccountsSummary,
    });
  }, [bankingSummary, investmentsSummary, savingsAccountsSummary]);

  useEffect(() => {
    // updating userSummary if user is signed in
    setUserSummary({
      bankingAccounts: bankingAccounts,
      investments: investments,
      savingsAccounts: savingsAccounts
    })
  }, [bankingAccounts, investments, savingsAccounts]);

  return (
    <DashboardContext.Provider value={ value }>
      { children }
    </DashboardContext.Provider>
  );
};
