import React, { Component, useContext } from "react";

import emailIcon from "./email-icon.png";

import "./email-export.styles.scss";
import { ExportsContext } from "../../../../contexts/signed-in/exports/exports.context";

const EmailExport = () => {
  const { exportToEmail } = useContext(ExportsContext)

  const handleClick = async () => {
    await exportToEmail()
  }

  return (
    <div className="f5">
      <div className="f2">
        <button className="shadow-5 pl3 pr4 about-icons">
          <h2 className="pa2">Share via email
            <img className="pa2 exportOptionImg" alt="email-icon" src={emailIcon} width={50} height={50}
              onClick={ handleClick }
            />
          </h2>
          </button>
      </div>

    </div>
  );
};

export default EmailExport;