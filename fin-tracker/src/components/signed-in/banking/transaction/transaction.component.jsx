import "./transaction.styles.scss";

const TRANSACTION_TYPE_CLASSES = {
  DEPOSIT: "deposit-transaction",
  WITHDRAWAL: "withdraw-transaction",
  TRANSFER: "transfer-transaction"
};

const Transaction = ({ date, amount, type }) => {
  return (
    <div className={ `transaction-container ${TRANSACTION_TYPE_CLASSES[type]}` }>
      <h5>{`${type} on ${date}`}</h5>
      <h4>{`$${amount}`}</h4>
    </div>
  );
};

export default Transaction;