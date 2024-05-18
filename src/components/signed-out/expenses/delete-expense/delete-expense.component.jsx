import "./delete-expense.styles.scss"
import { ReactComponent as RemoveExpense } from "../../../../assets/close-button.svg"
import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"
import { useContext } from "react"

const DeleteExpense = () => {
  const { removeExpense } = useContext(ExpensesContext)

  const handleRemove = (event) => {
    event.preventDefault()
    removeExpense()
  }

  return (
    <RemoveExpense className="remove-expense-container" onClick={ handleRemove }>
      X
    </RemoveExpense>
  )
}
export default DeleteExpense