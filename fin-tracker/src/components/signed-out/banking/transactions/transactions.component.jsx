import Transaction from "../transaction/transaction.component";
import "./transactions.styles.scss";

const Transactions = () => {
  return (
    <div className="transactions-container">
      <Transaction date={ "2023-08-26" } amount={ 100 } type={ "WITHDRAWAL" }></Transaction>
    </div>
  );
};

export default Transactions;