import "./summary-table-investments.styles.tsx"
import { SummaryTableInvestmentsContainer } from "./summary-table-investments.styles.tsx";
import { useState, useContext, useRef } from "react"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { useSelector } from "react-redux";
import { selectInvestments } from "../../../../store/signed-out/investments/investments.selector.ts";
import { getInvestmentInfo } from "../../../../store/signed-out/investments/investments.action.ts";
import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { Investment } from "../../../../store/signed-out/investments/investments.types.ts";
import { ColDef } from "ag-grid-community";

type InvestmentData = {
  Date: string,
  Interest: string,
  Contribution: string,
  Balance: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "block",
  justifyContent: "center"
}

const SummaryTableInvestments = ({ financeItemInfo }: { financeItemInfo: Investment }) => {
  const investments = useSelector(selectInvestments)

  const investmentInfo = getInvestmentInfo(investments!, financeItemInfo.investmentName);
  const { investments: investmentsSchedule } = investmentInfo!

  const rowData = investmentsSchedule.map((investmentMonth) => {
    return {
      Date: investmentMonth.currentDate,
      Interest: investmentMonth.interestAccumulated.toFixed(2),
      Contribution: investmentMonth.contribution.toFixed(2),
      Balance: investmentMonth.endingBalance.toFixed(2)
    }
  })

  const columnDefs: ColDef<InvestmentData>[] = [
    { field: "Date" },
    { field: "Interest" },
    { field: "Contribution" },
    { field: "Balance" }
  ]

  return (
    <SimplePaper styles={ paperStyles }>
      <SummaryTableInvestmentsContainer>
        <div className="ag-theme-quartz-dark"
          style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
          <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
        </div>
      </SummaryTableInvestmentsContainer>
    </SimplePaper>
  )
}

export default SummaryTableInvestments