import React from "react";
import FloatingActionButtonExtendedSize from "../mui/floating-action-button/floating-action-button.component";
import "./about-links.styles.scss";

import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutLinks = () => {
  return (
    <div className="about-links-container">
      <FloatingActionButtonExtendedSize content={ "tahmidsajin.com" }><LanguageIcon/></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "GitHub" }><GitHubIcon/></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "Medium" }><ArticleIcon/></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "Linkedin" }><LinkedInIcon/></FloatingActionButtonExtendedSize>
    </div>
  );
};

export default AboutLinks;