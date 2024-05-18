import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithGooglePopup,
        signInAuthUserWithEmailAndPassword } from "../../../utils/firebase/firebase.utils";

import FormInput from "../../shared/form-input/form-input.component";
import Button from "../../shared/button/button.component";

import "./sign-in-form.styles.scss";

import { errorOnUserSignIn } from "../../../utils/errors/user.errors";

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

    navigate("/dashboard-signed-in");
    resetFormFields();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const signInResponse = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate("/dashboard-signed-in");
      return signInResponse;
    } catch (error) {
      errorOnUserSignIn(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      
      <form onSubmit={ handleSubmit }>
        <FormInput label="Email" type="email" required onChange={ handleChange }
                  name="email" value={ email }/>

        <FormInput label="Password" type="password" required onChange={ handleChange }
                  name="password" value={ password }/>

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google-sign-in" type="button"
                  onClick={ signInWithGoogle }>Google Sign In
          </Button>
        </div>                  
      </form>

    </div>
  );
};

export default SignInForm;