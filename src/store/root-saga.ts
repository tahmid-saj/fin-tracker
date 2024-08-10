import { all, call } from "typed-redux-saga"
import { userSagas } from "./shared/user/user.saga"

export function* rootSaga() {
  yield* all([
    call(userSagas),
  ])
}