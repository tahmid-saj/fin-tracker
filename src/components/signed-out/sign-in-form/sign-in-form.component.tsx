import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithGooglePopup,
        signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebase.utils.ts";

import FormInput from "../../shared/form-input/form-input.component.tsx";
import Button from "../../shared/button/button.component.tsx";

import "./sign-in-form.styles.tsx";
import { SignInContainer, ButtonContainer } from "./sign-in-form.styles.tsx";

import { errorOnUserSignIn } from "../../../utils/errors/user.errors.ts";

import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../../store/shared/user/user.action.ts";
import GoogleIcon from '@mui/icons-material/Google';
import { COLOR_CODES } from "../../../utils/constants/shared.constants.ts";
import { Typography } from "@mui/material";

type FormFields = {
  email: string,
  password: string
}

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart())

    resetFormFields();
    navigate("/dashboard-signed-in");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // const signInResponse = await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email, password))

      resetFormFields();
      navigate("/dashboard-signed-in");
      // return signInResponse;
    } catch (error) {
      errorOnUserSignIn(error as Error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <div className="container">
        <Typography sx={{ color: COLOR_CODES.general["0"] }} variant="h6">Log back in</Typography>
        
        <form onSubmit={ handleSubmit }>
          <FormInput label="Email" type="email" required onChange={ handleChange }
                    name="email" value={ email }/>

          <FormInput label="Password" type="password" required onChange={ handleChange }
                    name="password" value={ password }/>

            <div className="row">
              <div className="col-12">
                <div className="btn-group flex-wrap">
                  <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <Button buttonType="google-sign-in" type="button" onClick={ signInWithGoogle } 
                      style={{ width: "250px" }}><GoogleIcon sx={{ margin: "7% 4% 0% 0%" }}/>Google Sign In</Button>
                  </ButtonContainer>
                </div>
              </div>
            </div>
        </form>
      </div>                  
    </SignInContainer>
  );
};

export default SignInForm;