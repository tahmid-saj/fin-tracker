import { errorOnInvestmentAlreadyExists, errorOnInvalidInvestmentNameAndType,
        errorOnInvalidInvestmentInputs } from "../errors/investments.errors";

// investments validation functions

export const validateInvestmentCreation = (investments, investment) => {
  const investmentExists = investments.find((inv) => inv.investmentName === investment.investmentName);

  if (investmentExists) {
    errorOnInvestmentAlreadyExists();
    return true;
  }

  // validating if investment fields are correct

  // strings
  if (!(/^[A-Za-z]*$/.test(String(investment.investmentName))) || 
    !(/^[A-Za-z]*$/.test(String(investment.investmentType)))) {
    errorOnInvalidInvestmentNameAndType();
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(investment.startingAmount))) || Number(investment.startingAmount) < 0 ||
    !(/^[0-9]*$/.test(String(investment.afterYears))) || Number(investment.afterYears) <= 0 ||
    !(/^[0-9]*$/.test(String(investment.returnRate))) || Number(investment.returnRate) <= 0 ||
    !(/^[0-9]*$/.test(String(investment.additionalContribution))) || Number(investment.additionalContribution) < 0) {
      errorOnInvalidInvestmentInputs();
      return true;
  }

  return false;
};

export const validateInvestmentUpdate = (investments, originalInvestmentName, updatedInvestment) => {
  // validate fields of updatedInvestment
  
  // strings
  if (!(/^[A-Za-z]*$/.test(String(updatedInvestment.investmentName))) || 
    !(/^[A-Za-z]*$/.test(String(updatedInvestment.investmentType)))) {
    errorOnInvalidInvestmentNameAndType();
    return true;
  }

  // number
  if (!(/^[0-9]*$/.test(String(updatedInvestment.startingAmount))) || Number(updatedInvestment.startingAmount) < 0 ||
    !(/^[0-9]*$/.test(String(updatedInvestment.afterYears))) || Number(updatedInvestment.afterYears) <= 0 ||
    !(/^[0-9]*$/.test(String(updatedInvestment.returnRate))) || Number(updatedInvestment.returnRate) <= 0 ||
    !(/^[0-9]*$/.test(String(updatedInvestment.additionalContribution || Number(updatedInvestment.additionalContribution) < 0)))) {
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
