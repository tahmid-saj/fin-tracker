import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/shared/user/user.context';
import { BankingProvider } from './contexts/signed-out/banking/banking.context';
import { InvestmentsProvider } from './contexts/signed-out/investments/investments.context';
import { SavingsProvider } from './contexts/signed-out/savings/savings.context';
import { DashboardProvider } from './contexts/signed-in/dashboard/dashboard.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <BankingProvider>
          <InvestmentsProvider>
            <SavingsProvider>
              <DashboardProvider>
                <App />
              </DashboardProvider>
            </SavingsProvider>
          </InvestmentsProvider>
        </BankingProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
