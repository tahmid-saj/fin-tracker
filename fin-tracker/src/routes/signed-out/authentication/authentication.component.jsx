import "./authentication.styles.scss";

import SignInForm from "../../../components/signed-out/sign-in-form/sign-in-form.component";
import SignUpForm from "../../../components/signed-out/sign-up-form/sign-up-form.component";

const AuthenticationRoute = () => {
  return (
    <div className="authentication-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default AuthenticationRoute;