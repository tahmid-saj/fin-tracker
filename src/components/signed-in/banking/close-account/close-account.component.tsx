import { useState, useContext } from "react";

import "./close-account.styles.jsx";
import { CloseAccountContainer } from "./close-account.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component.js";
import Button from "../../../shared/button/button.component.js";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.js";

import { PERMANENTLY_DELETE } from "../../../../utils/constants/banking.constants.js";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.js";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.js";

type FormFields = {
  confirmDelete: string
}

const defaultFormFields = {
  confirmDelete: ""
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.close,
  width: COMMON_SPACING.bankingActions.width
}

const CloseAccount = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);

  const { closeBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    if (formFields.confirmDelete === PERMANENTLY_DELETE) {
      closeBankingAccount(financeItemInfo.name);
    } else {
      return;
    }

    resetFormFields();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <CloseAccountContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="body1">Close Account</Typography>
        <Typography variant="subtitle2">Enter 'permanently delete'</Typography>

        <form onSubmit={ handleSubmit }>
          <FormInput type="text" required onChange={ handleChange }
                            name="confirmDelete" value={ formFields.confirmDelete }></FormInput>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Close</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </CloseAccountContainer>
  );
};

export default CloseAccount;