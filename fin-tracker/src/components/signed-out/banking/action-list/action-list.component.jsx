import Deposit from "../deposit/deposit.component";
import Withdraw from "../withdraw/withdraw.component";
import TransferMoney from "../transfer-money/transfer-money.component";
import CloseAccount from "../close-account/close-account.component";

import "./action-list.styles.scss";

const ActionList = ({ closeAccountHandler }) => {
  return (
    <div className="action-list-container">
      <Deposit></Deposit>
      <Withdraw></Withdraw>
      <TransferMoney></TransferMoney>
      <CloseAccount closeAccountHandler={ closeAccountHandler }></CloseAccount>
    </div>
  );
};

export default ActionList;