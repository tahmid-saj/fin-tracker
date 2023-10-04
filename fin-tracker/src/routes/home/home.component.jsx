import "./home.styles.scss";

import { Outlet } from "react-router-dom";
import Home from "../../components/home/home.component"

const HomeRoute = () => {
  return (
    <Home></Home>
  );
};

export default HomeRoute;

