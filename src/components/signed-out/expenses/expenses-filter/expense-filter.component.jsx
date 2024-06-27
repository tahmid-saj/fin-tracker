import { useState, useContext } from "react"
import FormInput from "../../../shared/form-input/form-input.component"
import "./expense-filter.styles.jsx"
import { ExpenseFilterContainer, ExpenseFilterFormContainer } from "./expense-filter.styles.jsx"

// import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"
import Button from "../../../shared/button/button.component"

import { useDispatch } from "react-redux"
import { filterExpenses, clearExpensesFilter } from "../../../../store/signed-out/expenses/expenses.action"
import { ExpensesFilterInfo } from "../expenses-filter-info/expenses-filter-info.component"
import SimplePaper from "../../../shared/mui/paper/paper.component.jsx"
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.js"
import { Typography } from "@mui/material"

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
  const [formFields, setFormFields] = useState(defaultFormFields)
  // const { filterExpenses, clearExpensesFilter } = useContext(ExpensesContext)
  const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formFields.expenseFor === "" && formFields.expenseCategory === "" && formFields.expensesStartDate === "" && formFields.expensesEndDate === "" &&
      !formFields.expenseFor && !formFields.expenseCategory && !formFields.expensesStartDate && !formFields.expensesEndDate) {
        
        return
    }

    dispatch(filterExpenses(formFields))
  }

  const handleClearFilter = (event) => {
    event.preventDefault()

    resetFormFields()
    dispatch(clearExpensesFilter())
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