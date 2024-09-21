import { errorOnExportsToEmail, errorOnExportsToPdf, errorOnExportsToTxt } from "../errors/exports.errors";
// exports api requests

// export to email
export function postExportsToEmail(email: string | null | undefined) {
  try {

  } catch (error) {
    errorOnExportsToEmail()
    
  }
}

// export to pdf
export function postExportsToPdf() {
  try {

  } catch (error) {
    errorOnExportsToPdf()
    
  }
}

// export to txt
export function postExportsToTxt() {
  try {

  } catch (error) {
    errorOnExportsToTxt()
    
  }
}