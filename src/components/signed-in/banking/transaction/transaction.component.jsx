import "./transaction.styles.jsx";
import { TransactionContainer, DepositTransaction, DepositTransferTransaction,
  WithdrawTransaction, WithdrawTransferTransaction, TransactionAddedToExpensesContainer
} from "./transaction.styles.jsx";

import { TRANSACTION_TYPE_CLASSES, TRANSACTION_TYPES } from "../../../../utils/constants/banking.constants";

import { Typography } from "@mui/material";
import { Fragment, useState } from "react";

const TransactionInfo = ({ date, amount, type, reason, addToExpenses = false }) => {
  return (
    <Fragment>
      {
        (type === TRANSACTION_TYPES.deposit || type === TRANSACTION_TYPES.withdrawal) && 
        <Typography variant="body1">{`${type} on ${date}`}</Typography>
      }

      {
        (type === TRANSACTION_TYPES.depositTransfer) && 
        <Typography variant="body1">{`TRANSFER - DEPOSIT on ${date}`}</Typography>
      }

      {
        (type === TRANSACTION_TYPES.withdrawalTransfer) && 
        <Typography variant="body1">{`TRANSFER - WITHDRAWAL on ${date}`}</Typography>
      }
      <Typography variant="body2">{`$${amount.toFixed(2)}`}</Typography>

      {
        (reason !== undefined && reason !== null && reason !== "") &&
        <Typography variant="body2">{`For : ${reason}`}</Typography>
      }
        
      {
        type === TRANSACTION_TYPES.withdrawal && addToExpenses ?
        <TransactionAddedToExpensesContainer>
          <Typography variant="subtitle2">Added to expenses</Typography>
        </TransactionAddedToExpensesContainer> : null
      }
    </Fragment>
  )
}

const Transaction = ({ date, amount, type, reason, addToExpenses = false }) => {

  if (type === TRANSACTION_TYPES.deposit) {
    return (
      <TransactionContainer>
        <DepositTransaction>
          <TransactionInfo date={ date } amount={ amount } type={ type } reason={ reason }
                          addToExpenses={ addToExpenses }/>
        </DepositTransaction>
      </TransactionContainer>
    )
  } else if (type === TRANSACTION_TYPES.withdrawal) {
    return (
      <TransactionContainer>
        <WithdrawTransaction>
          <TransactionInfo date={ date } amount={ amount } type={ type } reason={ reason }
                          addToExpenses={ addToExpenses }/>
        </WithdrawTransaction>
      </TransactionContainer>
    )
  } else if (type === TRANSACTION_TYPES.withdrawalTransfer) {
    return (
      <TransactionContainer>
        <WithdrawTransferTransaction>
          <TransactionInfo date={ date } amount={ amount } type={ type } reason={ reason }
                          addToExpenses={ addToExpenses }/>
        </WithdrawTransferTransaction>
      </TransactionContainer>
    )
  } else if (type === TRANSACTION_TYPES.depositTransfer) {
    return (
      <TransactionContainer>
        <DepositTransferTransaction>
          <TransactionInfo date={ date } amount={ amount } type={ type } reason={ reason }
                          addToExpenses={ addToExpenses }/>
        </DepositTransferTransaction>
      </TransactionContainer>
    )
  }

  // return (
  //   <div className={ `transaction-container ${TRANSACTION_TYPE_CLASSES[type]}` }>
  //     {
  //       (type === TRANSACTION_TYPES.deposit || type === TRANSACTION_TYPES.withdrawal) && 
  //       <h5>{`${type} on ${date}`}</h5>
  //     }

  //     {
  //       (type === TRANSACTION_TYPES.depositTransfer) && 
  //       <h5>{`TRANSFER - DEPOSIT on ${date}`}</h5>
  //     }

  //     {
  //       (type === TRANSACTION_TYPES.withdrawalTransfer) && 
  //       <h5>{`TRANSFER - WITHDRAWAL on ${date}`}</h5>
  //     }
  //     <h4>{`$${amount}`}</h4>

  //     {
  //       // TODO: need to fix transaction not displaying reason
  //       (reason !== undefined && reason !== null && reason !== "") &&
  //       <h5>{`For : ${reason}`}</h5>
  //     }

  //     {
  //       type === TRANSACTION_TYPES.withdrawal && addToExpenses ?
  //       <div className="transaction-added-to-expenses-container">
  //         <Typography variant="subtitle2">Added to expenses</Typography>
  //       </div> : null
  //     }
  //   </div>
  // );
};

export default Transaction;