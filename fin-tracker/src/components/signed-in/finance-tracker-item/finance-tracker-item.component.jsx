import { Fragment, useState, useContext } from "react";

import "./finance-tracker-item.styles.scss";

// TODO: need to move FinanceTrackerItem from shared to signed-in and signed-out folders
import FormView from "../form-view/form-view.component";

import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";

export let activeFormView = {
  label: "",
  name: ""
}

export const FinanceTrackerItem = ({ name, label, ...otherProps }) => {
  // const [closeAccount, setCloseAccount] = useState(false);

  // const closeAccountHandler = () => {
  //   setCloseAccount(true);

  //   console.log("closing account");
  // }

  const { bankingAccounts } = useContext(BankingContext);

  const bankingAccountExists = bankingAccounts.find(account => account.name === name)

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
      bankingAccountExists && (
        <Fragment>
          <button className={`button-container finance-tracker-item-button`} 
                  { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
                  onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
            { `${name}` }
          </button>

          <FormView financeItemLabel={ label } financeItemInfo={ name } 
                    // closeAccountHandler={ closeAccountHandler }
                    ></FormView>

          {
            label !== "Savings Accounts" && label !== "Investments" && (
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

export const FinanceTrackerItem2 = ({ name, label, ...otherProps }) => {
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

          <FormView financeItemLabel={ label } financeItemInfo={ name } 
                    closeAccountHandler={ closeAccountHandler }></FormView>

          {
            label !== "Savings Accounts" && label !== "Investments" && (
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
