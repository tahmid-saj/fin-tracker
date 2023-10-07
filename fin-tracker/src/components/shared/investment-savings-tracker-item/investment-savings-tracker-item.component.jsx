import React, { Fragment, useState, Component } from "react";

import "./investment-savings-tracker-item.styles.scss";

import FormView from "../../signed-out/form-view/form-view.component";

export let activeFormView = {
  label: "",
  financeItemInfo: {}
}

// export const InvestmentTrackerItem = ({ label, investmentInfo, ...otherProps }) => {
//   const [closeAccount, setCloseAccount] = useState(false);

//   const closeAccountHandler = () => {
//     setCloseAccount(true);

//     console.log("closing account");
//   }

//   const handleDisplayInvestmentTrackerItemForm = (event) => {
//     console.log(label, investmentInfo);

//     activeFormView = {
//       label: label,
//       investmentInfo: investmentInfo
//     };

//     console.log(activeFormView);
//   }

//   return (
//     <div>
//       {
//         !closeAccount && investmentInfo !== null && (
//           <Fragment>
//             <button className={`button-container investment-tracker-item-button`} 
//                     { ...otherProps } style={{borderRadius: 1.5 + 'rem'}}
//                     onClick={ e => handleDisplayInvestmentTrackerItemForm(e) }>
//               { `${investmentInfo.investmentName}` }
//             </button>

//             <FormView financeItemLabel={ label } financeItemInfo={ investmentInfo }
//                       closeAccountHandler={ closeAccountHandler }></FormView>
                      
//             <div className="form-view-separator-container">
//               <hr className="rounded"/>
//             </div>

//             {/* {
//               label !== "Savings Accounts" && (
//               )
//             } */}
//           </Fragment>
//         )
//       }
//     </div>
//   );
// };

export class InvestmentSavingsTrackerItem extends Component {
  constructor({ label, financeItemInfo, ...otherProps }) {
    super();

    this.state = {
      label: label,
      financeItemInfo: financeItemInfo,
      otherProps: otherProps,
      closeAccount: false,
      activeFormView: activeFormView
    }
  };

  closeAccountHandler = () => {
    this.setState({ closeAccount: true });

    console.log("closing account");
  };

  handleDisplayFinanceTrackerItemForm = (event) => {
    console.log(this.state.label, this.state.financeItemInfo);

    this.setState({activeFormView: {
      label: this.state.label,
      financeItemInfo: this.state.financeItemInfo
    }});

    console.log(this.state.activeFormView);
  };

  handleTrackerItemNameChange = (updatedName) => {
    if (this.state.label === "Investments") {
      this.setState({financeItemInfo: {
        ...this.state.financeItemInfo,
        investmentName: updatedName
      }});
    } else if (this.state.label === "Savings Accounts") {
      this.setState({financeItemInfo: {
        ...this.state.financeItemInfo,
        savingsAccountName: updatedName
      }});
    }

    console.log(this.state.financeItemInfo);
    console.log('updated tracker item name');
  }

  render() {
    return (
      <div>
        {
          !this.state.closeAccount && this.state.financeItemInfo !== null && (
            <Fragment>
              <button className={`button-container investment-savings-tracker-item-button`} 
                      { ...this.state.otherProps } style={{borderRadius: 1.5 + 'rem'}}
                      onClick={ e => this.handleDisplayFinanceTrackerItemForm(e) }>
                { this.state.label === "Investments" && `${this.state.financeItemInfo.investmentName}` }
                { this.state.label === "Savings Accounts" && `${this.state.financeItemInfo.savingsAccountName}` }
              </button>

              <FormView financeItemLabel={ this.state.label } financeItemInfo={ this.state.financeItemInfo }
                        closeAccountHandler={ this.closeAccountHandler }
                        handleTrackerItemNameChange={ this.handleTrackerItemNameChange }></FormView>
                        
              <div className="form-view-separator-container">
                <hr className="rounded"/>
              </div>

              {/* {
                label !== "Savings Accounts" && (
                )
              } */}
            </Fragment>
          )
        }
      </div>
    )
  };
}
