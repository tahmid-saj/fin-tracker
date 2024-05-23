import React, { Component, useContext, useEffect } from "react";

import "./investments.styles.scss";
import MarketView from "../../shared/market-view/market-view.component";
import CreateInvestmentForm from "./create-investment-form/create-investment-form.component";
import AllInvestmentsSummary from "./all-investments-summary/all-investments-summary.component";

// import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

import { useDispatch, useSelector } from "react-redux";
import { selectInvestments } from "../../../store/signed-out/investments/investments.selector";
import { setInvestmentsSummary } from "../../../store/signed-out/investments/investments.action";

const Investments = () => {
  // const { investments } = useContext(InvestmentsContext);
  const investments = useSelector(selectInvestments)
  const dispatch = useDispatch()

  useEffect(() => {
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
  }, [investments, dispatch]);

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
