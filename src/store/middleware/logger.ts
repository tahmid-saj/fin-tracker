import { Middleware } from "redux"
import { RootState } from "../store"

// redux middlewares

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  if (!action.type) {
    return next(action)
  }

  console.log("type ", action.type)
  console.log("payload ", action.payload)
  console.log("currentState ", store.getState())

  next(action)

  console.log("next state ", store.getState())
}