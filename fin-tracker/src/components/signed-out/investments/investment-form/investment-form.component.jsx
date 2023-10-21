import React, { useState, Component } from "react";

import "./investment-form.styles.scss";

import UpdateInvestmentForm from "../update-investment-form/update-investment-form.component";
// import InvestmentInfo from "../investment-info/investment-info.component";
// import Summary from "../summary/summary.component";
import FinanceTrackerItemInfo from "../../finance-tracker-item-info/finance-tracker-item-info.component";

import { FINANCE_ITEM_TYPES } from "../../../../utils/constants/shared.constants";

const financeTrackerItemNames = [
]

// let financeItemSummaryInfo;

// const InvestmentForm = ({ financeItemInfo, closeAccountHandler }) => {

//   const [updateFinanceItemSummaryInfo, setUpdateFinanceItemSummaryInfo] = useState(false);

//   if (!financeItemSummaryInfo) {
//     financeItemSummaryInfo = financeItemInfo;
//     console.log("using initial financeItemSummaryInfo");
//   }

//   const updateInvestmentInfoHandler = (financeItemFields) => {
//     financeItemSummaryInfo = financeItemFields

//     console.log(financeItemSummaryInfo);

//     setUpdateFinanceItemSummaryInfo(true);
//   }

//   return (
//     <div className="investments-form-summary-container">

//       <UpdateInvestmentForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }
//                             closeAccountHandler={ closeAccountHandler } updateInvestmentInfoHandler={ updateInvestmentInfoHandler }></UpdateInvestmentForm>
                            
//       {
//         !updateFinanceItemSummaryInfo && 
//         <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ financeItemSummaryInfo }></FinanceTrackerItemInfo>
//       }

//       {
//         updateFinanceItemSummaryInfo &&
//         <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ financeItemSummaryInfo }></FinanceTrackerItemInfo>
//       }
      
//       {/* <div className="investment-info-summary">
//         <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
//         <Summary financeItemInfo={ financeItemInfo }></Summary>
//       </div> */}
//     </div>
//   )
// };

const InvestmentForm = ({ financeItemInfo }) => {
  // constructor({ financeItemInfo, 
  //   // closeAccountHandler, handleTrackerItemNameChange 
  // }) {
  //   super();

  //   this.state = {
  //     financeItemInfo: financeItemInfo,
  //     // closeAccountHandler: closeAccountHandler,
  //     // financeItemUpdatedInfo: financeItemInfo,
  //     financeUpdatedInfo: false,
  //     handleTrackerItemNameChange: handleTrackerItemNameChange
  //   }
  // };

  // updateInvestmentInfoHandler = (financeItemFields) => {
  //   this.setState({ financeItemUpdatedInfo: financeItemFields });
  //   console.log(this.state.financeItemUpdatedInfo);
  //   this.setState({ financeUpdatedInfo: true });
  // };

  // render() {
    return (
    <div className="investments-form-summary-container">

      <UpdateInvestmentForm label={ FINANCE_ITEM_TYPES.investments } 
                            financeItemInfo={ financeItemInfo }
                            // financeTrackerItemNames={ financeTrackerItemNames }
                            // closeAccountHandler={ this.state.closeAccountHandler } 
                            // updateInvestmentInfoHandler={ this.updateInvestmentInfoHandler }
                            // handleTrackerItemNameChange={ this.state.handleTrackerItemNameChange }
                            ></UpdateInvestmentForm>
                            
      {/* { */}
        {/* !this.state.financeUpdatedInfo &&  */}
        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPES.investments } 
                                financeItemInfo={ financeItemInfo }
                                // financeItemInfo={ this.state.financeItemUpdatedInfo }
                                ></FinanceTrackerItemInfo>
      {/* } */}

      {/* {
        this.state.financeUpdatedInfo &&
        <FinanceTrackerItemInfo label={ FINANCE_ITEM_TYPE } financeItemInfo={ this.state.financeItemUpdatedInfo }></FinanceTrackerItemInfo>
      } */}
      
      {/* <div className="investment-info-summary">
        <InvestmentInfo financeItemInfo={ financeItemInfo }></InvestmentInfo>
        <Summary financeItemInfo={ financeItemInfo }></Summary>
      </div> */}
    </div>
  )
  // }

}

// class InvestmentForm2 extends Component {
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

//   updateInvestmentInfoHandler = (financeItemFields) => {
//     this.setState({ financeItemUpdatedInfo: financeItemFields });
//     console.log(this.state.financeItemUpdatedInfo);
//     this.setState({ financeUpdatedInfo: true });
//   };

//   render() {
//     return (
//       <div className="investments-form-summary-container">
  
//         <UpdateInvestmentForm label={ FINANCE_ITEM_TYPE } financeTrackerItemNames={ financeTrackerItemNames }
//                               closeAccountHandler={ this.state.closeAccountHandler } 
//                               updateInvestmentInfoHandler={ this.updateInvestmentInfoHandler }
//                               handleTrackerItemNameChange={ this.state.handleTrackerItemNameChange }></UpdateInvestmentForm>
                              
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

export default InvestmentForm;
