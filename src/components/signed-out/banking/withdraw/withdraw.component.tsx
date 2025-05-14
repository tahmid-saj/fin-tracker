import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawFromBankingAccount } from "../../../../store/signed-out/banking/banking.action.ts"
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector.ts";
import { Checkbox, Typography } from "@mui/material";

import "./withdraw.styles.tsx";
import { WithdrawContainer, TransactionAddToExpensesContainer } from "./withdraw.styles.tsx";

import FormInput from "../../../shared/form-input/form-input.component.tsx";
import Button from "../../../shared/button/button.component.tsx";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

import { selectExpenses, selectExpensesTagLimit } from "../../../../store/signed-out/expenses/expenses.selector.ts";
import { addExpense } from "../../../../store/signed-out/expenses/expenses.action.ts";
import { BANKING_EXPENSE_CATEGORIES } from "../../../../utils/constants/expenses.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import { BankingAccount } from "../../../../store/signed-out/banking/banking.types.ts";

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
  const [formFields, setFormFields] = useState(defaultFormFields);
  // const { withdrawFromBankingAccount } = useContext(BankingContext);
  const dispatch = useDispatch()
  const bankingAccounts = useSelector(selectBankingAccounts)
  const expenses = useSelector(selectExpenses)
  const expensesTagLimit = useSelector(selectExpensesTagLimit)

  const [addedToExpensesChecked, setAddedToExpensesChecked] = useState(defaultFormFields.addToExpenses)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setAddedToExpensesChecked(defaultFormFields.addToExpenses)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(withdrawFromBankingAccount(bankingAccounts!, financeItemInfo.name, Number(formFields.amount), 
      formFields.reason, formFields.addToExpenses))
    
    dispatch(addExpense(expenses!, {
      expenseFor: formFields.reason ? formFields.reason : BANKING_EXPENSE_CATEGORIES.withdrawal,
      expenseCost: Number(formFields.amount),
      expenseDate: new Date().toISOString().split('T')[0],
      expenseCategory: BANKING_EXPENSE_CATEGORIES.withdrawal,
      expenseId: 999
    }, expensesTagLimit!))

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