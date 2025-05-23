import React, { Component, useContext } from "react";

import "./investments.styles.tsx";
import { InvestmentsContainer } from "./investments.styles.tsx";
import MarketView from "../../shared/market-view/market-view.component.tsx";
import CreateInvestmentForm from "../../../components/signed-in/investments/create-investment-form/create-investment-form.component.tsx";
import AllInvestmentsSummary from "../../../components/signed-in/investments/all-investments-summary/all-investments-summary.component.tsx";

import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context.tsx";

import ShowChartIcon from '@mui/icons-material/ShowChart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import ItemTabs from "../../../components/shared/mui/tabs/tabs.component.tsx";
import InvestmentsList from "../../../components/signed-in/investments/investments/investments.component.tsx";

const Investments = () => {
  const { investments } = useContext(InvestmentsContext);

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
