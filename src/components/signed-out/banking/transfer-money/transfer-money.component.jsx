import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { transferToBankingAccount } from "../../../../store/signed-out/banking/banking.action"

import "./transfer-money.styles.jsx";
import { TransferMoneyContainer } from "./transfer-money.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";
import { Typography } from "@mui/material";

import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";

const defaultFormFields = {
  transferTo: "",
  amount: "",
  reason: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.transfer,
  width: COMMON_SPACING.bankingActions.width
}

const TransferMoney = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // const { transferToBankingAccount } = useContext(BankingContext);

  const dispatch = useDispatch()
  const bankingAccounts = useSelector(selectBankingAccounts)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(transferToBankingAccount(bankingAccounts, financeItemInfo.name, formFields.transferTo, formFields.amount, formFields.reason))

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <TransferMoneyContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="body1">Transfer Money</Typography>

        <form onSubmit={ handleSubmit }>
          <FormInput label="Transfer to" type="text" required onChange={ handleChange }
                            name="transferTo" value={ formFields.transferTo }></FormInput>

          <FormInput label="Amount" type="text" required onChange={ handleChange }
                            name="amount" value={ formFields.amount }></FormInput>

          <FormInput label="For" type="text" onChange={ handleChange }
                            name="reason" value={ formFields.reason }></FormInput>
          
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Transfer</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </TransferMoneyContainer>
  );
};

export default TransferMoney;