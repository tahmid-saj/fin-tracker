import styled from "styled-components";
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

export const TransactionContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: 375px;
  padding: 2%;
`

export const DepositTransaction = styled.div`
  background-color: ${COLOR_CODES.bankingActions.deposit};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${COLOR_CODES.bankingActions.deposit};
  margin: 1%;
  padding: 2%;
`

export const DepositTransferTransaction = styled.div`
  background-color: ${COLOR_CODES.bankingActions.deposit};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${COLOR_CODES.bankingActions.deposit};
  margin: 1%;
  padding: 2%;
`

export const WithdrawTransaction = styled.div`
  background-color: ${COLOR_CODES.bankingActions.withdraw};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${COLOR_CODES.bankingActions.withdraw};
  margin: 1%;
  padding: 2%;
`

export const WithdrawTransferTransaction = styled.div`
  background-color: ${COLOR_CODES.bankingActions.withdraw};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 2px ${COLOR_CODES.bankingActions.withdraw};
  margin: 1%;
  padding: 2%;
`

export const TransactionAddedToExpensesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`