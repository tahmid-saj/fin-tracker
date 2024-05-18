import FloatingActionButtonExtendedSize from "../mui/floating-action-button/floating-action-button.component";
import "./about-links.styles.scss";

const AboutLinks = () => {
  return (
    <div className="about-links-container">
      <FloatingActionButtonExtendedSize content={ "tahmidsajin.com" }><ion-icon name="globe-outline"></ion-icon></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "GitHub" }><ion-icon name="logo-github"></ion-icon></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "Medium" }><ion-icon name="logo-medium"></ion-icon></FloatingActionButtonExtendedSize>
      <FloatingActionButtonExtendedSize content={ "Linkedin" }><ion-icon name="logo-linkedin"></ion-icon></FloatingActionButtonExtendedSize>
    </div>
  );
};

export default AboutLinks;