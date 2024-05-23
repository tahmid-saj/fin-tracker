import "./delete-expense.styles.scss"
import { ReactComponent as RemoveExpense } from "../../../../assets/close-button.svg"
// import { ExpensesContext } from "../../../../contexts/signed-out/expenses/expenses.context"
import { useContext } from "react"

import { useDispatch, useSelector } from "react-redux"
import { selectExpenses } from "../../../../store/signed-out/expenses/expenses.selector"
import { removeExpense } from "../../../../store/signed-out/expenses/expenses.action"

const DeleteExpense = () => {
  // const { removeExpense } = useContext(ExpensesContext)
  const dispatch = useDispatch()
  const expenses = useSelector(selectExpenses)

  const handleRemove = (event) => {
    event.preventDefault()
    dispatch(removeExpense(expenses))
  }

  return (
    <RemoveExpense className="remove-expense-container" onClick={ handleRemove }>
      X
    </RemoveExpense>
  )
}
export default DeleteExpense