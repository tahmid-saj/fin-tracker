import "./button.styles.jsx";
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx";
import { BUTTON_TYPE_CLASSES } from "../../../utils/constants/shared.constants.js";
import { ReactNode } from "react";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]);
};

// Extend ButtonProps with React.ButtonHTMLAttributes to ensure all valid button props can be passed
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: string;
  children: ReactNode;
}

const Button = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, ...otherProps }: ButtonProps) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default Button;
