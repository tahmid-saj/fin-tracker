import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/shared/user/user.context';
import { UsefulToolsProvider } from './contexts/shared/useful-tools/useful-tools.context';
import { SavingsGoalCalculatorProvider } from './contexts/shared/savings-goal-calculator/savings-goal-calculator.context';
import { ChatBotProvider } from './contexts/shared/chatbot/chatbot.context';
import { AlertsProvider } from './contexts/signed-out/alerts/alerts.context';
import { ExpensesProvider } from './contexts/signed-out/expenses/expenses.context';
import { BankingProvider } from './contexts/signed-out/banking/banking.context';
import { InvestmentsProvider } from './contexts/signed-out/investments/investments.context';
import { MarketDataProvider } from './contexts/shared/market-data/market-data.context';
import { SavingsProvider } from './contexts/signed-out/savings/savings.context';
import { DashboardProvider } from './contexts/signed-out/dashboard/dashboard.context';
import { WebSocketProvider } from "./contexts/shared/live-prices/live-prices.context"
import { PredictionsProvider } from "./contexts/shared/predictor/predictions.context"

import { ExpensesProvider as ExpensesProviderSignedIn } from './contexts/signed-in/expenses/expenses.context';
import { BankingProvider as BankingProviderSignedIn } from './contexts/signed-in/banking/banking.context';
import { InvestmentsProvider as InvestmentsProviderSignedIn } from './contexts/signed-in/investments/investments.context';
import { SavingsProvider as SavingsProviderSignedIn } from './contexts/signed-in/savings/savings.context';
import { InsuranceProvider as InsuranceProviderSignedIn } from './contexts/signed-in/insurance/insurance.context';
import { AlertsProvider as AlertsProviderSignedIn } from "./contexts/signed-in/alerts/alerts.context"
import { DashboardProvider as DashboardProviderSignedIn } from './contexts/signed-in/dashboard/dashboard.context';
import { ExportsProvider } from './contexts/signed-in/exports/exports.context';

import { Provider } from 'react-redux';
import { store } from "./store/store"
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// const client = new ApolloClient({
//   uri: "http://localhost:8000/graphql",
//   cache: new InMemoryCache()
// })

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      {/* <ApolloProvider client={ client }> */}
        {/* <PersistGate loading={ null } persistor={ persistor }> */}
          <BrowserRouter>
            <WebSocketProvider>
              <PredictionsProvider>
                {/* <UserProvider> */}
                  <UsefulToolsProvider>
                    {/* <SavingsGoalCalculatorProvider> */}
                        {/* <ExpensesProvider> */}
                          {/* <BankingProvider> */}
                            {/* <InvestmentsProvider> */}
                              <MarketDataProvider>
                                {/* <SavingsProvider> */}
                                  {/* <DashboardProvider> */}
                                    <AlertsProvider>
                                      <ExpensesProviderSignedIn>
                                        <BankingProviderSignedIn>
                                          <InvestmentsProviderSignedIn>
                                            <SavingsProviderSignedIn>
                                              <InsuranceProviderSignedIn>
                                                <AlertsProviderSignedIn>
                                                  <DashboardProviderSignedIn>
                                                    <ExportsProvider>
                                                      <ChatBotProvider>
                                                        <App />
                                                      </ChatBotProvider>
                                                    </ExportsProvider>
                                                  </DashboardProviderSignedIn>
                                                </AlertsProviderSignedIn>
                                              </InsuranceProviderSignedIn>
                                            </SavingsProviderSignedIn>
                                          </InvestmentsProviderSignedIn>
                                        </BankingProviderSignedIn>
                                      </ExpensesProviderSignedIn>
                                    </AlertsProvider>
                                  {/* </DashboardProvider> */}
                                {/* </SavingsProvider> */}
                              </MarketDataProvider>
                            {/* </InvestmentsProvider> */}
                          {/* </BankingProvider> */}
                        {/* </ExpensesProvider> */}
                    {/* </SavingsGoalCalculatorProvider> */}
                  </UsefulToolsProvider>
                {/* </UserProvider> */}
              </PredictionsProvider>
            </WebSocketProvider>
          </BrowserRouter>
        {/* </PersistGate> */}
      {/* </ApolloProvider> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
