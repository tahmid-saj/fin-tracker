import { Fragment, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./navigation.styles.jsx";
import { OutletContainer } from "./navigation.styles.jsx";

import { UserContext } from "../../../contexts/shared/user/user.context";
import { ExpensesContext } from "../../../contexts/signed-in/expenses/expenses.context";
import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";
import { InvestmentsContext } from "../../../contexts/signed-in/investments/investments.context";
import { SavingsContext } from "../../../contexts/signed-in/savings/savings.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";
import MiniDrawer from "../../../components/shared/mui/drawer/drawer.component";
import AboutLinks from "../../../components/shared/about-links/about-links.component.jsx";

import { NAV_LINKS } from "../../../utils/constants/shared.constants.js";

// TODO: put navigation paths in constants

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  // const { updateExpensesAndSummary } = useContext(ExpensesContext)
  // const { updateBankingAccountsAndSummary } = useContext(BankingContext);
  // const { updateInvestmentsAndSummary } = useContext(InvestmentsContext);
  // const { updateSavingsAccountsAndSummary } = useContext(SavingsContext);
  // const navigate = useNavigate();

  // const handleSignOut = () => {
  //   updateExpensesAndSummary();
  //   updateBankingAccountsAndSummary();
  //   updateInvestmentsAndSummary();
  //   updateSavingsAccountsAndSummary();
  //   signOutUser();
  //   navigate("/")
  // };

  return (
    <Fragment>
      <MiniDrawer
        navLinksHeaders={
          currentUser ? NAV_LINKS.signedIn : NAV_LINKS.signedOut
        }
      >
        {/* <AboutLinks></AboutLinks> */}
      </MiniDrawer>

      {/* <NavigationContainer>
        <Link className="logo" to="/"
          // onClick={ () => changeColor("#001732")}
          >
          <h1>fin-tracker</h1>
        </Link>

        <NavLinks>

        {
          currentUser ? (
            <Fragment>

              <NavLink to="/dashboard-signed-in"
                // onClick={ () => changeStyle(linearGradient, "none") }
                >
                Dashboard
              </NavLink>

              <NavLink to="/expenses-signed-in"
                // onClick={ () => changeStyle("none", "white") }
                >
                Expenses
              </NavLink>

              <NavLink to="/banking-signed-in"
                // onClick={ () => changeStyle("none", "white") }
                >
                Banking
              </NavLink>

              <NavLink to="/investments-signed-in"
                // onClick={ () => changeStyle("none", "white") }
                >
                Investments
              </NavLink>

              <NavLink to="/savings-signed-in"
                // onClick={ () => changeStyle("none", "white") }
                >
                Savings
              </NavLink>

              <NavLink to="/useful-tools"
                // onClick={ () => changeStyle("none", "white") }
                >
                Useful Tools
              </NavLink>

              <NavLink to="/exports-signed-in"
                // onClick={ () => changeStyle(linearGradient, "none") }
                >
                Exports
              </NavLink>

              <span className="nav-link" onClick={ handleSignOut }>Sign Out</span>
            </Fragment>
          ) : (
            <Fragment>
              <NavLink to="/dashboard"
                // onClick={ () => changeStyle("none", "white") }
                >
                Dashboard
              </NavLink>

              <NavLink to="/expenses"
                // onClick={ () => changeStyle("none", "white") }
                >
                Expenses
              </NavLink>

              <NavLink to="/banking"
                // onClick={ () => changeStyle("none", "white") }
                >
                Banking
              </NavLink>

              <NavLink to="/investments"
                // onClick={ () => changeStyle("none", "white") }
                >
                Investments
              </NavLink>

              <NavLink to="/savings"
                // onClick={ () => changeStyle("none", "white") }
                >
                Savings
              </NavLink>

              <NavLink to="/useful-tools"
                // onClick={ () => changeStyle("none", "white") }
                >
                Useful Tools
              </NavLink>

              <NavLink to="/auth"
                // onClick={ () => changeStyle("none", "white") }
                >
                Login
              </NavLink>
            </Fragment>
          )
        }

        </NavLinks>
      </NavigationContainer> */}

      <OutletContainer>
        <Outlet/>
      </OutletContainer>
    </Fragment>

  );
};

export default Navigation;