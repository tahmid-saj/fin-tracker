import { Routes, Route } from "react-router-dom";

import HomeRoute from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import BankingRoute from "./routes/banking/banking.component";
import InvestmentsRoute from "./routes/investments/investments.components";
import SavingsRoute from "./routes/savings/savings.components";
import AuthenticationRoute from "./routes/authentication/authentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <HomeRoute/> }/>
        <Route path="banking" element={ <BankingRoute/> }/>
        <Route path="investments" element={ <InvestmentsRoute/> }/>
        <Route path="savings" element={ <SavingsRoute/> }/>
        <Route path="auth" element={ <AuthenticationRoute/> }/>
      </Route>
    </Routes>
  );
};

export default App;
