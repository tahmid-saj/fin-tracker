import { takeLatest, all, call, put } from "redux-saga/effects";

import { getBankingAccountsData, getBankingSummaryData,
  postBankingAccountCreate, postBankingAccountTransaction, deleteBankingAccount,
  putBankingAccountsData, putBankingSummaryData 
} from "../../../utils/api-requests/banking.requests";

import { setBankingAccountsSuccess, setBankingAccountsFailed,
  updateBankingAccountsAndSummarySuccess, updateBankingAccountsAndSummaryFailed 
} from "./banking.action";
import { BANKING_ACTION_TYPES, BANKING_SUB_ACTION_TYPES } from "./banking.types";
import { BankingState } from "./banking.reducer";

// helper functions
export function* setBankingAccounts({ payload }: any) {
  try {
    const { bankingSubActionType, userId, email, bankingAccounts } = payload
    
    if (bankingSubActionType === BANKING_SUB_ACTION_TYPES.CREATE) {
      yield call(postBankingAccountCreate, userId, email, payload.bankingAccountName)
      yield put(setBankingAccountsSuccess(bankingAccounts))
    } else if (bankingSubActionType === BANKING_SUB_ACTION_TYPES.DEPOSIT || 
      bankingSubActionType === BANKING_SUB_ACTION_TYPES.WITHDRAWAL || 
      bankingSubActionType === BANKING_SUB_ACTION_TYPES.TRANSFER) {
        const { transactionInfo } = payload
         
        yield call(postBankingAccountTransaction, userId, email, transactionInfo)
        yield put(setBankingAccountsSuccess(bankingAccounts))
    } else if (bankingSubActionType === BANKING_SUB_ACTION_TYPES.CLOSE) {
        yield call(deleteBankingAccount, userId, email, payload.bankingAccountName)
        yield put(setBankingAccountsSuccess(bankingAccounts))
    }
  } catch (error) {
    yield put(setBankingAccountsFailed(error as Error))
  }
}

export function* updateBankingAccountsAndSummary({ payload }: any) {
  try {
    const { userId, email, bankingAccounts, bankingSummary } = payload

    yield call(putBankingAccountsData, userId, email, bankingAccounts)
    yield call(putBankingSummaryData, userId, email, bankingSummary)
    yield put(updateBankingAccountsAndSummarySuccess())
  } catch (error) {
    yield put(updateBankingAccountsAndSummaryFailed(error as Error))
  }
}

// callbacks on actions
export function* onSetBankingAccounts() {
  yield takeLatest(BANKING_ACTION_TYPES.SET_BANKING_ACCOUNTS_START, setBankingAccounts)
}

export function* onUpdateBankingAccountsAndSummary() {
  yield takeLatest(BANKING_ACTION_TYPES.UPDATE_BANKING_ACCOUNTS_AND_SUMMARY_START, updateBankingAccountsAndSummary)
}

// banking sagas
export function* bankingSagas() {
  yield all([
    call(onSetBankingAccounts),
    call(onUpdateBankingAccountsAndSummary)
  ])
}