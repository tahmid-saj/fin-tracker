import "./delete-expense.styles.scss"
import { ReactComponent as RemoveExpense } from "../../../../assets/close-button.svg"

const DeleteExpense = () => {
  return (
    <RemoveExpense className="remove-expense-container" onClick={() => window.alert('removed') }>X</RemoveExpense>
  )
}
export default DeleteExpense