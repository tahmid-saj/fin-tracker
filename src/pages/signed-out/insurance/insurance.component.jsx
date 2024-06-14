import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-out/insurance/add-insurance-form/add-insurance-form.component"
import FilterInsuranceForm from "../../../components/signed-out/insurance/filter-insurance-form/filter-insurance-form.component"
import InsurancePieChart from "../../../components/signed-out/insurance/insurance-pie-chart/insurance-pie-chart.component"
import InsuranceSummary from "../../../components/signed-out/insurance/insurance-summary/insurance-summary.component"
import InsuranceTable from "../../../components/signed-out/insurance/insurance-table/insurance-table.component"
import "./insurance.styles.scss"

import { useEffect, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectInsurances, selectInsurancePayments, selectFilterConditions,
  selectInsurancesView, selectInsurancePaymentsView,
} from "../../../store/signed-out/insurance/insurance.selector"
import { setInsurancesSummary, setInsurancesView, setInsurancePaymentsView, 
  setInsurancePayments, filterInsurancesHelper, filterInsurancePaymentsHelper
} from "../../../store/signed-out/insurance/insurance.action"

import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants"

const Insurance = () => {
  const insurances = useSelector(selectInsurances)
  const insurancePayments = useSelector(selectInsurancePayments)
  const insurancesView = useSelector(selectInsurancesView)
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)
  const filterConditions = useSelector(selectFilterConditions)
  const dispatch = useDispatch()

  // update insurancesSummary and insurancePayments
  useEffect(() => {
    // update insurancesSummary
    let newAllInsurancesCategories = new Set()

    insurances.map((insurance) => {
      newAllInsurancesCategories.add(String(insurance.insuranceFor))
    })

    dispatch(setInsurancesSummary({
      currentAllInsurancesCategories: newAllInsurancesCategories
    }))

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

    dispatch(setInsurancePayments(newInsurancePayments))
  }, [insurances, dispatch])
  
  // update insurancesView when insurances change
  useEffect(() => {
    if (filterConditions !== null) {
      dispatch(setInsurancesView(filterInsurancesHelper(insurances, filterConditions)))
      dispatch(setInsurancePaymentsView(filterInsurancePaymentsHelper(insurancePayments, filterConditions)))
    } else {
      dispatch(setInsurancesView(insurances))
      dispatch(setInsurancePaymentsView(insurancePayments))
    }
  }, [insurances, insurancePayments, filterConditions, dispatch])  

  return (
    <div className="insurance-container">
      {
        insurances && insurances.length ?
        <Fragment>
          <div className="insurance-summary-add-form-container">
            <InsuranceSummary></InsuranceSummary>
          </div>

          <Divider/>
        </Fragment> : null
      }

      <div className="insurance-summary-add-form-container">
        <AddInsuranceForm></AddInsuranceForm>
      </div>

      {
        insurances && insurances.length ?
        <Fragment>
          <Divider/>

          <div className="insurance-filter-form-container">
            <FilterInsuranceForm></FilterInsuranceForm>
          </div>
        </Fragment> : null
      }

      {
        insurancesView && insurancesView.length ?
        <div className="insurance-charts-container">
          <InsurancePieChart></InsurancePieChart>
          <InsuranceTable></InsuranceTable>
        </div> : null
      }
    </div>
  )
}

export default Insurance