import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../../context/user.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {
  const [color, changeColor] = useState("white");
  document.body.style.backgroundColor = color;

  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/"
          onClick={ () => changeColor("#001732") }
        >
          <h1>fin-tracker</h1>
        </Link>

        <div className="nav-links-container">

        {
          currentUser ? (
            <Fragment>

              <Link className="nav-link" to="/dashboard-signed-in"
                onClick={ () => changeColor("#001732") }>
                Dashboard
              </Link>

              <Link className="nav-link" to="/banking-signed-in"
                onClick={ () => changeColor("white") }>
                Banking
              </Link>

              <Link className="nav-link" to="/investments-signed-in"
                onClick={ () => changeColor("white") }>
                Investments
              </Link>

              <Link className="nav-link" to="/savings-signed-in"
                onClick={ () => changeColor("white") }>
                Savings
              </Link>

              <Link className="nav-link" to="/exports-signed-in"
                onClick={ () => changeColor("#001732") }>
                Exports
              </Link>

              <span className="nav-link" onClick={ signOutUser }>Sign Out</span>
            </Fragment>
          ) : (
            <Fragment>
              <Link className="nav-link" to="/banking"
                onClick={ () => changeColor("white") }>
                Banking
              </Link>

              <Link className="nav-link" to="/investments"
                onClick={ () => changeColor("white") }>
                Investments
              </Link>

              <Link className="nav-link" to="/savings"
                onClick={ () => changeColor("white") }>
                Savings
              </Link>

              <Link className="nav-link" to="/auth"
                onClick={ () => changeColor("white") }>
                Login
              </Link>
            </Fragment>
          )
        }

        </div>
      </div>

      <Outlet/>
    </Fragment>

  );
};

export default Navigation;