import React, { Component } from "react";
import FinanceTrackerItems from "../finance-tracker-items/finance-tracker-items.component";

import "./investments.styles.scss";
import UpdateInvestmentForm from "./update-investment-form/update-investment-form.component";

const FINANCE_ITEM_TYPE = "Investments";

const financeTrackerItemNames = [
  "GIC"
]

class Investments extends Component {
  render() {
    return (
      <div className="investments-container">
        <FinanceTrackerItems label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></FinanceTrackerItems>

        <div className="investments-form-summary-container">
          <UpdateInvestmentForm></UpdateInvestmentForm>
        </div>
      </div>
    );
  };
}

export default Investments;