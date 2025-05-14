import Deposit from "../deposit/deposit.component.jsx";
import Withdraw from "../withdraw/withdraw.component.jsx";
import TransferMoney from "../transfer-money/transfer-money.component.jsx";
import CloseAccount from "../close-account/close-account.component.jsx";

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