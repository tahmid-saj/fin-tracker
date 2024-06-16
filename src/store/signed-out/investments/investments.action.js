import { validateInvestmentCreation, validateInvestmentUpdate } from "../../../utils/validations/investments.validation";
import { calculateInvestment } from "../../../utils/calculations/investments.calculations";
import { createAction } from "../../../utils/reducer/reducer.utils";
import { INVESTMENTS_ACTION_TYPES } from "./investments.types";

// helper functions

const createInvestmentHelper = (investments, investment) => {
  // validating if investment exists in investments
  if (validateInvestmentCreation(investments, investment)) return investments;

  console.log(`Creating ${investment.investmentName}`);
  // TODO: need a helper function to update endBalance, totalContribution and totalInterest

  const investmentCalculation = calculateInvestment(investment)
  console.log(investmentCalculation)

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

const updateInvestmentHelper = (investments, originalInvestmentName, updatedInvestment) => {
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

const closeInvestmentHelper = (investments, closingInvestmentName) => {
  // return investments without the closingInvestmentName
  return investments.filter(investment => investment.investmentName !== closingInvestmentName);
};

const getInvestmentInfoHelper = (investments, investmentName) => {
  // return the investment with the given investmentName
  return investments.find(investment => String(investment.investmentName) === String(investmentName));
};

// actions

export const createInvestment = (investments, investment) => {
  const newInvestments = createInvestmentHelper(investments, investment)
  return createAction(INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS, newInvestments)
};

export const updateInvestment = (investments, originalInvestmentName, updatedInvestment) => {
  const newInvestments = updateInvestmentHelper(investments, originalInvestmentName, updatedInvestment)
  return createAction(INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS, newInvestments)
};

export const closeInvestment = (investments, closingInvestmentName) => {
  const newInvestments = closeInvestmentHelper(investments, closingInvestmentName)
  return createAction(INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS, newInvestments)
};

export const getInvestmentInfo = (investments, investmentName) => {
  return getInvestmentInfoHelper(investments, investmentName);
};

export const setInvestmentsSummary = (investmentsSummary) => {
  return createAction(INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS_SUMMARY, investmentsSummary)
}