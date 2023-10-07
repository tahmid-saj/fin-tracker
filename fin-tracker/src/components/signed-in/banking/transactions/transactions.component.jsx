import Transaction from "../transaction/transaction.component";
import "./transactions.styles.scss";

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const Transactions = ({ newTransaction, newTransactionAmount, transactions, transactionType }) => {
  return (
    <div className="transactions-container">

      <div className="transactions-scroll-container">
        {
          transactions.map(({ amount, type }, index) => {
            return newTransaction && 
            <Transaction date={ currentDate } amount={ amount } type={ type }></Transaction>
          })
        }
      </div>
    </div>
  );
};

export default Transactions;