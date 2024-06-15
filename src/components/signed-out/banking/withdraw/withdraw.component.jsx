import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdrawFromBankingAccount } from "../../../../store/signed-out/banking/banking.action"
import { selectBankingAccounts } from "../../../../store/signed-out/banking/banking.selector";
import { Checkbox, Typography } from "@mui/material";

import "./withdraw.styles.scss";

import FormInput from "../../../shared/form-input/form-input.component";
import Button from "../../../shared/button/button.component";

// import { BankingContext } from "../../../../contexts/signed-out/banking/banking.context";

import { selectExpenses, selectExpensesTagLimit } from "../../../../store/signed-out/expenses/expenses.selector";
import { addExpense } from "../../../../store/signed-out/expenses/expenses.action";
import { BANKING_EXPENSE_CATEGORIES } from "../../../../utils/constants/expenses.constants";

const defaultFormFields = {
  amount: "",
  reason: "",
  addToExpenses: false
};

const Withdraw = ({ financeItemInfo }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(withdrawFromBankingAccount(bankingAccounts, financeItemInfo, formFields.amount, formFields.reason, formFields.addToExpenses))
    
    dispatch(addExpense(expenses, {
      expenseFor: formFields.reason ? formFields.reason : BANKING_EXPENSE_CATEGORIES.withdrawal,
      expenseCost: formFields.amount,
      expenseDate: new Date().toISOString().split('T')[0],
      expenseCategory: BANKING_EXPENSE_CATEGORIES.withdrawal
    }, expensesTagLimit))

    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const addTransactionToExpenses = (event) => {
    setFormFields({ ...formFields, addToExpenses: event.target.checked })

    setAddedToExpensesChecked(event.target.checked)
  }

  return (
    <div className="withdraw-container">
      <h3>Withdraw</h3>

      <form onSubmit={ handleSubmit }>
        <FormInput label="Amount" type="text" required onChange={ handleChange }
                          name="amount" value={ formFields.amount }></FormInput>

        <FormInput label="For" type="text" onChange={ handleChange }
                          name="reason" value={ formFields.reason }></FormInput>
        
        <div className="transaction-add-to-expenses-container">
          <Typography variant="subtitle2">Add to expenses?</Typography>
          <Checkbox checked={ addedToExpensesChecked } onChange={ addTransactionToExpenses }
            inputProps={{ 'aria-label': 'controlled' }}></Checkbox>
        </div>
        
        <div className="buttons-container">
          <Button type="submit">Withdraw</Button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;