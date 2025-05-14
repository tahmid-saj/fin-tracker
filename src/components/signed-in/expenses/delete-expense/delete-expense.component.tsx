import "./delete-expense.styles.scss"
import { ReactComponent as RemoveExpense } from "../../../../assets/close-button.svg"
import { ExpensesContext } from "../../../../contexts/signed-in/expenses/expenses.context"
import { MouseEvent, useContext } from "react"

const DeleteExpense = () => {
  const { removeExpense } = useContext(ExpensesContext)

  const handleRemove = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault()
    // removeExpense()
  }

  return (
    <RemoveExpense className="remove-expense-container" onClick={ handleRemove }>
      X
    </RemoveExpense>
  )
}
export default DeleteExpense