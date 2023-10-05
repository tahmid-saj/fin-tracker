import { useState } from "react";

import "./finance-tracker-item.styles.scss";

import FormView from "../../signed-out/form-view/form-view.component";

export let activeFormView = {
  label: "",
  name: ""
}

export const FinanceTrackerItem = ({ name, label, ...otherProps }) => {

  const handleDisplayFinanceTrackerItemForm = (event) => {
    console.log(label, name);

    activeFormView = {
      label: label,
      name: name
    };

    console.log(activeFormView);
  }

  return (
    <div>
      <button className={`button-container finance-tracker-item-button`} 
              { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
              onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
        { `${name}` }
      </button>

      <FormView financeItemLabel={ label } financeItemName={ name }></FormView>

      <div className="form-view-separator-container">
        <hr class="rounded"/>
      </div>
    </div>
  );
};

// export default {
//   FinanceTrackerItem,
//   activeFormView
// }
