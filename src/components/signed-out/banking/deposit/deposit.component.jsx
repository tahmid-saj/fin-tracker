import { useState, useContext } from "react";

import "./deposit.styles.jsx";
import { DepositContainer } from "./deposit.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { depositToBankingAccount } from "../../../../store/signed-out/banking/banking.action";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { Typography } from "@mui/material";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  amount: "",
  reason: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.deposit,
  width: COMMON_SPACING.bankingActions.width
}

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

    dispatch(depositToBankingAccount(bankingAccounts, financeItemInfo.name, formFields.amount, formFields.reason))

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <DepositContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="body1">Deposit</Typography>

        <form onSubmit={ handleSubmit }>
          <FormInput label="Amount" type="text" required onChange={ handleChange }
                            name="amount" value={ formFields.amount }></FormInput>

          <FormInput label="For" type="text" onChange={ handleChange }
                            name="reason" value={ formFields.reason }></FormInput>
          
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Deposit</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </DepositContainer>
  );
};

export default Deposit;