import Deposit from "../deposit/deposit.component";
import Withdraw from "../withdraw/withdraw.component";
import TransferMoney from "../transfer-money/transfer-money.component";
import CloseAccount from "../close-account/close-account.component";

import "./action-list.styles.scss";

const ActionList = ({ 
  // closeAccountHandler, 
  financeItemInfo
  // newTransactionHandler 
}) => {
  return (
    <div className="action-list-container">
      <Deposit 
        // newTransactionHandler={ newTransactionHandler }
        financeItemInfo={ financeItemInfo }
        ></Deposit>
      <Withdraw 
        // newTransactionHandler={ newTransactionHandler }
        financeItemInfo={ financeItemInfo }
      ></Withdraw>
      <TransferMoney></TransferMoney>
      <CloseAccount financeItemInfo={ financeItemInfo } 
        // closeAccountHandler={ closeAccountHandler }
      ></CloseAccount>
    </div>
  );
};

const ActionList2 = ({ closeAccountHandler, newTransactionHandler }) => {
  return (
    <div className="action-list-container">
      <Deposit newTransactionHandler={ newTransactionHandler }></Deposit>
      <Withdraw newTransactionHandler={ newTransactionHandler }></Withdraw>
      <TransferMoney></TransferMoney>
      <CloseAccount closeAccountHandler={ closeAccountHandler }></CloseAccount>
    </div>
  );
};

export default ActionList;