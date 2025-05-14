import "./investments.styles.tsx"
import { useSelector } from "react-redux"
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector.ts"
import { InvestmentsContainer, InvestmentSummaryContainer } from "./investments.styles.tsx"
import { AccordionTransition } from "../../../shared/mui/accordion/accordion.component.tsx"
import Summary from "../summary/summary.component.tsx"
import InvestmentInfo from "../investment-info/investment-info.component.tsx"
import SummaryGraphInvestment from "../summary-graph/summary-graph.component.tsx"
import SummaryTableInvestments from "../summary-table-investments/summary-table-investments.component.tsx"
import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component.tsx"
import { COLOR_CODES } from "../../../../utils/constants/shared.constants.ts"

const accordionStyles = {
  backgroundColor: COLOR_CODES.general["6"]
}

const Investments = () => {
  const investments = useSelector(selectInvestments)

  return (
    <InvestmentsContainer>
      {
        investments.map((investment, index) => {
          return (
            <AccordionTransition key={ index } header={ investment.investmentName }
              styles={ accordionStyles }>
              <InvestmentSummaryContainer>
                <Summary financeItemInfo={ investment }></Summary>
                <InvestmentInfo financeItemInfo={ investment }></InvestmentInfo>
              </InvestmentSummaryContainer>

              <SummaryGraphInvestment financeItemInfo={ investment }></SummaryGraphInvestment>
              <SummaryTableInvestments financeItemInfo={ investment }></SummaryTableInvestments>
              <UpdateInvestmentForm financeItemInfo={ investment }></UpdateInvestmentForm>
            </AccordionTransition>
          )
        })
      }
    </InvestmentsContainer>
  )
}

export default Investments