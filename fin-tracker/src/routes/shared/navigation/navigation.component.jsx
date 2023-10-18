import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "./navigation.styles.scss";

import { UserContext } from "../../../contexts/shared/user/user.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navigation = () => {
  const [color, changeColor] = useState("white");
  document.body.style.backgroundColor = color;

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const linearGradient = `linear-gradient(to bottom, rgba(16, 44, 74, 0.95), rgba(16, 44, 74, 0.95)), url("https://i.pinimg.com/originals/d2/35/01/d2350155f30ad946907bcb7a730cfeca.jpg")`;

  const handleSignOut = () => {
    signOutUser();
    navigate("/")
  };

  const changeStyle = (backgroundImage, color) => {
    changeColor(color);
    document.body.style.backgroundImage = backgroundImage;
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo" to="/"
          // onClick={ () => changeColor("#001732")}
          >
          <h1>fin-tracker</h1>
        </Link>

        <div className="nav-links-container">

        {
          currentUser ? (
            <Fragment>

              <Link className="nav-link" to="/dashboard-signed-in"
                onClick={ () => changeStyle(linearGradient, "none") }
                >
                Dashboard
              </Link>

              <Link className="nav-link" to="/banking-signed-in"
                onClick={ () => changeStyle("none", "white") }>
                Banking
              </Link>

              <Link className="nav-link" to="/investments-signed-in"
                onClick={ () => changeStyle("none", "white") }>
                Investments
              </Link>

              <Link className="nav-link" to="/savings-signed-in"
                onClick={ () => changeStyle("none", "white") }>
                Savings
              </Link>

              <Link className="nav-link" to="/exports-signed-in"
                onClick={ () => changeStyle(linearGradient, "none") }
                >
                Exports
              </Link>

              <span className="nav-link" onClick={ handleSignOut }>Sign Out</span>
            </Fragment>
          ) : (
            <Fragment>
              <Link className="nav-link" to="/banking"
                onClick={ () => changeStyle("none", "white") }>
                Banking
              </Link>

              <Link className="nav-link" to="/investments"
                onClick={ () => changeStyle("none", "white") }>
                Investments
              </Link>

              <Link className="nav-link" to="/savings"
                onClick={ () => changeStyle("none", "white") }>
                Savings
              </Link>

              <Link className="nav-link" to="/auth"
                onClick={ () => changeStyle("none", "white") }>
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