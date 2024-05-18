import { createContext, useState, useEffect, useContext } from "react";

import { BankingContext } from "../banking/banking.context";
import { InvestmentsContext } from "../investments/investments.context";
import { SavingsContext } from "../savings/savings.context";
import { UserContext } from "../../shared/user/user.context";

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
  //   userId: "generated from firebase",
  //   email: "generated from firebase",
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
  const { currentUser } = useContext(UserContext);

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
    if (currentUser) {
      setUserSummary({
        userId: currentUser.uid,
        email: currentUser.email,
        bankingAccounts: bankingAccounts,
        investments: investments,
        savingsAccounts: savingsAccounts
      })
    } 
    
  }, [bankingAccounts, investments, savingsAccounts]);

  return (
    <DashboardContext.Provider value={ value }>
      { children }
    </DashboardContext.Provider>
  );
};
