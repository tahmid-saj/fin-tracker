import { createContext, useState, useEffect, useContext } from "react";

import { validateInvestmentCreation, validateInvestmentUpdate } from "../../../utils/validations/investments.validation";
import { calculateInvestmentSummary } from "../../../utils/calculations/investments.calculations";
import { UserContext } from "../../shared/user/user.context";

import { DEFAULT_INVESTMENTS, DEFAULT_INVESTMENTS_SUMMARY } from "../../../utils/constants/investments.constants";

import { getInvestmentsData, getInvestmentsSummaryData,
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } from "../../../utils/api-requests/investments.requests";

// helper functions

const createInvestmentHelper = async (investments, investment, userId, email) => {
  // validating if investment exists in investments
  if (validateInvestmentCreation(investments, investment)) return investments;

  postInvestmentCreate(userId, email, investment);

  console.log(`Creating ${investment.investmentName}`);
  // TODO: need a calculation function to update endBalance, totalContribution and totalInterest

  const summary = calculateInvestmentSummary(investment);

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

      endBalance: summary.endBalance,
      totalContribution: summary.totalContribution,
      totalInterest: summary.totalInterest,
    }];
};

const updateInvestmentHelper = async (investments, originalInvestmentName, updatedInvestment, userId, email) => {
  // validate if the fields in updatedInvestment are valid and the is not already another investment with the same name
  if (validateInvestmentUpdate(investments, originalInvestmentName, updatedInvestment)) return investments;
  
  // putInvestmentData(userId, email, originalInvestmentName, updatedInvestment);

  // TODO: need a calculation function to update endBalance, totalContribution and totalInterest
  
  // update investments with updatedInvestment for the investment with investment.investmentName === investmentName
  const updatedInvestments = investments.map((investment) => {
    if (investment.investmentName === originalInvestmentName) {
      const summary = calculateInvestmentSummary(updatedInvestment);

      return {
        ...updatedInvestment,

        endBalance: summary.endBalance,
        totalContribution: summary.totalContribution,
        totalInterest: summary.totalInterest,
      }
    }

    return investment;
  });

  return updatedInvestments;
};

const closeInvestmentHelper = async (investments, closingInvestmentName, userId, email) => {
  // deleteInvestment(userId, email, closingInvestmentName);

  // return investments without the closingInvestmentName
  return investments.filter(investment => investment.investmentName !== closingInvestmentName);
};

const getInvestmentInfoHelper = (investments, investmentName) => {
  // return the investment with the given investmentName
  return investments.find(investment => String(investment.investmentName) === String(investmentName));
};

// set default investments values
const setDefaultInvestmentsValuesHelper = () => {
  return DEFAULT_INVESTMENTS;
};

// set default investments summary values
const setDefaultInvestmentsSummaryValuesHelper = () => {
  return DEFAULT_INVESTMENTS_SUMMARY;
}

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

  // signing out
  setDefaultInvestmentsValues: () => {},
  setDefaultInvestmentsSummaryValues: () => {},
  updateInvestmentsAndSummary: () => {},
});

// context component
export const InvestmentsProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);
  const [investmentsSummary, setInvestmentsSummary] = useState({});

  const { currentUser } = useContext(UserContext);

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

  useEffect(() => {
    async function fetchInvestmentsData() {
      if (currentUser) {
        const { investments } = await getInvestmentsData(currentUser.uid, currentUser.email);
        const { investmentsSummary } = await getInvestmentsSummaryData(currentUser.uid, currentUser.email);

        setInvestments(investments);
        setInvestmentsSummary(investmentsSummary);
      } else if (!currentUser) {
        setDefaultInvestmentsValues();
        setDefaultInvestmentsSummaryValues();
      }
    }
    // TODO: uncomment when working on getting and updating data from sign in / sign out
    // fetchInvestmentsData();
  }, [currentUser])

  const createInvestment = async (investment) => {
    const res = await createInvestmentHelper(investments, investment, currentUser.uid, currentUser.email);

    setInvestments(res);
  };

  const updateInvestment = async (originalInvestmentName, updatedInvestment) => {
    const res = await updateInvestmentHelper(investments, originalInvestmentName, updatedInvestment, 
      currentUser.uid, currentUser.email);

    setInvestments(res);
  };

  const closeInvestment = async (closingInvestmentName) => {
    const res = await closeInvestmentHelper(investments, closingInvestmentName, currentUser.uid, currentUser.email);

    setInvestments(res);
  };

  const getInvestmentInfo = (investmentName) => {
    return getInvestmentInfoHelper(investments, investmentName);
  };

  // set default investments
  const setDefaultInvestmentsValues = () => {
    setInvestments(setDefaultInvestmentsValuesHelper());
  };

  // set default investment summary
  const setDefaultInvestmentsSummaryValues = () => {
    setDefaultInvestmentsSummaryValues(setDefaultInvestmentsSummaryValuesHelper());
  };

  // update investments and summary on sign out
  const updateInvestmentsAndSummary = () => {
    // TODO: uncomment when working on updating data from sign out
    // putInvestmentsData(currentUser.uid, currentUser.email, investments);
    // putInvestmentsSummaryData(currentUser.uid, currentUser.email, investmentsSummary);
  };

  const value = { investments, createInvestment, updateInvestment, 
                  closeInvestment, getInvestmentInfo, investmentsSummary,
                  setDefaultInvestmentsValues, setDefaultInvestmentsSummaryValues, updateInvestmentsAndSummary };

  return (
    <InvestmentsContext.Provider
      value={ value }>
      { children }
    </InvestmentsContext.Provider>
  )
};
