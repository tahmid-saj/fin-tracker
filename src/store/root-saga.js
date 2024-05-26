import { all, call } from "redux-saga/effects"
import { userSagas } from "./shared/user/user.saga"
import { bankingSagas } from "./signed-in/banking/banking.saga"

export function* rootSaga() {
  yield all([
    call(userSagas),
    call(bankingSagas)
  ])
}