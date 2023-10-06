import { Fragment, useState } from "react";

import "./finance-tracker-item.styles.scss";

import FormView from "../../signed-out/form-view/form-view.component";

export let activeFormView = {
  label: "",
  name: ""
}

export const FinanceTrackerItem = ({ name, label, ...otherProps }) => {
  const [closeAccount, setCloseAccount] = useState(false);

  const closeAccountHandler = () => {
    setCloseAccount(true);

    console.log("closing account");
  }

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

    {
      !closeAccount && (
        <Fragment>
          <button className={`button-container finance-tracker-item-button`} 
                  { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
                  onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
            { `${name}` }
          </button>

          <FormView financeItemLabel={ label } financeItemName={ name } 
                    closeAccountHandler={ closeAccountHandler }></FormView>

          {
            label !== "Savings Accounts" && (
              <div className="form-view-separator-container">
                <hr className="rounded"/>
              </div>
            )
          }

        </Fragment>
        )
    }
    </div>
  );
};

// export default {
//   FinanceTrackerItem,
//   activeFormView
// }
