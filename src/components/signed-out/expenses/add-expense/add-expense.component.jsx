import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants"
import FormView from "../../form-view/form-view.component"
import "./add-expense.styles.scss"

const AddExpense = () => {
  return (
    <FormView financeItemLabel={ FINANCE_ITEM_TYPES.expenses } financeItemInfo={ null }></FormView>
  )
}

export default AddExpense