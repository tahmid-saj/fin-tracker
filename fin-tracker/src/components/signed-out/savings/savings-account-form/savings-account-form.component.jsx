import React, { Component } from "react";

import "./savings-account-form.styles.scss";

import UpdateAccountForm from "../update-account-form/update-account-form.component";
// import AccountInfo from "../account-info/account-info.component";
// import Summary from "../summary/summary.component";

import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const financeTrackerItemNames = [
]

// const SavingsAccountForm = () => {
//   return (
//     <div className="savings-accounts-form-summary-container">
//       <UpdateAccountForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }></UpdateAccountForm>

//       <div className="savings-account-info-summary">
//         <AccountInfo></AccountInfo>
//         <Summary></Summary>
//       </div>
//     </div>
//   );
// };

const SavingsAccountForm = ({ financeItemInfo }) => {
  // constructor({ financeItemInfo, closeAccountHandler, handleTrackerItemNameChange }) {
  //   super();

  //   this.state = {
  //     financeItemInfo: financeItemInfo,
  //     closeAccountHandler: closeAccountHandler,
  //     financeItemUpdatedInfo: financeItemInfo,
  //     financeUpdatedInfo: false,
  //     handleTrackerItemNameChange: handleTrackerItemNameChange
  //   }
  // };

  // updateSavingsAccountHandler = (financeItemFields) => {
  //   this.setState({ financeItemUpdatedInfo: financeItemFields });
  //   console.log(this.state.financeItemUpdatedInfo);
  //   this.setState({ financeUpdatedInfo: true });
  // };

  // render() {
  return (
    <div className="savings-accounts-form-summary-container">

      <UpdateAccountForm label={ FINANCE_ITEM_TYPES.savings } 
                          financeItemInfo={ financeItemInfo }
                            // financeTrackerItemNames={ financeTrackerItemNames }
                            // closeAccountHandler={ this.state.closeAccountHandler } 
                            // updateSavingsAccountHandler={ this.updateSavingsAccountHandler }
                            // handleTrackerItemNameChange={ this.state.handleTrackerItemNameChange }
                            ></UpdateAccountForm>
                            
      {/* {
        !this.state.financeUpdatedInfo &&  */}
        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.savings } 
                                financeItemInfo={ financeItemInfo }
                                ></FinanceTrackerItemInfo>
      {/* }

      {
        this.state.financeUpdatedInfo &&
        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ this.state.financeItemUpdatedInfo }></FinanceTrackerItemInfo>
      } */}
      
      {/* <div className="investment-info-summary">
        <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
        <Summary financeItemInfo={ financeItemInfo }></Summary>
      </div> */}
    </div>
  )
  // };
}

// class SavingsAccountForm2 extends Component {
//   constructor({ financeItemInfo, closeAccountHandler, handleTrackerItemNameChange }) {
//     super();

//     this.state = {
//       financeItemInfo: financeItemInfo,
//       closeAccountHandler: closeAccountHandler,
//       financeItemUpdatedInfo: financeItemInfo,
//       financeUpdatedInfo: false,
//       handleTrackerItemNameChange: handleTrackerItemNameChange
//     }
//   };

//   updateSavingsAccountHandler = (financeItemFields) => {
//     this.setState({ financeItemUpdatedInfo: financeItemFields });
//     console.log(this.state.financeItemUpdatedInfo);
//     this.setState({ financeUpdatedInfo: true });
//   };

//   render() {
//     return (
//       <div className="savings-accounts-form-summary-container">
  
//         <UpdateAccountForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }
//                               closeAccountHandler={ this.state.closeAccountHandler } 
//                               updateSavingsAccountHandler={ this.updateSavingsAccountHandler }
//                               handleTrackerItemNameChange={ this.state.handleTrackerItemNameChange }></UpdateAccountForm>
                              
//         {
//           !this.state.financeUpdatedInfo && 
//           <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ this.state.financeItemUpdatedInfo }></FinanceTrackerItemInfo>
//         }

//         {
//           this.state.financeUpdatedInfo &&
//           <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ this.state.financeItemUpdatedInfo }></FinanceTrackerItemInfo>
//         }
        
//         {/* <div className="investment-info-summary">
//           <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
//           <Summary financeItemInfo={ financeItemInfo }></Summary>
//         </div> */}
//       </div>
//     )
//   }
// }

export default SavingsAccountForm;

