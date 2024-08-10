import { UserState } from "./user.reducer"
import { createSelector } from "reselect"

export const selectUserReducer = (state): UserState => state.user

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
)