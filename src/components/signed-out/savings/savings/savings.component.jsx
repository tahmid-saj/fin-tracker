import "./savings.styles.tsx"
import { SavingsContainer, SavingsSummaryContainer } from "./savings.styles.tsx"
import { useSelector } from "react-redux"
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector.ts"
import Summary from "../summary/summary.component.tsx"
import AccountInfo from "../account-info/account-info.component.tsx"
import SummaryGraphSavingsAccount from "../summary-graph/summary-graph.component.tsx"
import SummaryTableSavingsAccount from "../summary-table-savings-account/summary-table-savings-account.component.tsx"
import UpdateAccountForm from "../update-account-form/update-account-form.component.tsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.tsx"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const Savings = () => {
  const savingsAccounts = useSelector(selectSavingsAccounts)

  return (
    <SavingsContainer>
      {
        savingsAccounts.map((savingsAccount, index) => {
          return (
            <AccordionTransition key={ index } header={ savingsAccount.savingsAccountName }
              styles={ accordionStyles }>
              <SavingsSummaryContainer>
                <Summary financeItemInfo={ savingsAccount }></Summary>
                <AccountInfo financeItemInfo={ savingsAccount }></AccountInfo>
              </SavingsSummaryContainer>

              <SummaryGraphSavingsAccount financeItemInfo={ savingsAccount }></SummaryGraphSavingsAccount>
              <SummaryTableSavingsAccount financeItemInfo={ savingsAccount }></SummaryTableSavingsAccount>
              <UpdateAccountForm financeItemInfo={ savingsAccount }></UpdateAccountForm>
            </AccordionTransition>
          )
        })
      }
    </SavingsContainer>
  )
}

export default Savings