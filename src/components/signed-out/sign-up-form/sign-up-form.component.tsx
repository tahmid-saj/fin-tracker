import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../shared/form-input/form-input.component.tsx";
import Button from "../../shared/button/button.component.tsx";

import "./sign-up-form.styles.jsx";
import { SignUpContainer } from "./sign-up-form.styles.jsx";
import { Typography } from "@mui/material";
import { COLOR_CODES } from "../../../utils/constants/shared.constants.ts";
import { errorOnEmailAlreadyInUse, errorOnUserCreation } from "../../../utils/errors/user.errors.ts";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../../store/shared/user/user.action.ts";

type FormFields = {
  displayName: string,
  email: string,
  password: string,
  confirmPassword: string
}

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // await createUserDocumentFromAuth(user, { displayName });
      dispatch(signUpStart(email, password, displayName))

      resetFormFields();
      navigate("/dashboard-signed-in")
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        errorOnEmailAlreadyInUse();
      } else {
        errorOnUserCreation(error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignUpContainer>
      <div className="container">
        <Typography sx={{ color: COLOR_CODES.general["0"] }} variant="h6">Sign up</Typography>

        <form onSubmit={ handleSubmit }>
          <FormInput label="Display name" type="text" required onChange={ handleChange }
                    name="displayName" value={ displayName }></FormInput>

          <FormInput label="Email" type="email" required onChange={ handleChange }
                    name="email" value={ email }></FormInput>

          <FormInput label="Password" type="password" required onChange={ handleChange }
                    name="password" value={ password }></FormInput>

          <FormInput label="Confirm password" type="password" required onChange={ handleChange }
                    name="confirmPassword" value={ confirmPassword }></FormInput>
          
          <div className="row">
            <div className="col-12">
              <div className="btn-group flex-wrap">
                <Button type="submit">Sign Up</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </SignUpContainer>
  );
};

export default SignUpForm;