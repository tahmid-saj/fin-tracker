import "./transaction.styles.scss";

const Transaction = ({ date, amount, type }) => {
  return (
    <div className="transaction-container">
      <h5>{`${type} on ${date}`}</h5>
      <h4>{`$${amount}`}</h4>
    </div>
  );
};

export default Transaction;