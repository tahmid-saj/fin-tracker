import "./authentication.styles.scss";

import SignInForm from "../../../components/signed-out/sign-in-form/sign-in-form.component";
import SignUpForm from "../../../components/signed-out/sign-up-form/sign-up-form.component";

import ItemTabs from "../../../components/shared/mui/tabs/tabs.component";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const AuthenticationRoute = () => {
  const tabList = [
    {
      value: "sign-in-form",
      icon: <LoginIcon/>,
      label: "Sign In"
    },
    {
      value: "sign-up-form",
      icon: <AppRegistrationIcon/>,
      label: "Register"
    }
  ]

  const panelList = [
    {
      value: "sign-in-form",
      children: <SignInForm/>
    },
    {
      value: "sign-up-form",
      children: <SignUpForm/>
    }
  ]

  return (
    <ItemTabs tabList={ tabList } panelList={ panelList }></ItemTabs>
  );
};

export default AuthenticationRoute;