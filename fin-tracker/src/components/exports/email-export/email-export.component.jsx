import React, { Component } from "react";

import emailIcon from "./email-icon.png";

import "./email-export.styles.scss";

const EmailExport = () => {
  return (
    <div className="f5">
      <div className="f2">
        <button className="shadow-5 pl3 pr4 about-icons">
          <h2 className="pa2">Share via email
            <img className="pa2 exportOptionImg" alt="email-icon" src={emailIcon} width={50} height={50}/>
          </h2>
          </button>
      </div>

    </div>
  );
};

export default EmailExport;