import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo">
          <h1>fin-tracker</h1>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/banking">
            Banking
          </Link>

          <Link className="nav-link" to="/investment">
            Investment
          </Link>

          <Link className="nav-link" to="/savings">
            Savings
          </Link>

          <Link className="nav-link" to="/auth">
            Login
          </Link>
        </div>
      </div>

      <Outlet/>
    </Fragment>
  );
};

export default Navigation;