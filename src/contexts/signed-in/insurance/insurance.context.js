import { createContext, useState, useEffect } from "react";
import { DEFAULT_INSURANCES, DEFAULT_INSURANCES_SUMMARY,
  INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER 
} from "../../../utils/constants/insurance.constants";
import { validateAddInsurance, validateFilterInsurances, validateRemoveInsurance } from "../../../utils/validations/insurance.validation";

import { getInsurancesData, getInsurancesSummaryData,
  postInsuranceCreate, deleteInsurance,
  putInsurancesData, putInsurancesSummaryData
} from "../../../utils/api-requests/insurance.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

// helper functions
const addInsuranceHelper = (insurances, insurance, userId, email) => {
  postInsuranceCreate(userId, email, insurance, insurance.insuranceFor)

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

const checkDateRangeFilterOverlap = (filterConditions, insurance) => {
  if (filterConditions.insuranceStartDate === "" || ((filterConditions.insuranceStartDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceStartDate <= insurance.insuranceEndDate) 
      || (filterConditions.insuranceEndDate === "" && filterConditions.insuranceStartDate <= insurance.insuranceFirstPaymentDate))) {
    if (filterConditions.insuranceEndDate === "" || ((filterConditions.insuranceEndDate >= insurance.insuranceFirstPaymentDate && filterConditions.insuranceEndDate <= insurance.insuranceEndDate)
      || (filterConditions.insuranceStartDate === "" && filterConditions.insuranceEndDate >= insurance.insuranceEndDate))) {
      return true
    }
  }

  return false
}

const filterInsurancesHelper = (insurances, filterConditions) => {
  let filteredInsurances = []

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

const removeInsuranceHelper = (insurances, insuranceFor, userId, email) => {
  if (validateRemoveInsurance(insuranceFor)) return insurances

  deleteInsurance(userId, email, insuranceFor)

  return insurances.filter(insurance => insurance.insuranceFor !== insuranceFor)
}

// set default insurances values
const setDefaultInsurancesValuesHelper = () => {
  return DEFAULT_INSURANCES
}

// set default insurances summary values
const setDefaultInsurancesSummaryValuesHelper = () => {
  return DEFAULT_INSURANCES_SUMMARY
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

  insurancesSummary: {},
  // insurances structure:
  // {
  //   currentTotalInsurancePlanned: 5000
  //   currentAllInsurancesCategories: new Set(),
  // }

  // signing out
  setDefaultInsurancesValues: () => {},
  setDefaultInsurancesSummaryValues: () => {},
  updateInsurancesAndSummary: () => {}
})

// context component
export const InsuranceProvider = ({ children }) => {
  const [insurances, setInsurances] = useState([])
  const [insurancePayments, setInsurancePayments] = useState([])
  const [filterConditions, setFilterConditions] = useState(null)
  const [insurancesView, setInsurancesView] = useState(insurances)
  const [insurancePaymentsView, setInsurancePaymentsView] = useState(insurancePayments)
  const [insurancesSummary, setInsurancesSummary] = useState({})

  const currentUser = useSelector(selectCurrentUser)

  // update insurancesSummary and insurancePayments
  useEffect(() => {
    // update insurancesSummary
    let newAllInsurancesCategories = new Set()

    insurances.map((insurance) => {
      newAllInsurancesCategories.add(String(insurance.insuranceFor))
    })

    // update insurancePayments
    let newInsurancePayments = []
    let newCurrentTotalInsurancePlanned = 0.0
    
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
      
      Date.prototype.addDays = function (d) {
        this.setDate(this.getDate() + d);
        return this;
      }
        
      const startDate = new Date(insurance.insuranceFirstPaymentDate)
      const endDate = new Date(insurance.insuranceEndDate)

      for (let paymentDate = startDate; 
        paymentDate <= endDate; 
        // paymentDate.setDate(paymentDate.getDate() + insuranceIntervalDaysMultiplier)
        paymentDate = paymentDate.addDays(insuranceIntervalDaysMultiplier)
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
    Date.prototype.subtractDays = function (d) {
      this.setDate(this.getDate() - d);
      return this;
    }

    let past30Days = new Date()
    let today = new Date()
    past30Days.subtractDays(30)
    today = today.toISOString().split('T')[0]
    past30Days = past30Days.toISOString().split('T')[0]
    console.log(past30Days)

    let newCurrentAllInsurancesCategories = new Set()
    let newPastMonthAllInsurancesPayment = 0.0
    let newPastMonthInsurances = []

    const newCurrentTotalInsurancePlanned = insurancePayments.reduce((allInsurancePlanned, insurance) => {
      newCurrentAllInsurancesCategories.add(String(insurance.insuranceFor))
      
      if (Date.parse(insurance.insuranceDate) >= past30Days && Date.parse(insurance.insuranceDate) <= today) {
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

  // update insurances and insurancesSummary if currentUser changes
  useEffect(() => {
    async function fetchInsurancesData() {
      if (currentUser) {
        const insurancesData = await getInsurancesData(currentUser.uid, currentUser.email)
        const insurancesSummaryData = await getInsurancesSummaryData(currentUser.uid, currentUser.email)

        if (insurancesData) {
          const { insurances } = await insurancesData
          setInsurances(insurances)
        }

        if (insurancesSummaryData) {
          const { insurancesSummary: insSummary } = await insurancesSummaryData
          setInsurancesSummary({
            ...insurancesSummary,
            currentTotalInsurancePlanned: insSummary.currentTotalInsurancePlanned
          })
        }
      } else if (!currentUser) {
        setDefaultInsurancesValues()
        setDefaultInsurancesSummaryValues()
      }
    }

    fetchInsurancesData()
  }, [currentUser])

  // TODO: ensure alerts stop next lines of code from running
  // TODO: ensure insuranceIds are not duplicate via validations
  const addInsurance = (insurance) => {
    if (validateAddInsurance(insurances, insurance)) {
      return
    } else {
      setInsurances(addInsuranceHelper(insurances, insurance, currentUser.uid, currentUser.email))
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
    setInsurances(removeInsuranceHelper(insurances, insuranceFor, currentUser.uid, currentUser.email))
  }

  const clearInsuranceFilter = () => {
    setFilterConditions(null)
    setInsurancesView(insurances)
    setInsurancePaymentsView(insurancePayments)
  }

  // set default insurances values
  const setDefaultInsurancesValues = () => {
    setInsurances(setDefaultInsurancesValuesHelper())
  }

  // set default insurances summary values
  const setDefaultInsurancesSummaryValues = () => {
    setInsurancesSummary(setDefaultInsurancesSummaryValuesHelper())
  }

  // update insurances and summary on sign out
  const updateInsurancesAndSummary = () => {
    putInsurancesData(currentUser.uid, currentUser.email, insurances)

    // TODO: double check summary portion
    putInsurancesSummaryData(currentUser.uid, currentUser.email, {
      currentTotalInsurancePlanned: insurancesSummary.currentTotalInsurancePlanned
    })
  }

  const value = { insurances, insurancesView, insurancePaymentsView, filterConditions,
    addInsurance, filterInsurances, removeInsurance, clearInsuranceFilter,
    insurancesSummary, setDefaultInsurancesValues, setDefaultInsurancesSummaryValues, updateInsurancesAndSummary }
  
  return (
    <InsuranceContext.Provider
      value={ value }>
      { children }
    </InsuranceContext.Provider>
  )
}