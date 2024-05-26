import { all, call } from "redux-saga/effects"
import { userSagas } from "./shared/user/user.saga"

export function* rootSaga() {
  yield all([
    call(userSagas),
  ])
}