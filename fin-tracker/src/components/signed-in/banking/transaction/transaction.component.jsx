import "./transaction.styles.scss";

import { TRANSACTION_TYPE_CLASSES, TRANSACTION_TYPES } from "../../../../utils/constants/banking.constants";

const Transaction = ({ date, amount, type, reason }) => {
  return (
    <div className={ `transaction-container ${TRANSACTION_TYPE_CLASSES[type]}` }>
      {
        (type === TRANSACTION_TYPES.deposit || type === TRANSACTION_TYPES.withdrawal) && 
        <h5>{`${type} on ${date}`}</h5>
      }

      {
        (type === TRANSACTION_TYPES.depositTransfer) && 
        <h5>{`TRANSFER - DEPOSIT on ${date}`}</h5>
      }

      {
        (type === TRANSACTION_TYPES.withdrawalTransfer) && 
        <h5>{`TRANSFER - WITHDRAWAL on ${date}`}</h5>
      }
      <h4>{`$${amount}`}</h4>

      {
        (reason !== undefined && reason !== null && reason !== "") &&
        <h5>{`For : ${reason}`}</h5>
      }
    </div>
  );
};

export default Transaction;