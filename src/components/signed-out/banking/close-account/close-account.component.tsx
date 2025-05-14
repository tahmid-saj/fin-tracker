import { useState, useContext, FormEvent, ChangeEvent } from "react";

import "./close-account.styles.tsx";
import { CloseAccountContainer } from "./close-account.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";
import { useDispatch, useSelector } from "react-redux";
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector.ts";
import { closeBankingAccount } from "../../../../store/signed-out/banking/banking.action.ts";

import { PERMANENTLY_DELETE } from "../../../../utils/constants/banking.constants.ts";
import { Typography } from "@mui/material";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { BankingAccount } from "../../../../store/signed-out/banking/banking.types.ts";

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
  // const { closeBankingAccount } = useContext(BankingContext);
  const bankingAccounts = useSelector(selectBankingAccounts)

  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    if (formFields.confirmDelete === PERMANENTLY_DELETE) {
      dispatch(closeBankingAccount(bankingAccounts!, financeItemInfo.name))
    } else {
      return;
    }

    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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