import "./transaction.styles.scss";

import { TRANSACTION_TYPE_CLASSES } from "../../../../utils/constants/banking.constants";

const Transaction = ({ date, amount, type }) => {
  return (
    <div className={ `transaction-container ${TRANSACTION_TYPE_CLASSES[type]}` }>
      {
        (type === "DEPOSIT" || type === "WITHDRAWAL") && 
        <h5>{`${type} on ${date}`}</h5>
      }

      {
        (type === "DEPOSIT_TRANSFER") && 
        <h5>{`TRANSFER - DEPOSIT on ${date}`}</h5>
      }

      {
        (type === "WITHDRAWAL_TRANSFER") && 
        <h5>{`TRANSFER - WITHDRAWAL on ${date}`}</h5>
      }
      <h4>{`$${amount}`}</h4>
    </div>
  );
};

export default Transaction;