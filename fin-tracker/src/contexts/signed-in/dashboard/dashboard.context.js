import { createContext, useState, useEffect, useContext } from "react";

import { BankingContext } from "../banking/banking.context";
import { InvestmentsContext } from "../investments/investments.context";
import { SavingsContext } from "../savings/savings.context";

export const DashboardContext = createContext({
  summaries: {},
});

export const DashboardProvider = ({ children }) => {
  const [summaries, setSummaries] = useState({});
  const value = { summaries }

  const { bankingSummary } = useContext(BankingContext);
  const { investmentsSummary } = useContext(InvestmentsContext);
  const { savingsAccountsSummary } = useContext(SavingsContext);

  useEffect(() => {
    // updating summaries
    setSummaries({
      bankingSummary: bankingSummary,
      investmentsSummary: investmentsSummary,
      savingsAccountsSummary: savingsAccountsSummary,
    });
  }, [bankingSummary, investmentsSummary, savingsAccountsSummary]);

  return (
    <DashboardContext.Provider value={ value }>
      { children }
    </DashboardContext.Provider>
  );
};
