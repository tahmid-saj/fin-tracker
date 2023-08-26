import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Navigation/> }>
        <Route index element={ <Home/> }/>
        {/* <Route path="banking" element={ <Banking/> }/>
        <Route path="investment" element={ <Investment/> }/>
        <Route path="savings" element={ <Savings/> }/>

        <Route path="auth" element={ <Authentication/> }/> */}
      </Route>
    </Routes>
  );
}

export default App;
