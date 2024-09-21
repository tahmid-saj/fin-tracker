import React, { createContext, useState, useEffect, ReactNode, FC } from "react";
import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants";
import { validateAddInsurance, validateFilterInsurances, validateRemoveInsurance } from "../../../utils/validations/insurance.validation";

import { Insurance, InsurancePayment, FilterConditions, InsurancesSummary, InsuranceProviderProps, InsuranceContextType } from "./insurance.types"

const addInsuranceHelper = (insurances: Insurance[], insurance: Insurance): Insurance[] => {
  return [ ...insurances,
    {
      insuranceFor: String(insurance.insuranceFor),
      insurancePayment: Number(insurance.insurancePayment),
      insuranceInterval: String(insurance.insuranceInterval),
      insuranceFirstPaymentDate: String(insurance.insuranceFirstPaymentDate),
      insuranceEndDate: String(insurance.insuranceEndDate)
    }
  ]
}

const checkDateRangeFilterOverlap = (filterConditions: FilterConditions, insurance: Insurance): boolean => {
  if (filterConditions.insuranceStartDate === "" || ((filterConditions.insuranceStartDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceStartDate <= insurance.insuranceEndDate) 
      || (filterConditions.insuranceEndDate === "" && filterConditions.insuranceStartDate <= insurance.insuranceFirstPaymentDate))) {
    if (filterConditions.insuranceEndDate === "" || ((filterConditions.insuranceEndDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceEndDate <= insurance.insuranceEndDate)
      || (filterConditions.insuranceStartDate === "" && filterConditions.insuranceEndDate >= insurance.insuranceEndDate))) {
      return true
    }
  }

  return false
}

const filterInsurancesHelper = (insurances: Insurance[], filterConditions: FilterConditions): Insurance[] => {
  let filteredInsurances: Insurance[] = []

  insurances.map((insurance) => {
    if (filterConditions.insuranceFor === "" || (insurance.insuranceFor.toLowerCase().includes(filterConditions.insuranceFor.toLowerCase()))) {
      if (filterConditions.insuranceInterval === "" || (insurance.insuranceInterval.toLowerCase() === filterConditions.insuranceInterval.toLowerCase())) {
        if (checkDateRangeFilterOverlap(filterConditions, insurance)) {
          filteredInsurances.push(insurance)
        }
      }
    }
  })

  return filteredInsurances
}
 
const filterInsurancePaymentsHelper = (insurancePayments: InsurancePayment[], filterConditions: FilterConditions): InsurancePayment[] => {
  let filteredInsurancePayments: InsurancePayment[] = []

  insurancePayments.map((insurancePayment) => {
    if (filterConditions.insuranceFor === "" || (insurancePayment.insuranceFor.toLowerCase().includes(filterConditions.insuranceFor.toLowerCase()))) {
      if (filterConditions.insuranceInterval === "" || (insurancePayment.insuranceInterval.toLowerCase() === filterConditions.insuranceInterval.toLowerCase())) {
        if (filterConditions.insuranceStartDate === "" || (filterConditions.insuranceStartDate <= insurancePayment.insuranceDate)) {
          if (filterConditions.insuranceEndDate === "" || (filterConditions.insuranceEndDate >= insurancePayment.insuranceDate)) {
            filteredInsurancePayments.push(insurancePayment)
          }
        }
      }
    }
  })

  return filteredInsurancePayments
}

const removeInsuranceHelper = (insurances: Insurance[], insuranceFor: string): Insurance[] => {
  if (validateRemoveInsurance(insuranceFor)) return insurances

  return insurances.filter(insurance => insurance.insuranceFor !== insuranceFor)
}

const selectScheduledInsurancePaymentsHelper = (insurancePayments: InsurancePayment[], insuranceDate: string): InsurancePayment[] | null => {
  const filteredInsurancePayments = insurancePayments.filter((insurancePayment) => {
    return insurancePayment.insuranceDate === insuranceDate
  })

  if (!filteredInsurancePayments) return null

  return filteredInsurancePayments
}

