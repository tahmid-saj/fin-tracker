import { useState, useContext } from "react"
import FormInput from "../../../shared/form-input/form-input.component.tsx"
import "./expense-filter.styles.tsx"
import { ExpenseFilterContainer, ExpenseFilterFormContainer } from "./expense-filter.styles.tsx"

import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context.tsx"
import Button from "../../../shared/button/button.component.tsx"
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts"
import { Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { FormEvent } from "react"
import { MouseEvent } from "react"

type FormFields = {
  expenseFor: string,
  expenseCategory: string,
  expensesStartDate: string,
  expensesEndDate: string
}

const defaultFormFields = {
  expenseFor: "",
  expenseCategory: "",
  expensesStartDate: "",
  expensesEndDate: "",
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "flex",
  justifyContent: "center"
}

const ExpensesFilter = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields)
  const { filterExpenses, clearExpensesFilter } = useContext(ExpensesContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (formFields.expenseFor === "" && formFields.expenseCategory === "" && formFields.expensesStartDate === "" && formFields.expensesEndDate === "" &&
      !formFields.expenseFor && !formFields.expenseCategory && !formFields.expensesStartDate && !formFields.expensesEndDate) {
        
        return
    }

    filterExpenses(formFields)
  }

  const handleClearFilter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    resetFormFields()
    clearExpensesFilter()
  }
  
  return (
    <ExpenseFilterContainer>
      <SimplePaper styles={ paperStyles }>
        <ExpenseFilterFormContainer onSubmit={ (e) => handleSubmit(e) }>
          <Typography variant="h6">Filter</Typography>

          <FormInput label="Expense for" type="text" onChange={ (e) => handleChange(e) }
                      name="expenseFor" value={ formFields.expenseFor }></FormInput>
          
          <FormInput label="Category" type="text" onChange={ (e) => handleChange(e) }
                      name="expenseCategory" value={ formFields.expenseCategory }></FormInput>
          
          <Typography paragraph>Start date</Typography>
          <FormInput type="date" onChange={ (e) => handleChange(e) }
                        name="expensesStartDate" value={ formFields.expensesStartDate }></FormInput>
          
          <Typography paragraph>End date</Typography>
          <FormInput type="date" onChange={ (e) => handleChange(e) }
                        name="expensesEndDate" value={ formFields.expensesEndDate }></FormInput>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <Button type="submit">Search</Button>
                  <Button type="button" onClick={ handleClearFilter }>Clear Filter</Button>
                </div>
              </div>
            </div>
          </div>
        </ExpenseFilterFormContainer>
      </SimplePaper>
    </ExpenseFilterContainer>
  )
}

export default ExpensesFilter