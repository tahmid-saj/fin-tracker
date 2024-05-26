import { createContext } from "react";
import { postExportsToEmail, postExportsToPdf, postExportsToTxt } from "../../../utils/api-requests/exports.requests";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";

// helper functions
const exportToEmailHelper = async (email) => {
  postExportsToEmail(email)
}

const exportToPdfHelper = async () => {
  postExportsToPdf()
}

const exportToTxtHelper = async () => {
  postExportsToTxt()
}

// initial state
export const ExportsContext = createContext({
  exportToEmail: () => {},
  exportToPdf: () => {},
  exportToTxt: () => {}
})

// context component
export const ExportsProvider = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser)

  const exportToEmail = async () => {
    await exportToEmailHelper(currentUser.email)
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