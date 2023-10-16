import { createContext, useState, useEffect } from "react";

// helper functions

// validation functions

// helpers
const createInvestmentHelper = (investments, investment) => {
  console.log(`Creating ${investment.investmentName}`);

  // add investment to investments
  return [ ...investments,
    {
      investmentName: investment.investmentName,
      investmentType:investment.investmentType,
      startingAmount:investment.startingAmount,
      startDate: investment.startingDate,
      afterYears: investment.afterYears,
      returnRate: investment.returnRate,
      compounded: investment.compounded,
      additionalContribution: investment.additionalContribution,
      contributionAt: investment.contributionAt,
      contributionInterval: investment.contributionInterval,

      endBalance: investment.endBalance,
      totalContribution: investment.totalContribution,
      totalInterest: investment.totalInterest,
    }];
};

const updateInvestmentHelper = (investments, originalInvestmentName, updatedInvestment) => {
  // update investments with updatedInvestment for the investment with investment.investmentName === investmentName
  const updatedInvestments = investments.map((investment) => {
    if (investment.investmentName === originalInvestmentName) {
      return {
        ...updatedInvestment,

        endBalance: investment.endBalance,
        totalContribution: investment.totalContribution,
        totalInterest: investment.totalInterest,
      }
    }

    return investment;
  });

  return updatedInvestments;
};

const closeInvestmentHelper = (investments, closingInvestmentName) => {
  // return investments without the closingInvestmentName
  return investments.filter(investment => investment.investmentName !== closingInvestmentName);
};

// initial state
export const InvestmentsContext = createContext({
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

  //     // displayed in summary component
  //     endBalance: 1000,
  //     totalContribution: 600,
  //     totalInterest: 200
  //   }
  // ]

  createInvestment: () => {},
  updateInvestment: () => {},
  closeInvestment: () => {},

  investmentsSummary: {},
  // investmentSummary structure:
  // {
  //   currentAllInvestmentsBalance: 2000,
  //   totalAllContribution: 600,
  //   totalAllInterest: 200,
  // }
});

// context component
export const InvestmentsProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);
  const [investmentsSummary, setInvestmentsSummary] = useState({});

  useEffect(() => {
    const newAllInvestmentsBalance = investments.reduce((allInvestmentsBalance, { endBalance }) => {
      return allInvestmentsBalance + endBalance;
    }, 0);

    const newAllTotalContribution = investments.reduce((newAllTotalContribution, { totalAllContribution }) => {
      return newAllTotalContribution + totalAllContribution;
    }, 0);

    const newAllInterest = investments.reduce((allInterest, { totalAllInterest }) => {
      return allInterest + totalAllInterest;
    }, 0);

    console.log(investments);

    setInvestmentsSummary({ newAllInvestmentsBalance: newAllInvestmentsBalance, 
                            newAllTotalContribution: newAllTotalContribution, 
                            newAllInterest: newAllInterest });
  }, [investments]);

  const createInvestment = (investment) => {
    setInvestments(createInvestmentHelper(investments, investment));
  };

  const updateInvestment = (originalInvestmentName, updatedInvestment) => {
    setInvestments(updateInvestmentHelper(investments, originalInvestmentName, updatedInvestment));
  };

  const closeInvestment = (closingInvestmentName) => {
    setInvestments(closeInvestmentHelper(investments, closingInvestmentName));
  };

  const value = { investments, createInvestment, updateInvestment, 
                  closeInvestment, investmentsSummary };

  return (
    <InvestmentsContext.Provider
      value={ value }>
      { children }
    </InvestmentsContext.Provider>
  )
};