// initial state
export const InsuranceContext = createContext<InsuranceContextType>({
  insurances: [],
  // insurances structure:
  // [
  //   {
  //     insuranceFor: "car",
  //     insurancePayment: 200,
  //     insuranceInterval: "Daily",
  //     insuranceFirstPaymentDate: "2024-06-15",
  //     insuranceEndDate: ""
  //   }
  // ]

  insurancePayments: [],
  // insurancePayments structure:
  // [
  //   {
  //     insuranceFor: "car",
  //     insurancePayment: 195,
  //     insuranceInterval: Daily,
  //     insuranceDate: new Date()
  //   },
  //   {
  //     insuranceFor: "dental",
  //     insurancePayment: 50,
  //     insuranceInterval: Monthly
  //     insuranceDate: new Date()
  //   }
  // ]

  filterConditions: {},
  // filterConditions structure
  // {
  //   insuranceFor: "",
  //   insuranceInterval: "",
  //   insuranceStartDate: "",
  //   insuranceEndDate: ""
  // }

  // selectedInsurancePaymentsDate is the selected date from the calendar component
  selectedInsurancePaymentsDate: null,

  // insurancesView is the filtered version of insurances
  insurancesView: [],

  // insurancePaymentsView is the filtered version of insurancePayments
  insurancePaymentsView: [],

  // scheduledInsurancePaymentsView is the selected selectedInsurancePaymentsDate info from the calendar component
  scheduledInsurancePaymentsView: null,

  addInsurance: () => {},
  filterInsurances: () => {},
  removeInsurance: () => {},

  selectScheduledInsurancePayments: () => {},

  insurancesSummary: {}
  // insurances structure:
  // {
  //   currentTotalInsurancePlanned: 5000
  //   currentAllInsurancesCategories: new Set(),
  //   pastMonthAllInsurancesPayment: 355,
  //   pastMonthInsurances: []
  // }
})

