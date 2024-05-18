import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants"
import FormView from "../../form-view/form-view.component"
import "./add-expense.styles.scss"

const AddExpense = () => {
  return (
    <div className="add-expense-form-view-container">
      <FormView financeItemLabel={ FINANCE_ITEM_TYPES.expenses } financeItemInfo={ null }></FormView>
    </div>
  )
}

export default AddExpense