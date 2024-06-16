import { AVERAGE_DAYS_IN_MONTH } from "./savings.constants";

// investments constants

export const INVESTMENT_CONTRIBUTION_INTERVALS = {
  month: "Month",
  year: "Year",
};

export const INVESTMENT_CONTRIBUTION_AT = {
  end: "End",
  beginning: "Beginning"
}

export const DEFAULT_INVESTMENTS = [];

export const DEFAULT_INVESTMENTS_SUMMARY = {};

export const INVESTMENT_CONFIRM_CLOSE = {
  yes: "Yes",
  no: "No"
};

export const INVESTMENT_COMPOUNDING_PERIODS = {
  annually: "Annually",
  semiannually: "Semiannually",
  quarterly: "Quarterly",
  monthly: "Monthly",
  biweekly: "Biweekly",
  weekly: "Weekly",
  daily: "Daily"
}

export const INVESTMENT_NUMBER_OF_COMPOUNDING_PERIODS = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
  daily: 365
}

export const INVESTMENT_COMPOUNDING_PERIOD_MONTHS = {
  annually: 12,
  semiannually: 6,
  quarterly: 3,
  monthly: 1,
  biweekly: 14 / AVERAGE_DAYS_IN_MONTH,
  weekly: 7 / AVERAGE_DAYS_IN_MONTH,
  daily: 1 / AVERAGE_DAYS_IN_MONTH
}

export const INVESTMENT_COMPOUNDING_INFO = {
  "Annually": {
    compoundingPeriods: 1,
    compoundingPeriodInMonths: 12
  },
  "Semiannually": {
    compoundingPeriods: 2,
    compoundingPeriodInMonths: 6
  },
  "Quarterly": {
    compoundingPeriods: 4,
    compoundingPeriodInMonths: 3
  },
  "Monthly": {
    compoundingPeriods: 12,
    compoundingPeriodInMonths: 1
  },
  "Biweekly": {
    compoundingPeriods: 26,
    compoundingPeriodInMonths: 14 / AVERAGE_DAYS_IN_MONTH
  },
  "Weekly": {
    compoundingPeriods: 52,
    compoundingPeriodInMonths: 7 / AVERAGE_DAYS_IN_MONTH
  },
  "Daily": {
    compoundingPeriods: 365,
    compoundingPeriodInMonths: 1 / AVERAGE_DAYS_IN_MONTH
  },
}