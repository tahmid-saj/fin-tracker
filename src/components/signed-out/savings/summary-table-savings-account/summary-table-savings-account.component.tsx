import "./summary-table-savings-account.styles.tsx"
import { SummaryTableSavingsContainer } from "./summary-table-savings-account.styles.tsx";
import { useState, useContext, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
// import { SavingsContext } from "../../../../contexts/signed-out/savings/savings.context";
import { useSelector } from "react-redux";
import { selectSavingsAccounts } from "../../../../store/signed-out/savings/savings.selector.ts";
import { getSavingsAccountInfo } from "../../../../store/signed-out/savings/savings.action.ts";

import { COLOR_CODES, COMMON_SPACING } from "../../../../utils/constants/shared.constants.ts";
import SimplePaper from "../../../shared/mui/paper/paper.component.tsx";
import { SavingsAccount } from "../../../../store/signed-out/savings/savings.types.ts";
import { ColDef } from "ag-grid-community";

type SavingsData = {
  Date: string,
  InterestEarned: string,
  TotalInterestEarned: string,
  Balance: string
}

const paperStyles = {
  backgroundColor: COLOR_CODES.general["5"],
  display: "block",
  justifyContent: "center"
}

const SummaryTableSavingsAccount = ({ financeItemInfo }: { financeItemInfo: SavingsAccount }) => {
  // const { savingsAccounts, getSavingsAccountInfo } = useContext(SavingsContext)
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const savingsAccountInfo = getSavingsAccountInfo(savingsAccounts!, financeItemInfo.savingsAccountName)
  const { savings } = savingsAccountInfo!

  const rowData = savings.map((savingMonth) => {
    return {
      Date: savingMonth.currentDate,
      InterestEarned: savingMonth.interestEarned.toFixed(2),
      TotalInterestEarned: savingMonth.totalInterestEarned.toFixed(2),
      Balance: savingMonth.balance.toFixed(2)
    }
  })

  // Column Definitions: Defines the columns to be displayed.
  const columnDefs: ColDef<SavingsData>[] = [
    { field: "Date"},
    { field: "InterestEarned" },
    { field: "TotalInterestEarned" },
    { field: "Balance" }
  ]

  return (
    <SimplePaper styles={ paperStyles }>
      <SummaryTableSavingsContainer>
        <div className="ag-theme-quartz-dark"
          style={{ height: COMMON_SPACING.table.height, width: COMMON_SPACING.table.width }}>
          <AgGridReact rowData={ rowData } columnDefs={ columnDefs } rowSelection={ "multiple" }/>
        </div>
      </SummaryTableSavingsContainer>
    </SimplePaper>
  )
}

export default SummaryTableSavingsAccount