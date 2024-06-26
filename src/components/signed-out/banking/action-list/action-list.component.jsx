import Deposit from "../deposit/deposit.component";
import Withdraw from "../withdraw/withdraw.component";
import TransferMoney from "../transfer-money/transfer-money.component";
import CloseAccount from "../close-account/close-account.component";

import "./action-list.styles.jsx";
import { ActionListContainer } from "./action-list.styles.jsx";

const ActionList = ({ financeItemInfo }) => {
  return (
    <ActionListContainer>
      <Deposit financeItemInfo={ financeItemInfo }></Deposit>
      <Withdraw financeItemInfo={ financeItemInfo }></Withdraw>
      <TransferMoney financeItemInfo={ financeItemInfo }></TransferMoney>
      <CloseAccount financeItemInfo={ financeItemInfo }></CloseAccount>
    </ActionListContainer>
  );
};

export default ActionList;