import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./user.reducer";

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload
    }
  }
})

export const { setCurrentUser } = userSlice.actions

export const userReducer = userSlice.reducer