import "./button.styles.jsx"
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx";
import { BUTTON_TYPE_CLASSES } from "../../../utils/constants/shared.constants";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType])
}

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType)

  return (
    <CustomButton { ...otherProps }>
      { children }
    </CustomButton>
  );
};

export default Button;