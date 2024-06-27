import { useState, useContext } from "react";

import "./close-account.styles.jsx";
import { CloseAccountContainer } from "./close-account.styles.jsx";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context";

import { PERMANENTLY_DELETE } from "../../../../utils/constants/banking.constants";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js";

const defaultFormFields = {
  confirmDelete: ""
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.close,
  width: COMMON_SPACING.bankingActions.width
}

const CloseAccount = ({ financeItemInfo }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { closeBankingAccount } = useContext(BankingContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

    if (formFields.confirmDelete === PERMANENTLY_DELETE) {
      closeBankingAccount(financeItemInfo.name);
    } else {
      return;
    }

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ [name]: value })
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