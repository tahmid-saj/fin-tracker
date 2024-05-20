import { errorOnExportsToEmail, errorOnExportsToPdf, errorOnExportsToTxt } from "../errors/exports.errors";
// exports api requests

// export to email
export function postExportsToEmail(email) {
  try {

  } catch (error) {
    errorOnExportsToEmail()
    console.log(error)
  }
}

// export to pdf
export function postExportsToPdf() {
  try {

  } catch (error) {
    errorOnExportsToPdf()
    console.log(error)
  }
}

// export to txt
export function postExportsToTxt() {
  try {

  } catch (error) {
    errorOnExportsToTxt()
    console.log(error)
  }
}