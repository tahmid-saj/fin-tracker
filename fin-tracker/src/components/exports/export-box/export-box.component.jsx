import React, { Component } from "react";

import EmailExport from "../email-export/email-export.component";
import PDFExport from "../pdf-export/pdf-export.component";
import TxtExport from "../txt-export/txt-export.component";

import "./export-box.styles.scss";

const ExportBox = () => {
  return (
    <div className="exports-box-container">
      <EmailExport/>
      <PDFExport/>
      <TxtExport/>
    </div>
  );
};

export default ExportBox;