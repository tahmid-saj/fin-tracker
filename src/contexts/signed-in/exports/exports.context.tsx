import React, { createContext, FC } from "react";
import { postExportsToEmail, postExportsToPdf, postExportsToTxt } from "../../../utils/api-requests/exports.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { ExportContextType, ExportProviderProps } from "./exports.types";

// helper functions
const exportToEmailHelper = async (email: string | null | undefined) => {
  postExportsToEmail(email)
}

const exportToPdfHelper = async () => {
  postExportsToPdf()
}

const exportToTxtHelper = async () => {
  postExportsToTxt()
}

// initial state
export const ExportsContext = createContext<ExportContextType>({
  exportToEmail: () => {},
  exportToPdf: () => {},
  exportToTxt: () => {}
})

// context component
export const ExportsProvider: FC<ExportProviderProps> = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser)

  const exportToEmail = async () => {
    if (currentUser) {
      await exportToEmailHelper(currentUser.email)
    }
  }

  const exportToPdf = async () => {
    await exportToPdfHelper()
  }

  const exportToTxt = async () => {
    await exportToTxtHelper()
  }

  const value = { exportToEmail, exportToPdf, exportToTxt }

  return (
    <ExportsContext.Provider
      value={ value }>
      { children }
    </ExportsContext.Provider>
  )
}