import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-out/insurance/add-insurance-form/add-insurance-form.component.jsx"
import FilterInsuranceForm from "../../../components/signed-out/insurance/filter-insurance-form/filter-insurance-form.component.jsx"
import InsurancePieChart from "../../../components/signed-out/insurance/insurance-pie-chart/insurance-pie-chart.component.jsx"
import InsuranceSummary from "../../../components/signed-out/insurance/insurance-summary/insurance-summary.component.jsx"
import InsuranceTable from "../../../components/signed-out/insurance/insurance-table/insurance-table.component.jsx"
import "./insurance.styles.jsx"
import { InsuranceContainer, InsuranceFilterContainer } from "./insurance.styles.jsx"

import { useEffect, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectInsurances, selectInsurancePayments, selectFilterConditions,
  selectInsurancesView, selectInsurancePaymentsView,
} from "../../../store/signed-out/insurance/insurance.selector.js"
import { setInsurancesSummary, setInsurancesView, setInsurancePaymentsView, 
  setInsurancePayments, filterInsurancesHelper, filterInsurancePaymentsHelper
} from "../../../store/signed-out/insurance/insurance.action.js"

import { INSURANCE_INTERVALS, INSURANCE_INTERVALS_DAYS_MULTIPLIER } from "../../../utils/constants/insurance.constants.js"

import { selectSelectedInsurancePaymentsDate, selectScheduledInsurancePaymentsView } from "../../../store/signed-out/insurance/insurance.selector.js"
import { selectScheduledInsurancePaymentsHelper, setScheduledInsurancePaymentsView } from "../../../store/signed-out/insurance/insurance.action.js"
import ScheduleCalendar from "../../../components/signed-out/insurance/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfo from "../../../components/signed-out/insurance/schedule/schedule-day-info/schedule-day-info.component.jsx"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"
import { InsuranceFilterInfo } from "../../../components/signed-out/insurance/insurance-filter-info/insurance-filter-info.component.jsx"
import { InsurancePayment } from "../../../contexts/signed-out/insurance/insurance.types.js"

