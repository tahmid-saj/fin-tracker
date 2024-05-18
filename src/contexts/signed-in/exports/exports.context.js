import { createContext, useContext } from "react";
import { UserContext } from "../../shared/user/user.context";
import { postExportsToEmail, postExportsToPdf, postExportsToTxt } from "../../../utils/api-requests/exports.requests";

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
  const { currentUser } = useContext(UserContext)

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