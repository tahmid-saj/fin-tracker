import { AnyAction } from "redux";
import { INVESTMENTS_ACTION_TYPES } from "./investments.types";
import { Investment, InvestmentsSummary } from "./investments.types"
import { closeInvestment, updateInvestment, createInvestment, setInvestmentsSummary } from "./investments.action";

export type InvestmentsState = {
  readonly investments: Investment[] | null | undefined;
  readonly investmentsSummary: InvestmentsSummary | null | undefined;
}

export const INVESTMENTS_INITIAL_STATE: InvestmentsState = {
  investments: [],
  investmentsSummary: {}
}

export const investmentsReducer = (state=INVESTMENTS_INITIAL_STATE, action: AnyAction): InvestmentsState => {
  if (createInvestment.match(action) || updateInvestment.match(action) || closeInvestment.match(action)) {
    return {
      ...state,
      investments: action.payload
    }
  }

  if (setInvestmentsSummary.match(action)) {
    return {
      ...state,
      investmentsSummary: action.payload
    }
  }

  return state

  // const { type, payload } = action

  // switch(type) {
  //   case INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS:
  //     return {
  //       ...state,
  //       investments: payload
  //     }
  //   case INVESTMENTS_ACTION_TYPES.SET_INVESTMENTS_SUMMARY:
  //     return {
  //       ...state,
  //       investmentsSummary: payload
  //     }
  //   default:
  //     return state
  // }
}