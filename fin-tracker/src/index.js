import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/shared/user/user.context';
import { ChatBotProvider } from './contexts/signed-out/chatbot/chatbot.context';
import { ExpensesProvider } from './contexts/signed-out/expenses/expenses.context';
import { BankingProvider } from './contexts/signed-out/banking/banking.context';
import { InvestmentsProvider } from './contexts/signed-out/investments/investments.context';
import { MarketDataProvider } from './contexts/shared/market-data/market-data.context';
import { SavingsProvider } from './contexts/signed-out/savings/savings.context';
import { DashboardProvider } from './contexts/signed-out/dashboard/dashboard.context';

import { ExpensesProvider as ExpensesProviderSignedIn } from './contexts/signed-in/expenses/expenses.context';
import { BankingProvider as BankingProviderSignedIn } from './contexts/signed-in/banking/banking.context';
import { InvestmentsProvider as InvestmentsProviderSignedIn } from './contexts/signed-in/investments/investments.context';
import { SavingsProvider as SavingsProviderSignedIn } from './contexts/signed-in/savings/savings.context';
import { DashboardProvider as DashboardProviderSignedIn } from './contexts/signed-in/dashboard/dashboard.context';
import { ExportsProvider } from './contexts/signed-in/exports/exports.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChatBotProvider>
          <ExpensesProvider>
            <BankingProvider>
              <InvestmentsProvider>
                <MarketDataProvider>
                  <SavingsProvider>
                    <DashboardProvider>
                      <ExpensesProviderSignedIn>
                        <BankingProviderSignedIn>
                          <InvestmentsProviderSignedIn>
                            <SavingsProviderSignedIn>
                              <DashboardProviderSignedIn>
                                <ExportsProvider>
                                  <App />
                                </ExportsProvider>
                              </DashboardProviderSignedIn>
                            </SavingsProviderSignedIn>
                          </InvestmentsProviderSignedIn>
                        </BankingProviderSignedIn>
                      </ExpensesProviderSignedIn>
                    </DashboardProvider>
                  </SavingsProvider>
                </MarketDataProvider>
              </InvestmentsProvider>
            </BankingProvider>
          </ExpensesProvider>
        </ChatBotProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
