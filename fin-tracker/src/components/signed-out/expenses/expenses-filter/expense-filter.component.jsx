import { useState } from "react"
import FormInput from "../../../shared/form-input/form-input.component"
import "./expense-filter.styles.scss"

const defaultFormFields = {
  expenseFor: "",
  expenseCategory: "",
  expensesStartDate: "",
  expensesEndDate: "",
}

const ExpensesFilter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const filterUpdate = async (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target

    setFormFields({ ...defaultFormFields, [name]: value })
    filterUpdate()
  }

  return (
    <div>
      <h3>Filter</h3>

      <FormInput label="Expense for" type="text" required onChange={ (e) => handleChange(e) }
                  name="expenseFor" value={ formFields.expenseFor }></FormInput>
      
      <FormInput label="Category" type="text" required onChange={ (e) => handleChange(e) }
                  name="expenseCategory" value={ formFields.expenseCategory }></FormInput>
      
      <h5>Start date</h5>
      <FormInput type="date" required onChange={ handleChange }
                    name="expensesStartDate" value={ formFields.expensesStartDate }></FormInput>
      
      <h5>End date</h5>
      <FormInput type="date" required onChange={ handleChange }
                    name="expensesEndDate" value={ formFields.expensesEndDate }></FormInput>
    </div>
  )
}

export default ExpensesFilter