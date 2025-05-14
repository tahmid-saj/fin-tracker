import { useContext, useState } from "react"
import "./expenses-form.styles.tsx"
import { AddExpenseContainer, AddExpenseFormContainer } from "./expenses-form.styles.tsx"
import FormInput from "../../../shared/form-input/form-input.component.tsx"
import Button from "../../../shared/button/button.component.tsx"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.tsx"
import { Typography } from "@mui/material"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import { ChangeEvent } from "react"
import { FormEvent } from "react"

type FormFields = {
  expenseFor: string,
  expenseCost: string,
  expenseDate: string,
  expenseCategory: string
}

const defaultFormFields = {
  expenseFor: "",
  expenseCost: "",
  expenseDate: "",
  expenseCategory: ""
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
}

const ExpensesForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { expenses, addExpense } = useContext(ExpensesContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formFields.expenseFor === "" || formFields.expenseCost === "" || formFields.expenseDate === "" || formFields.expenseCategory === "" ||
      !formFields.expenseFor || !formFields.expenseCost || !formFields.expenseDate || !formFields.expenseCategory) {
        
        return
    }
    
    addExpense({
      expenseFor: formFields.expenseFor,
      expenseCost: Number(formFields.expenseCost),
      expenseDate: formFields.expenseDate,
      expenseCategory: formFields.expenseCategory,
      expenseId: 999
    })
    resetFormFields()
  }

  return (
    <AddExpenseContainer>
      <AddExpenseFormContainer>
        <SimplePaper styles={ paperStyles }>
          <Typography variant="h6">Add Expense</Typography>

          <form onSubmit={ (e) => handleSubmit(e) }>
            <FormInput label="Expense for" type="text" required onChange={ handleChange }
                      name="expenseFor" value={ formFields.expenseFor }></FormInput>
            
            <FormInput label="Cost" type="text" required onChange={ handleChange }
                      name="expenseCost" value={ formFields.expenseCost }></FormInput>
            
            <Typography paragraph>Date</Typography>
            <FormInput type="date" required onChange={ handleChange }
                      name="expenseDate" value={ formFields.expenseDate }></FormInput>
            
            <FormInput label="Category" type="text" required onChange={ handleChange }
                      name="expenseCategory" value={ formFields.expenseCategory }></FormInput>
            
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="btn-group flex-wrap">
                    <Button type="submit">Add</Button>
                    <Button type="button" onClick={ resetFormFields }>Clear</Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </SimplePaper>
      </AddExpenseFormContainer>
    </AddExpenseContainer>
  )
}

export default ExpensesForm