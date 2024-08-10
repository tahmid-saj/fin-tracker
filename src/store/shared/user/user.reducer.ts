import { USER_ACTION_TYPES } from "./user.types";
import { UserData } from "../../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import { emailSignInStart, googleSignInStart, signInFailed, signInSuccess, signOutFailed, signOutStart, signOutSuccess, signUpFailed, signUpStart } from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null | undefined;
  readonly isLoading: Boolean | null | undefined;
  readonly error: Error | null | undefined;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state=INITIAL_STATE, action: AnyAction): UserState => {
  if (googleSignInStart.match(action) || emailSignInStart.match(action) || 
    signUpStart.match(action) || signOutStart.match(action)) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false
    }
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
      isLoading: false
    }
  }

  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
  //   case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
  //   case USER_ACTION_TYPES.SIGN_UP_START:
  //   case USER_ACTION_TYPES.SIGN_OUT_START:
  //     return {
  //       ...state,
  //       isLoading: true
  //     }
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //       isLoading: false
  //     }
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null,
  //       isLoading: false
  //     }
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //       isLoading: false
  //     }
  //   default:
  //     return state
  // }
}