import { useState, useContext, FormEvent, ChangeEvent } from "react";

import "./withdraw.styles.ts";
import { WithdrawContainer, TransactionAddToExpensesContainer } from "./withdraw.styles.ts";

import FormInput from "../../../shared/form-input/form-input.component.ts";
import Button from "../../../shared/button/button.component.ts";

import { BankingContext } from "../../../../contexts/signed-in/banking/banking.context.ts";
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.ts";

import { BANKING_EXPENSE_CATEGORIES } from "../../../../utils/constants/expenses.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.ts";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { Typography, Checkbox } from "@mui/material";
import { BankingAccount } from "../../../../contexts/signed-in/banking/banking.types.ts";

type FormFields = {
  amount: string,
  reason: string,
  addToExpenses: boolean
}

const defaultFormFields = {
  amount: "",
  reason: "",
  addToExpenses: false
};

const paperStyles = {
  backgroundColor: COLOR_CODES.bankingActions.withdraw,
  width: COMMON_SPACING.bankingActions.width
}

const Withdraw = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)

  const [addedToExpensesChecked, setAddedToExpensesChecked] = useState(defaultFormFields.addToExpenses)

  const { withdrawFromBankingAccount } = useContext(BankingContext);
  const { addExpense } = useContext(ExpensesContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setAddedToExpensesChecked(defaultFormFields.addToExpenses)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     
    withdrawFromBankingAccount(financeItemInfo.name, Number(formFields.amount), formFields.reason, formFields.addToExpenses);
     
    addExpense({
      expenseId: 999,
      expenseFor: formFields.reason ? formFields.reason : BANKING_EXPENSE_CATEGORIES.withdrawal,
      expenseCost: Number(formFields.amount),
      expenseDate: new Date().toISOString().split('T')[0],
      expenseCategory: BANKING_EXPENSE_CATEGORIES.withdrawal
    })

    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const addTransactionToExpenses = (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, addToExpenses: event.target.checked })

    setAddedToExpensesChecked(event.target.checked)
  }

  return (
    <WithdrawContainer>
      <SimplePaper styles={ paperStyles }>
        <Typography variant="body1">Withdraw</Typography>

        <form onSubmit={ handleSubmit }>
          <FormInput label="Amount" type="text" required onChange={ handleChange }
                            name="amount" value={ formFields.amount }></FormInput>

          <FormInput label="For" type="text" onChange={ handleChange }
                            name="reason" value={ formFields.reason }></FormInput>
          
          <TransactionAddToExpensesContainer>
            <Typography variant="subtitle2">Add to expenses?</Typography>
            <Checkbox checked={ addedToExpensesChecked } onChange={ addTransactionToExpenses }
              inputProps={{ 'aria-label': 'controlled' }}></Checkbox>
          </TransactionAddToExpensesContainer>
          
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Withdraw</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </SimplePaper>
    </WithdrawContainer>
  );
};


export default Withdraw;