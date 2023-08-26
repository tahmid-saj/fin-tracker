import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Banking from "./routes/banking/banking.component";
import Investment from "./routes/investment/investment.component";
import Savings from "./routes/savings/savings.components";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <Home/> }/>
        <Route path="banking" element={ <Banking/> }/>
        <Route path="investment" element={ <Investment/> }/>
        <Route path="savings" element={ <Savings/> }/>
        <Route path="auth" element={ <Authentication/> }/>
      </Route>
    </Routes>
  );
}

export default App;
