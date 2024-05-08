import React, { Component, useContext } from "react";

import "./investments.styles.scss";
import MarketView from "../../shared/market-view/market-view.component";
import CreateInvestmentForm from "./create-investment-form/create-investment-form.component";
import AllInvestmentsSummary from "./all-investments-summary/all-investments-summary.component";

import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

const Investments = () => {
  const { investments } = useContext(InvestmentsContext);

    return (
      <div className="investments-container">
        <MarketView></MarketView>

        {
          investments.length !== 0 && <AllInvestmentsSummary></AllInvestmentsSummary>
        }

        <div className="investments-form-summary-container">
          <CreateInvestmentForm label={ FINANCE_ITEM_TYPES.investments }></CreateInvestmentForm>

          <div className="investment-info-summary">
          </div>
        </div>
      </div>
    );
}

export default Investments;
