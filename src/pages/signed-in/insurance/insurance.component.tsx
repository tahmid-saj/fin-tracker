import { Divider } from "@mui/material"
import AddInsuranceForm from "../../../components/signed-in/insurance/add-insurance-form/add-insurance-form.component.jsx"
import FilterInsuranceForm from "../../../components/signed-in/insurance/filter-insurance-form/filter-insurance-form.component.jsx"
import InsurancePieChart from "../../../components/signed-in/insurance/insurance-pie-chart/insurance-pie-chart.component.jsx"
import InsuranceSummary from "../../../components/signed-in/insurance/insurance-summary/insurance-summary.component.jsx"
import InsuranceTable from "../../../components/signed-in/insurance/insurance-table/insurance-table.component.jsx"
import "./insurance.styles.jsx"
import { InsuranceContainer, InsuranceFilterContainer } from "./insurance.styles.jsx"
import ScheduleCalendar from "../../../components/signed-in/insurance/schedule/schedule-calendar/schedule-calendar.component.jsx"
import ScheduleDayInfo from "../../../components/signed-in/insurance/schedule/schedule-day-info/schedule-day-info.component.jsx"

import { useEffect, Fragment, useContext } from "react"
import { InsuranceContext } from "../../../contexts/signed-in/insurance/insurance.context.js"

import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx"
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.js"
import { InsuranceFilterInfo } from "../../../components/signed-in/insurance/insurance-filter-info/insurance-filter-info.component.jsx"


const Insurance = () => {
  const { insurances, insurancesView, insurancePaymentsView, 
    selectedInsurancePaymentsDate, scheduledInsurancePaymentsView
  } = useContext(InsuranceContext)

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