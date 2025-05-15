import Deposit from "../deposit/deposit.component.tsx";
import Withdraw from "../withdraw/withdraw.component.tsx";
import TransferMoney from "../transfer-money/transfer-money.component.tsx";
import CloseAccount from "../close-account/close-account.component.tsx";

import "./action-list.styles.tsx";
import { ActionListContainer } from "./action-list.styles.tsx";
import { BankingAccount } from "../../../../store/signed-out/banking/banking.types.js";

const ActionList = ({ financeItemInfo }: { financeItemInfo: BankingAccount }) => {
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