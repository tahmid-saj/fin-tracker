import React, { Component } from "react";

import txtIcon from "./txt-icon.png";

import "./txt-export.styles.scss";

const TxtExport = () => {
  return (
    <div className="f5">
      <div className="f2">
        <button className="shadow-5 about-icons">
          <h2 className="pa2">Download as text
            <img className="pa2 exportOptionImg" alt="txt-icon" src={txtIcon} width={50} height={50}/>
          </h2>
          </button>
      </div>
    </div>
  );
};

export default TxtExport;