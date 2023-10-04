import React from "react";

import "./about-links.styles.scss";

const AboutLinks = () => {
  return (
    <div className="about-links-container">
      <button className="about-icons"><h1>Medium </h1><ion-icon name="logo-medium"></ion-icon></button>
      <button className="about-icons"><h1>GitHub </h1><ion-icon name="logo-github"></ion-icon></button>
      <button className="about-icons"><h1>Site </h1><ion-icon name="globe-outline"></ion-icon></button>
      <button className="about-icons"><h1>LinkedIn </h1><ion-icon name="logo-linkedin"></ion-icon></button>
    </div>
  );
};

export default AboutLinks;