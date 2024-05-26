import React, { Component, useEffect } from "react";

import BankAccounts from "./bank-accounts/bank-accounts.component";


import "./banking.styles.scss";

// import { BankingContext } from "../../../contexts/signed-in/banking/banking.context";
import AllBankingSummary from "./all-banking-summary/all-banking-summary.component";

import { FINANCE_ITEM_TYPES } from "../../../utils/constants/shared.constants";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector";
import { selectBankingAccounts } from "../../../store/signed-in/banking/banking.selector";
import { setBankingAccounts, setBankingSummary,
  setDefaultBankingAccountsValues, setDefaultBankingSummaryValues
} from "../../../store/signed-in/banking/banking.action";
import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";
import { getBankingAccountsData, getBankingSummaryData } from "../../../utils/api-requests/banking.requests";

const Banking = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const bankingAccounts = useSelector(selectBankingAccounts)

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts)

    dispatch(setBankingSummary({
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut
    }))
  }, [bankingAccounts, dispatch])

  useEffect(() => {
    async function fetchBankingData() {
      if (currentUser) {
        const bankingAccountsData = await getBankingAccountsData(currentUser.uid, currentUser.email);
        const bankingSummartData = await getBankingSummaryData(currentUser.uid, currentUser.email);
        
        if (bankingAccountsData) {
          const { bankingAccounts } = await bankingAccountsData;
          dispatch(setBankingAccounts(bankingAccounts))
        }
        if (bankingSummartData) {
          const { bankingSummary } = await bankingSummartData;
          dispatch(setBankingSummary(bankingSummary))
        }
      } else if (!currentUser) {
        dispatch(setDefaultBankingAccountsValues())
        dispatch(setDefaultBankingSummaryValues())
      }
    }

    fetchBankingData()
  }, [currentUser, dispatch])

  return (
    <div className="banking-container">
      
      {
        // TODO: change colors of text
        bankingAccounts.length !== 0 && <AllBankingSummary></AllBankingSummary>
      }

      <BankAccounts label={ FINANCE_ITEM_TYPES.banking }></BankAccounts>
    </div>
  );
};

export default Banking;