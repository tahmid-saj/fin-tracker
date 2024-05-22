import { useState, useContext } from "react";

import "./deposit.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { depositToBankingAccount } from "../../../../store/signed-out/banking/banking.action";

const defaultFormFields = {
  amount: "",
  reason: "",
};

const Deposit = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // const { depositToBankingAccount } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(depositToBankingAccount(bankingAccounts, financeItemInfo, formFields.amount, formFields.reason))

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="deposit-container">
      <h3>Deposit</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ formFields.amount }></FormInput>

        <FormInput label="For" type="text" onChange={ handleChange }
                          name="reason" value={ formFields.reason }></FormInput>
        
        <div className="buttons-container">
          <Button type="submit">Deposit</Button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;