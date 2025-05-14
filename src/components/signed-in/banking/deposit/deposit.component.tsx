import { useState, useContext, FormEvent, ChangeEvent } from "react";

import "./deposit.styles.tsx";
import { DepositContainer } from "./deposit.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.tsx";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Typography } from "@mui/material";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

type FormFields = {
  amount: string,
  reason: string
}

const defaultFormFields = {
  amount: "",
  reason: "",
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.deposit,
  width: COMMON_SPACING.bankingActions.width
}

const Deposit = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const { depositToBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    depositToBankingAccount(financeItemInfo.name, Number(formFields.amount), formFields.reason);

    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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