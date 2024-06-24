import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/shared/home/home.component";
import Navigation from "./routes/shared/navigation/navigation.component";
import DashboardRoute from "./routes/signed-out/dashboard/dashboard.component";
import ExpensesRoute from "./routes/signed-out/expenses/expenses.component";
import BankingRoute from "./routes/signed-out/banking/banking.component";
import InvestmentsRoute from "./routes/signed-out/investments/investments.components";
import SavingsRoute from "./routes/signed-out/savings/savings.components";
import InsuranceRoute from "./routes/signed-out/insurance/insurance.component";
import UsefulToolsRoute from "./routes/shared/useful-tools/useful-tools.component";
import AuthenticationRoute from "./routes/signed-out/authentication/authentication.component";

import DashboardRouteSignedIn from "./routes/signed-in/dashboard/dashboard.component";
import ExpensesRouteSignedIn from "./routes/signed-in/expenses/expenses.component";
import BankingRouteSignedIn from "./routes/signed-in/banking/banking.component";
import InvestmentsRouteSignedIn from "./routes/signed-in/investments/investments.components";
import SavingsRouteSignedIn from "./routes/signed-in/savings/savings.components";
import InsuranceRouteSignedIn from "./routes/signed-in/insurance/insurance.component";
import ExportsRouteSignedIn from "./routes/signed-in/exports/exports.component";

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./store/shared/user/user.selector";
import { checkUserSession, setCurrentUser } from "./store/shared/user/user.action";

import { onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user)
    //   }
    //   dispatch(setCurrentUser(user))
    // })

    // return unsubscribe
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="useful-tools" element={ <UsefulToolsRoute/> }></Route>

        {
          currentUser ? 
          (
            <Fragment>
              <Route path="dashboard-signed-in" element={ <DashboardRouteSignedIn/> }/>
              <Route path="expenses-signed-in" element={ <ExpensesRouteSignedIn/> }/>
              <Route path="banking-signed-in" element={ <BankingRouteSignedIn/> }/>
              <Route path="investments-signed-in" element={ <InvestmentsRouteSignedIn/> }/>
              <Route path="savings-signed-in" element={ <SavingsRouteSignedIn/> }/>
              <Route path="insurance-signed-in" element={ <InsuranceRouteSignedIn/> }/>
              <Route path="exports-signed-in" element={ <ExportsRouteSignedIn/> }/>
            </Fragment>
          ) : (
            <Fragment>
              <Route path="dashboard" element={ <DashboardRoute/> }/>
              <Route path="expenses" element={ <ExpensesRoute/> }/>
              <Route path="banking" element={ <BankingRoute/> }/>
              <Route path="investments" element={ <InvestmentsRoute/> }/>
              <Route path="savings" element={ <SavingsRoute/> }/>
              <Route path="insurance" element={ <InsuranceRoute/> }/>
              <Route path="auth" element={ <AuthenticationRoute/> }/>
            </Fragment>
          )
        }
      </Route>
    </Routes>
  );
};

export default App;
