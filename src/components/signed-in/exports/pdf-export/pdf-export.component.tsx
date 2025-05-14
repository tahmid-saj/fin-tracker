import React, { Component, useContext } from "react";

import pdfIcon from "./pdf-icon.png"

import "./pdf-export.styles.scss";
import { ExportsContext } from "../../../../contexts/signed-in/exports/exports.context";

const PDFExport = () => {
  const { exportToPdf } = useContext(ExportsContext)

  const handleClick = async () => {
    await exportToPdf()
  }

  return (
    <div className="f5">
      <div className="f2">
        <button className="shadow-5 about-icons">
          <h2 className="pa2">Download as PDF
            <img className="pa1 exportOptionImg" alt="pdf-icon" src={pdfIcon} width={50} height={50}
              onClick={ handleClick }
            />
          </h2>
          </button>
      </div>
    </div>
  );
};

export default PDFExport;