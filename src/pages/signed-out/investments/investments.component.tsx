import React, { Component, useContext, useEffect } from "react";

import "./investments.styles.jsx";
import { InvestmentsContainer } from "./investments.styles.jsx";
import MarketView from "../../shared/market-view/market-view.component.js";
import CreateInvestmentForm from "../../../components/signed-out/investments/create-investment-form/create-investment-form.component.jsx";
import AllInvestmentsSummary from "../../../components/signed-out/investments/all-investments-summary/all-investments-summary.component.jsx";

// import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants.js";

import { useDispatch, useSelector } from "react-redux";
import { selectInvestments } from "../../../store/signed-out/investments/investments.selector.js";
import { setInvestmentsSummary } from "../../../store/signed-out/investments/investments.action.js";

import ShowChartIcon from '@mui/icons-material/ShowChart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.jsx";
import InvestmentsList from "../../../components/signed-out/investments/investments/investments.component.jsx";

const Investments = () => {
  // const { investments } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)
  const dispatch = useDispatch()

  useEffect(() => {
    if (investments) {
      const newAllInvestmentsBalance = investments.reduce((allInvestmentsBalance, { endBalance }) => {
        return allInvestmentsBalance + endBalance;
      }, 0);
  
      const newTotalAllContribution = investments.reduce((newTotalAllContribution, { totalContribution }) => {
        return newTotalAllContribution + totalContribution;
      }, 0);
  
      const newAllInterest = investments.reduce((allInterest, { totalInterest }) => {
        return allInterest + totalInterest;
      }, 0);
  
      console.log(investments);
  
      dispatch(setInvestmentsSummary({ 
        currentAllInvestmentsBalance: newAllInvestmentsBalance, 
        totalAllContribution: newTotalAllContribution, 
        totalAllInterest: newAllInterest,
      }))
    }
  }, [investments, dispatch]);

  let tabList = [{
    value: "market-data",
    icon: <ShowChartIcon/>,
    label: "Market Data"
  }]
  let panelList = [{
    value: "market-data",
    children: <MarketView/>
  }]

  if (investments && investments.length !== 0) {
    tabList.push({
      value: "summary",
      icon: <SummarizeIcon/>,
      label: "Summary"
    })
    tabList.push({
      value: "investments",
      icon: <PaymentIcon/>,
      label: "Investments"
    })

    panelList.push({
      value: "summary",
      children: <AllInvestmentsSummary/>
    })
    panelList.push({
      value: "investments",
      children: <InvestmentsList/>
    })
  }

  tabList.push({
    value: "add-investment",
    icon: <AddIcon/>,
    label: "Add Investment"
  })
  panelList.push({
    value: "add-investment",
    children: <CreateInvestmentForm/>
  })

  return (
    <InvestmentsContainer>
      <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
    </InvestmentsContainer>
  )

  // return (
  //   <div className="investments-container">
  //     <MarketView></MarketView>

  //     {
  //       investments.length !== 0 && <AllInvestmentsSummary></AllInvestmentsSummary>
  //     }

  //     <div className="investments-form-summary-container">
  //       <CreateInvestmentForm label={ FINANCE_ITEM_TYPES.investments }></CreateInvestmentForm>

  //       <div className="investment-info-summary">
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Investments;
