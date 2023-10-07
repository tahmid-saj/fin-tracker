import Transaction from "../transaction/transaction.component";
import "./transactions.styles.scss";

const Transactions = ({ newTransaction }) => {
  return (
    <div className="transactions-container">
      {
        newTransaction && <Transaction date={ "2023-08-26" } amount={ 100 } type={ "WITHDRAWAL" }></Transaction>
      }
    </div>
  );
};

export default Transactions;