const Insurance = () => {
  const insurances = useSelector(selectInsurances)
  const insurancePayments = useSelector(selectInsurancePayments)
  const insurancesView = useSelector(selectInsurancesView)
  const insurancePaymentsView = useSelector(selectInsurancePaymentsView)
  const filterConditions = useSelector(selectFilterConditions)
  const selectedInsurancePaymentsDate = useSelector(selectSelectedInsurancePaymentsDate)
  const scheduledInsurancePaymentsView = useSelector(selectScheduledInsurancePaymentsView)
  const dispatch = useDispatch()

  // update insurancesSummary and insurancePayments
  useEffect(() => {
    // update insurancesSummary
    let newAllInsurancesCategories: Set<string> = new Set()

    if (insurances) {
      insurances.map((insurance) => {
        newAllInsurancesCategories.add(String(insurance.insuranceFor))
      })
  
      // update insurancePayments
      let newInsurancePayments: InsurancePayment[] = []
      let newCurrentTotalInsurancePlanned: number = 0
      
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
      dispatch(setInsurancesSummary({
        currentTotalInsurancePlanned: newCurrentTotalInsurancePlanned,
        currentAllInsurancesCategories: newAllInsurancesCategories,
      }))
  
      dispatch(setInsurancePayments(newInsurancePayments))
    }
  }, [insurances, dispatch])

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

    if (insurancePayments) {
      const newCurrentTotalInsurancePlanned = insurancePayments.reduce((allInsurancePlanned, insurance) => {
        newCurrentAllInsurancesCategories.add(String(insurance.insuranceFor))
  
        console.log(insurance.insuranceDate)
        
        if (insurance.insuranceDate >= past30Days && insurance.insuranceDate <= today) {
          console.log("insurance")
          newPastMonthAllInsurancesPayment += insurance.insurancePayment
          newPastMonthInsurances.push(insurance)
        }
  
        return allInsurancePlanned + insurance.insurancePayment
      }, 0)
  
      dispatch(setInsurancesSummary({
        currentTotalInsurancePlanned: newCurrentTotalInsurancePlanned,
        currentAllInsurancesCategories: newCurrentAllInsurancesCategories,
        pastMonthAllInsurancesPayment: newPastMonthAllInsurancesPayment,
        pastMonthInsurances: newPastMonthInsurances
      }))
    }
  }, [insurancePayments, dispatch])
  
  // update insurancesView when insurances change
  useEffect(() => {
    if (filterConditions) {
      if (insurances) {
        dispatch(setInsurancesView(filterInsurancesHelper(insurances, filterConditions)))
      }
      if (insurancePayments) {
        dispatch(setInsurancePaymentsView(filterInsurancePaymentsHelper(insurancePayments, filterConditions)))
      }
    } else {
      if (insurances) {
        dispatch(setInsurancesView(insurances))
      }
      if (insurancePayments) {
        dispatch(setInsurancePaymentsView(insurancePayments))
      }
    }
  }, [insurances, insurancePayments, filterConditions, dispatch])

  // update scheduledInsurancePaymentsView when insurances or selectedInsurancePaymentsDate change
  useEffect(() => {
    if (selectedInsurancePaymentsDate) {
      if (insurancePayments) {
        dispatch(setScheduledInsurancePaymentsView(selectScheduledInsurancePaymentsHelper(insurancePayments, selectedInsurancePaymentsDate)))
      }
    } else {
      dispatch(setScheduledInsurancePaymentsView(null))
    }
  }, [insurancePayments, selectedInsurancePaymentsDate, dispatch])

  let tabList = []
  let panelList = []

  if (insurances && insurances.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "filter",
      icon: <FilterAltIcon/>,
      label: "Filter"
    })

    panelList.push({
      value: "summary",
      children: <InsuranceSummary/>
    })
    panelList.push({
      value: "filter",
      children: (
        <InsuranceFilterContainer>
          <FilterInsuranceForm></FilterInsuranceForm>
          <Typography sx={{ display: "flex", justifyContent: "center", marginTop: "4%", 
            color: COLOR_CODES.general["0"] }} variant="h6">Filtered results</Typography>
          <InsuranceFilterInfo></InsuranceFilterInfo>
          <InsurancePieChart></InsurancePieChart>
          <InsuranceTable></InsuranceTable>
        </InsuranceFilterContainer>
      )
    })
  }

  tabList.push({
    value: "add-insurance",
    icon: <AddIcon/>,
    label: "Add Insurance"
  })
  panelList.push({
    value: "add-insurance",
    children: <AddInsuranceForm></AddInsuranceForm>
  })

  return (
    <InsuranceContainer>
      <ScheduleCalendar></ScheduleCalendar>
      {
        selectedInsurancePaymentsDate && scheduledInsurancePaymentsView ?
        <ScheduleDayInfo></ScheduleDayInfo> : null
      }

      <br/>

      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </InsuranceContainer>
  )

  // return (
  //   <div className="insurance-container">
  //     <ScheduleCalendar></ScheduleCalendar>
  //     {
  //       selectedInsurancePaymentsDate && scheduledInsurancePaymentsView ?
  //       <ScheduleDayInfo></ScheduleDayInfo> : null
  //     }

  //     <br/>
  //     <Divider/>
  //     <br/>

  //     {
  //       insurances && insurances.length ?
  //       <Fragment>
  //         <div className="insurance-summary-add-form-container">
  //           <InsuranceSummary></InsuranceSummary>
  //         </div>

  //         <Divider/>
  //       </Fragment> : null
  //     }

  //     <div className="insurance-summary-add-form-container">
  //       <AddInsuranceForm></AddInsuranceForm>
  //     </div>

  //     {
  //       insurances && insurances.length ?
  //       <Fragment>
  //         <Divider/>

  //         <div className="insurance-filter-form-container">
  //           <FilterInsuranceForm></FilterInsuranceForm>
  //         </div>
  //       </Fragment> : null
  //     }

  //     {
  //       insurancePaymentsView && insurancePaymentsView.length ?
  //       <div className="insurance-chart-container">
  //         <InsurancePieChart></InsurancePieChart>
  //       </div> : null
  //     }

  //     {
  //       insurancesView && insurancesView.length ?
  //       <div className="insurance-chart-container">
  //         <InsuranceTable></InsuranceTable>
  //       </div> : null
  //     }
  //   </div>
  // )
}

export default Insurance