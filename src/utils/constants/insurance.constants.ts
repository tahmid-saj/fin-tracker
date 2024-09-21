// insurance constants

export const DEFAULT_INSURANCES = []

export const DEFAULT_INSURANCES_SUMMARY = {}

export enum INSURANCE_INTERVALS {
  daily = "Daily",
  weekly = "Weekly",
  monthly = "Monthly",
  quarterly = "Quarterly",
  semiannually = "Semiannually",
  annually = "Annually"
}

export enum INSURANCE_INTERVALS_DAYS_MULTIPLIER {
  daily = 1,
  weekly = 7,
  monthly = 30,
  quarterly = 92,
  semiannually = 183,
  annually = 365
}

export enum INSURANCE_ADD_TO_EXPENSES {
  yes = "Yes",
  no = "No"
}