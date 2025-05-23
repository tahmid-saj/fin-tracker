import { useState, useContext, FormEvent, ChangeEvent } from "react";

import "./transfer-money.styles.scss";

import "./transfer-money.styles.tsx";
import { TransferMoneyContainer } from "./transfer-money.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Typography } from "@mui/material";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

type FormFields = {
  transferTo: string,
  amount: string,
  reason: string
}

const defaultFormFields = {
  transferTo: "",
  amount: "",
  reason: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.transfer,
  width: COMMON_SPACING.bankingActions.width
}

const TransferMoney = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const { transferToBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    transferToBankingAccount(financeItemInfo.name, formFields.transferTo, Number(formFields.amount), formFields.reason);

    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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