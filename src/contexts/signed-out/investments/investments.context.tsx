import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

import { validateInvestmentCreation, validateInvestmentUpdate } from "../../../utils/validations/investments.validation";
import { calculateInvestment } from "../../../utils/calculations/investments.calculations";
import { Investment, InvestmentCalculationRecord, InvestmentContextType, InvestmentProviderProps, InvestmentsSummary } from "./investments.types"

// helper functions

const createInvestmentHelper = (investments: Investment[], investment: Investment): Investment[] => {
  // validating if investment exists in investments
  if (validateInvestmentCreation(investments, investment)) return investments;

  
  // TODO: need a helper function to update endBalance, totalContribution and totalInterest

  const investmentCalculation = calculateInvestment(investment)

  // add investment to investments
  return [ ...investments,
    {
      investmentName: String(investment.investmentName),
      investmentType: String(investment.investmentType),
      startingAmount: Number(investment.startingAmount),
      startDate: String(investment.startDate),
      afterYears: Number(investment.afterYears),
      returnRate: Number(investment.returnRate),
      compounded: String(investment.compounded),
      additionalContribution: Number(investment.additionalContribution),
      contributionAt: String(investment.contributionAt),
      contributionInterval: String(investment.contributionInterval),

      endBalance: Number(investmentCalculation.endBalance),
      totalContribution: Number(investmentCalculation.totalContribution),
      totalInterest: Number(investmentCalculation.totalInterest),

      investments: investmentCalculation.investments
    }];
};

const updateInvestmentHelper = (investments: Investment[], originalInvestmentName: string, 
  updatedInvestment: Investment): Investment[] => {
  // validate if the fields in updatedInvestment are valid and the is not already another investment with the same name
  if (validateInvestmentUpdate(investments, originalInvestmentName, updatedInvestment)) return investments;

  // TODO: need a helper function to update endBalance, totalContribution and totalInterest
  
  // update investments with updatedInvestment for the investment with investment.investmentName === investmentName
  const updatedInvestments = investments.map((investment) => {
    if (investment.investmentName === originalInvestmentName) {
      const investmentCalculation = calculateInvestment(investment)

      return {
        ...updatedInvestment,

        endBalance: Number(investmentCalculation.endBalance),
        totalContribution: Number(investmentCalculation.totalContribution),
        totalInterest: Number(investmentCalculation.totalInterest),

        investments: investmentCalculation.investments
      }
    }

    return investment;
  });

  return updatedInvestments;
};

const closeInvestmentHelper = (investments: Investment[], closingInvestmentName: string): Investment[] => {
  // return investments without the closingInvestmentName
  return investments.filter(investment => investment.investmentName !== closingInvestmentName);
};

const getInvestmentInfoHelper = (investments: Investment[], investmentName: string): Investment | undefined => {
  // return the investment with the given investmentName
  return investments.find(investment => String(investment.investmentName) === String(investmentName));
};

// initial state
export const InvestmentsContext = createContext<InvestmentContextType>({
  investments: [],
  // investments structure:
  // [
  //   {
  //     investmentName: "stock1",
  //     investmentType: "stock",
  //     startingAmount: 50,
  //     startDate: new Date(),
  //     afterYears: 3,
  //     returnRate: 3.1,
  //     compounded: "Annually",
  //     additionalContribution: 300,
  //     contributionAt: "Beginning",
  //     contributionInterval: "Year",

  //     displayed in summary component
  //     endBalance: 1000,
  //     totalContribution: 600,
  //     totalInterest: 200
      
     //  investments: [
     //   {
     //     currentDate: ,
     //     contribution: ,
     //     interestAccumulated: ,
     //     endingBalance: ,
     //   }
     //  ]
  //   }
  // ]

  createInvestment: () => {},
  updateInvestment: () => {},
  closeInvestment: () => {},
  getInvestmentInfo: () => {},

  investmentsSummary: {},
  // investmentSummary structure:
  // {
  //   currentAllInvestmentsBalance: 2000,
  //   totalAllContribution: 600,
  //   totalAllInterest: 200,
  // }
});

// context component
export const InvestmentsProvider: FC<InvestmentProviderProps> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[] | []>([]);
  const [investmentsSummary, setInvestmentsSummary] = useState<InvestmentsSummary | {}>({});

  useEffect(() => {
    const newAllInvestmentsBalance = investments.reduce((allInvestmentsBalance, { endBalance }) => {
      return allInvestmentsBalance + endBalance;
    }, 0);

    const newTotalAllContribution = investments.reduce((newTotalAllContribution, { totalContribution }) => {
      return newTotalAllContribution + totalContribution;
    }, 0);

    const newAllInterest = investments.reduce((allInterest, { totalInterest }) => {
      return allInterest + totalInterest;
    }, 0);

    

    setInvestmentsSummary({ 
      currentAllInvestmentsBalance: newAllInvestmentsBalance, 
      totalAllContribution: newTotalAllContribution, 
      totalAllInterest: newAllInterest,
    });
  }, [investments]);

  const createInvestment = (investment: Investment) => {
    setInvestments(createInvestmentHelper(investments, investment));
  };

  const updateInvestment = (originalInvestmentName: string, updatedInvestment: Investment) => {
    setInvestments(updateInvestmentHelper(investments, originalInvestmentName, updatedInvestment));
  };

  const closeInvestment = (closingInvestmentName: string) => {
    setInvestments(closeInvestmentHelper(investments, closingInvestmentName));
  };

  const getInvestmentInfo = (investmentName: string) => {
    return getInvestmentInfoHelper(investments, investmentName);
  };

  const value = { investments, createInvestment, updateInvestment, 
                  closeInvestment, getInvestmentInfo, investmentsSummary };

  return (
    <InvestmentsContext.Provider
      value={ value }>
      { children }
    </InvestmentsContext.Provider>
  )
};
