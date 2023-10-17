import { createContext, useState, useEffect } from "react";

// helper functions

// validation functions
const validateInvestmentCreation = (investments, investment) => {
  const investmentExists = investments.find((inv) => inv.investmentName === investment.investmentName);

  if (investmentExists) {
    console.log("Investment already exists");
    return true;
  }

  // validating if investment fields are correct

  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(investment.investmentName))) || 
    !(/^[A-Za-z0-9]*$/.test(String(investment.investmentType)))) {
    console.log("Invalid invest name / investment type");
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(investment.startingAmount))) || Number(investment.startingAmount) < 0 ||
    !(/^[0-9]*$/.test(String(investment.afterYears))) || Number(investment.afterYears) < 0 ||
    !(/^[0-9]*$/.test(String(investment.returnRate))) || 
    !(/^[0-9]*$/.test(String(investment.additionalContribution))) || Number(investment.additionalContribution) < 0) {
      console.log("Invalid starting amount / after years / return rate / additional contribution");
      return true;
  }

  return false;
};

const validateInvestmentUpdate = (investments, originalInvestmentName, updatedInvestment) => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(/^[A-Za-z0-9]*$/.test(String(updatedInvestment.investmentName))) || 
    !(/^[A-Za-z0-9]*$/.test(String(updatedInvestment.investmentType)))) {
    console.log("Invalid invest name / investment type");
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(updatedInvestment.startingAmount))) || Number(updatedInvestment.startingAmount) < 0 ||
    !(/^[0-9]*$/.test(String(updatedInvestment.afterYears))) || Number(updatedInvestment.afterYears) < 0 ||
    !(/^[0-9]*$/.test(String(updatedInvestment.returnRate))) || 
    !(/^[0-9]*$/.test(String(updatedInvestment.additionalContribution || Number(updatedInvestment.additionalContribution) < 0)))) {
      console.log("Invalid starting amount / after years / return rate / additional contribution");
      return true;
  }

  // validate if updatedInvestment.investmentName already exists in investments
  if (investments.find(investment => (String(investment.investmentName) === String(updatedInvestment.investmentName)) && 
                                      String(updatedInvestment.investmentName) !== String(originalInvestmentName))) {
    return true;
  }

  return false;
};

// helpers
const createInvestmentHelper = (investments, investment) => {
  // validating if investment exists in investments
  if (validateInvestmentCreation(investments, investment)) return investments;

  console.log(`Creating ${investment.investmentName}`);
  // TODO: need a helper function to update endBalance, totalContribution and totalInterest

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

      endBalance: 0,
      totalContribution: 0,
      totalInterest: 0,
    }];
};

const updateInvestmentHelper = (investments, originalInvestmentName, updatedInvestment) => {
  // validate if the fields in updatedInvestment are valid and the is not already another investment with the same name
  if (validateInvestmentUpdate(investments, originalInvestmentName, updatedInvestment)) return investments;

  // TODO: need a helper function to update endBalance, totalContribution and totalInterest
  
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

const getInvestmentInfoHelper = (investments, investmentName) => {
  // return the investment with the given investmentName
  return investments.find(investment => investment.investmentName === investmentName);
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

  //     displayed in summary component
  //     endBalance: 1000,
  //     totalContribution: 600,
  //     totalInterest: 200
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
export const InvestmentsProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);
  const [investmentsSummary, setInvestmentsSummary] = useState({});

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

    console.log(investments);

    setInvestmentsSummary({ 
      currentAllInvestmentsBalance: newAllInvestmentsBalance, 
      totalAllContribution: newTotalAllContribution, 
      totalAllInterest: newAllInterest,
    });
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

  const getInvestmentInfo = (investmentName) => {
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
