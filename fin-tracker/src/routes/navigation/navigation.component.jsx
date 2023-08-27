import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../context/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/">
          <h1>fin-tracker</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/banking">
            Banking
          </Link>

          <Link className="nav-link" to="/investments">
            Investments
          </Link>

          <Link className="nav-link" to="/savings">
            Savings
          </Link>

          {
            currentUser ? (
              <div>
                <span className="nav-link" onClick={ signOutUser }>Sign Out</span>
                <Link className="nav-link" to="/exports">
                  Exports
                </Link>
              </div>
            ) : (
              <Link className="nav-link" to="/auth">
                Login
              </Link>
            )
          }
        </div>
      </div>

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;