// context component
export const InsuranceProvider: FC<InsuranceProviderProps> = ({ children }) => {
  const [insurances, setInsurances] = useState<Insurance[] | []>([])
  const [insurancePayments, setInsurancePayments] = useState<InsurancePayment[] | []>([])
  const [filterConditions, setFilterConditions] = useState<FilterConditions | null>(null)
  const [selectedInsurancePaymentsDate, setSelectedInsurancePaymentsDate] = useState<string | null>(null)
  const [scheduledInsurancePaymentsView, setScheduledInsurancePaymentsView] = useState<InsurancePayment[] | null>(null)
  const [insurancesView, setInsurancesView] = useState<Insurance[]>(insurances)
  const [insurancePaymentsView, setInsurancePaymentsView] = useState<InsurancePayment[]>(insurancePayments)
  const [insurancesSummary, setInsurancesSummary] = useState<InsurancesSummary | {}>({})

  // update insurancesSummary and insurancePayments
  useEffect(() => {
    // update insurancesSummary
    let newAllInsurancesCategories: Set<string> = new Set()

    insurances.map((insurance) => {
      newAllInsurancesCategories.add(String(insurance.insuranceFor))
    })

    // update insurancePayments
    let newInsurancePayments: InsurancePayment[] = []
    let newCurrentTotalInsurancePlanned: number = 0.0
    
    insurances.map((insurance) => {
      let insuranceIntervalDaysMultiplier;

      switch (insurance.insuranceInterval) {
        case INSURANCE_INTERVALS.daily:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.daily
          break
        case INSURANCE_INTERVALS.weekly:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.weekly
          break
        case INSURANCE_INTERVALS.monthly:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.monthly
          break
        case INSURANCE_INTERVALS.quarterly:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.quarterly
          break
        case INSURANCE_INTERVALS.semiannually:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.semiannually
          break
        case INSURANCE_INTERVALS.annually:
          insuranceIntervalDaysMultiplier = INSURANCE_INTERVALS_DAYS_MULTIPLIER.annually
          break
        default:
          break
      }
      
      const addDays = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
      };

      const startDate = new Date(insurance.insuranceFirstPaymentDate)
      const endDate = new Date(insurance.insuranceEndDate)
      

      for (let paymentDate = startDate; 
        paymentDate <= endDate; 
        // paymentDate.setDate(paymentDate.getDate() + insuranceIntervalDaysMultiplier)
        paymentDate = addDays(paymentDate, insuranceIntervalDaysMultiplier as number)
      ) {

        newCurrentTotalInsurancePlanned += Number(insurance.insurancePayment)
        const newPaymentDate = paymentDate.toISOString().split('T')[0]
        
        newInsurancePayments.push({
          insuranceFor: String(insurance.insuranceFor),
          insurancePayment: Number(insurance.insurancePayment),
          insuranceInterval: String(insurance.insuranceInterval),
          insuranceDate: String(newPaymentDate)
        });
      }
    })

    // update insurancesSummary and insurancePayments
    setInsurancesSummary({
      currentTotalInsurancePlanned: newCurrentTotalInsurancePlanned,
      currentAllInsurancesCategories: newAllInsurancesCategories,
    })

    setInsurancePayments(newInsurancePayments)
  }, [insurances])

  // update insurancesSummary if insurancePayments change
  useEffect(() => {
    // Helper function to subtract days from a Date object
    const subtractDays = (date: Date, days: number): string => {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return result.toISOString().split("T")[0]; // Return date in 'YYYY-MM-DD' format
    };

    const today = new Date().toISOString().split("T")[0];
    const past30Days = subtractDays(new Date(), 30);

    let newCurrentAllInsurancesCategories = new Set<string>();
    let newPastMonthAllInsurancesPayment = 0.0;
    let newPastMonthInsurances: InsurancePayment[] = [];

    const newCurrentTotalInsurancePlanned = insurancePayments.reduce((allInsurancePlanned, insurance) => {
      newCurrentAllInsurancesCategories.add(String(insurance.insuranceFor))
      
      if (Date.parse(insurance.insuranceDate) >= Date.parse(past30Days) && Date.parse(insurance.insuranceDate) <= Date.parse(today)) {
        newPastMonthAllInsurancesPayment += insurance.insurancePayment
        newPastMonthInsurances.push(insurance)
      }

      return allInsurancePlanned + insurance.insurancePayment
    }, 0)

    setInsurancesSummary({
      currentTotalInsurancePlanned: newCurrentTotalInsurancePlanned,
      currentAllInsurancesCategories: newCurrentAllInsurancesCategories,
      pastMonthAllInsurancesPayment: newPastMonthAllInsurancesPayment,
      pastMonthInsurances: newPastMonthInsurances
    })
  }, [insurancePayments])

  // update insurancesView when insurances change
  useEffect(() => {
    if (filterConditions !== null) {
      setInsurancesView(filterInsurancesHelper(insurances, filterConditions))
      setInsurancePaymentsView(filterInsurancePaymentsHelper(insurancePayments, filterConditions))
    } else {
      setInsurancesView(insurances)
      setInsurancePaymentsView(insurancePayments)
    }
  }, [insurances, insurancePayments, filterConditions])

  // update scheduledInsurancePaymentsView when insurancePayments or selectedInsurancePaymentsDate change
  useEffect(() => {
    if (selectedInsurancePaymentsDate) {
      setScheduledInsurancePaymentsView(selectScheduledInsurancePaymentsHelper(insurancePayments, selectedInsurancePaymentsDate))
    } else {
      setScheduledInsurancePaymentsView(null)
    }
  }, [insurancePayments, selectedInsurancePaymentsDate])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure insuranceIds are not duplicate via validations
  const addInsurance = (insurance: Insurance) => {
    if (validateAddInsurance(insurances, insurance)) {
      return
    } else {
      setInsurances(addInsuranceHelper(insurances, insurance))
    }
  }

  const filterInsurances = (filterConditions: FilterConditions) => {
    if (validateFilterInsurances(filterConditions)) {
      return
    } else {
      setFilterConditions(filterConditions)
      setInsurancesView(filterInsurancesHelper(insurances, filterConditions))
      setInsurancePaymentsView(filterInsurancePaymentsHelper(insurancePayments, filterConditions))
    }
  }

  const removeInsurance = (insuranceFor: string) => {
    setInsurances(removeInsuranceHelper(insurances, insuranceFor))
  }

  const clearInsuranceFilter = () => {
    setFilterConditions(null)
    setInsurancesView(insurances)
    setInsurancePaymentsView(insurancePayments)
  }

  const selectScheduledInsurancePayments = (insuranceDate: string) => {
    setSelectedInsurancePaymentsDate(insuranceDate)
    setScheduledInsurancePaymentsView(selectScheduledInsurancePaymentsHelper(insurancePayments, insuranceDate))
  }

  const value = { insurances, insurancePayments, insurancesView, insurancePaymentsView, filterConditions,
    selectedInsurancePaymentsDate, scheduledInsurancePaymentsView,
    addInsurance, filterInsurances, removeInsurance, clearInsuranceFilter,
    insurancesSummary, selectScheduledInsurancePayments }
  
  return (
    <InsuranceContext.Provider
      value={ value }>
      { children }
    </InsuranceContext.Provider>
  )
}