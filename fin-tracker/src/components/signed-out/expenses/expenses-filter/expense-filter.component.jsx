import { useState, useContext } from "react"
import FormInput from "../../../shared/form-input/form-input.component"
import "./expense-filter.styles.scss"

import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"
import Button from "../../../shared/button/button.component"

const defaultFormFields = {
  expenseFor: "",
  expenseCategory: "",
  expensesStartDate: "",
  expensesEndDate: "",
}

const ExpensesFilter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { filterExpenses } = useContext(ExpensesContext)

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
        console.log("please fill out all info")
        return
    }

    filterExpenses(formFields)
  }
  
  return (
    <div className="expense-filter-container">
      <h3>Filter</h3>

      <form className="filter-expenses-form-container" onSubmit={ (e) => handleSubmit(e) }>
        <FormInput label="Expense for" type="text" onChange={ (e) => handleChange(e) }
                    name="expenseFor" value={ formFields.expenseFor }></FormInput>
        
        <FormInput label="Category" type="text" onChange={ (e) => handleChange(e) }
                    name="expenseCategory" value={ formFields.expenseCategory }></FormInput>
        
        <h5>Start date</h5>
        <FormInput type="date" onChange={ (e) => handleChange(e) }
                      name="expensesStartDate" value={ formFields.expensesStartDate }></FormInput>
        
        <h5>End date</h5>
        <FormInput type="date" onChange={ (e) => handleChange(e) }
                      name="expensesEndDate" value={ formFields.expensesEndDate }></FormInput>

        <div className="buttons-container">
          <Button type="submit">Filter</Button>
        </div>
      </form>
    </div>
  )
}

export default ExpensesFilter