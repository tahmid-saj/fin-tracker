import React, { Fragment, useState } from "react";

import "./investment-tracker-item.styles.scss";

import FormView from "../../signed-out/form-view/form-view.component";

export let activeFormView = {
  label: "",
  investmentInfo: {}
}

export const InvestmentTrackerItem = ({ label, investmentInfo, ...otherProps }) => {
  const [closeAccount, setCloseAccount] = useState(false);

  const closeAccountHandler = () => {
    setCloseAccount(true);

    console.log("closing account");
  }

  const handleDisplayInvestmentTrackerItemForm = (event) => {
    console.log(label, investmentInfo);

    activeFormView = {
      label: label,
      investmentInfo: investmentInfo
    };

    console.log(activeFormView);
  }

  return (
    <div>
      {
        !closeAccount && investmentInfo !== null && (
          <Fragment>
            <button className={`button-container investment-tracker-item-button`} 
                    { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
                    onClick={ e => handleDisplayInvestmentTrackerItemForm(e) }>
              { `${investmentInfo.investmentName}` }
            </button>

            <FormView financeItemLabel={ label } financeItemInfo={ investmentInfo }
                      closeAccountHandler={ closeAccountHandler }></FormView>
                      
            <div className="form-view-separator-container">
              <hr className="rounded"/>
            </div>

            {/* {
              label !== "Savings Accounts" && (
              )
            } */}
          </Fragment>
        )
      }
    </div>
  );
};
