import { useContext, useState } from "react"
import "./expenses-form.styles.scss"
import FormInput from "../../../shared/form-input/form-input.component"
import Button from "../../../shared/button/button.component"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context"

const defaultFormFields = {
  expenseFor: "",
  expenseCost: "",
  expenseDate: "",
  expenseCategory: ""
}

const ExpensesForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { expenses, addExpense } = useContext(ExpensesContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formFields.expenseFor === "" || formFields.expenseCost === "" || formFields.expenseDate === "" || formFields.expenseCategory === "" ||
      !formFields.expenseFor || !formFields.expenseCost || !formFields.expenseDate || !formFields.expenseCategory) {
        console.log("please fill out all info")
        return
    }
    
    addExpense(formFields)
    resetFormFields()
  }

  return (
    <div className="expenses-form-container">
      <div className="add-expense-container">
        <h3>Add Expense</h3>

        <form class="add-expense-form-container" onSubmit={ (e) => handleSubmit(e) }>
          <FormInput label="Expense for" type="text" required onChange={ handleChange }
                    name="expenseFor" value={ formFields.expenseFor }></FormInput>
          
          <FormInput label="Cost" type="text" required onChange={ handleChange }
                    name="expenseCost" value={ formFields.expenseCost }></FormInput>
          
          <h5>Date</h5>
          <FormInput type="date" required onChange={ handleChange }
                    name="expenseDate" value={ formFields.expenseDate }></FormInput>
          
          <FormInput label="Category" type="text" required onChange={ handleChange }
                    name="expenseCategory" value={ formFields.expenseCategory }></FormInput>
          
          <div className="buttons-container">
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpensesForm