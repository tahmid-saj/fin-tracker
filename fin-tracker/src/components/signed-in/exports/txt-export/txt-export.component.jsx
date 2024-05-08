import React, { Component, useContext } from "react";

import txtIcon from "./txt-icon.png";

import "./txt-export.styles.scss";
import { ExportsContext } from "../../../../contexts/signed-in/exports/exports.context";

const TxtExport = () => {
  const { exportToTxt } = useContext(ExportsContext)

  const handleClick = async () => {
    await exportToTxt()
  }

  return (
    <div className="f5">
      <div className="f2">
        <button className="shadow-5 about-icons">
          <h2 className="pa2">Download as text
            <img className="pa2 exportOptionImg" alt="txt-icon" src={txtIcon} width={50} height={50}
              onClick={ handleClick }
            />
          </h2>
          </button>
      </div>
    </div>
  );
};

export default TxtExport;