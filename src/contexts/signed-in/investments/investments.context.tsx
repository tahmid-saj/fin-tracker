import React, { createContext, useState, useEffect, FC } from "react";

import { validateInvestmentCreation, validateInvestmentUpdate } from "../../../utils/validations/investments.validation";
import { calculateInvestment } from "../../../utils/calculations/investments.calculations";

import { DEFAULT_INVESTMENTS, DEFAULT_INVESTMENTS_SUMMARY } from "../../../utils/constants/investments.constants";

import { getInvestmentsData, getInvestmentsSummaryData,
  postInvestmentCreate, putInvestmentData, deleteInvestment,
  putInvestmentsData, putInvestmentsSummaryData } from "../../../utils/api-requests/investments.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { Investment, InvestmentContextType, InvestmentInfo, InvestmentProviderProps, InvestmentsSummary } from "./investments.types";

// helper functions

const createInvestmentHelper = async (investments: Investment[], investment: Investment, 
  userId: string | null | undefined, email: string | null | undefined): Promise<Investment[]> => {
  // validating if investment exists in investments
  if (validateInvestmentCreation(investments, investment)) return investments;

  

  // TODO: need a calculation function to update endBalance, totalContribution and totalInterest
  const investmentCalculation = calculateInvestment(investment);

  const investmentInfo = {
    ...investment,

    endBalance: Number(investmentCalculation.endBalance),
    totalContribution: Number(investmentCalculation.totalContribution),
    totalInterest: Number(investmentCalculation.totalInterest),

    investments: investmentCalculation.investments
  }

  postInvestmentCreate(userId, email, investmentInfo);

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
    }
  ];
};

const updateInvestmentHelper = async (investments: Investment[], originalInvestmentName: string, updatedInvestment: Investment, 
  userId: string | null | undefined, email: string | null | undefined): Promise<Investment[]> => {
  // validate if the fields in updatedInvestment are valid and the is not already another investment with the same name
  if (validateInvestmentUpdate(investments, originalInvestmentName, updatedInvestment)) return investments;
  
  // TODO: need a calculation function to update endBalance, totalContribution and totalInterest
  const investmentCalculation = calculateInvestment(updatedInvestment);
  
  const originalInvestment = investments.find((investment) => {
    return investment.investmentName === originalInvestmentName;
  });

  const investmentInfo: InvestmentInfo = {
    originalInvestmentInfo: originalInvestment as Investment,
    updatedInvestmentInfo: {
      ...updatedInvestment,

      endBalance: Number(investmentCalculation.endBalance),
      totalContribution: Number(investmentCalculation.totalContribution),
      totalInterest: Number(investmentCalculation.totalInterest),

      investments: investmentCalculation.investments
    }
  };
  putInvestmentData(userId, email, investmentInfo);
  
  // update investments with updatedInvestment for the investment with investment.investmentName === investmentName
  const updatedInvestments = investments.map((investment) => {
    if (investment.investmentName === originalInvestmentName) {
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


const closeInvestmentHelper = async (investments: Investment[], closingInvestmentName: string, 
  userId: string | null | undefined, email: string | null | undefined): Promise<Investment[]> => {
  deleteInvestment(userId, email, closingInvestmentName);

  // return investments without the closingInvestmentName
  return investments.filter(investment => investment.investmentName !== closingInvestmentName);
};

const getInvestmentInfoHelper = (investments: Investment[], investmentName: string): Investment | undefined => {
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

  // signing out
  setDefaultInvestmentsValues: () => {},
  setDefaultInvestmentsSummaryValues: () => {},
  updateInvestmentsAndSummary: () => {},
});

// context component
export const InvestmentsProvider: FC<InvestmentProviderProps> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[] | []>([]);
  const [investmentsSummary, setInvestmentsSummary] = useState<InvestmentsSummary>({});

  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    // TODO: move below to calculations
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

  useEffect(() => {
    async function fetchInvestmentsData() {
      if (currentUser) {
        const investmentsData = await getInvestmentsData(currentUser.uid, currentUser.email);
        const investmentsSummaryData = await getInvestmentsSummaryData(currentUser.uid, currentUser.email);

        if (investmentsData) {
          const { investments } = await investmentsData;
          setInvestments(investments);
        }

        if (investmentsSummaryData) {
          const { investmentsSummary } = await investmentsSummaryData;
          setInvestmentsSummary(investmentsSummary);
        }
      } else if (!currentUser) {
        setDefaultInvestmentsValues();
        setDefaultInvestmentsSummaryValues();
      }
    }
    fetchInvestmentsData();
  }, [currentUser])

  const createInvestment = async (investment: Investment) => {
    if (currentUser) {
      const res = await createInvestmentHelper(investments, investment, currentUser.uid, currentUser.email);
  
      setInvestments(res);
    }
  };

  const updateInvestment = async (originalInvestmentName: string, updatedInvestment: Investment) => {
    if (currentUser) {
      const res = await updateInvestmentHelper(investments, originalInvestmentName, updatedInvestment, 
        currentUser.uid, currentUser.email);
  
      setInvestments(res);
    }
  };

  const closeInvestment = async (closingInvestmentName: string) => {
    if (currentUser) {
      const res = await closeInvestmentHelper(investments, closingInvestmentName, currentUser.uid, currentUser.email);
  
      setInvestments(res);
    }
  };

  const getInvestmentInfo = (investmentName: string) => {
    return getInvestmentInfoHelper(investments, investmentName);
  };

  // set default investments
  const setDefaultInvestmentsValues = () => {
    setInvestments(setDefaultInvestmentsValuesHelper());
  };

  // set default investment summary
  const setDefaultInvestmentsSummaryValues = () => {
    setInvestmentsSummary(setDefaultInvestmentsSummaryValuesHelper());
  };

  // update investments and summary on sign out
  const updateInvestmentsAndSummary = () => {
    if (currentUser) {
      putInvestmentsData(currentUser.uid, currentUser.email, investments);
      putInvestmentsSummaryData(currentUser.uid, currentUser.email, investmentsSummary);
    }
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
