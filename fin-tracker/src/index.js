import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './contexts/shared/user/user.context';
import { ExpensesProvider } from './contexts/signed-out/expenses/expenses.context';
import { BankingProvider } from './contexts/signed-out/banking/banking.context';
import { InvestmentsProvider } from './contexts/signed-out/investments/investments.context';
import { MarketDataProvider } from './contexts/shared/market-data/market-data.context';
import { SavingsProvider } from './contexts/signed-out/savings/savings.context';

import { ExpensesProvider as ExpensesProviderSignedIn } from './contexts/signed-in/expenses/expenses.context';
import { BankingProvider as BankingProviderSignedIn } from './contexts/signed-in/banking/banking.context';
import { InvestmentsProvider as InvestmentsProviderSignedIn } from './contexts/signed-in/investments/investments.context';
import { SavingsProvider as SavingsProviderSignedIn } from './contexts/signed-in/savings/savings.context';
import { DashboardProvider } from './contexts/signed-in/dashboard/dashboard.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ExpensesProvider>
          <BankingProvider>
            <InvestmentsProvider>
              <MarketDataProvider>
                <SavingsProvider>
                  <ExpensesProviderSignedIn>
                    <BankingProviderSignedIn>
                      <InvestmentsProviderSignedIn>
                        <SavingsProviderSignedIn>
                          <DashboardProvider>
                            <App />
                          </DashboardProvider>
                        </SavingsProviderSignedIn>
                      </InvestmentsProviderSignedIn>
                    </BankingProviderSignedIn>
                  </ExpensesProviderSignedIn>
                </SavingsProvider>
              </MarketDataProvider>
            </InvestmentsProvider>
          </BankingProvider>
        </ExpensesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
