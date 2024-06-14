import { createContext, useState, useEffect } from "react";
import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants";
import { validateAddInsurance, validateFilterInsurances, validateRemoveInsurance } from "../../../utils/validations/insurance.validation";

// helper functions
const addInsuranceHelper = (insurances, insurance) => {
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

const filterInsurancesHelper = (insurances, filterConditions) => {
  let filteredInsurances = []

  insurances.map((insurance) => {
    if (filterConditions.insuranceFor === "" || (insurance.insuranceFor.toLowerCase().includes(filterConditions.insuranceFor.toLowerCase()))) {
      if (filterConditions.insuranceInterval === "" || (insurance.insuranceInterval.toLowerCase() === filterConditions.insuranceInterval.toLowerCase())) {
        if (filterConditions.insuranceStartDate === "" || (filterConditions.insuranceStartDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceStartDate <= insurance.insuranceEndDate)) {
          if (filterConditions.insuranceEndDate === "" || (filterConditions.insuranceEndDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceEndDate <= insurance.insuranceEndDate)) {
            filteredInsurances.push(insurance)
          }
        }
      }
    }
  })

  return filteredInsurances
}

const filterInsurancePaymentsHelper = (insurancePayments, filterConditions) => {
  let filteredInsurancePayments = []

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

const removeInsuranceHelper = (insurances, insuranceFor) => {
  if (validateRemoveInsurance(insuranceFor)) return insurances

  return insurances.filter(insurance => insurance.insuranceFor !== insuranceFor)
}

// initial state
export const InsuranceContext = createContext({
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

  // insurancesView is the filtered version of insurances
  insurancesView: [],

  // insurancePaymentsView is the filtered version of insurancePayments
  insurancePaymentsView: [],

  addInsurance: () => {},
  filterInsurance: () => {},
  removeInsurance: () => {},

  insurancesSummary: {}
  // insurances structure:
  // {
  //   currentAllInsurancesCategories: new Set(),
  // }
})

// context component
export const InsuranceProvider = ({ children }) => {
  const [insurances, setInsurances] = useState([])
  const [insurancePayments, setInsurancePayments] = useState([])
  const [filterConditions, setFilterConditions] = useState(null)
  const [insurancesView, setInsurancesView] = useState(insurances)
  const [insurancePaymentsView, setInsurancePaymentsView] = useState(insurancePayments)
  const [insurancesSummary, setInsurancesSummary] = useState({})

  // update insurancesSummary and insurancePayments
  useEffect(() => {
    // update insurancesSummary
    let newAllInsurancesCategories = new Set()

    insurances.map((insurance) => {
      newAllInsurancesCategories.add(String(insurance.insuranceFor))
    })

    setInsurancesSummary({
      currentAllInsurancesCategories: newAllInsurancesCategories
    })

    // update insurancePayments
    let newInsurancePayments = []
    
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

      for (let paymentDate = insurance.insuranceFirstPaymentDate; 
        paymentDate <= insurance.insuranceEndDate; 
        paymentDate.setDate(paymentDate.getDate() + insuranceIntervalDaysMultiplier)) {
        
        newInsurancePayments.push({
          insuranceFor: String(insurance.insuranceFor),
          insurancePayment: Number(insurance.insurancePayment),
          insuranceInterval: String(insurance.insuranceInterval),
          insuranceDate: Date(paymentDate)
        });
      }
    })

    setInsurancePayments(newInsurancePayments)
  }, [insurances])

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

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure insuranceIds are not duplicate via validations
  const addInsurance = (insurance) => {
    if (validateAddInsurance(insurance)) {
      return
    } else {
      setInsurances(addInsuranceHelper(insurances, insurance))
    }
  }

  const filterInsurances = (filterConditions) => {
    if (validateFilterInsurances(filterConditions)) {
      return
    } else {
      setFilterConditions(filterConditions)
      setInsurancesView(filterInsurancesHelper(insurances, filterConditions))
      setInsurancePaymentsView(filterInsurancePaymentsHelper(insurancePayments, filterConditions))
    }
  }

  const removeInsurance = (insuranceFor) => {
    setInsurances(removeInsuranceHelper(insurances, insuranceFor))
  }

  const clearInsuranceFilter = () => {
    setFilterConditions(null)
    setInsurancesView(insurances)
    setInsurancePaymentsView(insurancePayments)
  }

  const value = { insurances, insurancesView, filterConditions,
    addInsurance, filterInsurances, removeInsurance, clearInsuranceFilter,
    insurancesSummary }
  
  return (
    <InsuranceContext.Provider
      value={ value }>
      { children }
    </InsuranceContext.Provider>
  )
}