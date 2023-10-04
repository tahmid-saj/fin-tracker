import "./finance-tracker-item.styles.scss";

import BankAccountForm from "../../signed-out/banking/bank-account-form/bank-account-form.component";

const FinanceTrackerItem = ({ name, label, ...otherProps }) => {

  const handleDisplayFinanceTrackerItemForm = (event) => {
    console.log(label, name);

    return (
      <BankAccountForm></BankAccountForm>
    )
  }

  return (
    <button className={`button-container finance-tracker-item-button`} 
            { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
            onClick={ e => handleDisplayFinanceTrackerItemForm(e) }>
      { `${name}` }
    </button>
  );
};

export default FinanceTrackerItem;
