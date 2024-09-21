import { Investment } from "../../contexts/signed-in/investments/investments.types";
import { REGEX_PATTERNS } from "../constants/regex.constants";
import { errorOnInvestmentAlreadyExists, errorOnInvalidInvestmentNameAndType,
        errorOnInvalidInvestmentInputs } from "../errors/investments.errors";

// investments validation functions

export const validateInvestmentCreation = (investments: Investment[], investment: Investment): boolean => {
  const investmentExists = investments.find((inv) => inv.investmentName === investment.investmentName);

  if (investmentExists) {
    errorOnInvestmentAlreadyExists();
    return true;
  }

  // validating if investment fields are correct

  // strings
  if (!(REGEX_PATTERNS.names.test(String(investment.investmentName))) || 
    !(REGEX_PATTERNS.names.test(String(investment.investmentType)))) {
    errorOnInvalidInvestmentNameAndType();
    return true;
  }

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(investment.startingAmount))) || Number(investment.startingAmount) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(investment.afterYears))) || Number(investment.afterYears) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(investment.returnRate))) || Number(investment.returnRate) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(investment.additionalContribution))) || Number(investment.additionalContribution) < 0) {
      errorOnInvalidInvestmentInputs();
      return true;
  }

  return false;
};

export const validateInvestmentUpdate = (investments: Investment[], originalInvestmentName: string, updatedInvestment: Investment): boolean => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(REGEX_PATTERNS.names.test(String(updatedInvestment.investmentName))) || 
    !(REGEX_PATTERNS.names.test(String(updatedInvestment.investmentType)))) {
    errorOnInvalidInvestmentNameAndType();
    return true;
  }

  // number
  if (!(REGEX_PATTERNS.floatNumbers.test(String(updatedInvestment.startingAmount))) || Number(updatedInvestment.startingAmount) < 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedInvestment.afterYears))) || Number(updatedInvestment.afterYears) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedInvestment.returnRate))) || Number(updatedInvestment.returnRate) <= 0 ||
    !(REGEX_PATTERNS.floatNumbers.test(String(updatedInvestment.additionalContribution || Number(updatedInvestment.additionalContribution) < 0)))) {
      errorOnInvalidInvestmentInputs();
      return true;
  }

  // validate if updatedInvestment.investmentName already exists in investments
  if (investments.find(investment => (String(investment.investmentName) === String(updatedInvestment.investmentName)) && 
                                      String(updatedInvestment.investmentName) !== String(originalInvestmentName))) {
    errorOnInvestmentAlreadyExists();
    return true;
  }

  return false;
};
